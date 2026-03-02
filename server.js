'use strict';

const path = require('path');
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');

const PORT = Number(process.env.PORT || 8123);
const HOST = process.env.HOST || '0.0.0.0';
const STATIC_ROOT = process.env.STATIC_ROOT || __dirname;
const MAX_PLAYERS_PER_ROOM = Number(process.env.MAX_PLAYERS_PER_ROOM || 6);

const TICK_RATE = 20;
const TICK_MS = Math.floor(1000 / TICK_RATE);
const SNAPSHOT_RATE = 10;
const SNAPSHOT_INTERVAL_TICKS = Math.max(1, Math.round(TICK_RATE / SNAPSHOT_RATE));
const FULL_SNAPSHOT_EVERY = 6;
const WORLD_HALF = 220;
const PLAYER_HEIGHT = 2.2;

const PLAYER_BASE_SPEED = 11;
const PLAYER_SPRINT_MULT = 1.72;
const PLAYER_ACCEL = 12;
const PLAYER_DRAG = 5;
const PLAYER_HEALTH_MAX = 100;
const PLAYER_DARKNESS_DAMAGE = 11;

const COOLDOWNS = Object.freeze({
    dash: 2.4,
    pulse: 9.6,
    shoot: 0.34,
    weather: 24,
    trap: 3.5,
    flare: 2.2,
    craft: 0.45
});

const SKILL = Object.freeze({
    dashForce: 21,
    shootRange: 40,
    shootDamage: 42,
    pulseRadius: 24,
    pulseDamage: 52,
    trapRadius: 7,
    trapDps: 26,
    trapDuration: 16,
    flareRadius: 22,
    flareDuration: 8
});

const FIRE = Object.freeze({
    max: 96,
    min: 6,
    decayGather: 0.12,
    decaySurvive: 0.46,
    campInteractRadius: 9.8,
    woodFuelValue: 14
});

const PHASE = Object.freeze({
    gather: 'GATHER',
    survive: 'SURVIVE'
});

const DURATIONS = Object.freeze({
    gather: 70,
    survive: 65
});

const COUNTS = Object.freeze({
    wood: 84,
    shards: 30,
    chests: 22
});

const PICKUP = Object.freeze({
    resourceRadius: 3.2,
    chestRadius: 4.2
});

const DIRECTOR = Object.freeze({
    reinforceMin: 10,
    reinforceMax: 18,
    baseIntensity: 0.24,
    maxIntensity: 1.28
});

const EVENTS = Object.freeze({
    triggerMin: 9,
    triggerMax: 20,
    cullDuration: 28,
    surgeDuration: 32,
    eliteDuration: 36
});

const NEMESIS = Object.freeze({
    spawnMin: 14,
    spawnMax: 28,
    maxRank: 12
});

const RECONNECT_GRACE_MS = 45000;

const DIFFICULTY = Object.freeze({
    easy: { speedMul: 0.92, enemyMul: 0.86, damageMul: 0.82, emberMul: 0.82 },
    normal: { speedMul: 1, enemyMul: 1, damageMul: 1, emberMul: 1 },
    hard: { speedMul: 1.12, enemyMul: 1.24, damageMul: 1.28, emberMul: 1.6 }
});

const ENEMY_TYPES = Object.freeze({
    wraith: { hp: 64, speed: 1, damage: 1, reward: 3, attackRange: 1.7, attackCd: 0.86 },
    charger: { hp: 56, speed: 1.26, damage: 1.22, reward: 4, attackRange: 1.8, attackCd: 0.72 },
    leech: { hp: 90, speed: 0.88, damage: 0.84, reward: 5, attackRange: 1.9, attackCd: 0.95 },
    brute: { hp: 132, speed: 0.72, damage: 1.5, reward: 8, attackRange: 2.2, attackCd: 1.08 },
    titan: { hp: 280, speed: 0.56, damage: 2.05, reward: 20, attackRange: 2.8, attackCd: 1.25 }
});

const MODIFIERS = Object.freeze({
    frenzy: { id: 'frenzy', hpMul: 1.05, speedMul: 1.22, damageMul: 1.2, incomingMul: 1, rewardBonus: 5 },
    armored: { id: 'armored', hpMul: 1.45, speedMul: 0.9, damageMul: 1.05, incomingMul: 0.72, rewardBonus: 7 },
    volatile: { id: 'volatile', hpMul: 1.1, speedMul: 1.02, damageMul: 1.1, incomingMul: 1, rewardBonus: 6 },
    siphon: { id: 'siphon', hpMul: 1.2, speedMul: 0.98, damageMul: 0.95, incomingMul: 0.86, rewardBonus: 6 }
});

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: true },
    transports: ['websocket'],
    perMessageDeflate: false,
    httpCompression: false
});

app.use(express.static(STATIC_ROOT, {
    etag: true,
    maxAge: '1h'
}));

const rooms = new Map();

app.get('/healthz', (_req, res) => {
    let activeGames = 0;
    let disconnectedGhosts = 0;
    rooms.forEach((room) => {
        if (room.game && room.game.status === 'running') activeGames += 1;
        disconnectedGhosts += room.disconnectedPlayers.size;
    });

    res.json({
        ok: true,
        rooms: rooms.size,
        activeGames,
        disconnectedGhosts,
        uptimeSec: Math.round(process.uptime())
    });
});

app.get('*', (_req, res) => {
    res.sendFile(path.join(STATIC_ROOT, 'index.html'));
});

function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function dist2(ax, az, bx, bz) {
    const dx = ax - bx;
    const dz = az - bz;
    return Math.hypot(dx, dz);
}

function terrainHeight(x, z) {
    const waveA = Math.sin(x * 0.022) * 4.2;
    const waveB = Math.cos(z * 0.019) * 3.8;
    const cross = Math.sin((x + z) * 0.012) * 2.4;
    const basin = Math.sin(Math.hypot(x, z) * 0.028) * 1.3;
    const centerFlatten = Math.exp(-Math.hypot(x, z) * 0.03) * -3.5;
    return waveA + waveB + cross + basin + centerFlatten;
}

function randomCode() {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let out = '';
    for (let i = 0; i < 6; i++) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return out;
}

function generateUniqueCode() {
    let code = randomCode();
    let guard = 0;
    while (rooms.has(code) && guard < 1000) {
        code = randomCode();
        guard += 1;
    }
    return code;
}

function sanitizeName(input) {
    const raw = String(input || '').replace(/\s+/g, ' ').trim();
    if (!raw) return 'Ranger';
    return raw.slice(0, 20);
}

function sanitizeSkin(input) {
    const raw = String(input || '').trim();
    return raw || 'standard';
}

function sanitizeClientId(input) {
    const raw = String(input || '').replace(/[^a-zA-Z0-9_-]/g, '').trim();
    if (!raw) return '';
    return raw.slice(0, 48);
}

function hashSeed(seed) {
    const str = String(seed || 'seed');
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function createRng(seed) {
    let state = hashSeed(seed) || 1;
    return () => {
        state = Math.imul(1664525, state) + 1013904223;
        state >>>= 0;
        return state / 4294967296;
    };
}

function rand(rng, min, max) {
    return min + rng() * (max - min);
}

function pick(rng, list) {
    if (!Array.isArray(list) || list.length === 0) return null;
    return list[Math.floor(rng() * list.length)] || null;
}

function createRoom(code, hostId) {
    return {
        code,
        hostId,
        players: new Map(), // socketId -> playerMeta
        disconnectedPlayers: new Map(), // clientId -> { player, runtime, expiresAt }
        createdAt: Date.now(),
        game: null
    };
}

function makePlayer(socket, payload = {}) {
    return {
        id: socket.id,
        clientId: sanitizeClientId(payload.clientId),
        name: sanitizeName(payload.name),
        skin: sanitizeSkin(payload.skin),
        joinedAt: Date.now()
    };
}

function snapshotRoom(room) {
    return {
        roomCode: room.code,
        hostId: room.hostId,
        maxPlayers: MAX_PLAYERS_PER_ROOM,
        players: Array.from(room.players.values()).map((p) => ({
            id: p.id,
            name: p.name,
            skin: p.skin,
            joinedAt: p.joinedAt
        }))
    };
}

function sendRoomUpdate(room) {
    io.to(room.code).emit('lobby:updated', snapshotRoom(room));
}

function cleanupRoomGame(room) {
    room.game = null;
}

function getDifficulty(game) {
    return DIFFICULTY[game.selectedDifficulty] || DIFFICULTY.normal;
}

function spawnPoint(rng, minRadius = 22, maxRadius = WORLD_HALF * 0.9) {
    const angle = rand(rng, 0, Math.PI * 2);
    const radius = rand(rng, minRadius, maxRadius);
    const x = clamp(Math.cos(angle) * radius, -WORLD_HALF, WORLD_HALF);
    const z = clamp(Math.sin(angle) * radius, -WORLD_HALF, WORLD_HALF);
    return { x, z };
}

function spawnDistributedNodes(rng, count, nearGuard = 16) {
    const nodes = [];
    for (let i = 0; i < count; i++) {
        let x = 0;
        let z = 0;
        let tries = 0;
        do {
            x = rand(rng, -WORLD_HALF * 0.94, WORLD_HALF * 0.94);
            z = rand(rng, -WORLD_HALF * 0.94, WORLD_HALF * 0.94);
            tries += 1;
        } while (Math.hypot(x, z) < nearGuard && tries < 80);
        nodes.push({ id: i + 1, x, z, active: true });
    }
    return nodes;
}

function createPlayerRuntimeFromMeta(meta, spawn) {
    return {
        id: meta.id,
        clientId: meta.clientId,
        name: meta.name,
        skin: meta.skin,
        joinedAt: meta.joinedAt,
        x: spawn.x,
        y: terrainHeight(spawn.x, spawn.z) + PLAYER_HEIGHT * 0.5,
        z: spawn.z,
        rot: 0,
        vx: 0,
        vz: 0,
        health: PLAYER_HEALTH_MAX,
        wood: 2,
        shards: 1,
        embers: 0,
        score: 0,
        cooldowns: {
            dash: 0,
            pulse: 0,
            shoot: 0,
            weather: 0,
            trap: 0,
            flare: 0,
            craft: 0
        },
        input: {
            mx: 0,
            mz: 0,
            sprint: false,
            look: 0,
            lastSeq: -1,
            pingMs: 0
        },
        actions: {
            interact: 0,
            pulse: 0,
            shoot: 0,
            dash: 0,
            weather: 0,
            trap: 0,
            flare: 0,
            craft: 0
        },
        stats: {
            kills: 0,
            deaths: 0,
            damageTaken: 0,
            eventsCompleted: 0,
            nemesisKills: 0
        }
    };
}

function buildNemesisName(rng) {
    const partsA = ['Ash', 'Cinder', 'Void', 'Night', 'Storm', 'Grim', 'Iron', 'Hollow'];
    const partsB = ['fang', 'wraith', 'stalker', 'reaver', 'howl', 'shade', 'claw', 'titan'];
    return `${pick(rng, partsA)}${pick(rng, partsB)}`;
}

function createNightEventTemplate() {
    return {
        triggerTimer: 0,
        active: false,
        resolved: false,
        kind: '',
        label: '',
        timer: 0,
        duration: 0,
        goal: 0,
        progress: 0,
        reward: 0,
        outcome: 'none',
        burstTimer: 0,
        completedCount: 0,
        failedCount: 0
    };
}

function resetNightEventCycle(game) {
    game.nightEvent.triggerTimer = rand(game.rng, EVENTS.triggerMin, EVENTS.triggerMax);
    game.nightEvent.active = false;
    game.nightEvent.resolved = false;
    game.nightEvent.kind = '';
    game.nightEvent.label = '';
    game.nightEvent.timer = 0;
    game.nightEvent.duration = 0;
    game.nightEvent.goal = 0;
    game.nightEvent.progress = 0;
    game.nightEvent.reward = 0;
    game.nightEvent.outcome = 'none';
    game.nightEvent.burstTimer = 0;
}

function createAuthoritativeGame(room, payload = {}) {
    const seed = String(payload.seed || `${Date.now().toString(36)}${Math.floor(Math.random() * 1e8).toString(36)}`);
    const rng = createRng(seed);

    const players = new Map();
    const roster = Array.from(room.players.values());
    for (let i = 0; i < roster.length; i++) {
        const info = roster[i];
        const spawn = spawnPoint(rng, 4 + i * 2, 12 + i * 3);
        players.set(info.id, createPlayerRuntimeFromMeta(info, spawn));
    }

    const game = {
        authoritative: true,
        status: 'running',
        seed,
        rng,
        selectedMode: payload.selectedMode === 'daily' ? 'daily' : 'standard',
        selectedDifficulty: ['easy', 'normal', 'hard'].includes(payload.selectedDifficulty) ? payload.selectedDifficulty : 'normal',
        partyMode: 'allies',
        camp: { x: 0, z: 0 },
        phase: PHASE.gather,
        day: 1,
        timeLeft: DURATIONS.gather,
        fireRadius: FIRE.max * 0.58,
        lastUpdateAt: Date.now(),
        players,
        resources: {
            wood: spawnDistributedNodes(rng, COUNTS.wood, 16),
            shards: spawnDistributedNodes(rng, COUNTS.shards, 18)
        },
        chests: spawnDistributedNodes(rng, COUNTS.chests, 22).map((entry, idx) => ({
            id: idx + 1,
            x: entry.x,
            z: entry.z,
            opened: false
        })),
        enemies: [],
        enemySeq: 1,
        traps: [],
        trapSeq: 1,
        flares: [],
        flareSeq: 1,
        director: {
            intensity: DIRECTOR.baseIntensity,
            target: DIRECTOR.baseIntensity,
            reinforceTimer: rand(rng, DIRECTOR.reinforceMin, DIRECTOR.reinforceMax),
            wavesSpawned: 0
        },
        nightEvent: createNightEventTemplate(),
        nemesisProfile: {
            name: buildNemesisName(rng),
            rank: 1,
            rage: 0,
            bounty: 0,
            kills: 0,
            encounters: 0,
            lastOutcome: 'none',
            lastSeenDay: 0
        },
        nemesisRuntime: {
            spawnTimer: rand(rng, NEMESIS.spawnMin, NEMESIS.spawnMax),
            spawned: false,
            resolved: false,
            killed: false,
            activeEnemyId: 0
        },
        stats: {
            totalKills: 0,
            totalWaves: 0,
            startedAt: Date.now()
        },
        tickSeq: 0,
        resourceStateDirty: false,
        chestStateDirty: false
    };

    resetNightEventCycle(game);
    return game;
}

function countAlivePlayers(game) {
    let alive = 0;
    game.players.forEach((player) => {
        if (player.health > 0) alive += 1;
    });
    return alive;
}

function getAlivePlayers(game) {
    const arr = [];
    game.players.forEach((player) => {
        if (player.health > 0) arr.push(player);
    });
    return arr;
}

function getNearestPlayer(game, x, z) {
    let nearest = null;
    let nearestDist = Infinity;
    game.players.forEach((player) => {
        if (player.health <= 0) return;
        const d = dist2(x, z, player.x, player.z);
        if (d < nearestDist) {
            nearest = player;
            nearestDist = d;
        }
    });
    return { player: nearest, dist: nearestDist };
}

function getDifficultyRewardMult(game) {
    return getDifficulty(game).emberMul;
}

function grantEmbers(player, amount, game, bonusMult = 1) {
    const gain = Math.max(0, Math.floor(amount * getDifficultyRewardMult(game) * bonusMult));
    player.embers += gain;
    player.score += Math.floor(gain * 1.8);
    return gain;
}

function pickEnemyType(game, forceType = '') {
    if (forceType && ENEMY_TYPES[forceType]) return forceType;
    const day = game.day;
    const intensity = game.director.intensity;
    const roll = game.rng();
    if (day >= 8 && roll < 0.12 + intensity * 0.08) return 'brute';
    if (day >= 5 && roll < 0.32 + intensity * 0.08) return 'leech';
    if (day >= 4 && roll < 0.54 + intensity * 0.1) return 'charger';
    return 'wraith';
}

function pickEnemyModifier(game, type, opts = {}) {
    if (opts.forceNemesis) return MODIFIERS.frenzy;
    if (type === 'titan') return null;

    const day = game.day + (opts.bonusDay || 0);
    let chance = 0.08 + day * 0.018 + game.director.intensity * 0.12;
    if (opts.forceElite) chance = 1;
    chance = clamp(chance, 0, 0.48);

    if (game.rng() > chance) return null;

    const pool = ['frenzy'];
    if (day >= 3) pool.push('armored');
    if (day >= 4) pool.push('volatile');
    if (day >= 5) pool.push('siphon');

    const picked = pick(game.rng, pool);
    return MODIFIERS[picked] || null;
}

function spawnEnemy(game, opts = {}) {
    const type = pickEnemyType(game, opts.forceType || '');
    const base = ENEMY_TYPES[type] || ENEMY_TYPES.wraith;
    const modifier = pickEnemyModifier(game, type, {
        forceElite: opts.forceElite === true,
        forceNemesis: opts.forceNemesis === true,
        bonusDay: opts.bonusDay || 0
    });

    const spawn = opts.nearPlayer
        ? (() => {
            const alive = getAlivePlayers(game);
            if (alive.length === 0) return spawnPoint(game.rng, 36, 92);
            const anchor = pick(game.rng, alive);
            const angle = rand(game.rng, 0, Math.PI * 2);
            const radius = rand(game.rng, 40, 86);
            const x = clamp(anchor.x + Math.cos(angle) * radius, -WORLD_HALF, WORLD_HALF);
            const z = clamp(anchor.z + Math.sin(angle) * radius, -WORLD_HALF, WORLD_HALF);
            return { x, z };
        })()
        : spawnPoint(game.rng, Math.max(30, game.fireRadius + 10), Math.min(WORLD_HALF - 8, game.fireRadius + 74));

    const diff = getDifficulty(game);
    const dayMul = 1 + game.day * 0.09;

    let hp = base.hp * dayMul * diff.enemyMul;
    let speed = base.speed * (6.4 + game.day * 0.14);
    let damageMul = base.damage;
    let incomingMul = 1;
    let rewardBonus = 0;

    if (modifier) {
        hp *= modifier.hpMul;
        speed *= modifier.speedMul;
        damageMul *= modifier.damageMul;
        incomingMul = modifier.incomingMul;
        rewardBonus += modifier.rewardBonus;
    }

    if (opts.forceNemesis) {
        const profile = game.nemesisProfile;
        hp = hp * 1.35 + profile.rank * 44 + profile.rage * 28;
        speed *= 1.06 + profile.rank * 0.015;
        damageMul *= 1.18 + profile.rank * 0.05;
        rewardBonus += 16 + profile.rank * 4;
    }

    const enemy = {
        id: game.enemySeq++,
        type,
        x: spawn.x,
        y: terrainHeight(spawn.x, spawn.z) + 1,
        z: spawn.z,
        rot: 0,
        hp,
        maxHp: hp,
        speed,
        baseDamageMul: damageMul,
        attackCooldown: rand(game.rng, 0.1, base.attackCd + 0.25),
        attackRange: base.attackRange,
        rewardBase: base.reward,
        rewardBonus,
        incomingMul,
        modifierId: modifier ? modifier.id : '',
        elite: !!modifier,
        nemesis: !!opts.forceNemesis,
        lastHitBy: '',
        siphonCooldown: rand(game.rng, 1.2, 2.8)
    };

    game.enemies.push(enemy);
    return enemy;
}

function spawnDirectorReinforcement(game, count = 1, opts = {}) {
    let eliteCount = 0;
    for (let i = 0; i < count; i++) {
        const enemy = spawnEnemy(game, {
            nearPlayer: true,
            forceElite: opts.forceElite === true,
            bonusDay: opts.bonusDay || 0
        });
        if (enemy && enemy.elite) eliteCount += 1;
    }
    game.stats.totalWaves += 1;
    return eliteCount;
}

function getNemesisArchetype(game) {
    const rank = game.nemesisProfile.rank;
    if (rank >= 8) return 'titan';
    if (rank >= 4) return 'brute';
    if (rank >= 2) return 'leech';
    return 'charger';
}

function spawnNemesis(game) {
    if (game.nemesisRuntime.spawned || game.nemesisRuntime.resolved) return null;

    const type = getNemesisArchetype(game);
    const enemy = spawnEnemy(game, {
        nearPlayer: true,
        forceType: type,
        forceElite: true,
        forceNemesis: true,
        bonusDay: 2
    });

    if (!enemy) return null;
    enemy.nemesis = true;
    enemy.modifierId = enemy.modifierId || 'frenzy';

    game.nemesisRuntime.spawned = true;
    game.nemesisRuntime.resolved = false;
    game.nemesisRuntime.killed = false;
    game.nemesisRuntime.activeEnemyId = enemy.id;
    return enemy;
}

function resolveNemesisDefeat(game, killer) {
    const profile = game.nemesisProfile;
    profile.encounters += 1;
    profile.rank = clamp(profile.rank + 1, 1, NEMESIS.maxRank);
    profile.rage = Math.max(0, profile.rage - 1);
    profile.lastOutcome = 'slain';
    profile.lastSeenDay = game.day;
    profile.bounty = Math.max(0, Math.floor(profile.bounty * 0.35));

    game.nemesisRuntime.spawned = false;
    game.nemesisRuntime.resolved = true;
    game.nemesisRuntime.killed = true;
    game.nemesisRuntime.activeEnemyId = 0;
    game.nemesisRuntime.spawnTimer = rand(game.rng, NEMESIS.spawnMin, NEMESIS.spawnMax);

    const bounty = 30 + profile.rank * 11 + profile.bounty;
    if (killer) {
        killer.stats.nemesisKills += 1;
        grantEmbers(killer, bounty, game, 1.25);
    }

    const alive = getAlivePlayers(game);
    for (let i = 0; i < alive.length; i++) {
        if (alive[i] === killer) continue;
        grantEmbers(alive[i], Math.floor(bounty * 0.32), game, 1);
    }
}

function resolveNemesisEscape(game, reason = 'escaped') {
    if (!game.nemesisRuntime.spawned) return;
    const profile = game.nemesisProfile;
    profile.encounters += 1;
    profile.rage = clamp(profile.rage + (reason === 'player_down' ? 2 : 1), 0, 6);
    profile.rank = clamp(profile.rank + (reason === 'player_down' ? 1 : 0), 1, NEMESIS.maxRank);
    if (reason === 'player_down') profile.kills += 1;
    profile.bounty += 22 + profile.rank * 6;
    profile.lastOutcome = reason;
    profile.lastSeenDay = game.day;

    game.nemesisRuntime.spawned = false;
    game.nemesisRuntime.resolved = true;
    game.nemesisRuntime.killed = false;
    game.nemesisRuntime.activeEnemyId = 0;
    game.nemesisRuntime.spawnTimer = rand(game.rng, NEMESIS.spawnMin, NEMESIS.spawnMax);
}

function beginNightEvent(game) {
    if (game.phase !== PHASE.survive) return;
    const kind = pick(game.rng, ['cull', 'surge', 'elite_hunt']);

    const event = game.nightEvent;
    event.active = true;
    event.resolved = false;
    event.kind = kind;
    event.progress = 0;
    event.outcome = 'none';
    event.burstTimer = 0;

    if (kind === 'cull') {
        event.label = 'Cull Protocol';
        event.duration = EVENTS.cullDuration;
        event.timer = event.duration;
        event.goal = 5 + game.day;
        event.reward = 12 + game.day * 3;
    } else if (kind === 'surge') {
        event.label = 'Surge Breaker';
        event.duration = EVENTS.surgeDuration;
        event.timer = event.duration;
        event.goal = 7 + game.day;
        event.reward = 14 + game.day * 3;
        spawnDirectorReinforcement(game, 3 + Math.floor(game.day * 0.25), { forceElite: game.day >= 4, bonusDay: 1 });
    } else {
        event.label = 'Elite Hunt';
        event.duration = EVENTS.eliteDuration;
        event.timer = event.duration;
        event.goal = 2 + Math.floor(game.day / 3);
        event.reward = 18 + game.day * 4;
        spawnDirectorReinforcement(game, 2 + Math.floor(game.day * 0.2), { forceElite: true, bonusDay: 2 });
    }
}

function completeNightEvent(game) {
    const event = game.nightEvent;
    if (!event.active) return;

    event.active = false;
    event.resolved = true;
    event.outcome = 'success';
    event.completedCount += 1;

    const alive = getAlivePlayers(game);
    for (let i = 0; i < alive.length; i++) {
        const player = alive[i];
        player.stats.eventsCompleted += 1;
        grantEmbers(player, event.reward, game, 1);
        player.shards += 1;
    }

    game.fireRadius = clamp(game.fireRadius + 8, FIRE.min, FIRE.max);
}

function failNightEvent(game) {
    const event = game.nightEvent;
    if (!event.active) return;

    event.active = false;
    event.resolved = true;
    event.outcome = 'failed';
    event.failedCount += 1;
    game.fireRadius = clamp(game.fireRadius - 9, 0, FIRE.max);
}

function registerNightEventKill(game, enemy) {
    const event = game.nightEvent;
    if (!event.active) return;
    if (event.kind === 'elite_hunt') {
        const qualifies = !!enemy.elite || !!enemy.nemesis || enemy.type === 'titan';
        if (!qualifies) return;
    }

    event.progress += 1;
    if (event.progress >= event.goal) {
        completeNightEvent(game);
    }
}

function updateNightEvent(game, dt) {
    if (game.phase !== PHASE.survive) return;

    const event = game.nightEvent;
    if (!event.active) {
        if (event.resolved) return;
        event.triggerTimer -= dt * (1 + game.director.intensity * 0.34);
        if (event.triggerTimer <= 0) beginNightEvent(game);
        return;
    }

    event.timer -= dt;
    if (event.kind === 'surge') {
        event.burstTimer -= dt;
        if (event.burstTimer <= 0) {
            event.burstTimer = 5.2;
            spawnDirectorReinforcement(game, 1 + Math.floor(game.director.intensity * 1.7), { forceElite: game.day >= 6, bonusDay: 1 });
        }
    }

    if (event.timer <= 0) {
        failNightEvent(game);
    }
}

function getSafeLightAt(game, x, z) {
    const campDist = dist2(x, z, game.camp.x, game.camp.z);
    let maxSafe = campDist <= game.fireRadius ? 1 : 0;

    for (let i = 0; i < game.flares.length; i++) {
        const flare = game.flares[i];
        const d = dist2(x, z, flare.x, flare.z);
        if (d <= flare.radius) {
            const influence = 1 - d / Math.max(flare.radius, 0.001);
            maxSafe = Math.max(maxSafe, influence);
        }
    }

    return maxSafe;
}

function maybeCollectResources(player, game) {
    let changed = false;
    for (let i = 0; i < game.resources.wood.length; i++) {
        const node = game.resources.wood[i];
        if (!node.active) continue;
        if (dist2(player.x, player.z, node.x, node.z) < PICKUP.resourceRadius) {
            node.active = false;
            player.wood += 1;
            changed = true;
        }
    }

    for (let i = 0; i < game.resources.shards.length; i++) {
        const node = game.resources.shards[i];
        if (!node.active) continue;
        if (dist2(player.x, player.z, node.x, node.z) < PICKUP.resourceRadius) {
            node.active = false;
            player.shards += 1;
            changed = true;
        }
    }
    if (changed) game.resourceStateDirty = true;
}

function openNearbyChest(player, game) {
    for (let i = 0; i < game.chests.length; i++) {
        const chest = game.chests[i];
        if (chest.opened) continue;
        if (dist2(player.x, player.z, chest.x, chest.z) < PICKUP.chestRadius) {
            chest.opened = true;
            game.chestStateDirty = true;
            const woodGain = 2 + Math.floor(rand(game.rng, 0, 4));
            const shardGain = 1 + Math.floor(rand(game.rng, 0, 3));
            player.wood += woodGain;
            player.shards += shardGain;
            grantEmbers(player, 10 + woodGain + shardGain * 2, game, 1);
            return true;
        }
    }
    return false;
}

function handleInteract(player, game) {
    if (openNearbyChest(player, game)) return;

    const nearCamp = dist2(player.x, player.z, game.camp.x, game.camp.z) < FIRE.campInteractRadius;
    if (nearCamp && player.wood > 0) {
        player.wood -= 1;
        game.fireRadius = clamp(game.fireRadius + FIRE.woodFuelValue, FIRE.min, FIRE.max);
    }
}

function addTrap(player, game) {
    if (player.wood < 2 || player.shards < 1) return;
    player.wood -= 2;
    player.shards -= 1;

    game.traps.push({
        id: game.trapSeq++,
        x: player.x,
        z: player.z,
        radius: SKILL.trapRadius,
        dps: SKILL.trapDps,
        slow: 0.45,
        life: SKILL.trapDuration,
        maxLife: SKILL.trapDuration
    });
}

function addFlare(player, game) {
    if (player.shards < 1) return;
    player.shards -= 1;
    game.flares.push({
        id: game.flareSeq++,
        x: player.x,
        z: player.z,
        radius: SKILL.flareRadius,
        life: SKILL.flareDuration,
        maxLife: SKILL.flareDuration
    });
}

function applyEnemyHit(enemy, damage, sourcePlayerId = '') {
    const dealt = damage * (enemy.incomingMul || 1);
    enemy.hp -= dealt;
    if (sourcePlayerId) enemy.lastHitBy = sourcePlayerId;
    return dealt;
}

function rewardEnemyKill(game, enemy) {
    const killer = game.players.get(enemy.lastHitBy) || null;
    const diff = getDifficulty(game);
    const base = ENEMY_TYPES[enemy.type] || ENEMY_TYPES.wraith;

    const rewardBase = base.reward + (enemy.rewardBonus || 0) + (enemy.nemesis ? 18 : 0);
    const directorBonus = 1 + game.director.intensity * 0.28;
    const finalReward = Math.floor(rewardBase * diff.emberMul * directorBonus);

    if (killer) {
        killer.stats.kills += 1;
        grantEmbers(killer, finalReward, game, 1);

        const shardChance = 0.2 + game.director.intensity * 0.1 + (enemy.elite ? 0.14 : 0) + (enemy.nemesis ? 0.2 : 0);
        if (game.rng() < shardChance) killer.shards += 1;
    }

    // Team gets a small split to keep coop pacing synchronized
    const alive = getAlivePlayers(game);
    for (let i = 0; i < alive.length; i++) {
        const player = alive[i];
        if (player === killer) continue;
        grantEmbers(player, Math.floor(finalReward * 0.2), game, 1);
    }

    if (enemy.modifierId === 'volatile') {
        for (let i = 0; i < alive.length; i++) {
            const player = alive[i];
            const d = dist2(player.x, player.z, enemy.x, enemy.z);
            if (d < 9) {
                const damage = 22 * (1 - d / 9);
                player.health = Math.max(0, player.health - damage);
                player.stats.damageTaken += damage;
            }
        }
    }

    if (enemy.nemesis) {
        resolveNemesisDefeat(game, killer);
    }

    registerNightEventKill(game, enemy);
    game.stats.totalKills += 1;
}

function applyCombatActions(player, game) {
    if (player.health <= 0) return;

    if (player.actions.dash > 0 && player.cooldowns.dash <= 0) {
        player.actions.dash = 0;
        player.cooldowns.dash = COOLDOWNS.dash;
        const len = Math.hypot(player.input.mx, player.input.mz);
        const dirX = len > 0.001 ? player.input.mx / len : Math.sin(player.rot);
        const dirZ = len > 0.001 ? player.input.mz / len : Math.cos(player.rot);
        player.vx += dirX * SKILL.dashForce;
        player.vz += dirZ * SKILL.dashForce;
    }

    if (player.actions.interact > 0) {
        player.actions.interact = 0;
        handleInteract(player, game);
    }

    if (player.actions.weather > 0 && player.cooldowns.weather <= 0) {
        player.actions.weather = 0;
        if (player.shards >= 2) {
            player.shards -= 2;
            player.cooldowns.weather = COOLDOWNS.weather;
            game.fireRadius = clamp(game.fireRadius + 5, FIRE.min, FIRE.max);
        }
    }

    if (player.actions.trap > 0 && player.cooldowns.trap <= 0) {
        player.actions.trap = 0;
        player.cooldowns.trap = COOLDOWNS.trap;
        addTrap(player, game);
    }

    if (player.actions.flare > 0 && player.cooldowns.flare <= 0) {
        player.actions.flare = 0;
        player.cooldowns.flare = COOLDOWNS.flare;
        addFlare(player, game);
    }

    if (player.actions.craft > 0 && player.cooldowns.craft <= 0) {
        player.actions.craft = 0;
        player.cooldowns.craft = COOLDOWNS.craft;
        if (player.wood >= 2 && player.shards >= 1) {
            player.wood -= 2;
            player.shards -= 1;
            grantEmbers(player, 5, game, 1);
        }
    }

    if (player.actions.shoot > 0 && player.cooldowns.shoot <= 0) {
        player.actions.shoot = 0;
        player.cooldowns.shoot = COOLDOWNS.shoot;

        const facingX = Math.sin(player.rot);
        const facingZ = Math.cos(player.rot);
        const cosLimit = Math.cos(Math.PI * 0.45);

        let target = null;
        let best = Infinity;
        for (let i = 0; i < game.enemies.length; i++) {
            const enemy = game.enemies[i];
            const dx = enemy.x - player.x;
            const dz = enemy.z - player.z;
            const d = Math.hypot(dx, dz);
            if (d > SKILL.shootRange) continue;
            const dot = (dx / Math.max(d, 0.001)) * facingX + (dz / Math.max(d, 0.001)) * facingZ;
            if (dot < cosLimit) continue;
            if (d < best) {
                best = d;
                target = enemy;
            }
        }

        if (target) {
            const dealt = applyEnemyHit(target, SKILL.shootDamage, player.id);
            if (dealt > 38 && game.rng() < 0.2) {
                player.shards += 1;
            }
        }
    }

    if (player.actions.pulse > 0 && player.cooldowns.pulse <= 0 && player.shards >= 1) {
        player.actions.pulse = 0;
        player.shards -= 1;
        player.cooldowns.pulse = COOLDOWNS.pulse;

        for (let i = 0; i < game.enemies.length; i++) {
            const enemy = game.enemies[i];
            const d = dist2(player.x, player.z, enemy.x, enemy.z);
            if (d > SKILL.pulseRadius) continue;
            const falloff = 1 - d / Math.max(SKILL.pulseRadius, 0.001);
            const damage = SKILL.pulseDamage * (0.45 + falloff * 0.85);
            applyEnemyHit(enemy, damage, player.id);
        }
    }
}

function updateTraps(game, dt) {
    for (let i = game.traps.length - 1; i >= 0; i--) {
        const trap = game.traps[i];
        trap.life -= dt;
        if (trap.life <= 0) {
            game.traps.splice(i, 1);
            continue;
        }

        for (let e = 0; e < game.enemies.length; e++) {
            const enemy = game.enemies[e];
            const d = dist2(enemy.x, enemy.z, trap.x, trap.z);
            if (d > trap.radius) continue;
            const influence = 1 - d / Math.max(trap.radius, 0.001);
            applyEnemyHit(enemy, trap.dps * influence * dt, '');

            // Slow effect
            enemy.speed *= (1 - trap.slow * 0.04 * dt);
        }
    }
}

function updateFlares(game, dt) {
    for (let i = game.flares.length - 1; i >= 0; i--) {
        const flare = game.flares[i];
        flare.life -= dt;
        if (flare.life <= 0) {
            game.flares.splice(i, 1);
            continue;
        }
    }
}

function removeDeadEnemies(game) {
    for (let i = game.enemies.length - 1; i >= 0; i--) {
        const enemy = game.enemies[i];
        if (enemy.hp > 0) continue;
        rewardEnemyKill(game, enemy);
        game.enemies.splice(i, 1);
    }
}

function updateDirector(game, dt) {
    if (game.phase !== PHASE.survive) return;

    const alive = countAlivePlayers(game);
    const eventPressure = game.nightEvent.active ? 0.08 : 0;
    const nemesisPressure = game.nemesisRuntime.spawned ? 0.14 : 0;

    game.director.target = clamp(
        DIRECTOR.baseIntensity
            + (game.day - 1) * 0.09
            + alive * 0.05
            + eventPressure
            + nemesisPressure,
        0.18,
        DIRECTOR.maxIntensity
    );

    game.director.intensity = lerp(game.director.intensity, game.director.target, 1 - Math.exp(-dt * 1.2));
    game.director.reinforceTimer -= dt * (1 + game.director.intensity * 0.26);

    if (game.director.reinforceTimer <= 0) {
        const count = 1 + Math.floor(game.director.intensity * 2.1) + (game.rng() < 0.25 ? 1 : 0);
        spawnDirectorReinforcement(game, count, {
            forceElite: game.day >= 6 && game.rng() < 0.45,
            bonusDay: 1
        });
        game.director.wavesSpawned += 1;
        game.director.reinforceTimer = rand(game.rng, DIRECTOR.reinforceMin, DIRECTOR.reinforceMax) / clamp(game.director.intensity, 0.3, 1.35);
    }
}

function updateNemesis(game, dt) {
    if (game.phase !== PHASE.survive) return;

    if (!game.nemesisRuntime.spawned) {
        const minDay = Math.max(2, 5 - Math.min(game.nemesisProfile.rank, 3));
        if (game.day < minDay) return;

        const pressure = 1 + game.nemesisProfile.rage * 0.14 + game.director.intensity * 0.1;
        game.nemesisRuntime.spawnTimer -= dt * pressure;
        if (game.nemesisRuntime.spawnTimer <= 0) {
            spawnNemesis(game);
        }
    } else {
        const active = game.enemies.find((enemy) => enemy.id === game.nemesisRuntime.activeEnemyId);
        if (!active) {
            resolveNemesisEscape(game, 'escaped');
        }
    }
}

function updateEnemies(game, dt) {
    const alivePlayers = countAlivePlayers(game);
    if (alivePlayers <= 0) return;

    if (game.phase === PHASE.survive) {
        const diff = getDifficulty(game);
        const targetBase = 3.2 + game.day * 0.9 + game.players.size * 0.65;
        const target = clamp(Math.floor(targetBase * diff.enemyMul * (1 + game.director.intensity * 0.38)), 4, 30);
        let spawnGuard = 0;
        while (game.enemies.length < target && spawnGuard < 36) {
            spawnEnemy(game, { nearPlayer: false });
            spawnGuard += 1;
        }
    }

    for (let i = game.enemies.length - 1; i >= 0; i--) {
        const enemy = game.enemies[i];
        if (enemy.hp <= 0) continue;

        const nearest = getNearestPlayer(game, enemy.x, enemy.z);
        if (!nearest.player) {
            enemy.attackCooldown = Math.max(0, enemy.attackCooldown - dt);
            continue;
        }

        const target = nearest.player;
        const dx = target.x - enemy.x;
        const dz = target.z - enemy.z;
        const d = Math.hypot(dx, dz);

        if (d > 0.001) {
            const nx = dx / d;
            const nz = dz / d;
            enemy.x += nx * enemy.speed * dt;
            enemy.z += nz * enemy.speed * dt;
            enemy.y = terrainHeight(enemy.x, enemy.z) + 1;
            enemy.rot = Math.atan2(nx, nz);
        }

        enemy.attackCooldown -= dt;
        enemy.siphonCooldown -= dt;

        if (d < enemy.attackRange && enemy.attackCooldown <= 0 && target.health > 0) {
            enemy.attackCooldown = (ENEMY_TYPES[enemy.type] || ENEMY_TYPES.wraith).attackCd;
            const diff = getDifficulty(game);
            let damage = 14 * enemy.baseDamageMul * diff.damageMul * (1 + game.director.intensity * 0.18);
            if (enemy.nemesis) {
                damage *= 1.18 + game.nemesisProfile.rank * 0.055 + game.nemesisProfile.rage * 0.08;
            }
            target.health = Math.max(0, target.health - damage);
            target.stats.damageTaken += damage;

            if (enemy.modifierId === 'siphon' && enemy.siphonCooldown <= 0) {
                enemy.siphonCooldown = 2.6;
                game.fireRadius = clamp(game.fireRadius - 2.2, 0, FIRE.max);
            }
        }
    }
}

function updatePlayers(game, dt) {
    const diff = getDifficulty(game);

    game.players.forEach((player) => {
        Object.keys(player.cooldowns).forEach((key) => {
            player.cooldowns[key] = Math.max(0, player.cooldowns[key] - dt);
        });

        if (player.health <= 0) return;

        const mxRaw = Number.isFinite(player.input.mx) ? player.input.mx : 0;
        const mzRaw = Number.isFinite(player.input.mz) ? player.input.mz : 0;

        let mx = clamp(mxRaw, -1, 1);
        let mz = clamp(mzRaw, -1, 1);
        const len = Math.hypot(mx, mz);
        if (len > 1) {
            mx /= len;
            mz /= len;
        }

        const sprinting = !!player.input.sprint;
        const maxSpeed = PLAYER_BASE_SPEED * (sprinting ? PLAYER_SPRINT_MULT : 1) * diff.speedMul;
        player.vx = lerp(player.vx, mx * maxSpeed, 1 - Math.exp(-PLAYER_ACCEL * dt));
        player.vz = lerp(player.vz, mz * maxSpeed, 1 - Math.exp(-PLAYER_ACCEL * dt));

        const drag = Math.max(0, 1 - PLAYER_DRAG * dt);
        player.vx *= drag;
        player.vz *= drag;

        player.x = clamp(player.x + player.vx * dt, -WORLD_HALF, WORLD_HALF);
        player.z = clamp(player.z + player.vz * dt, -WORLD_HALF, WORLD_HALF);
        player.y = terrainHeight(player.x, player.z) + PLAYER_HEIGHT * 0.5;

        const horizontalSpeed = Math.hypot(player.vx, player.vz);
        if (horizontalSpeed > 0.12) {
            player.rot = Math.atan2(player.vx, player.vz);
        } else if (Number.isFinite(player.input.look)) {
            player.rot = player.input.look;
        }

        maybeCollectResources(player, game);
        applyCombatActions(player, game);

        if (game.phase === PHASE.survive) {
            const safe = getSafeLightAt(game, player.x, player.z);
            if (safe < 0.05) {
                const tickDamage = PLAYER_DARKNESS_DAMAGE * dt * diff.damageMul;
                player.health = Math.max(0, player.health - tickDamage);
                player.stats.damageTaken += tickDamage;
            }
        }
    });
}

function refillResourcesForNewDay(game) {
    const inactiveWood = game.resources.wood.filter((node) => !node.active);
    const inactiveShards = game.resources.shards.filter((node) => !node.active);

    const refillWood = Math.min(inactiveWood.length, 14 + game.day * 2);
    const refillShards = Math.min(inactiveShards.length, 6 + Math.floor(game.day * 1.2));

    for (let i = 0; i < refillWood; i++) inactiveWood[i].active = true;
    for (let i = 0; i < refillShards; i++) inactiveShards[i].active = true;
    if (refillWood > 0 || refillShards > 0) {
        game.resourceStateDirty = true;
    }
}

function transitionToNight(game) {
    game.phase = PHASE.survive;
    game.timeLeft = DURATIONS.survive;
    game.nemesisRuntime.spawnTimer = rand(game.rng, NEMESIS.spawnMin, NEMESIS.spawnMax);
    game.nemesisRuntime.spawned = false;
    game.nemesisRuntime.resolved = false;
    game.nemesisRuntime.killed = false;
    game.nemesisRuntime.activeEnemyId = 0;

    resetNightEventCycle(game);
}

function transitionToDay(game) {
    game.phase = PHASE.gather;
    game.day += 1;
    game.timeLeft = DURATIONS.gather;

    game.enemies.length = 0;
    game.traps.length = 0;
    game.flares.length = 0;

    // Reward all alive players for surviving the night
    const alive = getAlivePlayers(game);
    const dawnReward = 10 + game.day * 6;
    for (let i = 0; i < alive.length; i++) {
        grantEmbers(alive[i], dawnReward, game, 1);
    }

    refillResourcesForNewDay(game);
    resolveNemesisEscape(game, 'evaded');
    resetNightEventCycle(game);
}

function updatePhaseTimers(game) {
    if (game.timeLeft > 0) return;
    if (game.phase === PHASE.gather) {
        transitionToNight(game);
    } else {
        transitionToDay(game);
    }
}

function cleanupDisconnectedEntries(room) {
    const now = Date.now();
    room.disconnectedPlayers.forEach((entry, clientId) => {
        if (entry.expiresAt <= now) {
            room.disconnectedPlayers.delete(clientId);
        }
    });
}

function buildGameSnapshot(room, opts = {}) {
    const game = room.game;
    const full = !!opts.full;
    const snapshot = {
        roomCode: room.code,
        authoritative: true,
        phase: game.phase,
        day: game.day,
        timeLeft: Number(game.timeLeft.toFixed(2)),
        fireRadius: Number(game.fireRadius.toFixed(3)),
        players: Array.from(game.players.values()).map((p) => ({
            id: p.id,
            name: p.name,
            skin: p.skin,
            x: Number(p.x.toFixed(3)),
            y: Number(p.y.toFixed(3)),
            z: Number(p.z.toFixed(3)),
            rot: Number(p.rot.toFixed(4)),
            health: Number(p.health.toFixed(2)),
            wood: Math.floor(p.wood),
            shards: Math.floor(p.shards),
            embers: Math.floor(p.embers),
            score: Math.floor(p.score),
            alive: p.health > 0,
            pingMs: Math.floor(p.input.pingMs || 0),
            cooldowns: {
                dash: Number(p.cooldowns.dash.toFixed(2)),
                pulse: Number(p.cooldowns.pulse.toFixed(2)),
                shoot: Number(p.cooldowns.shoot.toFixed(2)),
                weather: Number(p.cooldowns.weather.toFixed(2)),
                trap: Number(p.cooldowns.trap.toFixed(2)),
                flare: Number(p.cooldowns.flare.toFixed(2)),
                craft: Number(p.cooldowns.craft.toFixed(2))
            },
            stats: full ? p.stats : undefined
        })),
        enemies: game.enemies.map((enemy) => ({
            id: enemy.id,
            type: enemy.type,
            x: Number(enemy.x.toFixed(3)),
            y: Number(enemy.y.toFixed(3)),
            z: Number(enemy.z.toFixed(3)),
            rot: Number(enemy.rot.toFixed(4)),
            hp: Number(enemy.hp.toFixed(2)),
            maxHp: Number(enemy.maxHp.toFixed(2)),
            elite: !!enemy.elite,
            modifierId: enemy.modifierId,
            nemesis: !!enemy.nemesis
        })),
        traps: game.traps.map((trap) => ({
            id: trap.id,
            x: Number(trap.x.toFixed(2)),
            z: Number(trap.z.toFixed(2)),
            radius: Number(trap.radius.toFixed(2)),
            life: Number(trap.life.toFixed(2)),
            maxLife: Number(trap.maxLife.toFixed(2))
        })),
        flares: game.flares.map((flare) => ({
            id: flare.id,
            x: Number(flare.x.toFixed(2)),
            z: Number(flare.z.toFixed(2)),
            radius: Number(flare.radius.toFixed(2)),
            life: Number(flare.life.toFixed(2)),
            maxLife: Number(flare.maxLife.toFixed(2))
        })),
        cooldownCaps: COOLDOWNS,
        serverTime: Date.now()
    };

    if (full) {
        snapshot.camp = { ...game.camp };
        snapshot.director = {
            intensity: Number(game.director.intensity.toFixed(3)),
            target: Number(game.director.target.toFixed(3)),
            wavesSpawned: game.director.wavesSpawned
        };
        snapshot.nightEvent = {
            triggerTimer: Number(game.nightEvent.triggerTimer.toFixed(2)),
            active: game.nightEvent.active,
            resolved: game.nightEvent.resolved,
            kind: game.nightEvent.kind,
            label: game.nightEvent.label,
            timer: Number(game.nightEvent.timer.toFixed(2)),
            duration: Number(game.nightEvent.duration.toFixed(2)),
            goal: game.nightEvent.goal,
            progress: game.nightEvent.progress,
            reward: game.nightEvent.reward,
            outcome: game.nightEvent.outcome,
            completedCount: game.nightEvent.completedCount,
            failedCount: game.nightEvent.failedCount
        };
        snapshot.nemesis = {
            profile: {
                name: game.nemesisProfile.name,
                rank: game.nemesisProfile.rank,
                rage: game.nemesisProfile.rage,
                bounty: game.nemesisProfile.bounty,
                kills: game.nemesisProfile.kills,
                encounters: game.nemesisProfile.encounters,
                lastOutcome: game.nemesisProfile.lastOutcome,
                lastSeenDay: game.nemesisProfile.lastSeenDay
            },
            runtime: {
                spawnTimer: Number(game.nemesisRuntime.spawnTimer.toFixed(2)),
                spawned: game.nemesisRuntime.spawned,
                resolved: game.nemesisRuntime.resolved,
                killed: game.nemesisRuntime.killed,
                activeEnemyId: game.nemesisRuntime.activeEnemyId
            }
        };
    }

    if (full) {
        snapshot.resources = {
            wood: game.resources.wood.map((node) => ({
                id: node.id,
                x: Number(node.x.toFixed(2)),
                z: Number(node.z.toFixed(2)),
                active: !!node.active
            })),
            shards: game.resources.shards.map((node) => ({
                id: node.id,
                x: Number(node.x.toFixed(2)),
                z: Number(node.z.toFixed(2)),
                active: !!node.active
            }))
        };
        snapshot.chests = game.chests.map((chest) => ({
            id: chest.id,
            x: Number(chest.x.toFixed(2)),
            z: Number(chest.z.toFixed(2)),
            opened: !!chest.opened
        }));
    }

    return snapshot;
}

function tickAuthoritativeGame(room) {
    const game = room.game;
    if (!game || game.status !== 'running') return;

    const now = Date.now();
    let dt = (now - game.lastUpdateAt) / 1000;
    dt = clamp(dt, 0.016, 0.08);
    game.lastUpdateAt = now;
    game.tickSeq += 1;

    cleanupDisconnectedEntries(room);

    game.timeLeft -= dt;
    const decay = game.phase === PHASE.survive ? FIRE.decaySurvive : FIRE.decayGather;
    game.fireRadius = clamp(game.fireRadius - decay * dt, 0, FIRE.max);

    updatePlayers(game, dt);
    updateTraps(game, dt);
    updateFlares(game, dt);
    updateDirector(game, dt);
    updateNightEvent(game, dt);
    updateNemesis(game, dt);
    updateEnemies(game, dt);
    removeDeadEnemies(game);
    updatePhaseTimers(game);

    const alive = countAlivePlayers(game);
    if (alive <= 0) {
        game.status = 'ended';
        resolveNemesisEscape(game, 'player_down');
        io.to(room.code).emit('game:ended', {
            reason: 'All players were extinguished.',
            day: game.day,
            roomCode: room.code,
            authoritative: true
        });
        return;
    }

    if (game.tickSeq % SNAPSHOT_INTERVAL_TICKS === 0) {
        const slice = Math.floor(game.tickSeq / SNAPSHOT_INTERVAL_TICKS);
        const full = slice % FULL_SNAPSHOT_EVERY === 0 || game.resourceStateDirty || game.chestStateDirty;
        io.to(room.code).emit('game:snapshot', buildGameSnapshot(room, { full }));
        if (full) {
            game.resourceStateDirty = false;
            game.chestStateDirty = false;
        }
    }
}

setInterval(() => {
    rooms.forEach((room) => {
        if (room.game && room.game.authoritative) {
            tickAuthoritativeGame(room);
        }
    });
}, TICK_MS);

function appendActions(player, incoming) {
    if (!incoming || typeof incoming !== 'object') return;
    const keys = ['interact', 'pulse', 'shoot', 'dash', 'weather', 'trap', 'flare', 'craft'];
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const add = Number(incoming[key]) || 0;
        if (add > 0) {
            player.actions[key] = clamp(player.actions[key] + Math.floor(add), 0, 4);
        }
    }
}

function migrateDisconnectedPlayerIfAny(room, socket, payload) {
    const clientId = sanitizeClientId(payload.clientId);
    if (!clientId) return null;

    const stale = room.disconnectedPlayers.get(clientId);
    if (!stale) return null;

    room.disconnectedPlayers.delete(clientId);

    const meta = {
        id: socket.id,
        clientId,
        name: sanitizeName(payload.name || stale.player.name),
        skin: sanitizeSkin(payload.skin || stale.player.skin),
        joinedAt: stale.player.joinedAt || Date.now()
    };

    if (room.game && stale.runtime) {
        stale.runtime.id = socket.id;
        stale.runtime.clientId = clientId;
        stale.runtime.name = meta.name;
        stale.runtime.skin = meta.skin;
        room.game.players.set(socket.id, stale.runtime);
    }

    return meta;
}

function attachPlayerToRoom(room, socket, payload = {}) {
    const restored = migrateDisconnectedPlayerIfAny(room, socket, payload);
    if (restored) {
        room.players.set(socket.id, restored);
        return restored;
    }

    const player = makePlayer(socket, payload);
    room.players.set(socket.id, player);

    if (room.game && room.game.status === 'running') {
        const spawn = spawnPoint(room.game.rng, 6, 14);
        room.game.players.set(player.id, createPlayerRuntimeFromMeta(player, spawn));
    }

    return player;
}

function storeDisconnectedGhost(room, playerMeta, runtime) {
    if (!playerMeta || !playerMeta.clientId) return;
    room.disconnectedPlayers.set(playerMeta.clientId, {
        player: playerMeta,
        runtime,
        expiresAt: Date.now() + RECONNECT_GRACE_MS
    });
}

function leaveCurrentRoom(socket, opts = {}) {
    const roomCode = socket.data.roomCode;
    if (!roomCode) return;

    const room = rooms.get(roomCode);
    socket.data.roomCode = '';
    socket.leave(roomCode);
    if (!room) return;

    const playerMeta = room.players.get(socket.id) || null;
    room.players.delete(socket.id);

    let runtime = null;
    if (room.game && room.game.players.has(socket.id)) {
        runtime = room.game.players.get(socket.id);
        room.game.players.delete(socket.id);
    }

    if (opts.explicit !== true && room.game && room.game.status === 'running' && playerMeta && playerMeta.clientId) {
        storeDisconnectedGhost(room, playerMeta, runtime);
        io.to(room.code).emit('game:notice', { message: `${playerMeta.name} disconnected. Rejoin available for ${Math.floor(RECONNECT_GRACE_MS / 1000)}s.` });
    }

    io.to(roomCode).emit('player:left', { id: socket.id, roomCode });

    if (room.players.size === 0) {
        cleanupRoomGame(room);
        rooms.delete(roomCode);
        return;
    }

    if (room.hostId === socket.id) {
        const nextHost = room.players.values().next().value;
        room.hostId = nextHost ? nextHost.id : '';
    }

    sendRoomUpdate(room);
}

io.on('connection', (socket) => {
    socket.data.roomCode = '';

    socket.on('lobby:create', (payload = {}) => {
        leaveCurrentRoom(socket, { explicit: true });

        const code = generateUniqueCode();
        const room = createRoom(code, socket.id);
        const player = makePlayer(socket, payload);

        room.players.set(socket.id, player);
        rooms.set(code, room);
        socket.data.roomCode = code;
        socket.join(code);

        socket.emit('lobby:joined', snapshotRoom(room));
        sendRoomUpdate(room);
    });

    socket.on('lobby:join', (payload = {}) => {
        const code = String(payload.roomCode || '').toUpperCase().trim();
        const room = rooms.get(code);
        if (!room) {
            socket.emit('lobby:error', { message: 'Room not found.' });
            return;
        }

        const incomingClientId = sanitizeClientId(payload.clientId);
        const restoring = !!(incomingClientId && room.disconnectedPlayers.has(incomingClientId));
        if (!restoring && room.players.size >= MAX_PLAYERS_PER_ROOM) {
            socket.emit('lobby:error', { message: 'Room is full.' });
            return;
        }

        leaveCurrentRoom(socket, { explicit: true });

        const player = attachPlayerToRoom(room, socket, payload);
        socket.data.roomCode = code;
        socket.join(code);

        socket.emit('lobby:joined', snapshotRoom(room));
        sendRoomUpdate(room);

        if (room.game && room.game.status === 'running') {
            socket.emit('game:start', {
                roomCode: room.code,
                by: room.hostId,
                partyMode: 'allies',
                selectedMode: room.game.selectedMode,
                selectedDifficulty: room.game.selectedDifficulty,
                seed: room.game.seed,
                authoritative: true,
                at: Date.now()
            });
            socket.emit('game:snapshot', buildGameSnapshot(room, { full: true }));

            io.to(room.code).emit('game:notice', {
                message: restoring
                    ? `${player.name} rejoined the run.`
                    : `${player.name} joined mid-run.`
            });
        }
    });

    socket.on('lobby:leave', () => {
        leaveCurrentRoom(socket, { explicit: true });
        socket.emit('lobby:left', { ok: true });
    });

    socket.on('lobby:update-profile', (payload = {}) => {
        const roomCode = socket.data.roomCode;
        if (!roomCode) return;

        const room = rooms.get(roomCode);
        if (!room) return;

        const player = room.players.get(socket.id);
        if (!player) return;

        player.name = sanitizeName(payload.name || player.name);
        player.skin = sanitizeSkin(payload.skin || player.skin);
        if (payload.clientId) {
            player.clientId = sanitizeClientId(payload.clientId) || player.clientId;
        }

        if (room.game && room.game.players.has(player.id)) {
            const runtime = room.game.players.get(player.id);
            runtime.name = player.name;
            runtime.skin = player.skin;
            runtime.clientId = player.clientId;
        }

        sendRoomUpdate(room);
    });

    socket.on('game:start-request', (payload = {}) => {
        const roomCode = socket.data.roomCode;
        if (!roomCode) {
            socket.emit('lobby:error', { message: 'Join a room first.' });
            return;
        }

        const room = rooms.get(roomCode);
        if (!room) {
            socket.emit('lobby:error', { message: 'Room no longer exists.' });
            return;
        }

        if (room.hostId !== socket.id) {
            socket.emit('lobby:error', { message: 'Only the host can launch the run.' });
            return;
        }

        if (room.players.size < 2) {
            socket.emit('lobby:error', { message: 'Need at least 2 players for co-op launch.' });
            return;
        }

        const partyMode = payload.partyMode === 'allies' ? 'allies' : 'solo';
        if (partyMode !== 'allies') {
            socket.emit('lobby:error', { message: 'Authoritative co-op requires With Others mode.' });
            return;
        }

        room.game = createAuthoritativeGame(room, payload);
        room.disconnectedPlayers.clear();

        io.to(roomCode).emit('game:start', {
            roomCode,
            by: socket.id,
            partyMode: 'allies',
            selectedMode: room.game.selectedMode,
            selectedDifficulty: room.game.selectedDifficulty,
            seed: room.game.seed,
            authoritative: true,
            at: Date.now()
        });

        io.to(roomCode).emit('game:snapshot', buildGameSnapshot(room, { full: true }));
    });

    socket.on('player:input', (payload = {}) => {
        const roomCode = socket.data.roomCode;
        if (!roomCode) return;

        const room = rooms.get(roomCode);
        if (!room || !room.game || room.game.status !== 'running') return;

        const player = room.game.players.get(socket.id);
        if (!player) return;

        const seq = Number(payload.seq);
        if (Number.isFinite(seq) && seq <= player.input.lastSeq) {
            return;
        }
        if (Number.isFinite(seq)) {
            player.input.lastSeq = seq;
        }

        const mx = Number(payload.mx);
        const mz = Number(payload.mz);
        const sprint = !!payload.sprint;
        const look = Number(payload.look);
        const sentAt = Number(payload.sentAt);

        if (Number.isFinite(mx)) player.input.mx = clamp(mx, -1, 1);
        if (Number.isFinite(mz)) player.input.mz = clamp(mz, -1, 1);
        player.input.sprint = sprint;
        if (Number.isFinite(look)) player.input.look = look;

        if (Number.isFinite(sentAt)) {
            const rtt = Date.now() - sentAt;
            if (rtt >= 0 && rtt < 5000) {
                player.input.pingMs = player.input.pingMs <= 0
                    ? rtt
                    : Math.floor(lerp(player.input.pingMs, rtt, 0.2));
            }
        }

        appendActions(player, payload.actions);
        // Snapshot streaming is driven by tickAuthoritativeGame to avoid burst traffic.
    });

    socket.on('disconnect', () => {
        leaveCurrentRoom(socket, { explicit: false });
    });
});

server.listen(PORT, HOST, () => {
    console.log(`Lumina multiplayer server listening on http://${HOST}:${PORT}`);
});
