'use strict';

/**
 * LUMINA: Ascendant Edition
 * Advanced Three.js survival overhaul with procedural terrain,
 * pack AI, abilities, weather, objectives, and persistence.
 */

const CONFIG = {
    WORLD_SIZE: 460,
    PLAYER_BASE_SPEED: 11,
    PLAYER_SPRINT_MULT: 1.75,
    PLAYER_ACCEL: 16,
    PLAYER_DRAG: 4,
    PLAYER_RADIUS: 0.75,
    PLAYER_HEIGHT: 2.2,
    DASH_COOLDOWN: 2.4,
    DASH_FORCE: 30,
    STAMINA_DRAIN: 32,
    STAMINA_RECOVERY: 25,
    STAMINA_RECOVERY_COMBAT: 17,
    WOOD_FUEL_VALUE: 14,
    FIRE_MAX_RADIUS: 96,
    FIRE_MIN_RADIUS: 6,
    FIRE_CRITICAL_RADIUS: 12,
    FIRE_OUT_GRACE: 7,
    FIRE_DECAY_DAY: 0.12,
    FIRE_DECAY_NIGHT: 0.46,
    TREE_COUNT: 240,
    GRASS_COUNT: 900,
    WOOD_NODE_COUNT: 78,
    SHARD_NODE_COUNT: 28,
    BEACON_COUNT: 3,
    NIGHT_ENEMY_BASE: 3,
    NIGHT_ENEMY_GROWTH: 1,
    FLARE_DURATION: 7,
    FLARE_RADIUS: 22,
    FLARE_COST: 1,
    CRAFT_BOW_WOOD_COST: 6,
    CRAFT_BOW_SHARD_COST: 2,
    BOLT_PACK_WOOD_COST: 2,
    BOLT_PACK_SHARD_COST: 1,
    BOLT_PACK_SIZE: 6,
    BOLT_MAX_AMMO: 48,
    BOLT_BASE_DAMAGE: 42,
    BOLT_SPEED: 72,
    BOLT_LIFETIME: 1.8,
    BOLT_HIT_RADIUS: 1.2,
    BOLT_FIRE_COOLDOWN: 0.34,
    ELITE_BASE_CHANCE: 0.09,
    ELITE_DAY_BONUS: 0.018,
    ELITE_BOSS_BONUS: 0.08,
    ELITE_MAX_CHANCE: 0.42,
    VOLATILE_BLAST_RADIUS: 9.5,
    VOLATILE_BLAST_DAMAGE: 32,
    SIPHON_INTERVAL: 2.8,
    SIPHON_FIRE_DRAIN: 2.2,
    RELIC_DROP_BASE: 0.08,
    RELIC_DROP_DAY_BONUS: 0.012,
    RELIC_DROP_PUSH_BONUS: 0.03,
    RELIC_MAX_EQUIPPED: 3,
    DIRECTOR_REINFORCE_MIN: 10,
    DIRECTOR_REINFORCE_MAX: 18,
    PUSH_THREAT_STEP: 0.14,
    PUSH_REWARD_STEP: 0.17,
    DAILY_BONUS_BASE: 140,
    DAILY_BONUS_SCORE_STEP: 0.05,
    NEMESIS_SPAWN_MIN: 14,
    NEMESIS_SPAWN_MAX: 28,
    NEMESIS_MAX_RANK: 12,
    EMBER_ORB_BASE_LIFE: 9,
    EMBER_ORB_PICKUP_RADIUS: 2.2,
    EMBER_ORB_DROP_BASE: 0.56,
    EMBER_ORB_DROP_ELITE_BONUS: 0.18,
    EMBER_ORB_VALUE_BASE: 6,
    CHAIN_TIMEOUT: 4.8,
    CHAIN_OVERDRIVE_THRESHOLD: 7,
    OVERDRIVE_DURATION: 11,
    OVERDRIVE_COOLDOWN: 24,
    OVERDRIVE_SPEED_MULT: 1.16,
    OVERDRIVE_FIRE_DECAY_MULT: 0.72,
    OVERDRIVE_EMBER_MULT: 1.22,
    OVERDRIVE_COOLDOWN_MULT: 1.24,
    NIGHT_EVENT_TRIGGER_MIN: 9,
    NIGHT_EVENT_TRIGGER_MAX: 20,
    NIGHT_EVENT_SURGE_DURATION: 28,
    NIGHT_EVENT_ELITE_DURATION: 34,
    TRAP_COST_WOOD: 2,
    TRAP_COST_SHARD: 1,
    TRAP_RADIUS: 7,
    TRAP_DURATION: 20,
    TRAP_DPS: 28,
    TRAP_SLOW: 0.48,
    MAX_ACTIVE_TRAPS: 3,
    TITAN_SLAM_COOLDOWN: 8,
    TITAN_SLAM_DELAY: 1.1,
    TITAN_SLAM_RADIUS: 8.5,
    TITAN_SLAM_DAMAGE: 38,
    PULSE_BASE_COOLDOWN: 10,
    PULSE_BASE_DAMAGE: 50,
    PULSE_BASE_RADIUS: 24,
    COMBO_MAX: 120,
    COMBO_DECAY_PER_SEC: 11,
    RADAR_RANGE: 120,
    DARKNESS_DAMAGE: 11,
    ENEMY_DAMAGE: 17,
    PLAYER_DAMAGE_COOLDOWN: 0.45,
    CHEST_COUNT: 22,
    DEPLOY_HUB_X: 0,
    DEPLOY_HUB_Z: -150,
    DEPLOY_PORTAL_RADIUS: 4.8,
    ALLY_SENTINEL_COUNT: 2,
    WEATHER_CONTROL_COOLDOWN: 24,
    ASSIST_MAX: 0.3,
    TOUCH_DEADZONE: 0.12,
    MULTIPLAYER_SEND_INTERVAL: 0.075,
    MULTIPLAYER_IDLE_SEND_INTERVAL: 0.16,
    MULTIPLAYER_ENEMY_INTERP: 12,
    MULTIPLAYER_AREA_EFFECT_INTERP: 10,
    MULTIPLAYER_REMOTE_POS_INTERP: 13,
    MULTIPLAYER_REMOTE_ROT_INTERP: 15,
    MULTIPLAYER_REMOTE_EXTRAP_MS: 180,
    MULTIPLAYER_LOCAL_CORRECTION_NEAR: 5.2,
    MULTIPLAYER_LOCAL_CORRECTION_FAR: 8.2,
    MULTIPLAYER_LOCAL_SNAP_DISTANCE_BASE: 22,
    MULTIPLAYER_LOCAL_SNAP_DISTANCE_PING_SCALE: 0.08,
    MULTIPLAYER_REMOTE_TIMEOUT: 10,
    MULTIPLAYER_NAME_KEY: 'lumina_mp_name',
    MULTIPLAYER_CLIENT_ID_KEY: 'lumina_mp_client_id',
    TELEMETRY_EVENT_LIMIT: 90,
    TELEMETRY_HISTORY_LIMIT: 20,
    SAVE_KEY: 'lumina_save_ascendant',
    LEGACY_SAVE_KEY: 'lumina_save'
};
const MULTIPLAYER_ENABLED = false;
const MULTIPLAYER_DISABLED_MESSAGE = 'Multiplayer is temporarily disabled. Coming soon.';
let lastMultiplayerDisabledNoticeAt = 0;
const MONETIZATION = Object.freeze({
    REWARDED_DEFAULT_ENABLED: false,
    REWARDED_DAILY_CAP: 6,
    START_BONUS_EMBERS: 30,
    START_BONUS_DAILY_CAP: 2,
    GAME_OVER_BONUS_MULT: 0.5,
    SHARD_REROLL_COST: 4,
    REWARDED_COOLDOWN_MS: 900
});
const PLATFORM_SDK_INIT_TIMEOUT_MS = 1600;
const CRAZYGAMES_SDK_URL = 'https://sdk.crazygames.com/crazygames-sdk-v3.js';

const DIFFICULTY = {
    easy: {
        name: 'Easy',
        dayDuration: 90,
        nightDuration: 50,
        enemySpeed: 6.2,
        spawnMultiplier: 0.85,
        damageMultiplier: 0.78,
        decayMultiplier: 0.82,
        emberMultiplier: 0.8
    },
    normal: {
        name: 'Normal',
        dayDuration: 70,
        nightDuration: 65,
        enemySpeed: 8.4,
        spawnMultiplier: 1,
        damageMultiplier: 1,
        decayMultiplier: 1,
        emberMultiplier: 1
    },
    hard: {
        name: 'Hard',
        dayDuration: 55,
        nightDuration: 80,
        enemySpeed: 10.8,
        spawnMultiplier: 1.28,
        damageMultiplier: 1.25,
        decayMultiplier: 1.26,
        emberMultiplier: 1.6
    }
};

const SKINS = {
    standard: { color: 0xf5f8ff, emissive: 0x26313a, roughness: 0.35, metalness: 0.2 },
    neon_drifter: { color: 0x77f2ff, emissive: 0x007ea2, roughness: 0.2, metalness: 0.45 },
    shadow_walker: { color: 0x43226f, emissive: 0x170a2d, roughness: 0.55, metalness: 0.35 },
    golden_guardian: { color: 0xffd24f, emissive: 0x6f4f00, roughness: 0.15, metalness: 0.9 }
};
const UPGRADE_IDS = new Set(['blue_flame', 'speed_boots', 'pulse_stabilizer', 'trap_kit', 'arc_bow', 'rail_quiver']);

const ELITE_MODIFIERS = {
    frenzy: {
        id: 'frenzy',
        label: 'Frenzied',
        hpMul: 1.05,
        speedMul: 1.28,
        damageMul: 1.2,
        incomingMult: 1,
        rewardBonus: 5,
        tint: 0xff965f
    },
    armored: {
        id: 'armored',
        label: 'Armored',
        hpMul: 1.55,
        speedMul: 0.9,
        damageMul: 1.05,
        incomingMult: 0.64,
        rewardBonus: 7,
        tint: 0x8fd6ff
    },
    volatile: {
        id: 'volatile',
        label: 'Volatile',
        hpMul: 1.08,
        speedMul: 1.02,
        damageMul: 1.15,
        incomingMult: 1,
        rewardBonus: 6,
        tint: 0xff6a8e
    },
    siphon: {
        id: 'siphon',
        label: 'Siphon',
        hpMul: 1.2,
        speedMul: 1,
        damageMul: 0.95,
        incomingMult: 0.85,
        rewardBonus: 6,
        tint: 0x9cffbf
    }
};

const ENEMY_ARCHETYPES = {
    wraith: {
        id: 'wraith',
        label: 'Wraith',
        hpMul: 1,
        speedMul: 1,
        damageMul: 1,
        sizeMul: 1,
        reward: 3,
        lightFear: 1
    },
    charger: {
        id: 'charger',
        label: 'Charger',
        hpMul: 0.85,
        speedMul: 1.28,
        damageMul: 1.22,
        sizeMul: 0.95,
        reward: 4,
        lightFear: 0.75
    },
    leech: {
        id: 'leech',
        label: 'Leech',
        hpMul: 1.55,
        speedMul: 0.86,
        damageMul: 0.78,
        sizeMul: 1.18,
        reward: 5,
        lightFear: 1.2
    },
    brute: {
        id: 'brute',
        label: 'Brute',
        hpMul: 2.2,
        speedMul: 0.73,
        damageMul: 1.5,
        sizeMul: 1.5,
        reward: 8,
        lightFear: 0.6
    },
    titan: {
        id: 'titan',
        label: 'Titan',
        hpMul: 5,
        speedMul: 0.58,
        damageMul: 2.1,
        sizeMul: 2.1,
        reward: 20,
        lightFear: 0.35
    }
};

const PERK_POOL = [
    { id: 'inferno_core', name: 'Inferno Core', desc: 'Fire radius +25% and fire decay reduced.' },
    { id: 'kinetic_loop', name: 'Kinetic Loop', desc: 'Dash cools faster and stamina recovers faster.' },
    { id: 'flare_matrix', name: 'Flare Matrix', desc: 'Flares are larger, longer, and cheaper.' },
    { id: 'overclock_pulse', name: 'Overclock Pulse', desc: 'Pulse blast hits harder and recharges faster.' },
    { id: 'hunter_engine', name: 'Hunter Engine', desc: 'Enemy kills heal you and grant bonus combo.' },
    { id: 'beacon_flux', name: 'Beacon Flux', desc: 'Igniting beacons gives bonus time and healing.' },
    { id: 'ember_drive', name: 'Ember Drive', desc: 'Momentum decays slower and pays more rewards.' },
    { id: 'guardian_shell', name: 'Guardian Shell', desc: 'Take less damage from darkness and enemies.' },
    { id: 'crystal_magnet', name: 'Crystal Magnet', desc: 'Gain more shards from harvest and kills.' },
    { id: 'trailblazer', name: 'Trailblazer', desc: 'Move faster and contract rewards improve.' }
];

const CRAFTING_RECIPES = [
    {
        id: 'map_kit',
        name: 'Survey Map',
        desc: 'Reveals chest signatures and doubles resource pings on radar.',
        costs: { wood: 8, shards: 3, embers: 0 }
    },
    {
        id: 'sundial',
        name: 'Sundial',
        desc: 'Extends each gather phase with additional daylight.',
        costs: { wood: 10, shards: 2, embers: 25 }
    },
    {
        id: 'radar_array',
        name: 'Radar Array',
        desc: 'Expands radar range and enemy tracking precision.',
        costs: { wood: 6, shards: 7, embers: 20 }
    },
    {
        id: 'lightning_rods',
        name: 'Lightning Rods',
        desc: 'Stabilizes storms and reduces weather-driven fire drain.',
        costs: { wood: 12, shards: 5, embers: 35 }
    },
    {
        id: 'weather_controller',
        name: 'Weather Controller',
        desc: 'Unlocks weather override pulses (V) to calm rain and wind.',
        costs: { wood: 14, shards: 8, embers: 50 }
    }
];

const DEPLOY_PORTALS = [
    { id: 'solo', label: 'Solo Rift', desc: 'Deploy alone into the forest.' },
    { id: 'allies', label: 'Allies Rift', desc: 'Multiplayer coming soon.' }
];

const RELIC_CATALOG = {
    cinder_charm: {
        id: 'cinder_charm',
        name: 'Cinder Charm',
        rarity: 'common',
        desc: 'Fire decay reduced and you start with extra wood.',
        weight: 1
    },
    scavenger_hook: {
        id: 'scavenger_hook',
        name: 'Scavenger Hook',
        rarity: 'common',
        desc: 'More shard finds and better enemy drop odds.',
        weight: 1
    },
    kinetic_gyro: {
        id: 'kinetic_gyro',
        name: 'Kinetic Gyro',
        rarity: 'rare',
        desc: 'Dash recovers faster and movement speed increases.',
        weight: 0.72
    },
    blood_resin: {
        id: 'blood_resin',
        name: 'Blood Resin',
        rarity: 'rare',
        desc: 'Kills heal slightly and incoming damage is reduced.',
        weight: 0.72
    },
    ember_crown: {
        id: 'ember_crown',
        name: 'Ember Crown',
        rarity: 'rare',
        desc: 'All ember gains and contract payouts are increased.',
        weight: 0.68
    },
    hunter_map: {
        id: 'hunter_map',
        name: 'Hunter Map',
        rarity: 'rare',
        desc: 'Momentum gains increase and combo decay slows down.',
        weight: 0.68
    },
    void_prism: {
        id: 'void_prism',
        name: 'Void Prism',
        rarity: 'epic',
        desc: 'Pulse blast becomes stronger and recharges faster.',
        weight: 0.38
    },
    phoenix_spool: {
        id: 'phoenix_spool',
        name: 'Phoenix Spool',
        rarity: 'epic',
        desc: 'Once per run, a dead fire auto-relights.',
        weight: 0.34
    }
};

const RELIC_IDS = new Set(Object.keys(RELIC_CATALOG));

const DAILY_CHALLENGE_TITLES = [
    'Ashen Gale',
    'Fracture Surge',
    'Nocturne Spiral',
    'Blight Pulse',
    'Hollow Tempest',
    'Cinder Eclipse',
    'Iron Dawn',
    'Stormwake'
];

const NEMESIS_NAMES = [
    'Vexclaw',
    'Ashmaw',
    'Nightscar',
    'Thorn Revenant',
    'Rift Stalker',
    'Cinder Warden',
    'Veil Hunter',
    'Dread Talon'
];

const NIGHT_EVENT_POOL = [
    {
        id: 'abyss_surge',
        label: 'Abyss Surge'
    },
    {
        id: 'elite_hunt',
        label: 'Elite Hunt'
    }
];

function pad2(v) {
    return String(v).padStart(2, '0');
}

function getTodayDateId() {
    const now = new Date();
    return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

function hashStringToSeed(text) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < text.length; i++) {
        h ^= text.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function seededHashFloat(seed, salt) {
    return (hashStringToSeed(`${seed}:${salt}`) >>> 0) / 4294967296;
}

function buildDailyChallenge(dateId) {
    const id = dateId || getTodayDateId();
    const seed = hashStringToSeed(`lumina_daily_${id}`);
    const title = DAILY_CHALLENGE_TITLES[Math.floor(seededHashFloat(seed, 'title') * DAILY_CHALLENGE_TITLES.length)];
    const fireDecayMult = 1.1 + seededHashFloat(seed, 'fire') * 0.28;
    const enemySpeedMult = 1.06 + seededHashFloat(seed, 'speed') * 0.25;
    const spawnMult = 1.05 + seededHashFloat(seed, 'spawn') * 0.25;
    const dayDurationMult = 0.84 + seededHashFloat(seed, 'daylen') * 0.16;
    const nightDurationMult = 1.08 + seededHashFloat(seed, 'nightlen') * 0.22;
    const emberMult = 1.35 + seededHashFloat(seed, 'ember') * 0.45;
    const startWoodOffset = Math.floor(seededHashFloat(seed, 'wood') * 3) - 1;
    const startShardOffset = seededHashFloat(seed, 'shard') > 0.58 ? 1 : 0;
    const startPush = seededHashFloat(seed, 'push') > 0.62 ? 1 : 0;

    return {
        id,
        seed,
        title,
        fireDecayMult,
        enemySpeedMult,
        spawnMult,
        dayDurationMult,
        nightDurationMult,
        emberMult,
        startWoodOffset,
        startShardOffset,
        startPush
    };
}

function createDefaultNemesisProfile() {
    return {
        name: NEMESIS_NAMES[Math.floor(Math.random() * NEMESIS_NAMES.length)],
        rank: 1,
        rage: 0,
        bounty: 0,
        encounters: 0,
        defeats: 0,
        kills: 0,
        lastOutcome: 'unknown',
        lastSeenDay: 0
    };
}

function normalizeNemesisProfile(raw) {
    const fallback = createDefaultNemesisProfile();
    if (!raw || typeof raw !== 'object') return fallback;

    const name = typeof raw.name === 'string' && raw.name.trim() ? raw.name.trim() : fallback.name;
    return {
        name,
        rank: clamp(Math.floor(Number(raw.rank) || fallback.rank), 1, CONFIG.NEMESIS_MAX_RANK),
        rage: clamp(Math.floor(Number(raw.rage) || 0), 0, 6),
        bounty: Math.max(0, Math.floor(Number(raw.bounty) || 0)),
        encounters: Math.max(0, Math.floor(Number(raw.encounters) || 0)),
        defeats: Math.max(0, Math.floor(Number(raw.defeats) || 0)),
        kills: Math.max(0, Math.floor(Number(raw.kills) || 0)),
        lastOutcome: typeof raw.lastOutcome === 'string' ? raw.lastOutcome : fallback.lastOutcome,
        lastSeenDay: Math.max(0, Math.floor(Number(raw.lastSeenDay) || 0))
    };
}

const CONTRACT_POOL = {
    GATHER: [
        { id: 'wood_haul', label: 'Collect wood', metric: 'woodCollected', base: 14, perDay: 2, reward: 30 },
        { id: 'shard_harvest', label: 'Collect shards', metric: 'shardsCollected', base: 6, perDay: 1, reward: 34 },
        { id: 'fuel_keeper', label: 'Feed the campfire', metric: 'fuelAdded', base: 4, perDay: 0.7, reward: 36 }
    ],
    SURVIVE: [
        { id: 'night_hunt', label: 'Eliminate wraiths', metric: 'enemiesKilled', base: 5, perDay: 1, reward: 40 },
        { id: 'beacon_chain', label: 'Ignite beacons', metric: 'beaconsIgnited', base: 2, perDay: 0.35, reward: 45 },
        { id: 'pulse_control', label: 'Use pulse blast', metric: 'pulseCasts', base: 2, perDay: 0.2, reward: 35 }
    ]
};

const BASE_RUN_MODS = Object.freeze({
    fireDecayMult: 1,
    fireRadiusMult: 1,
    dashCooldownMult: 1,
    staminaRecoveryMult: 1,
    flareRadiusMult: 1,
    flareDurationMult: 1,
    flareCostOffset: 0,
    pulseDamageMult: 1,
    pulseCooldownMult: 1,
    pulseRadiusMult: 1,
    damageTakenMult: 1,
    enemyDropBonus: 0,
    comboGainMult: 1,
    comboDecayMult: 1,
    beaconBonusTime: 0,
    beaconBonusHeal: 0,
    killHeal: 0,
    speedFlatBonus: 0,
    contractRewardMult: 1,
    emberGainMult: 1,
    shardNodeBonus: 0
});

const BASE_METRICS = Object.freeze({
    woodCollected: 0,
    shardsCollected: 0,
    beaconsIgnited: 0,
    enemiesKilled: 0,
    fuelAdded: 0,
    pulseCasts: 0,
    damageTaken: 0
});

const DEFAULT_SETTINGS = Object.freeze({
    masterVolume: 0.35,
    sfxEnabled: true,
    screenShakeScale: 1,
    reduceFlashes: false,
    showControlsHud: true
});

const DEFAULT_PROFILE = Object.freeze({
    totalRuns: 0,
    extracts: 0,
    defeats: 0,
    lossStreak: 0,
    bestDay: 0,
    recentDays: []
});

const BASE_RUN_ASSIST = Object.freeze({
    enemySpawnMult: 1,
    fireDecayMult: 1,
    emberGainMult: 1,
    startWoodBonus: 0,
    startShardBonus: 0,
    dropBonus: 0
});

const world = {
    renderer: null,
    scene: null,
    camera: null,
    canvas: null,
    dummy: new THREE.Object3D(),
    time: 0
};

const mats = {};
const WORLD_UP = new THREE.Vector3(0, 1, 0);
const TMP = {
    camForward: new THREE.Vector3(),
    camRight: new THREE.Vector3(),
    moveDir: new THREE.Vector3(),
    moveTarget: new THREE.Vector3(),
    pulsePush: new THREE.Vector3(),
    authPredPos: new THREE.Vector3(),
    authCorrection: new THREE.Vector3(),
    remotePredPos: new THREE.Vector3(),
    authEnemyPredPos: new THREE.Vector3()
};

const state = {
    started: false,
    paused: false,
    pauseReason: 'none',
    phase: 'PREPARE',
    day: 1,
    timeLeft: 0,
    wood: 0,
    shards: 0,
    health: 100,
    stamina: 100,
    embers: 0,
    highScore: 0,
    selectedDifficulty: 'normal',
    selectedMode: 'standard',
    activeMode: 'standard',
    partyMode: 'solo',
    activeChallengeId: '',
    equippedSkin: 'standard',
    inventory: {
        skins: ['standard'],
        upgrades: [],
        relics: []
    },
    challengeHistory: {},
    profile: { ...DEFAULT_PROFILE },
    guideSeen: false,
    gadgets: {
        map_kit: false,
        sundial: false,
        radar_array: false,
        lightning_rods: false,
        weather_controller: false
    },
    settings: { ...DEFAULT_SETTINGS },
    settingsResumeOnClose: false,
    craftingResumeOnClose: false,
    runAssist: { ...BASE_RUN_ASSIST },
    daily: buildDailyChallenge(getTodayDateId()),
    rng: {
        seeded: false,
        state: 0
    },
    nemesisProfile: createDefaultNemesisProfile(),
    nemesisRuntime: {
        spawnTimer: 0,
        spawned: false,
        resolved: false,
        killed: false
    },
    equippedRelics: [],
    fireRadius: CONFIG.FIRE_MAX_RADIUS * 0.58,
    fireOutTimer: CONFIG.FIRE_OUT_GRACE,
    fireCriticalWarned: false,
    pushStreak: 0,
    relicRuntime: {
        startWoodBonus: 0,
        startShardBonus: 0,
        phoenixReady: false
    },
    director: {
        intensity: 0.24,
        target: 0.24,
        reinforceTimer: 12,
        wavesSpawned: 0
    },
    beaconsLit: 0,
    nightBlend: 0,
    dashCooldown: 0,
    dashCooldownMax: CONFIG.DASH_COOLDOWN,
    pulseCooldown: 0,
    pulseCooldownMax: CONFIG.PULSE_BASE_COOLDOWN,
    boltCooldown: 0,
    boltCooldownMax: CONFIG.BOLT_FIRE_COOLDOWN,
    weatherControlCooldown: 0,
    weatherControlCooldownMax: CONFIG.WEATHER_CONTROL_COOLDOWN,
    playerHitCooldown: 0,
    ghostProximity: 0,
    playerFacing: 0,
    cameraHeading: 0,
    comboValue: 0,
    comboMultiplier: 1,
    comboHold: 0,
    chain: {
        count: 0,
        timer: 0,
        best: 0
    },
    overdrive: {
        active: false,
        timer: 0,
        cooldown: 0,
        activations: 0
    },
    nightEvent: {
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
        completedCount: 0,
        failedCount: 0
    },
    currentContract: null,
    score: 0,
    deployment: {
        awaitingChoice: false
    },
    ads: {
        busy: false,
        lastRewardedAt: 0,
        dailyDate: getTodayDateId(),
        dailyViews: 0,
        startBonusClaims: 0,
        perkRerollUsed: false,
        gameOverBasePayout: 0,
        gameOverBonus: 0,
        gameOverRewardClaimed: false
    },
    platform: {
        provider: 'web',
        crazygames: {
            ready: false,
            initInFlight: false,
            loadingActive: false,
            gameplayActive: false
        }
    },
    multiplayer: {
        supported: false,
        socket: null,
        connected: false,
        connecting: false,
        inRoom: false,
        roomCode: '',
        lastRoomCode: '',
        hostId: '',
        playerId: '',
        clientId: '',
        serverUrl: '',
        inputSeq: 0,
        pingMs: 0,
        players: [],
        status: 'Offline',
        sendAccumulator: 0,
        name: '',
        authoritative: {
            active: false,
            seed: '',
            localTargetPos: new THREE.Vector3(),
            localTargetRot: 0,
            actionQueue: {
                interact: 0,
                pulse: 0,
                shoot: 0,
                dash: 0,
                weather: 0,
                trap: 0,
                flare: 0,
                craft: 0
            },
            meshMaps: {
                wood: new Map(),
                shards: new Map(),
                chests: new Map(),
                enemies: new Map(),
                traps: new Map(),
                flares: new Map()
            }
        }
    },
    weapon: {
        crafted: false,
        ammo: 0
    },
    runPerks: [],
    runMods: { ...BASE_RUN_MODS },
    metrics: { ...BASE_METRICS },
    playerVelocity: new THREE.Vector3(),
    cameraTarget: new THREE.Vector3(0, 2, 0),
    keys: {},
    touchInput: {
        enabled: false,
        active: false,
        pointerId: -1,
        moveX: 0,
        moveY: 0,
        sprint: false
    },
    telemetry: {
        history: [],
        session: null
    },
    runtime: {
        dayDuration: DIFFICULTY.normal.dayDuration,
        nightDuration: DIFFICULTY.normal.nightDuration,
        enemySpeed: DIFFICULTY.normal.enemySpeed,
        spawnMultiplier: DIFFICULTY.normal.spawnMultiplier,
        damageMultiplier: DIFFICULTY.normal.damageMultiplier,
        decayMultiplier: DIFFICULTY.normal.decayMultiplier,
        emberMultiplier: DIFFICULTY.normal.emberMultiplier
    },
    weather: {
        rain: 0,
        targetRain: 0,
        fog: 0.002,
        targetFog: 0.002,
        wind: 0,
        targetWind: 0
    },
    vfx: {
        flashTimer: 0,
        flashColor: 'rgba(255,0,0,0.35)',
        screenShakeTimer: 0,
        screenShakeClassOn: false
    },
    timers: {
        phase: null
    },
    lastTime: 0,
    gameLoopId: 0,
    entities: {
        player: null,
        playerRig: null,
        campfire: null,
        campCore: null,
        terrain: null,
        sky: null,
        stars: null,
        rain: null,
        fireParticles: [],
        treeColliders: [],
        resources: {
            wood: [],
            shards: []
        },
        chests: [],
        craftingTable: null,
        deployHub: null,
        alliedSentinels: [],
        remotePlayers: {},
        beacons: [],
        enemies: [],
        activeFlares: [],
        activePulses: [],
        activeTraps: [],
        hazards: [],
        projectiles: [],
        emberOrbs: []
    }
};

const ui = {
    startScreen: null,
    shopScreen: null,
    gameOverScreen: null,
    day: null,
    phase: null,
    timer: null,
    timerCircle: null,
    wood: null,
    shard: null,
    beacon: null,
    embers: null,
    healthBar: null,
    staminaBar: null,
    dashBar: null,
    pulseBar: null,
    weaponStatus: null,
    boltCount: null,
    flareCount: null,
    comboBar: null,
    comboValue: null,
    objectiveText: null,
    contractText: null,
    relicText: null,
    interactionPrompt: null,
    interactionText: null,
    startBtn: null,
    rewardedEmbersBtn: null,
    restartBtn: null,
    gameOverRewardedBtn: null,
    gameOverEarned: null,
    gameOverTitle: null,
    gameOverMessage: null,
    openMultiplayerBtn: null,
    openShopBtn: null,
    closeShopBtn: null,
    quickShopBtn: null,
    settingsBtn: null,
    shopTabs: null,
    modeButtons: null,
    controlsHud: null,
    challengeBrief: null,
    perkScreen: null,
    perkTitle: null,
    perkOptions: null,
    perkSubtitle: null,
    relicList: null,
    relicEmpty: null,
    radarCanvas: null,
    radarCtx: null,
    eventFeed: null,
    highScore: null,
    skinName: null,
    screenEmbers: null,
    openSettingsStartBtn: null,
    openGuideBtn: null,
    guideScreen: null,
    guideCloseBtn: null,
    settingsScreen: null,
    closeSettingsBtn: null,
    applySettingsBtn: null,
    resetSettingsBtn: null,
    settingVolume: null,
    settingVolumeValue: null,
    settingScreenShake: null,
    settingScreenShakeValue: null,
    settingSfxEnabled: null,
    settingReduceFlash: null,
    settingShowControls: null,
    craftingScreen: null,
    craftingOptions: null,
    craftingSubtitle: null,
    closeCraftingBtn: null,
    multiplayerScreen: null,
    closeMultiplayerBtn: null,
    multiplayerStatus: null,
    mpNameInput: null,
    mpRoomInput: null,
    mpCreateBtn: null,
    mpJoinBtn: null,
    mpLeaveBtn: null,
    mpStartBtn: null,
    mpCopyCodeBtn: null,
    mpRoomDisplay: null,
    mpStartHint: null,
    mpRoster: null,
    touchControls: null,
    touchMovePad: null,
    touchStick: null,
    touchSprintBtn: null,
    touchDashBtn: null,
    touchPulseBtn: null,
    touchWeatherBtn: null,
    touchInteractBtn: null,
    touchShootBtn: null
};

const AudioManager = {
    ctx: null,
    master: null,
    initialized: false,

    init() {
        if (this.initialized) return;
        try {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            this.master = this.ctx.createGain();
            this.master.gain.value = clamp(state.settings.masterVolume, 0, 1);
            this.master.connect(this.ctx.destination);
            this.initialized = true;
        } catch (err) {
            console.warn('Audio unavailable:', err);
        }
    },

    setMasterVolume(value) {
        if (!this.initialized || !this.master) return;
        const safeValue = clamp(Number(value) || 0, 0, 1);
        this.master.gain.setValueAtTime(safeValue, this.ctx.currentTime);
    },

    pulse(freq, duration, type, gain) {
        if (!this.initialized) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        g.gain.setValueAtTime(gain, now);
        g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc.connect(g);
        g.connect(this.master);
        osc.start(now);
        osc.stop(now + duration);
    },

    play(name, intensity = 1) {
        if (!this.initialized || !state.settings.sfxEnabled) return;
        if (name === 'collect') {
            this.pulse(760 + Math.random() * 120, 0.1, 'triangle', 0.16 * intensity);
        } else if (name === 'shard') {
            this.pulse(980 + Math.random() * 180, 0.13, 'sine', 0.19 * intensity);
        } else if (name === 'fuel') {
            this.pulse(390, 0.2, 'sawtooth', 0.16 * intensity);
        } else if (name === 'damage') {
            this.pulse(140, 0.24, 'square', 0.26 * intensity);
        } else if (name === 'flare') {
            this.pulse(620, 0.22, 'triangle', 0.2 * intensity);
            this.pulse(900, 0.12, 'sine', 0.13 * intensity);
        } else if (name === 'dash') {
            this.pulse(340, 0.1, 'sawtooth', 0.14 * intensity);
        } else if (name === 'pulse') {
            this.pulse(240, 0.16, 'square', 0.22 * intensity);
            this.pulse(620, 0.24, 'triangle', 0.16 * intensity);
        } else if (name === 'shot') {
            this.pulse(760, 0.08, 'sawtooth', 0.15 * intensity);
            this.pulse(980, 0.06, 'triangle', 0.12 * intensity);
        } else if (name === 'hit') {
            this.pulse(300, 0.08, 'square', 0.11 * intensity);
            this.pulse(180, 0.1, 'triangle', 0.09 * intensity);
        } else if (name === 'night') {
            this.pulse(180, 0.6, 'triangle', 0.17 * intensity);
        } else if (name === 'day') {
            this.pulse(620, 0.35, 'sine', 0.16 * intensity);
        } else if (name === 'beacon') {
            this.pulse(520, 0.28, 'triangle', 0.18 * intensity);
            this.pulse(790, 0.18, 'sine', 0.12 * intensity);
        } else if (name === 'perk') {
            this.pulse(500, 0.22, 'triangle', 0.15 * intensity);
            this.pulse(880, 0.18, 'sine', 0.14 * intensity);
        }
    }
};

function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function smoothStep(value) {
    const t = clamp(value, 0, 1);
    return t * t * (3 - 2 * t);
}

function wrapAngle(angle) {
    let a = angle;
    while (a <= -Math.PI) a += Math.PI * 2;
    while (a > Math.PI) a -= Math.PI * 2;
    return a;
}

function lerpAngle(a, b, t) {
    const delta = wrapAngle(b - a);
    return wrapAngle(a + delta * t);
}

function normalizeSettings(raw) {
    const source = raw && typeof raw === 'object' ? raw : {};

    const volumeRaw = Number(source.masterVolume);
    const shakeRaw = Number(source.screenShakeScale);

    return {
        masterVolume: Number.isFinite(volumeRaw) ? clamp(volumeRaw, 0, 1) : DEFAULT_SETTINGS.masterVolume,
        sfxEnabled: source.sfxEnabled === undefined ? DEFAULT_SETTINGS.sfxEnabled : !!source.sfxEnabled,
        screenShakeScale: Number.isFinite(shakeRaw) ? clamp(shakeRaw, 0, 1) : DEFAULT_SETTINGS.screenShakeScale,
        reduceFlashes: source.reduceFlashes === undefined ? DEFAULT_SETTINGS.reduceFlashes : !!source.reduceFlashes,
        showControlsHud: source.showControlsHud === undefined ? DEFAULT_SETTINGS.showControlsHud : !!source.showControlsHud
    };
}

function normalizeProfile(raw) {
    const source = raw && typeof raw === 'object' ? raw : {};
    const recentRaw = Array.isArray(source.recentDays) ? source.recentDays : [];

    return {
        totalRuns: Math.max(0, Math.floor(Number(source.totalRuns) || 0)),
        extracts: Math.max(0, Math.floor(Number(source.extracts) || 0)),
        defeats: Math.max(0, Math.floor(Number(source.defeats) || 0)),
        lossStreak: Math.max(0, Math.floor(Number(source.lossStreak) || 0)),
        bestDay: Math.max(0, Math.floor(Number(source.bestDay) || 0)),
        recentDays: recentRaw
            .map((v) => Math.max(0, Math.floor(Number(v) || 0)))
            .filter((v) => Number.isFinite(v))
            .slice(-8)
    };
}

function getRecentAverageDay(profile = state.profile) {
    const days = Array.isArray(profile.recentDays) ? profile.recentDays : [];
    if (days.length === 0) return 0;
    const sum = days.reduce((acc, v) => acc + v, 0);
    return sum / days.length;
}

function computeRunAssist() {
    const profile = normalizeProfile(state.profile);
    const lossPressure = clamp((profile.lossStreak - 1) * 0.09, 0, CONFIG.ASSIST_MAX);
    const avgRecent = getRecentAverageDay(profile);
    const veteranPressure = clamp((avgRecent - 5.5) * 0.03, 0, 0.16);
    let assist = clamp(lossPressure - veteranPressure * 0.55, 0, CONFIG.ASSIST_MAX);

    if (state.selectedDifficulty === 'easy') assist = clamp(assist + 0.04, 0, CONFIG.ASSIST_MAX);
    if (state.activeMode === 'daily') assist *= 0.62;

    const veteranBoost = clamp(veteranPressure + Math.max(0, state.pushStreak - 1) * 0.02, 0, 0.22);

    return {
        enemySpawnMult: clamp(1 - assist * 0.55 + veteranBoost * 0.2, 0.72, 1.22),
        fireDecayMult: clamp(1 - assist * 0.48 + veteranBoost * 0.16, 0.7, 1.18),
        emberGainMult: clamp(1 + assist * 0.4 + veteranBoost * 0.45, 0.9, 1.35),
        startWoodBonus: Math.min(3, Math.floor(assist * 8)),
        startShardBonus: Math.min(2, Math.floor(assist * 5)),
        dropBonus: clamp(assist * 0.16, 0, 0.06)
    };
}

function createTelemetrySession() {
    return {
        id: `${Date.now().toString(36)}_${Math.floor(Math.random() * 1e6).toString(36)}`,
        startedAt: Date.now(),
        startPerf: performance.now(),
        mode: state.activeMode,
        party: state.partyMode,
        difficulty: state.selectedDifficulty,
        events: []
    };
}

function trackTelemetry(type, payload = {}) {
    const session = state.telemetry.session;
    if (!session) return;

    const event = {
        type,
        t: Number(((performance.now() - session.startPerf) / 1000).toFixed(2)),
        ...payload
    };

    session.events.push(event);
    if (session.events.length > CONFIG.TELEMETRY_EVENT_LIMIT) {
        session.events.shift();
    }
}

function finalizeTelemetrySession(extra = {}) {
    const session = state.telemetry.session;
    if (!session) return;

    const duration = Math.max(0, Math.round((performance.now() - session.startPerf) / 1000));
    const summary = {
        id: session.id,
        startedAt: session.startedAt,
        duration,
        mode: session.mode,
        party: session.party,
        difficulty: session.difficulty,
        day: state.day,
        score: Math.floor(state.score),
        result: extra.result || 'unknown',
        reason: extra.reason || '',
        events: session.events.slice(-20)
    };

    state.telemetry.history.unshift(summary);
    if (state.telemetry.history.length > CONFIG.TELEMETRY_HISTORY_LIMIT) {
        state.telemetry.history.length = CONFIG.TELEMETRY_HISTORY_LIMIT;
    }

    state.telemetry.session = null;
}

function setRunSeed(seed) {
    const s = (Number(seed) >>> 0) || 1;
    state.rng.seeded = true;
    state.rng.state = s;
}

function clearRunSeed() {
    state.rng.seeded = false;
    state.rng.state = 0;
}

function random() {
    if (!state.rng.seeded) return Math.random();
    state.rng.state = (Math.imul(state.rng.state, 1664525) + 1013904223) >>> 0;
    return state.rng.state / 4294967296;
}

function rand(min, max) {
    return min + random() * (max - min);
}

function terrainHeight(x, z) {
    const waveA = Math.sin(x * 0.022) * 4.2;
    const waveB = Math.cos(z * 0.019) * 3.8;
    const cross = Math.sin((x + z) * 0.012) * 2.4;
    const basin = Math.sin(Math.hypot(x, z) * 0.028) * 1.3;
    const centerFlatten = Math.exp(-Math.hypot(x, z) * 0.03) * -3.5;
    return waveA + waveB + cross + basin + centerFlatten;
}

function inBounds(x, z, margin = 0) {
    const half = CONFIG.WORLD_SIZE * 0.5 - margin;
    return Math.abs(x) <= half && Math.abs(z) <= half;
}

function dist2(ax, az, bx, bz) {
    const dx = ax - bx;
    const dz = az - bz;
    return Math.hypot(dx, dz);
}

function hasGadget(id) {
    return !!(state.gadgets && state.gadgets[id]);
}

function getRadarRange() {
    let range = CONFIG.RADAR_RANGE;
    if (hasGadget('radar_array')) range += 55;
    if (hasUpgrade('hunter_map')) range += 16;
    return range;
}

function getRecipeById(id) {
    return CRAFTING_RECIPES.find((entry) => entry.id === id) || null;
}

function hasRecipeResources(recipe) {
    if (!recipe) return false;
    const costs = recipe.costs || {};
    return state.wood >= (costs.wood || 0)
        && state.shards >= (costs.shards || 0)
        && state.embers >= (costs.embers || 0);
}

function sanitizePlayerName(input) {
    const cleaned = String(input || '').replace(/\s+/g, ' ').trim();
    if (!cleaned) return 'Ranger';
    return cleaned.slice(0, 20);
}

function getStoredMultiplayerName() {
    try {
        const cached = localStorage.getItem(CONFIG.MULTIPLAYER_NAME_KEY);
        if (cached) return sanitizePlayerName(cached);
    } catch (err) {
        console.warn('Unable to read multiplayer name cache:', err);
    }
    return `Ranger${Math.floor(rand(100, 999))}`;
}

function saveStoredMultiplayerName(name) {
    try {
        localStorage.setItem(CONFIG.MULTIPLAYER_NAME_KEY, sanitizePlayerName(name));
    } catch (err) {
        console.warn('Unable to save multiplayer name cache:', err);
    }
}

function generateMultiplayerClientId() {
    const randA = Math.floor(Math.random() * 1e9).toString(36);
    const randB = Math.floor(Math.random() * 1e9).toString(36);
    const ts = Date.now().toString(36);
    return `c_${ts}_${randA}${randB}`.slice(0, 48);
}

function getStoredMultiplayerClientId() {
    try {
        const cached = localStorage.getItem(CONFIG.MULTIPLAYER_CLIENT_ID_KEY);
        if (cached && /^[a-zA-Z0-9_-]{8,48}$/.test(cached)) {
            return cached;
        }
    } catch (err) {
        console.warn('Unable to read multiplayer client id cache:', err);
    }
    const created = generateMultiplayerClientId();
    try {
        localStorage.setItem(CONFIG.MULTIPLAYER_CLIENT_ID_KEY, created);
    } catch (err) {
        console.warn('Unable to persist multiplayer client id cache:', err);
    }
    return created;
}

function sanitizeMultiplayerServerUrl(raw) {
    if (typeof window === 'undefined') return '';
    const value = String(raw || '').trim();
    if (!value) return '';

    const lowered = value.toLowerCase();
    if (lowered === 'same-origin' || lowered === 'origin' || lowered === 'same_origin') {
        return '';
    }

    let candidate = value;
    if (candidate.startsWith('//')) {
        candidate = `${window.location.protocol}${candidate}`;
    } else if (!/^https?:\/\//i.test(candidate) && /^[a-z0-9.-]+(?::\d+)?$/i.test(candidate)) {
        const useHttp = /^localhost(?::\d+)?$/i.test(candidate) || /^127\.0\.0\.1(?::\d+)?$/i.test(candidate);
        candidate = `${useHttp ? 'http' : 'https'}://${candidate}`;
    }

    try {
        const parsed = new URL(candidate, window.location.origin);
        if (!/^https?:$/i.test(parsed.protocol)) return '';
        return parsed.origin;
    } catch (err) {
        console.warn('Ignoring invalid multiplayer server URL:', err);
        return '';
    }
}

function getConfiguredMultiplayerServerUrl() {
    if (typeof window === 'undefined') return '';
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('mp') || params.get('multiplayer') || '';
    const fromGlobal = typeof window.LUMINA_MULTIPLAYER_URL === 'string' ? window.LUMINA_MULTIPLAYER_URL : '';
    const metaNode = document.querySelector('meta[name="lumina-mp-url"]');
    const fromMeta = metaNode ? metaNode.getAttribute('content') || '' : '';
    return sanitizeMultiplayerServerUrl(fromQuery || fromGlobal || fromMeta);
}

function setMultiplayerStatus(message, kind = '') {
    state.multiplayer.status = String(message || '');
    if (!ui.multiplayerStatus) return;
    ui.multiplayerStatus.textContent = state.multiplayer.status || 'Idle';
    ui.multiplayerStatus.classList.remove('warn', 'danger');
    if (kind === 'warn' || kind === 'danger') {
        ui.multiplayerStatus.classList.add(kind);
    }
}

function getCrazyGamesSdk() {
    if (typeof window === 'undefined') return null;
    const sdkRoot = window.CrazyGames && window.CrazyGames.SDK;
    return sdkRoot || null;
}

function shouldAttemptCrazyGamesSdk() {
    if (typeof window === 'undefined') return false;
    if (window.CrazyGames && window.CrazyGames.SDK) return true;
    const host = String(window.location.hostname || '').toLowerCase();
    if (host.endsWith('.crazygames.com') || host === 'crazygames.com') return true;
    try {
        const params = new URLSearchParams(window.location.search);
        return params.get('cg_sdk') === '1';
    } catch (_err) {
        return false;
    }
}

function loadCrazyGamesSdkScript() {
    if (typeof document === 'undefined') return Promise.resolve(false);
    if (getCrazyGamesSdk()) return Promise.resolve(true);

    const existing = document.querySelector(`script[src="${CRAZYGAMES_SDK_URL}"]`);
    if (existing) {
        return new Promise((resolve) => {
            const done = () => resolve(!!getCrazyGamesSdk());
            existing.addEventListener('load', done, { once: true });
            existing.addEventListener('error', () => resolve(false), { once: true });
            setTimeout(done, PLATFORM_SDK_INIT_TIMEOUT_MS);
        });
    }

    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = CRAZYGAMES_SDK_URL;
        script.async = true;
        script.onload = () => resolve(!!getCrazyGamesSdk());
        script.onerror = () => resolve(false);
        document.head.appendChild(script);
    });
}

async function initPlatformSdk() {
    if (state.platform.crazygames.ready || state.platform.crazygames.initInFlight) return;
    if (!shouldAttemptCrazyGamesSdk()) return;

    state.platform.crazygames.initInFlight = true;
    try {
        if (!getCrazyGamesSdk()) {
            const loaded = await loadCrazyGamesSdkScript();
            if (!loaded) throw new Error('CrazyGames SDK script unavailable');
        }
        const sdk = getCrazyGamesSdk();
        if (!sdk) throw new Error('CrazyGames SDK missing after load');

        if (typeof sdk.init === 'function') {
            const initPromise = Promise.resolve().then(() => sdk.init());
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('CrazyGames SDK init timeout')), PLATFORM_SDK_INIT_TIMEOUT_MS);
            });
            await Promise.race([initPromise, timeoutPromise]);
        }
        state.platform.crazygames.ready = true;
        state.platform.provider = 'crazygames';
    } catch (err) {
        console.warn('CrazyGames SDK init failed:', err);
        state.platform.crazygames.ready = false;
        state.platform.provider = 'web';
    } finally {
        state.platform.crazygames.initInFlight = false;
    }
}

function notifyPlatformLoadingStart() {
    const sdk = getCrazyGamesSdk();
    if (!sdk || !state.platform.crazygames.ready || state.platform.crazygames.loadingActive) return;
    const gameModule = sdk.game;
    if (!gameModule || typeof gameModule.loadingStart !== 'function') return;

    try {
        gameModule.loadingStart();
        state.platform.crazygames.loadingActive = true;
    } catch (err) {
        console.warn('CrazyGames loadingStart failed:', err);
    }
}

function notifyPlatformLoadingStop() {
    const sdk = getCrazyGamesSdk();
    if (!sdk || !state.platform.crazygames.ready || !state.platform.crazygames.loadingActive) return;
    const gameModule = sdk.game;
    if (!gameModule || typeof gameModule.loadingStop !== 'function') return;

    try {
        gameModule.loadingStop();
    } catch (err) {
        console.warn('CrazyGames loadingStop failed:', err);
    } finally {
        state.platform.crazygames.loadingActive = false;
    }
}

function notifyPlatformGameplayStart() {
    const sdk = getCrazyGamesSdk();
    if (!sdk || !state.platform.crazygames.ready || state.platform.crazygames.gameplayActive) return;
    const gameModule = sdk.game;
    if (!gameModule || typeof gameModule.gameplayStart !== 'function') return;

    try {
        gameModule.gameplayStart();
        state.platform.crazygames.gameplayActive = true;
    } catch (err) {
        console.warn('CrazyGames gameplayStart failed:', err);
    }
}

function notifyPlatformGameplayStop() {
    const sdk = getCrazyGamesSdk();
    if (!sdk || !state.platform.crazygames.ready || !state.platform.crazygames.gameplayActive) return;
    const gameModule = sdk.game;
    if (!gameModule || typeof gameModule.gameplayStop !== 'function') return;

    try {
        gameModule.gameplayStop();
    } catch (err) {
        console.warn('CrazyGames gameplayStop failed:', err);
    } finally {
        state.platform.crazygames.gameplayActive = false;
    }
}

function isRewardedAdsEnabled() {
    if (typeof window === 'undefined') return MONETIZATION.REWARDED_DEFAULT_ENABLED;
    if (window.LUMINA_ADS_FORCE_OFF === true) return false;
    if (window.LUMINA_ADS_FORCE_ON === true) return true;
    try {
        const params = new URLSearchParams(window.location.search);
        const adsFlag = params.get('ads');
        if (adsFlag === '0') return false;
        if (adsFlag === '1') return true;
    } catch (_err) {
        // Ignore URL parse errors and fall back to environment defaults.
    }
    return shouldAttemptCrazyGamesSdk() || MONETIZATION.REWARDED_DEFAULT_ENABLED;
}

function isRewardedAdsTestMode() {
    if (typeof window === 'undefined') return false;
    if (window.LUMINA_ADS_TEST === true) return true;
    try {
        const params = new URLSearchParams(window.location.search);
        return params.get('ads_test') === '1';
    } catch (_err) {
        return false;
    }
}

function getRewardedBridge() {
    if (typeof window === 'undefined') return null;
    const bridge = window.LUMINA_ADS;
    if (!bridge || typeof bridge.showRewarded !== 'function') return null;
    return bridge;
}

function isRewardedProviderAvailable() {
    if (isRewardedAdsTestMode()) return true;
    const bridge = getRewardedBridge();
    if (!bridge) return false;
    if (typeof bridge.isAvailable === 'function') {
        try {
            return !!bridge.isAvailable();
        } catch (_err) {
            return false;
        }
    }
    return true;
}

function ensureRewardedDailyState() {
    const today = getTodayDateId();
    if (state.ads.dailyDate === today) return;
    state.ads.dailyDate = today;
    state.ads.dailyViews = 0;
    state.ads.startBonusClaims = 0;
    state.ads.perkRerollUsed = false;
}

function canRequestRewardedAd(placement) {
    if (!isRewardedAdsEnabled()) return false;
    if (!isRewardedProviderAvailable()) return false;
    ensureRewardedDailyState();
    if (state.ads.busy) return false;
    if (Date.now() - state.ads.lastRewardedAt < MONETIZATION.REWARDED_COOLDOWN_MS) return false;
    if (state.ads.dailyViews >= MONETIZATION.REWARDED_DAILY_CAP) return false;
    if (placement === 'start_bonus' && state.ads.startBonusClaims >= MONETIZATION.START_BONUS_DAILY_CAP) return false;
    if (placement === 'perk_reroll' && state.ads.perkRerollUsed) return false;
    if (placement === 'game_over_bonus' && state.ads.gameOverRewardClaimed) return false;
    return true;
}

async function requestRewardedAd(placement, opts = {}) {
    if (!canRequestRewardedAd(placement)) {
        if (!isRewardedProviderAvailable()) {
            pushFeed('Rewarded provider not configured yet.', 'warn');
        }
        if (opts.warnOnBlock) {
            pushFeed(opts.warnOnBlock, 'warn');
        }
        updateRewardedOfferUI();
        return false;
    }

    state.ads.busy = true;
    updateRewardedOfferUI();
    trackTelemetry('rewarded_start', { placement });
    if (opts.startFeed) pushFeed(opts.startFeed, 'info');

    let granted = false;
    try {
        const bridge = getRewardedBridge();

        if (bridge) {
            const result = await Promise.resolve(bridge.showRewarded({ placement }));
            granted = !!result;
        } else if (isRewardedAdsTestMode()) {
            await new Promise((resolve) => setTimeout(resolve, 1800));
            granted = true;
        } else {
            pushFeed('Rewarded ads unavailable on this build.', 'warn');
        }
    } catch (err) {
        console.warn(`Rewarded ad failed (${placement}):`, err);
        pushFeed('Rewarded ad failed to load. Try again.', 'warn');
    } finally {
        state.ads.busy = false;
        state.ads.lastRewardedAt = Date.now();
    }

    if (!granted) {
        trackTelemetry('rewarded_end', { placement, granted: 0 });
        updateRewardedOfferUI();
        return false;
    }

    state.ads.dailyViews += 1;
    trackTelemetry('rewarded_end', {
        placement,
        granted: 1,
        dailyViews: state.ads.dailyViews
    });
    saveProgress();
    updateRewardedOfferUI();
    return true;
}

function updateRewardedOfferUI() {
    ensureRewardedDailyState();
    const rewardedEnabled = isRewardedAdsEnabled();
    const providerReady = isRewardedProviderAvailable();

    if (ui.rewardedEmbersBtn) {
        ui.rewardedEmbersBtn.style.display = rewardedEnabled ? '' : 'none';
        if (!rewardedEnabled) {
            ui.rewardedEmbersBtn.disabled = true;
        }
    }
    if (ui.gameOverRewardedBtn) {
        ui.gameOverRewardedBtn.style.display = rewardedEnabled ? '' : 'none';
        if (!rewardedEnabled) {
            ui.gameOverRewardedBtn.disabled = true;
        }
    }

    if (!rewardedEnabled) return;

    if (ui.rewardedEmbersBtn) {
        const viewsLeft = Math.max(0, MONETIZATION.REWARDED_DAILY_CAP - state.ads.dailyViews);
        const claimsLeft = Math.max(0, MONETIZATION.START_BONUS_DAILY_CAP - state.ads.startBonusClaims);
        const capped = !providerReady || viewsLeft <= 0 || claimsLeft <= 0;
        ui.rewardedEmbersBtn.disabled = state.ads.busy || capped;
        if (state.ads.busy) {
            ui.rewardedEmbersBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> AD IN PROGRESS...';
        } else if (!providerReady) {
            ui.rewardedEmbersBtn.innerHTML = '<i class="fa-solid fa-ban"></i> REWARDED ADS OFFLINE';
        } else if (capped) {
            ui.rewardedEmbersBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> DAILY BONUS CLAIMED';
        } else {
            ui.rewardedEmbersBtn.innerHTML = `<i class="fa-solid fa-circle-play"></i> WATCH AD +${MONETIZATION.START_BONUS_EMBERS} EMBERS (${claimsLeft} LEFT)`;
        }
    }

    if (ui.gameOverRewardedBtn) {
        const capped = state.ads.dailyViews >= MONETIZATION.REWARDED_DAILY_CAP;
        const eligible = state.ads.gameOverBasePayout > 0 && !state.ads.gameOverRewardClaimed;
        ui.gameOverRewardedBtn.disabled = state.ads.busy || capped || !eligible || !providerReady;
        if (!eligible && state.ads.gameOverRewardClaimed) {
            ui.gameOverRewardedBtn.innerHTML = `<i class="fa-solid fa-check"></i> BONUS CLAIMED +${state.ads.gameOverBonus}`;
        } else if (!providerReady) {
            ui.gameOverRewardedBtn.innerHTML = '<i class="fa-solid fa-ban"></i> REWARDED ADS OFFLINE';
        } else if (!eligible) {
            ui.gameOverRewardedBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i> WATCH AD: +50% EMBERS';
        } else if (state.ads.busy) {
            ui.gameOverRewardedBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> AD IN PROGRESS...';
        } else if (capped) {
            ui.gameOverRewardedBtn.innerHTML = '<i class="fa-solid fa-ban"></i> DAILY AD LIMIT REACHED';
        } else {
            ui.gameOverRewardedBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i> WATCH AD: +50% EMBERS';
        }
    }
}

async function claimStartBonusReward() {
    const granted = await requestRewardedAd('start_bonus', {
        startFeed: 'Playing sponsored reward clip...',
        warnOnBlock: 'Rewarded bonus unavailable right now.'
    });
    if (!granted) return;

    const amount = MONETIZATION.START_BONUS_EMBERS;
    state.ads.startBonusClaims += 1;
    state.embers += amount;
    saveProgress();
    updateShopButtons();
    updateHUD();
    updateRewardedOfferUI();
    pushFeed(`Sponsored reward: +${amount} embers.`, 'info');
}

async function claimGameOverRewardBonus() {
    if (state.phase !== 'GAME_OVER') return;
    if (state.ads.gameOverRewardClaimed) return;
    if (state.ads.gameOverBasePayout <= 0) return;

    const granted = await requestRewardedAd('game_over_bonus', {
        startFeed: 'Playing sponsored reward clip...',
        warnOnBlock: 'Rewarded bonus unavailable right now.'
    });
    if (!granted) return;

    const bonus = Math.max(1, Math.floor(state.ads.gameOverBasePayout * MONETIZATION.GAME_OVER_BONUS_MULT));
    state.ads.gameOverRewardClaimed = true;
    state.ads.gameOverBonus = bonus;
    state.embers += bonus;

    if (ui.gameOverEarned) {
        ui.gameOverEarned.textContent = String(state.ads.gameOverBasePayout + bonus);
    }

    saveProgress();
    updateShopButtons();
    updateHUD();
    updateRewardedOfferUI();
    pushFeed(`Rewarded boost secured: +${bonus} embers.`, 'info');
}

async function claimPerkRerollReward() {
    if (!state.paused || state.pauseReason !== 'perk') return;
    if (!ui.perkTitle || ui.perkTitle.textContent !== 'CHOOSE AUGMENT') return;
    if (state.ads.perkRerollUsed) return;

    const granted = await requestRewardedAd('perk_reroll', {
        startFeed: 'Loading rewarded reroll...',
        warnOnBlock: 'Reroll not available right now.'
    });
    if (!granted) return;

    state.ads.perkRerollUsed = true;
    pushFeed('Rewarded reroll unlocked. New augment options loaded.', 'info');
    showPerkDraft({ fromRewardedReroll: true });
}

function isMultiplayerEnabled() {
    return MULTIPLAYER_ENABLED;
}

function notifyMultiplayerDisabled() {
    const now = (typeof performance !== 'undefined' && typeof performance.now === 'function')
        ? performance.now()
        : Date.now();
    if (now - lastMultiplayerDisabledNoticeAt < 850) return;
    lastMultiplayerDisabledNoticeAt = now;
    setMultiplayerStatus(MULTIPLAYER_DISABLED_MESSAGE, 'warn');
    pushFeed(MULTIPLAYER_DISABLED_MESSAGE, 'warn');
}

function isMultiplayerHost() {
    return !!(state.multiplayer.inRoom && state.multiplayer.playerId && state.multiplayer.playerId === state.multiplayer.hostId);
}

function isRealMultiplayerSession() {
    return !!(state.multiplayer.inRoom
        && state.multiplayer.connected
        && Array.isArray(state.multiplayer.players)
        && state.multiplayer.players.length > 1
        && state.partyMode === 'allies');
}

function netRound(v, digits = 3) {
    const factor = Math.pow(10, digits);
    return Math.round(v * factor) / factor;
}

function isAuthoritativeCoopActive() {
    return !!(state.multiplayer
        && state.multiplayer.authoritative
        && state.multiplayer.authoritative.active
        && state.started
        && state.phase !== 'DEPLOY'
        && state.phase !== 'GAME_OVER');
}

function resetAuthoritativeActionQueue() {
    const queue = state.multiplayer.authoritative.actionQueue;
    if (!queue) return;
    queue.interact = 0;
    queue.pulse = 0;
    queue.shoot = 0;
    queue.dash = 0;
    queue.weather = 0;
    queue.trap = 0;
    queue.flare = 0;
    queue.craft = 0;
}

function queueAuthoritativeAction(action, count = 1) {
    if (!isAuthoritativeCoopActive()) return;
    const queue = state.multiplayer.authoritative.actionQueue;
    if (!queue || !Object.prototype.hasOwnProperty.call(queue, action)) return;
    queue[action] = clamp((queue[action] || 0) + Math.max(1, Math.floor(count)), 0, 4);
}

function takeAuthoritativeActions() {
    const queue = state.multiplayer.authoritative.actionQueue;
    const out = {
        interact: queue.interact || 0,
        pulse: queue.pulse || 0,
        shoot: queue.shoot || 0,
        dash: queue.dash || 0,
        weather: queue.weather || 0,
        trap: queue.trap || 0,
        flare: queue.flare || 0,
        craft: queue.craft || 0
    };
    resetAuthoritativeActionQueue();
    return out;
}

function disposeMeshDeep(mesh) {
    if (!mesh) return;
    if (mesh.traverse) {
        mesh.traverse((node) => {
            if (node && node.isMesh) {
                if (node.geometry) node.geometry.dispose();
                if (node.material) {
                    if (Array.isArray(node.material)) {
                        node.material.forEach((mat) => mat && mat.dispose && mat.dispose());
                    } else if (node.material.dispose) {
                        node.material.dispose();
                    }
                }
            }
        });
    }
    if (mesh.parent) mesh.parent.remove(mesh);
}

function clearAuthoritativeWorldMeshes() {
    const maps = state.multiplayer.authoritative.meshMaps;
    ['wood', 'shards', 'chests', 'enemies', 'traps', 'flares'].forEach((key) => {
        const map = maps[key];
        if (!map) return;
        map.forEach((entry) => {
            if (!entry) return;
            disposeMeshDeep(entry.mesh || entry.group || null);
        });
        map.clear();
    });
    state.entities.resources.wood.length = 0;
    state.entities.resources.shards.length = 0;
    state.entities.chests.length = 0;
    state.entities.enemies.length = 0;
}

function createAuthoritativeResourceMesh(kind, id) {
    const isWood = kind === 'wood';
    const mesh = new THREE.Mesh(
        isWood
            ? new THREE.CylinderGeometry(0.1, 0.1, 1.15, 8)
            : new THREE.OctahedronGeometry(0.34, 0),
        new THREE.MeshStandardMaterial({
            color: isWood ? 0x8f6b45 : 0x77d7ff,
            emissive: isWood ? 0x2a1b0f : 0x234a66,
            emissiveIntensity: isWood ? 0.2 : 0.55,
            roughness: isWood ? 0.82 : 0.28,
            metalness: isWood ? 0.08 : 0.62
        })
    );
    mesh.castShadow = isWood;
    mesh.receiveShadow = isWood;
    mesh.userData.authoritativeId = `${kind}_${id}`;
    world.scene.add(mesh);
    return { id, mesh, active: true };
}

function createAuthoritativeChestMesh(id) {
    const group = new THREE.Group();
    const base = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.62, 0.86),
        new THREE.MeshStandardMaterial({
            color: 0x72472c,
            roughness: 0.8,
            metalness: 0.12
        })
    );
    base.position.y = 0.34;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 0.78, -0.38);
    group.add(lidPivot);

    const lid = new THREE.Mesh(
        new THREE.BoxGeometry(1.24, 0.34, 0.9),
        new THREE.MeshStandardMaterial({
            color: 0x94643c,
            roughness: 0.74,
            metalness: 0.14
        })
    );
    lid.position.set(0, 0, 0.38);
    lid.castShadow = true;
    lid.receiveShadow = true;
    lidPivot.add(lid);

    const marker = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.2, 0),
        new THREE.MeshBasicMaterial({
            color: 0xffd48a,
            transparent: true,
            opacity: 0.85
        })
    );
    marker.position.set(0, 1.15, 0);
    group.add(marker);

    const statusLight = new THREE.PointLight(0xffbe70, 0.55, 8, 2);
    statusLight.position.set(0, 1.05, 0);
    group.add(statusLight);

    world.scene.add(group);
    return {
        id,
        mesh: group,
        base,
        lidPivot,
        marker,
        statusLight,
        opened: false,
        pulseOffset: id * 0.37
    };
}

function createAuthoritativeEnemyMesh(id, type = 'wraith', opts = {}) {
    const nemesis = !!opts.nemesis;
    const elite = !!opts.elite;
    const color = nemesis
        ? 0xffbd73
        : type === 'charger'
            ? 0xff9668
            : type === 'leech'
                ? 0x9eff8b
                : type === 'brute'
                    ? 0xff6fc8
                    : type === 'titan'
                        ? 0xffcf7a
                        : 0xff6d7e;
    const emissive = nemesis
        ? 0x8c3508
        : type === 'charger'
            ? 0x69210d
            : type === 'leech'
                ? 0x1c4e17
                : type === 'brute'
                    ? 0x4a1837
                    : type === 'titan'
                        ? 0x713000
                        : 0x4f1321;
    const size = (type === 'titan' ? 1.16 : type === 'brute' ? 0.92 : type === 'leech' ? 0.74 : type === 'charger' ? 0.66 : 0.62)
        + (elite ? 0.06 : 0)
        + (nemesis ? 0.12 : 0);

    const mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(size, 1),
        new THREE.MeshStandardMaterial({
            color,
            emissive,
            emissiveIntensity: nemesis ? 2 : elite ? 1.75 : 1.5,
            roughness: 0.28,
            metalness: 0.35
        })
    );
    mesh.castShadow = true;
    world.scene.add(mesh);
    return {
        id,
        type,
        mesh,
        targetPos: mesh.position.clone(),
        velocity: new THREE.Vector3(),
        targetRot: mesh.rotation.y,
        lastStateAt: 0,
        hp: 100,
        maxHp: 100,
        elite,
        nemesis,
        modifierId: String(opts.modifierId || '')
    };
}

function syncAuthoritativeResourceCollection(kind, nodes) {
    const key = kind === 'wood' ? 'wood' : 'shards';
    const map = state.multiplayer.authoritative.meshMaps[key];
    const seen = new Set();

    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const id = Number(node.id) || i + 1;
        seen.add(id);
        let entry = map.get(id);
        if (!entry) {
            entry = createAuthoritativeResourceMesh(key, id);
            map.set(id, entry);
        }

        const x = Number(node.x) || 0;
        const z = Number(node.z) || 0;
        const y = terrainHeight(x, z) + (key === 'wood' ? 0.12 : 0.5);
        entry.mesh.position.set(x, y, z);
        if (key === 'wood') {
            entry.mesh.rotation.x = Math.PI / 2;
        } else {
            entry.mesh.rotation.y += 0.015;
        }
        entry.active = !!node.active;
        entry.mesh.visible = entry.active;
    }

    map.forEach((entry, id) => {
        if (!seen.has(id)) {
            disposeMeshDeep(entry.mesh);
            map.delete(id);
        }
    });
}

function syncAuthoritativeChests(chests) {
    const map = state.multiplayer.authoritative.meshMaps.chests;
    const seen = new Set();
    for (let i = 0; i < chests.length; i++) {
        const chest = chests[i];
        const id = Number(chest.id) || i + 1;
        seen.add(id);
        let entry = map.get(id);
        if (!entry) {
            entry = createAuthoritativeChestMesh(id);
            map.set(id, entry);
        }

        const x = Number(chest.x) || 0;
        const z = Number(chest.z) || 0;
        const y = terrainHeight(x, z);
        entry.mesh.position.set(x, y, z);
        entry.opened = !!chest.opened;

        const openRot = entry.opened ? -Math.PI * 0.62 : 0;
        if (entry.lidPivot) {
            entry.lidPivot.rotation.x = lerp(entry.lidPivot.rotation.x, openRot, 0.35);
        }

        if (entry.base && entry.base.material) {
            entry.base.material.emissive.setHex(entry.opened ? 0x120c08 : 0x2f1a0d);
            entry.base.material.emissiveIntensity = entry.opened ? 0.08 : 0.24;
        }

        if (entry.marker) {
            if (entry.opened) {
                entry.marker.visible = false;
            } else {
                entry.marker.visible = true;
                entry.marker.rotation.y += 0.06;
                entry.marker.position.y = 1.15 + Math.sin(world.time * 4 + entry.pulseOffset) * 0.05;
            }
        }

        if (entry.statusLight) {
            entry.statusLight.intensity = entry.opened
                ? 0.08
                : 0.45 + Math.sin(world.time * 3 + entry.pulseOffset) * 0.16;
            entry.statusLight.distance = entry.opened ? 3 : 8;
        }
    }

    map.forEach((entry, id) => {
        if (!seen.has(id)) {
            disposeMeshDeep(entry.mesh);
            map.delete(id);
        }
    });
}

function syncAuthoritativeEnemies(enemies) {
    const map = state.multiplayer.authoritative.meshMaps.enemies;
    const seen = new Set();
    const now = performance.now();
    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        const id = Number(enemy.id) || i + 1;
        seen.add(id);
        let entry = map.get(id);
        if (!entry) {
            entry = createAuthoritativeEnemyMesh(id, enemy.type || 'wraith', {
                elite: !!enemy.elite,
                nemesis: !!enemy.nemesis,
                modifierId: enemy.modifierId || ''
            });
            map.set(id, entry);
        } else if ((enemy.type || 'wraith') !== entry.type
            || !!enemy.elite !== !!entry.elite
            || !!enemy.nemesis !== !!entry.nemesis
            || String(enemy.modifierId || '') !== String(entry.modifierId || '')) {
            disposeMeshDeep(entry.mesh);
            entry = createAuthoritativeEnemyMesh(id, enemy.type || 'wraith', {
                elite: !!enemy.elite,
                nemesis: !!enemy.nemesis,
                modifierId: enemy.modifierId || ''
            });
            map.set(id, entry);
        }

        const x = Number(enemy.x) || 0;
        const y = Number(enemy.y) || terrainHeight(x, Number(enemy.z) || 0) + 1;
        const z = Number(enemy.z) || 0;
        if (!entry.targetPos) {
            entry.targetPos = new THREE.Vector3(x, y, z);
            entry.mesh.position.set(x, y, z);
            entry.velocity = new THREE.Vector3();
            entry.lastStateAt = now;
        } else if (!entry.mesh.userData.authSeen) {
            entry.targetPos.set(x, y, z);
            entry.mesh.position.set(x, y, z);
            entry.mesh.userData.authSeen = true;
            entry.velocity.set(0, 0, 0);
            entry.lastStateAt = now;
        } else {
            const dtSec = clamp((now - (entry.lastStateAt || now)) / 1000, 0.016, 0.35);
            entry.velocity.set(
                (x - entry.targetPos.x) / dtSec,
                (y - entry.targetPos.y) / dtSec,
                (z - entry.targetPos.z) / dtSec
            );
            entry.targetPos.set(x, y, z);
            entry.lastStateAt = now;
        }
        const nextRot = Number(enemy.rot);
        if (Number.isFinite(nextRot)) {
            entry.targetRot = nextRot;
        }
        entry.hp = Number(enemy.hp) || entry.hp;
        entry.maxHp = Number(enemy.maxHp) || entry.maxHp;
        entry.elite = !!enemy.elite;
        entry.nemesis = !!enemy.nemesis;
        entry.modifierId = String(enemy.modifierId || '');
    }

    map.forEach((entry, id) => {
        if (!seen.has(id)) {
            disposeMeshDeep(entry.mesh);
            map.delete(id);
        }
    });
}

function createAuthoritativeTrapMesh(id) {
    const group = new THREE.Group();
    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(0.72, 0.98, 0.34, 10),
        new THREE.MeshStandardMaterial({
            color: 0x4a5f77,
            roughness: 0.76,
            metalness: 0.28
        })
    );
    base.position.y = 0.18;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.8, 1.0, 36),
        new THREE.MeshBasicMaterial({
            color: 0x7bcfff,
            transparent: true,
            opacity: 0.32,
            side: THREE.DoubleSide
        })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.05;
    group.add(ring);

    world.scene.add(group);
    return {
        id,
        mesh: group,
        ring,
        targetPos: group.position.clone(),
        life: 0,
        maxLife: 1,
        radius: 7
    };
}

function syncAuthoritativeTraps(traps) {
    const map = state.multiplayer.authoritative.meshMaps.traps;
    const seen = new Set();
    for (let i = 0; i < traps.length; i++) {
        const trap = traps[i];
        const id = Number(trap.id) || i + 1;
        seen.add(id);
        let entry = map.get(id);
        if (!entry) {
            entry = createAuthoritativeTrapMesh(id);
            map.set(id, entry);
        }

        const x = Number(trap.x) || 0;
        const z = Number(trap.z) || 0;
        const y = terrainHeight(x, z);
        if (!entry.targetPos) {
            entry.targetPos = new THREE.Vector3(x, y, z);
            entry.mesh.position.set(x, y, z);
        } else if (!entry.mesh.userData.authSeen) {
            entry.targetPos.set(x, y, z);
            entry.mesh.position.set(x, y, z);
            entry.mesh.userData.authSeen = true;
        } else {
            entry.targetPos.set(x, y, z);
        }
        entry.radius = Number(trap.radius) || entry.radius;
        entry.life = Number(trap.life) || 0;
        entry.maxLife = Math.max(0.001, Number(trap.maxLife) || 1);
        const lifeT = clamp(entry.life / entry.maxLife, 0, 1);
        entry.ring.material.opacity = 0.1 + lifeT * 0.34;
        const scale = entry.radius / 7;
        entry.ring.scale.set(scale, scale, 1);
        entry.ring.rotation.z += 0.01;
    }

    map.forEach((entry, id) => {
        if (!seen.has(id)) {
            disposeMeshDeep(entry.mesh);
            map.delete(id);
        }
    });
}

function createAuthoritativeFlareMesh(id) {
    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(1.1, 14, 14),
        new THREE.MeshBasicMaterial({
            color: 0x86dcff,
            transparent: true,
            opacity: 0.24
        })
    );
    world.scene.add(mesh);
    return {
        id,
        mesh,
        targetPos: mesh.position.clone(),
        life: 0,
        maxLife: 1,
        radius: 22
    };
}

function syncAuthoritativeFlares(flares) {
    const map = state.multiplayer.authoritative.meshMaps.flares;
    const seen = new Set();
    for (let i = 0; i < flares.length; i++) {
        const flare = flares[i];
        const id = Number(flare.id) || i + 1;
        seen.add(id);
        let entry = map.get(id);
        if (!entry) {
            entry = createAuthoritativeFlareMesh(id);
            map.set(id, entry);
        }

        const x = Number(flare.x) || 0;
        const z = Number(flare.z) || 0;
        const y = terrainHeight(x, z) + 1;
        if (!entry.targetPos) {
            entry.targetPos = new THREE.Vector3(x, y, z);
            entry.mesh.position.set(x, y, z);
        } else if (!entry.mesh.userData.authSeen) {
            entry.targetPos.set(x, y, z);
            entry.mesh.position.set(x, y, z);
            entry.mesh.userData.authSeen = true;
        } else {
            entry.targetPos.set(x, y, z);
        }
        entry.radius = Number(flare.radius) || entry.radius;
        entry.life = Number(flare.life) || 0;
        entry.maxLife = Math.max(0.001, Number(flare.maxLife) || 1);
        const lifeT = clamp(entry.life / entry.maxLife, 0, 1);
        entry.mesh.material.opacity = 0.06 + lifeT * 0.28;
        const scale = entry.radius / 6.5;
        entry.mesh.scale.setScalar(scale);
    }

    map.forEach((entry, id) => {
        if (!seen.has(id)) {
            disposeMeshDeep(entry.mesh);
            map.delete(id);
        }
    });
}

function updateAuthoritativeVisualSmoothing(dt) {
    if (!isAuthoritativeCoopActive()) return;
    const maps = state.multiplayer.authoritative.meshMaps;
    const now = performance.now();
    const extrapMaxSec = CONFIG.MULTIPLAYER_REMOTE_EXTRAP_MS / 1000;
    const enemyLerp = 1 - Math.exp(-dt * CONFIG.MULTIPLAYER_ENEMY_INTERP);
    const areaLerp = 1 - Math.exp(-dt * CONFIG.MULTIPLAYER_AREA_EFFECT_INTERP);

    maps.enemies.forEach((entry) => {
        if (!entry || !entry.mesh || !entry.targetPos) return;
        const extrapSec = entry.lastStateAt > 0
            ? clamp((now - entry.lastStateAt) / 1000, 0, extrapMaxSec)
            : 0;
        TMP.authEnemyPredPos.copy(entry.targetPos).addScaledVector(entry.velocity, extrapSec);
        entry.mesh.position.lerp(TMP.authEnemyPredPos, enemyLerp);
        const rot = Number.isFinite(entry.targetRot) ? entry.targetRot : entry.mesh.rotation.y;
        entry.mesh.rotation.y = lerpAngle(entry.mesh.rotation.y, rot, enemyLerp);
    });

    maps.traps.forEach((entry) => {
        if (!entry || !entry.mesh || !entry.targetPos) return;
        entry.mesh.position.lerp(entry.targetPos, areaLerp);
    });

    maps.flares.forEach((entry) => {
        if (!entry || !entry.mesh || !entry.targetPos) return;
        entry.mesh.position.lerp(entry.targetPos, areaLerp);
    });
}

function rebuildAuthoritativeMirrorArrays() {
    const woodMap = state.multiplayer.authoritative.meshMaps.wood;
    const shardMap = state.multiplayer.authoritative.meshMaps.shards;
    const chestMap = state.multiplayer.authoritative.meshMaps.chests;
    const enemyMap = state.multiplayer.authoritative.meshMaps.enemies;
    const trapMap = state.multiplayer.authoritative.meshMaps.traps;
    const flareMap = state.multiplayer.authoritative.meshMaps.flares;

    const woodMirrors = state.entities.resources.wood;
    woodMirrors.length = 0;
    woodMap.forEach((entry) => {
        if (!entry.mirror) {
            entry.mirror = { mesh: entry.mesh, active: !!entry.active };
        }
        entry.mirror.mesh = entry.mesh;
        entry.mirror.active = !!entry.active;
        woodMirrors.push(entry.mirror);
    });

    const shardMirrors = state.entities.resources.shards;
    shardMirrors.length = 0;
    shardMap.forEach((entry) => {
        if (!entry.mirror) {
            entry.mirror = { mesh: entry.mesh, active: !!entry.active };
        }
        entry.mirror.mesh = entry.mesh;
        entry.mirror.active = !!entry.active;
        shardMirrors.push(entry.mirror);
    });

    const chestMirrors = state.entities.chests;
    chestMirrors.length = 0;
    chestMap.forEach((entry) => {
        if (!entry.mirror) {
            entry.mirror = {
                mesh: entry.mesh,
                x: entry.mesh.position.x,
                z: entry.mesh.position.z,
                opened: !!entry.opened,
                pulseOffset: entry.pulseOffset || 0
            };
        }
        entry.mirror.mesh = entry.mesh;
        entry.mirror.x = entry.mesh.position.x;
        entry.mirror.z = entry.mesh.position.z;
        entry.mirror.opened = !!entry.opened;
        entry.mirror.pulseOffset = entry.pulseOffset || 0;
        chestMirrors.push(entry.mirror);
    });

    const enemyMirrors = state.entities.enemies;
    enemyMirrors.length = 0;
    enemyMap.forEach((entry) => {
        if (!entry.mirror) {
            entry.mirror = {
                mesh: entry.mesh,
                hp: entry.hp,
                maxHp: entry.maxHp,
                archetype: { id: entry.type || 'wraith' },
                modifier: null,
                nemesis: !!entry.nemesis
            };
        }
        entry.mirror.mesh = entry.mesh;
        entry.mirror.hp = entry.hp;
        entry.mirror.maxHp = entry.maxHp;
        entry.mirror.archetype.id = entry.type || 'wraith';
        if (entry.modifierId) {
            if (!entry.mirror.modifier) {
                entry.mirror.modifier = { id: entry.modifierId, tint: 0xffffff };
            } else {
                entry.mirror.modifier.id = entry.modifierId;
            }
        } else {
            entry.mirror.modifier = null;
        }
        entry.mirror.nemesis = !!entry.nemesis;
        enemyMirrors.push(entry.mirror);
    });

    const trapMirrors = state.entities.activeTraps;
    trapMirrors.length = 0;
    trapMap.forEach((entry) => {
        if (!entry.mirror) {
            entry.mirror = {
                x: entry.mesh.position.x,
                z: entry.mesh.position.z,
                radius: entry.radius,
                life: entry.life,
                maxLife: entry.maxLife,
                base: entry.mesh,
                ring: entry.ring,
                light: null
            };
        }
        entry.mirror.x = entry.mesh.position.x;
        entry.mirror.z = entry.mesh.position.z;
        entry.mirror.radius = entry.radius;
        entry.mirror.life = entry.life;
        entry.mirror.maxLife = entry.maxLife;
        entry.mirror.base = entry.mesh;
        entry.mirror.ring = entry.ring;
        trapMirrors.push(entry.mirror);
    });

    const flareMirrors = state.entities.activeFlares;
    flareMirrors.length = 0;
    flareMap.forEach((entry) => {
        if (!entry.mirror) {
            entry.mirror = {
                mesh: entry.mesh,
                ring: null,
                light: null,
                radius: entry.radius,
                life: entry.life,
                maxLife: entry.maxLife
            };
        }
        entry.mirror.mesh = entry.mesh;
        entry.mirror.radius = entry.radius;
        entry.mirror.life = entry.life;
        entry.mirror.maxLife = entry.maxLife;
        flareMirrors.push(entry.mirror);
    });
}

function endAuthoritativeSession(reason = 'Session ended.') {
    notifyPlatformGameplayStop();
    state.multiplayer.authoritative.active = false;
    state.multiplayer.authoritative.seed = '';
    state.multiplayer.pingMs = 0;
    resetAuthoritativeActionQueue();
    clearAuthoritativeWorldMeshes();
    pushFeed(reason, 'warn');
}

function getInputAxes() {
    const keyboardX = (state.keys.d || state.keys.arrowright ? 1 : 0) - (state.keys.a || state.keys.arrowleft ? 1 : 0);
    const keyboardY = (state.keys.w || state.keys.arrowup ? 1 : 0) - (state.keys.s || state.keys.arrowdown ? 1 : 0);
    const touchX = state.touchInput.enabled ? state.touchInput.moveX : 0;
    const touchY = state.touchInput.enabled ? state.touchInput.moveY : 0;

    return {
        x: clamp(keyboardX + touchX, -1, 1),
        y: clamp(keyboardY + touchY, -1, 1)
    };
}

function getMovementDirection() {
    const input = getInputAxes();
    const inputX = input.x;
    const inputY = input.y;

    TMP.moveDir.set(0, 0, 0);
    if (inputX === 0 && inputY === 0) return TMP.moveDir;

    if (world.camera) {
        world.camera.updateMatrixWorld();
        world.camera.getWorldDirection(TMP.camForward);
        TMP.camForward.y = 0;
        if (TMP.camForward.lengthSq() < 0.0001) {
            TMP.camForward.set(0, 0, 1);
        } else {
            TMP.camForward.normalize();
        }

        TMP.camRight.setFromMatrixColumn(world.camera.matrixWorld, 0);
        TMP.camRight.y = 0;
        if (TMP.camRight.lengthSq() < 0.0001) {
            TMP.camRight.set(1, 0, 0);
        } else {
            TMP.camRight.normalize();
        }
    } else {
        TMP.camForward.set(0, 0, 1);
        TMP.camRight.set(1, 0, 0);
    }

    TMP.moveDir
        .addScaledVector(TMP.camRight, inputX)
        .addScaledVector(TMP.camForward, inputY);

    if (TMP.moveDir.lengthSq() > 1) TMP.moveDir.normalize();
    return TMP.moveDir;
}

function getMaxFireRadius() {
    return CONFIG.FIRE_MAX_RADIUS * state.runMods.fireRadiusMult;
}

function relicRarityRank(rarity) {
    if (rarity === 'epic') return 3;
    if (rarity === 'rare') return 2;
    return 1;
}

function getRelic(id) {
    return RELIC_CATALOG[id] || null;
}

function getRelicLoadoutText() {
    if (!state.equippedRelics || state.equippedRelics.length === 0) return 'No relics attuned';
    return state.equippedRelics
        .map((id) => {
            const relic = getRelic(id);
            if (!relic) return null;
            return relic.name;
        })
        .filter(Boolean)
        .join(' • ');
}

function autoEquipRelic(id) {
    if (!id || state.equippedRelics.includes(id)) return false;

    const relic = getRelic(id);
    if (!relic) return false;

    if (state.equippedRelics.length < CONFIG.RELIC_MAX_EQUIPPED) {
        state.equippedRelics.push(id);
        return true;
    }

    let lowestIdx = 0;
    let lowestRank = Infinity;
    for (let i = 0; i < state.equippedRelics.length; i++) {
        const current = getRelic(state.equippedRelics[i]);
        const rank = relicRarityRank(current ? current.rarity : 'common');
        if (rank < lowestRank) {
            lowestRank = rank;
            lowestIdx = i;
        }
    }

    if (relicRarityRank(relic.rarity) > lowestRank) {
        state.equippedRelics[lowestIdx] = id;
        return true;
    }
    return false;
}

function applyRelicLoadout() {
    state.relicRuntime.startWoodBonus = 0;
    state.relicRuntime.startShardBonus = 0;
    state.relicRuntime.phoenixReady = false;

    for (let i = 0; i < state.equippedRelics.length; i++) {
        const relic = getRelic(state.equippedRelics[i]);
        if (!relic) continue;

        switch (relic.id) {
            case 'cinder_charm':
                state.runMods.fireDecayMult *= 0.9;
                state.relicRuntime.startWoodBonus += 2;
                break;
            case 'scavenger_hook':
                state.runMods.enemyDropBonus += 0.08;
                state.runMods.shardNodeBonus += 1;
                break;
            case 'kinetic_gyro':
                state.runMods.dashCooldownMult *= 0.88;
                state.runMods.speedFlatBonus += 0.9;
                break;
            case 'blood_resin':
                state.runMods.killHeal += 1.3;
                state.runMods.damageTakenMult *= 0.94;
                break;
            case 'ember_crown':
                state.runMods.emberGainMult *= 1.16;
                state.runMods.contractRewardMult *= 1.1;
                break;
            case 'hunter_map':
                state.runMods.comboGainMult *= 1.12;
                state.runMods.comboDecayMult *= 0.88;
                break;
            case 'void_prism':
                state.runMods.pulseDamageMult *= 1.24;
                state.runMods.pulseCooldownMult *= 0.88;
                state.runMods.pulseRadiusMult *= 1.08;
                break;
            case 'phoenix_spool':
                state.relicRuntime.phoenixReady = true;
                break;
            default:
                break;
        }
    }
}

function resetRunModifiers() {
    state.runMods = { ...BASE_RUN_MODS };
}

function resetRunMetrics() {
    state.metrics = { ...BASE_METRICS };
}

function resetRunSystems() {
    state.paused = false;
    state.pauseReason = 'none';
    state.runAssist = { ...BASE_RUN_ASSIST };
    state.pulseCooldown = 0;
    state.pulseCooldownMax = CONFIG.PULSE_BASE_COOLDOWN;
    state.boltCooldown = 0;
    state.boltCooldownMax = CONFIG.BOLT_FIRE_COOLDOWN;
    state.weatherControlCooldown = 0;
    state.weatherControlCooldownMax = CONFIG.WEATHER_CONTROL_COOLDOWN;
    state.fireOutTimer = CONFIG.FIRE_OUT_GRACE;
    state.fireCriticalWarned = false;
    state.comboValue = 0;
    state.comboMultiplier = 1;
    state.comboHold = 0;
    state.chain.count = 0;
    state.chain.timer = 0;
    state.chain.best = 0;
    state.overdrive.active = false;
    state.overdrive.timer = 0;
    state.overdrive.cooldown = 0;
    state.overdrive.activations = 0;
    state.nightEvent.triggerTimer = rand(CONFIG.NIGHT_EVENT_TRIGGER_MIN, CONFIG.NIGHT_EVENT_TRIGGER_MAX);
    state.nightEvent.active = false;
    state.nightEvent.resolved = false;
    state.nightEvent.kind = '';
    state.nightEvent.label = '';
    state.nightEvent.timer = 0;
    state.nightEvent.duration = 0;
    state.nightEvent.goal = 0;
    state.nightEvent.progress = 0;
    state.nightEvent.reward = 0;
    state.nightEvent.outcome = 'none';
    state.nightEvent.completedCount = 0;
    state.nightEvent.failedCount = 0;
    state.pushStreak = 0;
    state.currentContract = null;
    state.score = 0;
    state.weapon.crafted = false;
    state.weapon.ammo = 0;
    state.runPerks = [];
    state.relicRuntime.startWoodBonus = 0;
    state.relicRuntime.startShardBonus = 0;
    state.relicRuntime.phoenixReady = false;
    state.director.intensity = 0.24;
    state.director.target = 0.24;
    state.director.reinforceTimer = 12;
    state.director.wavesSpawned = 0;
    state.nemesisRuntime.spawnTimer = rand(CONFIG.NEMESIS_SPAWN_MIN, CONFIG.NEMESIS_SPAWN_MAX);
    state.nemesisRuntime.spawned = false;
    state.nemesisRuntime.resolved = false;
    state.nemesisRuntime.killed = false;
    resetRunModifiers();
    resetRunMetrics();
}

function addMetric(metric, amount = 1) {
    if (!(metric in state.metrics)) return;
    state.metrics[metric] += amount;
    updateContractProgress();
}

function addMomentum(amount) {
    const gain = amount * state.runMods.comboGainMult;
    state.comboValue = clamp(state.comboValue + gain, 0, CONFIG.COMBO_MAX);
    state.comboHold = 2.4;
    state.comboMultiplier = 1 + Math.floor(state.comboValue / 20) * 0.2;
}

function updateMomentum(dt) {
    if (state.comboHold > 0) {
        state.comboHold -= dt;
    } else {
        state.comboValue = Math.max(0, state.comboValue - (CONFIG.COMBO_DECAY_PER_SEC * state.runMods.comboDecayMult) * dt);
        state.comboMultiplier = 1 + Math.floor(state.comboValue / 20) * 0.2;
    }
}

function activateOverdrive() {
    state.overdrive.active = true;
    state.overdrive.timer = CONFIG.OVERDRIVE_DURATION;
    state.overdrive.cooldown = CONFIG.OVERDRIVE_COOLDOWN;
    state.overdrive.activations += 1;
    pushFeed('OVERDRIVE engaged: speed and ember output boosted.', 'warn');
    spawnFloatingText('OVERDRIVE', state.entities.player.position, '#ffcf84');
    triggerFlash('rgba(255, 190, 92, 0.26)', 0.15);
    AudioManager.play('perk');
}

function registerKillChain(enemyReward = 0) {
    if (state.chain.timer > 0) {
        state.chain.count += 1;
    } else {
        state.chain.count = 1;
    }
    state.chain.timer = CONFIG.CHAIN_TIMEOUT;
    state.chain.best = Math.max(state.chain.best, state.chain.count);

    if (!state.overdrive.active && state.overdrive.cooldown <= 0 && state.chain.count >= CONFIG.CHAIN_OVERDRIVE_THRESHOLD) {
        activateOverdrive();
    } else if (state.chain.count > 1 && (state.chain.count === 3 || state.chain.count === 5 || state.chain.count % 8 === 0)) {
        pushFeed(`Chain x${state.chain.count}: ember drops amplified.`, 'info');
    }

    if (enemyReward > 0 && state.chain.count >= 4) {
        state.fireRadius = clamp(state.fireRadius + 0.6 + enemyReward * 0.08, CONFIG.FIRE_MIN_RADIUS, getMaxFireRadius());
    }
}

function updateCombatLoops(dt) {
    if (state.chain.timer > 0) {
        state.chain.timer -= dt;
        if (state.chain.timer <= 0) {
            state.chain.timer = 0;
            state.chain.count = 0;
        }
    }

    if (state.overdrive.cooldown > 0) {
        state.overdrive.cooldown -= dt;
        if (state.overdrive.cooldown < 0) state.overdrive.cooldown = 0;
    }

    if (state.overdrive.active) {
        state.overdrive.timer -= dt;
        if (state.overdrive.timer <= 0) {
            state.overdrive.active = false;
            state.overdrive.timer = 0;
            pushFeed('Overdrive faded. Keep pressure to trigger it again.', 'info');
        }
    }
}

function resetNightEventCycle() {
    state.nightEvent.triggerTimer = rand(CONFIG.NIGHT_EVENT_TRIGGER_MIN, CONFIG.NIGHT_EVENT_TRIGGER_MAX);
    state.nightEvent.active = false;
    state.nightEvent.resolved = false;
    state.nightEvent.kind = '';
    state.nightEvent.label = '';
    state.nightEvent.timer = 0;
    state.nightEvent.duration = 0;
    state.nightEvent.goal = 0;
    state.nightEvent.progress = 0;
    state.nightEvent.reward = 0;
    state.nightEvent.outcome = 'pending';
}

function endNightEventCycle() {
    state.nightEvent.active = false;
    state.nightEvent.resolved = true;
    if (state.nightEvent.outcome === 'pending') {
        state.nightEvent.outcome = 'skipped';
    }
}

function pickNightEventTemplate() {
    if (state.day < 3) return NIGHT_EVENT_POOL[0];
    if (state.day < 5) {
        return random() < 0.7 ? NIGHT_EVENT_POOL[0] : NIGHT_EVENT_POOL[1];
    }
    return NIGHT_EVENT_POOL[Math.floor(random() * NIGHT_EVENT_POOL.length)];
}

function beginNightEvent() {
    if (state.phase !== 'SURVIVE' || state.nightEvent.active || state.nightEvent.resolved) return false;

    const template = pickNightEventTemplate();
    if (!template) return false;

    const event = state.nightEvent;
    event.active = true;
    event.kind = template.id;
    event.label = template.label;
    event.progress = 0;

    if (template.id === 'elite_hunt') {
        event.goal = state.day >= 6 || state.pushStreak > 0 ? 2 : 1;
        event.duration = CONFIG.NIGHT_EVENT_ELITE_DURATION;
        event.timer = event.duration;
        event.reward = 46 + state.day * 10 + state.pushStreak * 8 + event.goal * 16;
        spawnDirectorReinforcement(event.goal + 1, { forceElite: true, allowAnnounce: false });
        pushFeed(`Night Event: ${event.label}. Eliminate ${event.goal} elite targets.`, 'warn');
    } else {
        event.goal = clamp(4 + Math.floor(state.day * 0.9) + state.pushStreak, 4, 15);
        event.duration = CONFIG.NIGHT_EVENT_SURGE_DURATION;
        event.timer = event.duration;
        event.reward = 30 + state.day * 8 + state.pushStreak * 10;
        const surgeWave = Math.min(4, 2 + Math.floor(state.day / 5) + Math.min(state.pushStreak, 2));
        spawnDirectorReinforcement(surgeWave, { allowAnnounce: false });
        pushFeed(`Night Event: ${event.label}. Eliminate ${event.goal} hostiles quickly.`, 'warn');
    }

    spawnFloatingText(`EVENT: ${event.label.toUpperCase()}`, state.entities.player.position, '#ffd28c');
    triggerFlash('rgba(255, 164, 85, 0.22)', 0.12);
    return true;
}

function completeNightEvent() {
    const event = state.nightEvent;
    if (!event.active) return;

    event.active = false;
    event.resolved = true;
    event.outcome = 'success';
    event.completedCount += 1;

    const payout = grantEmbers(event.reward, { useDifficulty: true, useCombo: true });
    state.score += payout;
    state.fireRadius = clamp(state.fireRadius + 8, CONFIG.FIRE_MIN_RADIUS, getMaxFireRadius());
    state.health = clamp(state.health + 8, 0, 100);
    state.runMods.contractRewardMult *= 1.03;
    addMomentum(20);

    if (random() < 0.32) {
        rollRelicDrop('elite');
    }

    pushFeed(`Event clear: ${event.label} (+${payout} embers).`, 'info');
    spawnFloatingText('EVENT CLEAR', state.entities.player.position, '#ffe29a');
    AudioManager.play('perk');
}

function failNightEvent() {
    const event = state.nightEvent;
    if (!event.active) return;

    event.active = false;
    event.resolved = true;
    event.outcome = 'failed';
    event.failedCount += 1;

    if (event.kind === 'elite_hunt') {
        state.fireRadius = Math.max(CONFIG.FIRE_MIN_RADIUS, state.fireRadius - 8);
        spawnDirectorReinforcement(2, { forceElite: true, allowAnnounce: false });
        pushFeed(`Event failed: ${event.label}. Elite retaliation incoming.`, 'danger');
    } else {
        state.fireRadius = Math.max(CONFIG.FIRE_MIN_RADIUS, state.fireRadius - 12);
        spawnDirectorReinforcement(2, { allowAnnounce: false });
        pushFeed(`Event failed: ${event.label}. Fireline destabilized.`, 'danger');
    }

    state.health = clamp(state.health - 5, 0, 100);
    spawnFloatingText('EVENT FAILED', state.entities.player.position, '#ff9f9f');
    if (state.health <= 0) {
        endGame('You were overwhelmed during a night event.');
    }
}

function registerNightEventKill(enemy) {
    const event = state.nightEvent;
    if (!event.active) return;

    if (event.kind === 'elite_hunt') {
        const isElite = !!enemy.modifier || !!enemy.nemesis || ((enemy.archetype && enemy.archetype.id) === 'titan');
        if (!isElite) return;
    }

    event.progress += 1;
    if (event.progress >= event.goal) {
        completeNightEvent();
    }
}

function updateNightEvent(dt) {
    if (state.phase !== 'SURVIVE' || state.paused) return;
    const event = state.nightEvent;

    if (!event.active) {
        if (event.resolved) return;
        event.triggerTimer -= dt * (1 + state.director.intensity * 0.38 + state.pushStreak * 0.08);
        if (event.triggerTimer <= 0) {
            beginNightEvent();
        }
        return;
    }

    event.timer -= dt;
    if (event.timer <= 0) {
        failNightEvent();
    }
}

function spawnEmberOrb(position3, enemyReward = 0, isElite = false, isNemesis = false) {
    let chance = CONFIG.EMBER_ORB_DROP_BASE + Math.min(state.chain.count, 10) * 0.04;
    if (isElite) chance += CONFIG.EMBER_ORB_DROP_ELITE_BONUS;
    if (isNemesis) chance = 1;
    chance = clamp(chance, 0.15, 1);
    if (random() > chance) return false;

    const orbColor = isNemesis ? 0xffbd73 : isElite ? 0xff9d7f : 0xffd07a;
    const mesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(isNemesis ? 0.72 : 0.46, 1),
        new THREE.MeshStandardMaterial({
            color: orbColor,
            emissive: 0x7a2a0d,
            emissiveIntensity: 2.1,
            roughness: 0.26,
            metalness: 0.38,
            transparent: true,
            opacity: 0.94
        })
    );

    const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.7, 1.0, 24),
        new THREE.MeshBasicMaterial({
            color: orbColor,
            transparent: true,
            opacity: 0.38,
            side: THREE.DoubleSide
        })
    );
    ring.rotation.x = -Math.PI / 2;

    const light = new THREE.PointLight(orbColor, isNemesis ? 1.35 : 1, isNemesis ? 22 : 14, 2);

    const x = position3.x;
    const z = position3.z;
    const y = terrainHeight(x, z) + 1.05;
    mesh.position.set(x, y, z);
    ring.position.set(x, terrainHeight(x, z) + 0.14, z);
    light.position.set(x, y, z);
    mesh.castShadow = true;

    world.scene.add(mesh);
    world.scene.add(ring);
    world.scene.add(light);

    const base = CONFIG.EMBER_ORB_VALUE_BASE + enemyReward * 1.6 + state.day * 0.8;
    const chainBonus = Math.max(0, state.chain.count - 1) * 1.4;
    const eliteBonus = isElite ? 9 : 0;
    const nemesisBonus = isNemesis ? 28 : 0;

    state.entities.emberOrbs.push({
        mesh,
        ring,
        light,
        life: CONFIG.EMBER_ORB_BASE_LIFE + (isNemesis ? 4 : 0),
        maxLife: CONFIG.EMBER_ORB_BASE_LIFE + (isNemesis ? 4 : 0),
        value: Math.floor(base + chainBonus + eliteBonus + nemesisBonus),
        pulse: rand(0, Math.PI * 2),
        nemesis: isNemesis
    });

    return true;
}

function clearEmberOrbs() {
    for (let i = 0; i < state.entities.emberOrbs.length; i++) {
        const orb = state.entities.emberOrbs[i];
        if (orb.mesh && orb.mesh.parent) orb.mesh.parent.remove(orb.mesh);
        if (orb.ring && orb.ring.parent) orb.ring.parent.remove(orb.ring);
        if (orb.light && orb.light.parent) orb.light.parent.remove(orb.light);
    }
    state.entities.emberOrbs.length = 0;
}

function clearAlliedSentinels() {
    for (let i = 0; i < state.entities.alliedSentinels.length; i++) {
        const ally = state.entities.alliedSentinels[i];
        if (ally.mesh && ally.mesh.parent) ally.mesh.parent.remove(ally.mesh);
    }
    state.entities.alliedSentinels.length = 0;
}

function spawnAlliedSentinels() {
    clearAlliedSentinels();
    if (state.partyMode !== 'allies') return;
    if (isRealMultiplayerSession()) return;

    for (let i = 0; i < CONFIG.ALLY_SENTINEL_COUNT; i++) {
        const mesh = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.36, 1),
            new THREE.MeshStandardMaterial({
                color: 0x8fd8ff,
                emissive: 0x2a6b9f,
                emissiveIntensity: 1.6,
                roughness: 0.22,
                metalness: 0.55
            })
        );
        mesh.castShadow = true;
        const light = new THREE.PointLight(0x7ec9ff, 0.8, 10, 2);
        mesh.add(light);
        world.scene.add(mesh);

        state.entities.alliedSentinels.push({
            mesh,
            angle: (Math.PI * 2 * i) / CONFIG.ALLY_SENTINEL_COUNT,
            radius: 2.8 + i * 0.45,
            fireCooldown: rand(0.25, 1.0),
            bobOffset: rand(0, Math.PI * 2)
        });
    }
}

function updateAlliedSentinels(dt) {
    if (state.entities.alliedSentinels.length === 0 || !state.entities.player) return;

    const player = state.entities.player.position;
    for (let i = 0; i < state.entities.alliedSentinels.length; i++) {
        const ally = state.entities.alliedSentinels[i];
        ally.angle += dt * (1.1 + i * 0.18);
        const tx = player.x + Math.sin(ally.angle) * ally.radius;
        const tz = player.z + Math.cos(ally.angle) * ally.radius;
        const ty = player.y + 1.6 + Math.sin(world.time * 3 + ally.bobOffset) * 0.22;

        const followT = 1 - Math.exp(-dt * 8);
        ally.mesh.position.x = lerp(ally.mesh.position.x, tx, followT);
        ally.mesh.position.y = lerp(ally.mesh.position.y, ty, followT);
        ally.mesh.position.z = lerp(ally.mesh.position.z, tz, followT);
        ally.mesh.rotation.y += dt * 1.9;
        ally.fireCooldown -= dt;

        if (state.phase !== 'SURVIVE' || ally.fireCooldown > 0) continue;

        let nearest = null;
        let nearestDist = Infinity;
        for (let e = 0; e < state.entities.enemies.length; e++) {
            const enemy = state.entities.enemies[e];
            const d = dist2(ally.mesh.position.x, ally.mesh.position.z, enemy.mesh.position.x, enemy.mesh.position.z);
            if (d < nearestDist) {
                nearest = enemy;
                nearestDist = d;
            }
        }

        if (nearest && nearestDist < 28) {
            const damage = 18 + state.day * 1.8;
            damageEnemy(nearest, damage);
            if (nearest.hp <= 0) {
                resolveEnemyDeath(nearest, 'ally');
                addMomentum(2);
            } else {
                spawnFloatingText('ALLY HIT', nearest.mesh.position, '#9ad8ff');
            }
            ally.fireCooldown = 1.05 + rand(0, 0.35);
            trackTelemetry('ally_strike', { day: state.day });
        } else {
            ally.fireCooldown = 0.3 + rand(0, 0.4);
        }
    }
}

function updateEmberOrbs(dt) {
    const player = state.entities.player ? state.entities.player.position : null;
    if (!player) return;

    for (let i = state.entities.emberOrbs.length - 1; i >= 0; i--) {
        const orb = state.entities.emberOrbs[i];
        orb.life -= dt;

        const lifeT = clamp(orb.life / Math.max(orb.maxLife, 0.001), 0, 1);
        const bob = Math.sin(world.time * 3.5 + orb.pulse) * 0.08;
        orb.mesh.position.y = terrainHeight(orb.mesh.position.x, orb.mesh.position.z) + 1.05 + bob;
        orb.mesh.rotation.y += dt * 2.1;
        orb.mesh.rotation.x += dt * 1.35;
        orb.mesh.material.opacity = 0.22 + lifeT * 0.72;
        orb.ring.rotation.z += dt * 1.9;
        orb.ring.material.opacity = 0.08 + lifeT * 0.36;
        orb.ring.scale.setScalar(0.92 + (1 - lifeT) * 0.32);
        orb.light.intensity = (orb.nemesis ? 0.7 : 0.45) + lifeT * (orb.nemesis ? 1.1 : 0.75);

        const d = dist2(player.x, player.z, orb.mesh.position.x, orb.mesh.position.z);
        if (d <= CONFIG.EMBER_ORB_PICKUP_RADIUS) {
            const overdriveMult = state.overdrive.active ? 1.4 : 1;
            const reward = Math.floor(orb.value * overdriveMult);
            const gained = grantEmbers(reward, { useDifficulty: true, useCombo: true });
            state.score += gained;
            addMomentum(6 + Math.min(orb.value * 0.15, 8));
            state.fireRadius = clamp(state.fireRadius + (orb.nemesis ? 3.5 : 1.4), CONFIG.FIRE_MIN_RADIUS, getMaxFireRadius());
            if (orb.nemesis) {
                pushFeed(`Nemesis cache secured: +${gained} embers`, 'info');
            }
            spawnFloatingText(`+${gained} ORB`, orb.mesh.position, orb.nemesis ? '#ffd08a' : '#ffcf8f');

            if (orb.mesh.parent) orb.mesh.parent.remove(orb.mesh);
            if (orb.ring.parent) orb.ring.parent.remove(orb.ring);
            if (orb.light.parent) orb.light.parent.remove(orb.light);
            state.entities.emberOrbs.splice(i, 1);
            continue;
        }

        if (orb.life <= 0) {
            if (orb.mesh.parent) orb.mesh.parent.remove(orb.mesh);
            if (orb.ring.parent) orb.ring.parent.remove(orb.ring);
            if (orb.light.parent) orb.light.parent.remove(orb.light);
            state.entities.emberOrbs.splice(i, 1);
        }
    }
}

function grantEmbers(baseAmount, opts = {}) {
    const useDifficulty = opts.useDifficulty !== false;
    const useCombo = opts.useCombo === true;

    let total = baseAmount;
    if (useDifficulty) total *= state.runtime.emberMultiplier;
    if (useCombo) total *= state.comboMultiplier;
    total *= state.runMods.emberGainMult;
    total *= state.runAssist.emberGainMult;
    if (state.overdrive.active) total *= CONFIG.OVERDRIVE_EMBER_MULT;
    if (state.pushStreak > 0) {
        total *= 1 + state.pushStreak * CONFIG.PUSH_REWARD_STEP;
    }

    const final = Math.max(0, Math.floor(total));
    state.embers += final;
    return final;
}

function ensureStarterRelic() {
    if (state.inventory.relics.length > 0) return;
    state.inventory.relics.push('cinder_charm');
    if (state.equippedRelics.length === 0) {
        state.equippedRelics.push('cinder_charm');
    }
}

function unlockRelic(id, source = 'unknown') {
    const relic = getRelic(id);
    if (!relic) return false;
    if (state.inventory.relics.includes(id)) return false;

    state.inventory.relics.push(id);
    state.inventory.relics = Array.from(new Set(state.inventory.relics));
    const equippedNow = autoEquipRelic(id);

    pushFeed(`Relic discovered: ${relic.name} (${relic.rarity})`, 'info');
    if (equippedNow) {
        pushFeed(`Relic attuned for next run: ${relic.name}`, 'info');
    }
    if (source === 'night') {
        spawnFloatingText('RELIC FOUND', state.entities.player.position, '#ffe19a');
    }

    saveProgress();
    renderRelicLoadoutUI();
    updateHUD();
    return true;
}

function rollRelicDrop(source = 'night') {
    const locked = Object.keys(RELIC_CATALOG).filter((id) => !state.inventory.relics.includes(id));
    if (locked.length === 0) return null;

    let chance = CONFIG.RELIC_DROP_BASE + state.day * CONFIG.RELIC_DROP_DAY_BONUS + state.pushStreak * CONFIG.RELIC_DROP_PUSH_BONUS;
    if (source === 'elite') chance *= 0.72;
    chance = clamp(chance, 0.04, 0.6);

    if (random() > chance) return null;

    let totalWeight = 0;
    const weighted = [];
    for (let i = 0; i < locked.length; i++) {
        const relic = getRelic(locked[i]);
        const w = relic ? relic.weight : 0.5;
        weighted.push({ id: locked[i], w });
        totalWeight += w;
    }

    let pick = random() * Math.max(totalWeight, 0.0001);
    for (let i = 0; i < weighted.length; i++) {
        pick -= weighted[i].w;
        if (pick <= 0) {
            unlockRelic(weighted[i].id, source);
            return weighted[i].id;
        }
    }

    unlockRelic(weighted[weighted.length - 1].id, source);
    return weighted[weighted.length - 1].id;
}

function sortRelicsForUI(a, b) {
    const relicA = getRelic(a);
    const relicB = getRelic(b);
    const rankA = relicRarityRank(relicA ? relicA.rarity : 'common');
    const rankB = relicRarityRank(relicB ? relicB.rarity : 'common');
    if (rankA !== rankB) return rankB - rankA;
    const nameA = relicA ? relicA.name : a;
    const nameB = relicB ? relicB.name : b;
    return nameA.localeCompare(nameB);
}

function renderRelicLoadoutUI() {
    if (!ui.relicList || !ui.relicEmpty) return;

    const owned = state.inventory.relics.slice().sort(sortRelicsForUI);
    ui.relicList.innerHTML = '';

    if (owned.length === 0) {
        ui.relicEmpty.classList.remove('hidden');
        return;
    }

    ui.relicEmpty.classList.add('hidden');
    for (let i = 0; i < owned.length; i++) {
        const id = owned[i];
        const relic = getRelic(id);
        if (!relic) continue;

        const attuned = state.equippedRelics.includes(id);
        const card = document.createElement('div');
        card.className = `relic-item${attuned ? ' attuned' : ''}`;

        const row = document.createElement('div');
        row.className = 'relic-row';

        const name = document.createElement('span');
        name.className = 'relic-name';
        name.textContent = relic.name;

        const rarity = document.createElement('span');
        rarity.className = `relic-rarity ${relic.rarity}`;
        rarity.textContent = relic.rarity;

        row.appendChild(name);
        row.appendChild(rarity);

        const desc = document.createElement('p');
        desc.textContent = relic.desc;

        const button = document.createElement('button');
        button.type = 'button';
        button.className = `relic-btn${attuned ? ' remove' : ''}`;

        if (attuned) {
            button.textContent = 'REMOVE';
        } else if (state.equippedRelics.length >= CONFIG.RELIC_MAX_EQUIPPED) {
            button.textContent = 'SLOTS FULL';
            button.disabled = true;
        } else {
            button.textContent = 'ATTUNE';
        }

        button.addEventListener('click', () => {
            toggleRelicEquip(id);
        });

        card.appendChild(row);
        card.appendChild(desc);
        card.appendChild(button);
        ui.relicList.appendChild(card);
    }
}

function toggleRelicEquip(id) {
    if (!RELIC_IDS.has(id) || !state.inventory.relics.includes(id)) return;
    const relic = getRelic(id);
    if (!relic) return;

    const idx = state.equippedRelics.indexOf(id);
    if (idx !== -1) {
        state.equippedRelics.splice(idx, 1);
        pushFeed(`Relic removed: ${relic.name}`, 'info');
    } else {
        if (state.equippedRelics.length >= CONFIG.RELIC_MAX_EQUIPPED) {
            pushFeed(`Only ${CONFIG.RELIC_MAX_EQUIPPED} relics can be attuned.`, 'warn');
            return;
        }
        state.equippedRelics.push(id);
        pushFeed(`Relic attuned: ${relic.name}`, 'info');
    }

    saveProgress();
    renderRelicLoadoutUI();
    updateHUD();
}

function formatPercentDelta(mult) {
    return `${Math.round((mult - 1) * 100)}%`;
}

function refreshDailyChallenge() {
    const challenge = buildDailyChallenge(getTodayDateId());
    const history = state.challengeHistory[challenge.id] || {};
    challenge.bestScore = Number(history.bestScore) || 0;
    challenge.bestDay = Number(history.bestDay) || 0;
    challenge.rewardClaimed = !!history.claimed;
    state.daily = challenge;
}

function getDailyChallengeBrief() {
    const c = state.daily;
    const bestText = c.bestScore > 0 ? `best ${c.bestScore} (day ${c.bestDay})` : 'no clear yet';
    const rewardText = c.rewardClaimed ? 'bonus claimed' : 'bonus available';
    return `${c.id} • ${c.title} | fire decay ${formatPercentDelta(c.fireDecayMult)}, enemy speed ${formatPercentDelta(c.enemySpeedMult)}, spawns ${formatPercentDelta(c.spawnMult)}, ember yield x${c.emberMult.toFixed(2)} | ${bestText} | ${rewardText}`;
}

function syncDifficultyButtons() {
    const buttons = document.querySelectorAll('.difficulty-btn');
    const dailyMode = state.selectedMode === 'daily';
    buttons.forEach((btn) => {
        const wanted = dailyMode ? btn.dataset.difficulty === 'normal' : btn.dataset.difficulty === state.selectedDifficulty;
        btn.classList.toggle('active', wanted);
        btn.disabled = dailyMode;
    });
}

function refreshModeUI() {
    if (ui.modeButtons) {
        ui.modeButtons.forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.mode === state.selectedMode);
        });
    }

    syncDifficultyButtons();

    if (ui.startBtn) {
        if (state.selectedMode === 'daily') {
            ui.startBtn.innerHTML = '<i class="fa-solid fa-bolt"></i> ENTER DAILY RIFT';
        } else {
            ui.startBtn.innerHTML = '<i class="fa-solid fa-play"></i> ENTER FOREST';
        }
    }

    if (ui.challengeBrief) {
        ui.challengeBrief.textContent = getDailyChallengeBrief();
    }
}

function setSelectedMode(mode, opts = {}) {
    const next = mode === 'daily' ? 'daily' : 'standard';
    if (state.selectedMode === next && !opts.force) return;

    state.selectedMode = next;
    if (state.selectedMode === 'daily') {
        state.selectedDifficulty = 'normal';
    }

    refreshDailyChallenge();
    refreshModeUI();
    saveProgress();

    if (!opts.silent) {
        const label = state.selectedMode === 'daily' ? 'Daily Challenge mode selected.' : 'Standard run selected.';
        pushFeed(label, 'info');
    }
}

function applyDailyChallengeToRun(challenge) {
    if (!challenge) return;

    state.runtime.dayDuration = Math.max(42, Math.floor(state.runtime.dayDuration * challenge.dayDurationMult));
    state.runtime.nightDuration = Math.max(56, Math.floor(state.runtime.nightDuration * challenge.nightDurationMult));
    state.runtime.enemySpeed *= challenge.enemySpeedMult;
    state.runtime.spawnMultiplier *= challenge.spawnMult;
    state.runtime.emberMultiplier *= challenge.emberMult;
    state.runMods.fireDecayMult *= challenge.fireDecayMult;
    state.pushStreak = challenge.startPush;
}

function computeDailyChallengeScore() {
    return Math.floor(state.score + state.day * 120 + state.metrics.enemiesKilled * 4 + state.pushStreak * 80);
}

function resolveDailyChallengeResult() {
    if (state.activeMode !== 'daily' || !state.activeChallengeId) return null;

    const challengeId = state.activeChallengeId;
    const score = computeDailyChallengeScore();
    const entry = state.challengeHistory[challengeId] || { bestScore: 0, bestDay: 0, claimed: false };
    const isBest = score > (Number(entry.bestScore) || 0);

    if (isBest) entry.bestScore = score;
    entry.bestDay = Math.max(Number(entry.bestDay) || 0, state.day);

    let bonus = 0;
    const qualifiesForBonus = state.day >= 2 || score >= 450;
    if (!entry.claimed && qualifiesForBonus) {
        bonus = Math.floor(CONFIG.DAILY_BONUS_BASE + score * CONFIG.DAILY_BONUS_SCORE_STEP);
        entry.claimed = true;
        state.embers += bonus;
    }

    state.challengeHistory[challengeId] = entry;
    refreshDailyChallenge();

    return {
        challengeId,
        score,
        isBest,
        bonus,
        bestScore: Number(entry.bestScore) || 0,
        bestDay: Number(entry.bestDay) || 0
    };
}

async function initEngine() {
    if (typeof THREE === 'undefined') {
        alert('Three.js failed to load.');
        return;
    }

    await initPlatformSdk();
    notifyPlatformLoadingStart();

    cacheUI();
    bindUIActions();
    bindInput();
    initTouchControls();
    initMultiplayer();

    initRenderer();
    initSceneAndMaterials();
    buildStaticWorld();

    loadProgress();
    refreshDailyChallenge();
    refreshModeUI();
    renderRelicLoadoutUI();
    updateShopButtons();
    updateHUD();
    updateRewardedOfferUI();
    maybeShowFirstTimeGuide();
    notifyPlatformLoadingStop();

    state.lastTime = performance.now();
    animate(state.lastTime);
}

window.addEventListener('DOMContentLoaded', () => {
    initEngine().catch((err) => {
        notifyPlatformLoadingStop();
        console.error('Engine init failed:', err);
    });
});

function cacheUI() {
    ui.startScreen = document.getElementById('start-screen');
    ui.shopScreen = document.getElementById('shop-screen');
    ui.gameOverScreen = document.getElementById('game-over-screen');

    ui.day = document.getElementById('day-display');
    ui.phase = document.getElementById('phase-display');
    ui.timer = document.getElementById('timer-display');
    ui.timerCircle = document.getElementById('timer-circle');

    ui.wood = document.getElementById('wood-count');
    ui.shard = document.getElementById('shard-count');
    ui.beacon = document.getElementById('beacon-count');
    ui.embers = document.getElementById('ember-count');

    ui.healthBar = document.getElementById('health-bar');
    ui.staminaBar = document.getElementById('stamina-bar');
    ui.dashBar = document.getElementById('dash-bar');
    ui.pulseBar = document.getElementById('pulse-bar');
    ui.weaponStatus = document.getElementById('weapon-status');
    ui.boltCount = document.getElementById('bolt-count');
    ui.flareCount = document.getElementById('flare-count');
    ui.comboBar = document.getElementById('combo-bar');
    ui.comboValue = document.getElementById('combo-value');

    ui.objectiveText = document.getElementById('objective-text');
    ui.contractText = document.getElementById('contract-text');
    ui.relicText = document.getElementById('relic-text');

    ui.interactionPrompt = document.getElementById('interaction-prompt');
    ui.interactionText = document.getElementById('interaction-text');

    ui.startBtn = document.getElementById('start-btn');
    ui.rewardedEmbersBtn = document.getElementById('rewarded-embers-btn');
    ui.restartBtn = document.getElementById('restart-btn');
    ui.gameOverRewardedBtn = document.getElementById('gameover-rewarded-btn');
    ui.gameOverEarned = document.getElementById('earned-embers');
    ui.gameOverTitle = document.getElementById('game-over-title');
    ui.gameOverMessage = document.getElementById('game-over-message');
    ui.openMultiplayerBtn = document.getElementById('open-multiplayer-btn');
    ui.openShopBtn = document.getElementById('open-shop-btn');
    ui.closeShopBtn = document.getElementById('close-shop-btn');
    ui.quickShopBtn = document.getElementById('shop-btn');
    ui.settingsBtn = document.getElementById('settings-btn');
    ui.openSettingsStartBtn = document.getElementById('open-settings-start-btn');
    ui.openGuideBtn = document.getElementById('open-guide-btn');

    ui.shopTabs = document.querySelectorAll('.tab-btn');
    ui.modeButtons = document.querySelectorAll('.mode-btn');
    ui.controlsHud = document.querySelector('.controls-hud');
    ui.challengeBrief = document.getElementById('challenge-brief');
    ui.perkScreen = document.getElementById('perk-screen');
    ui.perkTitle = ui.perkScreen ? ui.perkScreen.querySelector('h2') : null;
    ui.perkOptions = document.getElementById('perk-options');
    ui.perkSubtitle = document.getElementById('perk-subtitle');
    ui.relicList = document.getElementById('relic-list');
    ui.relicEmpty = document.getElementById('relic-empty');

    ui.radarCanvas = document.getElementById('radar-canvas');
    if (ui.radarCanvas) {
        ui.radarCtx = ui.radarCanvas.getContext('2d');
    }

    ui.eventFeed = document.getElementById('event-feed');

    ui.highScore = document.getElementById('high-score-display');
    ui.skinName = document.getElementById('current-skin-name');
    ui.screenEmbers = document.getElementById('screen-ember-count');

    ui.guideScreen = document.getElementById('guide-screen');
    ui.guideCloseBtn = document.getElementById('guide-close-btn');

    ui.settingsScreen = document.getElementById('settings-screen');
    ui.closeSettingsBtn = document.getElementById('close-settings-btn');
    ui.applySettingsBtn = document.getElementById('apply-settings-btn');
    ui.resetSettingsBtn = document.getElementById('reset-settings-btn');
    ui.settingVolume = document.getElementById('setting-volume');
    ui.settingVolumeValue = document.getElementById('setting-volume-value');
    ui.settingScreenShake = document.getElementById('setting-screen-shake');
    ui.settingScreenShakeValue = document.getElementById('setting-screen-shake-value');
    ui.settingSfxEnabled = document.getElementById('setting-sfx-enabled');
    ui.settingReduceFlash = document.getElementById('setting-reduce-flash');
    ui.settingShowControls = document.getElementById('setting-show-controls');
    ui.craftingScreen = document.getElementById('crafting-screen');
    ui.craftingOptions = document.getElementById('crafting-options');
    ui.craftingSubtitle = document.getElementById('crafting-subtitle');
    ui.closeCraftingBtn = document.getElementById('close-crafting-btn');
    ui.multiplayerScreen = document.getElementById('multiplayer-screen');
    ui.closeMultiplayerBtn = document.getElementById('close-multiplayer-btn');
    ui.multiplayerStatus = document.getElementById('multiplayer-status');
    ui.mpNameInput = document.getElementById('mp-name-input');
    ui.mpRoomInput = document.getElementById('mp-room-input');
    ui.mpCreateBtn = document.getElementById('mp-create-btn');
    ui.mpJoinBtn = document.getElementById('mp-join-btn');
    ui.mpLeaveBtn = document.getElementById('mp-leave-btn');
    ui.mpStartBtn = document.getElementById('mp-start-btn');
    ui.mpCopyCodeBtn = document.getElementById('mp-copy-code-btn');
    ui.mpRoomDisplay = document.getElementById('mp-room-display');
    ui.mpStartHint = document.getElementById('mp-start-hint');
    ui.mpRoster = document.getElementById('mp-roster');

    ui.touchControls = document.getElementById('touch-controls');
    ui.touchMovePad = document.getElementById('touch-move-pad');
    ui.touchStick = document.getElementById('touch-stick');
    ui.touchSprintBtn = document.getElementById('touch-sprint-btn');
    ui.touchDashBtn = document.getElementById('touch-dash-btn');
    ui.touchPulseBtn = document.getElementById('touch-pulse-btn');
    ui.touchWeatherBtn = document.getElementById('touch-weather-btn');
    ui.touchInteractBtn = document.getElementById('touch-interact-btn');
    ui.touchShootBtn = document.getElementById('touch-shoot-btn');
}

function isScreenVisible(node) {
    return !!(node && !node.classList.contains('hidden'));
}

function isInputBlockedByOverlay() {
    return isScreenVisible(ui.settingsScreen)
        || isScreenVisible(ui.guideScreen)
        || isScreenVisible(ui.craftingScreen)
        || isScreenVisible(ui.multiplayerScreen);
}

function syncSettingsUI() {
    const settings = normalizeSettings(state.settings);

    if (ui.settingVolume) ui.settingVolume.value = String(Math.round(settings.masterVolume * 100));
    if (ui.settingVolumeValue) ui.settingVolumeValue.textContent = `${Math.round(settings.masterVolume * 100)}%`;

    if (ui.settingScreenShake) ui.settingScreenShake.value = String(Math.round(settings.screenShakeScale * 100));
    if (ui.settingScreenShakeValue) ui.settingScreenShakeValue.textContent = `${Math.round(settings.screenShakeScale * 100)}%`;

    if (ui.settingSfxEnabled) ui.settingSfxEnabled.checked = settings.sfxEnabled;
    if (ui.settingReduceFlash) ui.settingReduceFlash.checked = settings.reduceFlashes;
    if (ui.settingShowControls) ui.settingShowControls.checked = settings.showControlsHud;
}

function readSettingsFromUI() {
    const nextSettings = {
        masterVolume: ui.settingVolume ? Number(ui.settingVolume.value) / 100 : state.settings.masterVolume,
        screenShakeScale: ui.settingScreenShake ? Number(ui.settingScreenShake.value) / 100 : state.settings.screenShakeScale,
        sfxEnabled: ui.settingSfxEnabled ? !!ui.settingSfxEnabled.checked : state.settings.sfxEnabled,
        reduceFlashes: ui.settingReduceFlash ? !!ui.settingReduceFlash.checked : state.settings.reduceFlashes,
        showControlsHud: ui.settingShowControls ? !!ui.settingShowControls.checked : state.settings.showControlsHud
    };
    state.settings = normalizeSettings(nextSettings);
    syncSettingsUI();
}

function applySettingsRuntime(opts = {}) {
    state.settings = normalizeSettings(state.settings);

    if (AudioManager.initialized) {
        AudioManager.setMasterVolume(state.settings.masterVolume);
    }

    if (ui.controlsHud) {
        ui.controlsHud.classList.toggle('hidden-by-setting', !state.settings.showControlsHud);
    }

    if (opts.save) {
        trackTelemetry('settings_update', {
            volume: Number(state.settings.masterVolume.toFixed(2)),
            shake: Number(state.settings.screenShakeScale.toFixed(2)),
            sfx: state.settings.sfxEnabled ? 1 : 0,
            reduceFlash: state.settings.reduceFlashes ? 1 : 0
        });
        saveProgress();
    }
}

function closeGuideScreen(markSeen = false) {
    if (ui.guideScreen) ui.guideScreen.classList.add('hidden');
    if (markSeen && !state.guideSeen) {
        state.guideSeen = true;
        saveProgress();
    }
}

function openGuideScreen() {
    if (!ui.guideScreen) return;
    ui.guideScreen.classList.remove('hidden');
}

function openSettingsScreen() {
    if (!ui.settingsScreen || isScreenVisible(ui.settingsScreen)) return;
    if (isScreenVisible(ui.perkScreen)) return;

    syncSettingsUI();
    ui.settingsScreen.classList.remove('hidden');

    state.settingsResumeOnClose = false;
    if (state.started && state.phase !== 'GAME_OVER' && !state.paused) {
        state.paused = true;
        state.pauseReason = 'settings';
        state.settingsResumeOnClose = true;
        notifyPlatformGameplayStop();
    }
    state.keys = {};
    updateHUD();
}

function closeSettingsScreen(save = true) {
    if (!ui.settingsScreen || !isScreenVisible(ui.settingsScreen)) return;

    readSettingsFromUI();
    applySettingsRuntime({ save });
    ui.settingsScreen.classList.add('hidden');

    if (state.settingsResumeOnClose && state.started && state.phase !== 'GAME_OVER') {
        state.paused = false;
        state.pauseReason = 'none';
        if (state.phase !== 'DEPLOY') {
            notifyPlatformGameplayStart();
        }
    }
    state.settingsResumeOnClose = false;
    state.keys = {};
    updateHUD();
}

function resetSettingsToDefaults() {
    state.settings = normalizeSettings(DEFAULT_SETTINGS);
    syncSettingsUI();
    applySettingsRuntime({ save: false });
}

function maybeShowFirstTimeGuide() {
    if (!state.guideSeen) {
        openGuideScreen();
    }
}

function getNearbyDeployPortal() {
    if (!state.entities.deployHub || !state.entities.player) return null;
    const player = state.entities.player.position;
    const portals = state.entities.deployHub.portals || [];
    let nearest = null;
    let nearestDist = Infinity;
    const centerX = state.entities.deployHub.x || CONFIG.DEPLOY_HUB_X;
    for (let i = 0; i < portals.length; i++) {
        const portal = portals[i];
        const d = dist2(player.x, player.z, portal.x, portal.z);
        if (d >= CONFIG.DEPLOY_PORTAL_RADIUS) continue;
        if (d < nearestDist - 0.01) {
            nearest = portal;
            nearestDist = d;
            continue;
        }

        // If the player is exactly between portals, bias by side of the hub.
        if (Math.abs(d - nearestDist) <= 0.01) {
            const preferId = isMultiplayerEnabled() && player.x >= centerX ? 'allies' : 'solo';
            if (portal.id === preferId) {
                nearest = portal;
                nearestDist = d;
            }
        }
    }
    return nearest;
}

function getNearbyChest() {
    if (!state.entities.player) return null;
    const player = state.entities.player.position;
    for (let i = 0; i < state.entities.chests.length; i++) {
        const chest = state.entities.chests[i];
        if (!chest.opened && dist2(player.x, player.z, chest.x, chest.z) < 3.5) {
            return chest;
        }
    }
    return null;
}

function getNearbyOpenedChest() {
    if (!state.entities.player) return null;
    const player = state.entities.player.position;
    for (let i = 0; i < state.entities.chests.length; i++) {
        const chest = state.entities.chests[i];
        if (chest.opened && dist2(player.x, player.z, chest.x, chest.z) < 3.5) {
            return chest;
        }
    }
    return null;
}

function getCraftingTableDistance() {
    if (!state.entities.player || !state.entities.craftingTable) return Infinity;
    const player = state.entities.player.position;
    return dist2(player.x, player.z, state.entities.craftingTable.x, state.entities.craftingTable.z);
}

function openChest(chest) {
    if (!chest || chest.opened) return;

    chest.opened = true;
    if (chest.lidPivot) {
        chest.lidPivot.rotation.x = -Math.PI * 0.55;
    }

    const roll = chest.roll;
    let rewardText = 'CHEST OPENED';
    if (roll < 0.3) {
        const woodGain = 2 + Math.floor(random() * 4);
        state.wood += woodGain;
        rewardText = `+${woodGain} WOOD`;
    } else if (roll < 0.58) {
        const shardGain = 1 + Math.floor(random() * 3);
        state.shards += shardGain;
        rewardText = `+${shardGain} SHARDS`;
    } else if (roll < 0.83) {
        const emberGain = grantEmbers(12 + Math.floor(random() * 24), { useDifficulty: false, useCombo: false });
        state.score += emberGain;
        rewardText = `+${emberGain} EMBERS`;
    } else {
        const woodGain = 2 + Math.floor(random() * 3);
        const shardGain = 1 + Math.floor(random() * 2);
        state.wood += woodGain;
        state.shards += shardGain;
        rewardText = `+${woodGain}W +${shardGain}S`;
    }

    if (hasGadget('map_kit') && random() < 0.2) {
        const bonus = 6 + Math.floor(random() * 8);
        const emberGain = grantEmbers(bonus, { useDifficulty: false, useCombo: false });
        state.score += emberGain;
        rewardText += ` +${emberGain}E`;
    }

    addMomentum(4);
    spawnFloatingText(rewardText, chest.mesh.position, '#ffd3a3');
    pushFeed(`Chest loot: ${rewardText}`, 'info');
    AudioManager.play('collect');
    trackTelemetry('chest_open', { day: state.day, reward: rewardText });
    updateHUD();
}

function renderCraftingScreen() {
    if (!ui.craftingOptions) return;
    ui.craftingOptions.innerHTML = '';

    CRAFTING_RECIPES.forEach((recipe) => {
        const owned = hasGadget(recipe.id);
        const costs = recipe.costs || {};
        const afford = hasRecipeResources(recipe);

        const card = document.createElement('button');
        card.type = 'button';
        card.className = `craft-card${owned ? ' owned' : ''}`;
        card.disabled = owned;
        card.innerHTML = `
            <span class="craft-name">${recipe.name}</span>
            <span class="craft-desc">${recipe.desc}</span>
            <span class="craft-cost">WOOD ${costs.wood || 0} • SHARDS ${costs.shards || 0} • EMBERS ${costs.embers || 0}</span>
            <span class="craft-state">${owned ? 'BUILT' : (afford ? 'BUILD' : 'INSUFFICIENT')}</span>
        `;

        if (!owned) {
            card.addEventListener('click', () => craftStructure(recipe.id));
            if (!afford) card.classList.add('insufficient');
        }
        ui.craftingOptions.appendChild(card);
    });
}

function openCraftingScreen() {
    if (!ui.craftingScreen || isScreenVisible(ui.craftingScreen)) return;
    if (state.phase === 'DEPLOY') return;
    if (isScreenVisible(ui.settingsScreen) || isScreenVisible(ui.guideScreen)) return;

    state.craftingResumeOnClose = false;
    if (state.started && state.phase !== 'GAME_OVER' && !state.paused) {
        state.paused = true;
        state.pauseReason = 'crafting';
        state.craftingResumeOnClose = true;
        notifyPlatformGameplayStop();
    }

    if (ui.craftingSubtitle) {
        ui.craftingSubtitle.textContent = `Wood ${Math.floor(state.wood)} • Shards ${Math.floor(state.shards)} • Embers ${Math.floor(state.embers)}`;
    }
    renderCraftingScreen();
    ui.craftingScreen.classList.remove('hidden');
    state.keys = {};
    updateHUD();
}

function closeCraftingScreen() {
    if (!ui.craftingScreen || !isScreenVisible(ui.craftingScreen)) return;
    ui.craftingScreen.classList.add('hidden');
    if (state.craftingResumeOnClose && state.started && state.phase !== 'GAME_OVER') {
        state.paused = false;
        state.pauseReason = 'none';
        if (state.phase !== 'DEPLOY') {
            notifyPlatformGameplayStart();
        }
    }
    state.craftingResumeOnClose = false;
    state.keys = {};
    updateHUD();
}

function craftStructure(recipeId) {
    const recipe = getRecipeById(recipeId);
    if (!recipe) return;
    if (hasGadget(recipe.id)) {
        pushFeed(`${recipe.name} already built.`, 'warn');
        return;
    }
    if (!hasRecipeResources(recipe)) {
        pushFeed(`Need more resources for ${recipe.name}.`, 'warn');
        return;
    }

    const costs = recipe.costs || {};
    state.wood -= costs.wood || 0;
    state.shards -= costs.shards || 0;
    state.embers -= costs.embers || 0;
    state.gadgets[recipe.id] = true;

    if (recipe.id === 'sundial') {
        state.runtime.dayDuration += 16;
        if (state.phase === 'GATHER') {
            state.timeLeft += 10;
        }
    } else if (recipe.id === 'weather_controller') {
        state.weatherControlCooldown = 0;
    }

    spawnFloatingText(`${recipe.name.toUpperCase()} BUILT`, state.entities.player.position, '#9ad4ff');
    pushFeed(`${recipe.name} built at crafting table.`, 'info');
    AudioManager.play('perk');
    addMomentum(8);
    trackTelemetry('craft_build', { id: recipe.id, day: state.day });
    saveProgress();
    if (ui.craftingSubtitle) {
        ui.craftingSubtitle.textContent = `Wood ${Math.floor(state.wood)} • Shards ${Math.floor(state.shards)} • Embers ${Math.floor(state.embers)}`;
    }
    renderCraftingScreen();
    updateHUD();
}

function enterDeploymentHub() {
    AudioManager.init();
    refreshDailyChallenge();
    refreshModeUI();
    if (state.multiplayer.authoritative.active) {
        endAuthoritativeSession('Returned to deployment hub.');
    }

    clearInterval(state.timers.phase);
    clearEnemies();
    clearFlares();
    clearPulses();
    clearTraps();
    clearHazards();
    clearProjectiles();
    clearEmberOrbs();
    clearAlliedSentinels();
    resetDynamicWorld({
        spawnResources: false,
        spawnChests: false,
        spawnBeacons: false
    });

    state.started = true;
    resetRunSystems();
    state.paused = false;
    state.pauseReason = 'none';
    state.phase = 'DEPLOY';
    state.deployment.awaitingChoice = true;
    state.activeChallengeId = '';
    state.currentContract = null;
    state.day = 1;
    state.timeLeft = 0;
    state.health = 100;
    state.stamina = 100;
    state.wood = 0;
    state.shards = 0;
    state.fireRadius = getMaxFireRadius() * 0.58;
    state.keys = {};
    state.touchInput.sprint = false;
    if (state.touchInput.enabled) resetTouchMovement();

    const hubX = CONFIG.DEPLOY_HUB_X;
    const hubZ = CONFIG.DEPLOY_HUB_Z - 5.4;
    const py = terrainHeight(hubX, hubZ) + CONFIG.PLAYER_HEIGHT * 0.5;
    state.entities.player.position.set(hubX, py, hubZ);
    state.entities.player.rotation.y = 0;
    state.playerFacing = 0;
    state.cameraHeading = 0;
    state.cameraTarget.set(hubX, py + 1.65, hubZ);
    world.camera.position.set(hubX, py + 10, hubZ - 12);
    world.camera.lookAt(state.cameraTarget);
    world.camera.fov = 62;
    world.camera.updateProjectionMatrix();

    if (ui.startScreen) ui.startScreen.classList.add('hidden');
    if (ui.shopScreen) ui.shopScreen.classList.add('hidden');
    if (ui.gameOverScreen) ui.gameOverScreen.classList.add('hidden');
    if (ui.perkScreen) ui.perkScreen.classList.add('hidden');
    if (ui.craftingScreen) ui.craftingScreen.classList.add('hidden');
    if (ui.multiplayerScreen) ui.multiplayerScreen.classList.add('hidden');

    pushFeed('Staging Nexus online. Step into Solo Rift to begin. With Others is coming soon.', 'info');
    if (state.multiplayer.inRoom) {
        const hostText = isMultiplayerHost() ? 'You are host.' : 'Host launches multiplayer runs.';
        pushFeed(`Room ${state.multiplayer.roomCode} linked. ${hostText}`, 'info');
    }
    updateHUD();
}

function triggerWeatherControl() {
    if (!state.started || state.phase === 'GAME_OVER' || state.paused) return;
    if (isAuthoritativeCoopActive()) {
        queueAuthoritativeAction('weather');
        return;
    }
    if (!hasGadget('weather_controller')) {
        pushFeed('Build Weather Controller at crafting table first.', 'warn');
        return;
    }
    if (state.weatherControlCooldown > 0) {
        pushFeed(`Weather control recharging ${state.weatherControlCooldown.toFixed(1)}s.`, 'warn');
        return;
    }
    if (state.shards < 2) {
        pushFeed('Need 2 shards to trigger weather control.', 'warn');
        return;
    }

    state.shards -= 2;
    state.weatherControlCooldownMax = CONFIG.WEATHER_CONTROL_COOLDOWN;
    state.weatherControlCooldown = state.weatherControlCooldownMax;
    state.weather.targetRain *= 0.2;
    state.weather.targetWind *= 0.4;
    state.weather.targetFog = Math.max(0.002, state.weather.targetFog * 0.75);
    state.weather.rain *= 0.45;
    state.weather.wind *= 0.6;

    pushFeed('Weather override active. Storm pressure dropping.', 'info');
    spawnFloatingText('WEATHER CALMED', state.entities.player.position, '#8fe4ff');
    triggerFlash('rgba(135, 230, 255, 0.28)', 0.16);
    AudioManager.play('perk');
    trackTelemetry('weather_control', { day: state.day });
    updateHUD();
}

function isTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
}

function resetTouchMovement() {
    state.touchInput.active = false;
    state.touchInput.pointerId = -1;
    state.touchInput.moveX = 0;
    state.touchInput.moveY = 0;
    if (ui.touchStick) {
        ui.touchStick.style.transform = 'translate(-50%, -50%)';
    }
}

function updateTouchControlsVisibility() {
    if (!ui.touchControls) return;
    const shouldShow = state.touchInput.enabled
        && state.started
        && state.phase !== 'GAME_OVER'
        && !state.paused
        && !isScreenVisible(ui.settingsScreen)
        && !isScreenVisible(ui.guideScreen)
        && !isScreenVisible(ui.craftingScreen)
        && !isScreenVisible(ui.multiplayerScreen)
        && !isScreenVisible(ui.shopScreen)
        && !isScreenVisible(ui.perkScreen);
    ui.touchControls.classList.toggle('hidden', !shouldShow);
}

function bindTouchActionButton(node, action, opts = {}) {
    if (!node || typeof action !== 'function') return;
    const repeatMs = Number(opts.repeatMs) || 0;
    let repeatTimer = null;

    const stopRepeat = () => {
        if (repeatTimer !== null) {
            clearInterval(repeatTimer);
            repeatTimer = null;
        }
    };

    node.addEventListener('pointerdown', (event) => {
        if (!state.touchInput.enabled) return;
        event.preventDefault();
        node.setPointerCapture(event.pointerId);
        action();
        if (repeatMs > 0) {
            stopRepeat();
            repeatTimer = setInterval(() => {
                if (!state.started || state.paused) return;
                action();
            }, repeatMs);
        }
    });

    const release = () => stopRepeat();
    node.addEventListener('pointerup', release);
    node.addEventListener('pointercancel', release);
    node.addEventListener('lostpointercapture', release);
}

function initTouchControls() {
    state.touchInput.enabled = isTouchDevice();
    document.body.classList.toggle('touch-mode', state.touchInput.enabled);
    if (!state.touchInput.enabled || !ui.touchMovePad || !ui.touchStick) {
        if (ui.touchControls) ui.touchControls.classList.add('hidden');
        return;
    }

    const updateStickFromPointer = (clientX, clientY) => {
        const rect = ui.touchMovePad.getBoundingClientRect();
        const centerX = rect.left + rect.width * 0.5;
        const centerY = rect.top + rect.height * 0.5;
        const maxDist = rect.width * 0.36;
        const dx = clientX - centerX;
        const dy = clientY - centerY;
        const dist = Math.hypot(dx, dy);
        const scale = dist > maxDist ? maxDist / dist : 1;
        const clampedX = dx * scale;
        const clampedY = dy * scale;

        const normX = clampedX / maxDist;
        const normY = -(clampedY / maxDist);
        const deadzone = CONFIG.TOUCH_DEADZONE;

        state.touchInput.moveX = Math.abs(normX) < deadzone ? 0 : clamp(normX, -1, 1);
        state.touchInput.moveY = Math.abs(normY) < deadzone ? 0 : clamp(normY, -1, 1);
        ui.touchStick.style.transform = `translate(calc(-50% + ${clampedX.toFixed(1)}px), calc(-50% + ${clampedY.toFixed(1)}px))`;
    };

    ui.touchMovePad.addEventListener('pointerdown', (event) => {
        if (!state.touchInput.enabled) return;
        event.preventDefault();
        state.touchInput.active = true;
        state.touchInput.pointerId = event.pointerId;
        ui.touchMovePad.setPointerCapture(event.pointerId);
        updateStickFromPointer(event.clientX, event.clientY);
    });

    ui.touchMovePad.addEventListener('pointermove', (event) => {
        if (!state.touchInput.enabled || !state.touchInput.active || event.pointerId !== state.touchInput.pointerId) return;
        event.preventDefault();
        updateStickFromPointer(event.clientX, event.clientY);
    });

    const clearStick = (event) => {
        if (event && event.pointerId !== state.touchInput.pointerId) return;
        resetTouchMovement();
    };
    ui.touchMovePad.addEventListener('pointerup', clearStick);
    ui.touchMovePad.addEventListener('pointercancel', clearStick);
    ui.touchMovePad.addEventListener('lostpointercapture', clearStick);

    bindTouchActionButton(ui.touchDashBtn, performDash);
    bindTouchActionButton(ui.touchPulseBtn, castPulseBlast);
    bindTouchActionButton(ui.touchWeatherBtn, triggerWeatherControl);
    bindTouchActionButton(ui.touchInteractBtn, interact);
    bindTouchActionButton(ui.touchShootBtn, fireBolt, { repeatMs: 170 });

    if (ui.touchSprintBtn) {
        const setSprint = (active) => {
            state.touchInput.sprint = active;
            ui.touchSprintBtn.classList.toggle('active', active);
        };
        ui.touchSprintBtn.addEventListener('pointerdown', (event) => {
            event.preventDefault();
            ui.touchSprintBtn.setPointerCapture(event.pointerId);
            setSprint(true);
        });
        const releaseSprint = () => setSprint(false);
        ui.touchSprintBtn.addEventListener('pointerup', releaseSprint);
        ui.touchSprintBtn.addEventListener('pointercancel', releaseSprint);
        ui.touchSprintBtn.addEventListener('lostpointercapture', releaseSprint);
    }

    updateTouchControlsVisibility();
}

function initMultiplayer() {
    if (!isMultiplayerEnabled()) {
        state.multiplayer.supported = false;
        if (ui.openMultiplayerBtn) {
            ui.openMultiplayerBtn.disabled = true;
            ui.openMultiplayerBtn.title = 'Multiplayer coming soon';
        }
        setMultiplayerStatus(MULTIPLAYER_DISABLED_MESSAGE, 'warn');
        renderMultiplayerRoster();
        updateMultiplayerRoomUI();
        return;
    }

    if (ui.openMultiplayerBtn) {
        ui.openMultiplayerBtn.disabled = false;
        ui.openMultiplayerBtn.removeAttribute('title');
    }

    state.multiplayer.supported = typeof window !== 'undefined' && typeof window.io === 'function';
    state.multiplayer.name = getStoredMultiplayerName();
    state.multiplayer.clientId = getStoredMultiplayerClientId();
    state.multiplayer.serverUrl = getConfiguredMultiplayerServerUrl();

    if (ui.mpNameInput) {
        ui.mpNameInput.value = state.multiplayer.name;
    }
    if (ui.mpRoomInput) {
        ui.mpRoomInput.addEventListener('input', () => {
            ui.mpRoomInput.value = String(ui.mpRoomInput.value || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
        });
    }
    renderMultiplayerRoster();
    updateMultiplayerRoomUI();

    if (!state.multiplayer.supported) {
        setMultiplayerStatus('Multiplayer service unavailable on this host. Run via node server.', 'warn');
    } else {
        setMultiplayerStatus('Ready. Create or join a room.', 'info');
    }
}

function updateMultiplayerRoomUI() {
    if (!isMultiplayerEnabled()) {
        if (ui.mpRoomDisplay) ui.mpRoomDisplay.textContent = '-';
        if (ui.mpCreateBtn) ui.mpCreateBtn.disabled = true;
        if (ui.mpJoinBtn) ui.mpJoinBtn.disabled = true;
        if (ui.mpLeaveBtn) ui.mpLeaveBtn.disabled = true;
        if (ui.mpCopyCodeBtn) ui.mpCopyCodeBtn.disabled = true;
        if (ui.mpStartBtn) ui.mpStartBtn.disabled = true;
        if (ui.mpStartHint) ui.mpStartHint.textContent = 'Multiplayer is disabled for now. Coming soon.';
        return;
    }

    const players = Array.isArray(state.multiplayer.players) ? state.multiplayer.players : [];
    const connected = !!state.multiplayer.connected;
    const inRoom = !!state.multiplayer.inRoom;
    const host = isMultiplayerHost();
    const enoughPlayers = players.length >= 2;

    if (ui.mpRoomDisplay) {
        ui.mpRoomDisplay.textContent = state.multiplayer.inRoom ? state.multiplayer.roomCode : '-';
    }
    if (ui.mpLeaveBtn) {
        ui.mpLeaveBtn.disabled = !state.multiplayer.inRoom;
    }
    if (ui.mpCopyCodeBtn) {
        ui.mpCopyCodeBtn.disabled = !state.multiplayer.inRoom;
    }
    if (ui.mpStartBtn) {
        ui.mpStartBtn.disabled = !(connected && inRoom && host && enoughPlayers);
    }
    if (ui.mpStartHint) {
        if (!connected) {
            ui.mpStartHint.textContent = 'Connect to multiplayer service first.';
        } else if (!inRoom) {
            ui.mpStartHint.textContent = 'Create or join a room first.';
        } else if (!host) {
            ui.mpStartHint.textContent = 'Only the host can start. Wait for HOST launch.';
        } else if (!enoughPlayers) {
            ui.mpStartHint.textContent = 'Need at least 2 players in room to start.';
        } else {
            ui.mpStartHint.textContent = 'Ready: click Start Co-op (Host) to launch for everyone.';
        }
    }
}

function renderMultiplayerRoster() {
    if (!ui.mpRoster) return;
    ui.mpRoster.innerHTML = '';

    const players = Array.isArray(state.multiplayer.players) ? state.multiplayer.players : [];
    if (!state.multiplayer.inRoom || players.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'roster-empty';
        empty.textContent = 'No players in room.';
        ui.mpRoster.appendChild(empty);
        return;
    }

    players.forEach((player) => {
        const row = document.createElement('div');
        row.className = `roster-row${player.id === state.multiplayer.playerId ? ' self' : ''}`;

        const name = document.createElement('span');
        name.className = 'roster-name';
        const isHost = player.id === state.multiplayer.hostId;
        const isSelf = player.id === state.multiplayer.playerId;
        name.textContent = `${player.name}${isSelf ? ' (You)' : ''}`;

        const meta = document.createElement('span');
        meta.className = 'roster-meta';
        meta.textContent = isHost ? 'HOST' : 'MEMBER';

        row.appendChild(name);
        row.appendChild(meta);
        ui.mpRoster.appendChild(row);
    });
}

function openMultiplayerScreen() {
    if (!ui.multiplayerScreen) return;
    if (!isMultiplayerEnabled()) {
        notifyMultiplayerDisabled();
        return;
    }
    if (state.multiplayer.supported) ensureMultiplayerSocket();
    if (ui.startScreen && (!state.started || state.phase === 'GAME_OVER')) {
        ui.startScreen.classList.add('hidden');
    }
    ui.multiplayerScreen.classList.remove('hidden');
    if (ui.mpNameInput) {
        ui.mpNameInput.value = state.multiplayer.name || getStoredMultiplayerName();
        ui.mpNameInput.focus();
        ui.mpNameInput.select();
    }
    updateMultiplayerRoomUI();
    renderMultiplayerRoster();
}

function closeMultiplayerScreen() {
    if (!ui.multiplayerScreen) return;
    ui.multiplayerScreen.classList.add('hidden');
    if (ui.startScreen && (!state.started || state.phase === 'GAME_OVER')) {
        ui.startScreen.classList.remove('hidden');
    }
}

function getMultiplayerProfileFromUI() {
    const name = sanitizePlayerName(ui.mpNameInput ? ui.mpNameInput.value : state.multiplayer.name);
    state.multiplayer.name = name;
    saveStoredMultiplayerName(name);
    return {
        name,
        skin: state.equippedSkin,
        clientId: state.multiplayer.clientId
    };
}

function ensureMultiplayerSocket() {
    if (!isMultiplayerEnabled()) {
        notifyMultiplayerDisabled();
        return false;
    }
    if (!state.multiplayer.supported) {
        setMultiplayerStatus('Socket client missing. Use npm start server for multiplayer.', 'warn');
        return false;
    }
    if (state.multiplayer.socket) return true;

    if (!state.multiplayer.serverUrl) {
        state.multiplayer.serverUrl = getConfiguredMultiplayerServerUrl();
    }
    const socketTarget = state.multiplayer.serverUrl;
    const socketOpts = {
        transports: ['websocket'],
        reconnection: true,
        timeout: 12000
    };
    const socket = socketTarget
        ? window.io(socketTarget, socketOpts)
        : window.io(socketOpts);
    state.multiplayer.socket = socket;
    state.multiplayer.connecting = true;
    const targetLabel = socketTarget || 'same origin';
    setMultiplayerStatus(`Connecting to multiplayer service (${targetLabel})...`);

    socket.on('connect', () => {
        state.multiplayer.connected = true;
        state.multiplayer.connecting = false;
        state.multiplayer.playerId = socket.id || '';
        setMultiplayerStatus('Connected. Create or join a room.');
        updateMultiplayerRoomUI();

        if (!state.multiplayer.inRoom && state.multiplayer.lastRoomCode) {
            const profile = getMultiplayerProfileFromUI();
            socket.emit('lobby:join', {
                roomCode: state.multiplayer.lastRoomCode,
                name: profile.name,
                skin: profile.skin,
                clientId: profile.clientId
            });
            setMultiplayerStatus(`Rejoining room ${state.multiplayer.lastRoomCode}...`);
        }
    });

    socket.on('disconnect', () => {
        state.multiplayer.connected = false;
        state.multiplayer.connecting = false;
        state.multiplayer.inRoom = false;
        state.multiplayer.roomCode = '';
        state.multiplayer.hostId = '';
        state.multiplayer.players = [];
        state.multiplayer.pingMs = 0;
        setMultiplayerStatus('Disconnected from multiplayer service.', 'warn');
        if (state.multiplayer.authoritative.active) {
            endAuthoritativeSession('Connection lost. Authoritative session closed.');
        }
        clearRemotePlayers();
        updateMultiplayerRoomUI();
        renderMultiplayerRoster();
    });

    socket.on('connect_error', () => {
        state.multiplayer.connected = false;
        state.multiplayer.connecting = false;
        setMultiplayerStatus('Multiplayer connection failed. Check server.', 'danger');
    });

    socket.on('lobby:error', (payload = {}) => {
        const message = String(payload.message || 'Lobby error.');
        setMultiplayerStatus(message, 'danger');
        pushFeed(message, 'warn');
    });

    socket.on('lobby:joined', (payload = {}) => {
        applyLobbySnapshot(payload, true);
    });

    socket.on('lobby:updated', (payload = {}) => {
        applyLobbySnapshot(payload, false);
    });

    socket.on('lobby:left', () => {
        clearLobbyState({ clearResume: true });
    });

    socket.on('player:left', (payload = {}) => {
        const id = payload.id || '';
        if (id) removeRemotePlayer(id);
    });

    socket.on('player:state', (payload = {}) => {
        applyRemotePlayerState(payload);
    });

    socket.on('game:start', (payload = {}) => {
        handleNetworkGameStart(payload);
    });

    socket.on('game:snapshot', (payload = {}) => {
        applyAuthoritativeSnapshot(payload);
    });

    socket.on('game:ended', (payload = {}) => {
        handleAuthoritativeGameEnded(payload);
    });

    socket.on('game:notice', (payload = {}) => {
        const message = String(payload.message || '').trim();
        if (message) pushFeed(message, 'warn');
    });

    return true;
}

function clearLobbyState(opts = {}) {
    if (state.multiplayer.authoritative.active) {
        endAuthoritativeSession('Left multiplayer room.');
        clearInterval(state.timers.phase);
        state.started = false;
        state.phase = 'GAME_OVER';
        state.paused = false;
        state.pauseReason = 'none';
        if (ui.startScreen) ui.startScreen.classList.remove('hidden');
        if (ui.multiplayerScreen) ui.multiplayerScreen.classList.add('hidden');
        updateHUD();
    }
    state.multiplayer.inRoom = false;
    state.multiplayer.roomCode = '';
    if (opts.clearResume) state.multiplayer.lastRoomCode = '';
    state.multiplayer.hostId = '';
    state.multiplayer.players = [];
    state.multiplayer.sendAccumulator = 0;
    state.multiplayer.pingMs = 0;
    clearRemotePlayers();
    updateMultiplayerRoomUI();
    renderMultiplayerRoster();
    setMultiplayerStatus(state.multiplayer.connected
        ? 'Room closed. Create or join another room.'
        : 'Disconnected from multiplayer service.', state.multiplayer.connected ? '' : 'warn');
}

function applyLobbySnapshot(payload = {}, joined = false) {
    const roomCode = String(payload.roomCode || '').toUpperCase().trim();
    if (!roomCode) return;
    state.multiplayer.inRoom = true;
    state.multiplayer.roomCode = roomCode;
    state.multiplayer.lastRoomCode = roomCode;
    state.multiplayer.hostId = String(payload.hostId || '');
    state.multiplayer.players = Array.isArray(payload.players)
        ? payload.players.map((entry) => ({
            id: String(entry.id || ''),
            name: sanitizePlayerName(entry.name || 'Ranger'),
            skin: String(entry.skin || 'standard')
        }))
        : [];

    if (ui.mpRoomInput) ui.mpRoomInput.value = roomCode;
    const hostName = (state.multiplayer.players.find((p) => p.id === state.multiplayer.hostId) || {}).name || 'Unknown';
    setMultiplayerStatus(`Room ${roomCode} linked. Host: ${hostName}.`);
    updateMultiplayerRoomUI();
    renderMultiplayerRoster();
    syncRemotePlayersFromRoster();

    if (joined) {
        pushFeed(`Joined room ${roomCode}.`, 'info');
    }
}

function createMultiplayerRoom() {
    const socketReady = ensureMultiplayerSocket();
    if (!socketReady || !state.multiplayer.socket) return;
    const profile = getMultiplayerProfileFromUI();
    setMultiplayerStatus('Creating room...');
    state.multiplayer.socket.emit('lobby:create', profile);
}

function startMultiplayerFromLobby() {
    const launched = requestNetworkRunStart();
    if (launched) {
        closeMultiplayerScreen();
    }
}

function joinMultiplayerRoom() {
    const socketReady = ensureMultiplayerSocket();
    if (!socketReady || !state.multiplayer.socket) return;
    const roomCode = String(ui.mpRoomInput ? ui.mpRoomInput.value : '').toUpperCase().trim();
    if (!roomCode) {
        setMultiplayerStatus('Enter a room code to join.', 'warn');
        return;
    }
    const profile = getMultiplayerProfileFromUI();
    setMultiplayerStatus(`Joining room ${roomCode}...`);
    state.multiplayer.socket.emit('lobby:join', {
        roomCode,
        name: profile.name,
        skin: profile.skin,
        clientId: profile.clientId
    });
}

function leaveMultiplayerRoom() {
    if (state.multiplayer.socket && state.multiplayer.connected && state.multiplayer.inRoom) {
        state.multiplayer.socket.emit('lobby:leave');
    }
    clearLobbyState({ clearResume: true });
}

function updateMultiplayerProfile() {
    if (!state.multiplayer.socket || !state.multiplayer.connected || !state.multiplayer.inRoom) return;
    const profile = {
        name: sanitizePlayerName(state.multiplayer.name || (ui.mpNameInput ? ui.mpNameInput.value : 'Ranger')),
        skin: state.equippedSkin,
        clientId: state.multiplayer.clientId
    };
    state.multiplayer.socket.emit('lobby:update-profile', profile);
}

function applyAuthoritativeSnapshot(payload = {}) {
    if (!payload || !payload.authoritative) return;
    if (!state.multiplayer.inRoom || payload.roomCode !== state.multiplayer.roomCode) return;

    if (!state.multiplayer.authoritative.active) {
        beginAuthoritativeCoopRun({
            selectedMode: state.selectedMode,
            selectedDifficulty: state.selectedDifficulty,
            seed: payload.seed || ''
        });
    }

    const prevPhase = state.phase;
    state.phase = payload.phase || state.phase;
    state.day = Number(payload.day) || state.day;
    state.timeLeft = Number(payload.timeLeft) || 0;
    state.fireRadius = clamp(Number(payload.fireRadius) || state.fireRadius, 0, getMaxFireRadius());
    if (state.phase !== prevPhase) {
        setWeatherTargets();
    }

    if (payload.director && typeof payload.director === 'object') {
        state.director.intensity = Number(payload.director.intensity) || state.director.intensity;
        state.director.target = Number(payload.director.target) || state.director.target;
        state.director.wavesSpawned = Number(payload.director.wavesSpawned) || state.director.wavesSpawned;
    }

    if (payload.nightEvent && typeof payload.nightEvent === 'object') {
        const n = payload.nightEvent;
        state.nightEvent.triggerTimer = Number(n.triggerTimer) || 0;
        state.nightEvent.active = !!n.active;
        state.nightEvent.resolved = !!n.resolved;
        state.nightEvent.kind = String(n.kind || '');
        state.nightEvent.label = String(n.label || '');
        state.nightEvent.timer = Number(n.timer) || 0;
        state.nightEvent.duration = Number(n.duration) || 0;
        state.nightEvent.goal = Number(n.goal) || 0;
        state.nightEvent.progress = Number(n.progress) || 0;
        state.nightEvent.reward = Number(n.reward) || 0;
        state.nightEvent.outcome = String(n.outcome || 'none');
        state.nightEvent.completedCount = Number(n.completedCount) || state.nightEvent.completedCount;
        state.nightEvent.failedCount = Number(n.failedCount) || state.nightEvent.failedCount;
    }

    if (payload.nemesis && payload.nemesis.profile) {
        const p = payload.nemesis.profile;
        state.nemesisProfile.name = String(p.name || state.nemesisProfile.name);
        state.nemesisProfile.rank = Number(p.rank) || state.nemesisProfile.rank;
        state.nemesisProfile.rage = Number(p.rage) || 0;
        state.nemesisProfile.bounty = Number(p.bounty) || 0;
        state.nemesisProfile.kills = Number(p.kills) || 0;
        state.nemesisProfile.encounters = Number(p.encounters) || 0;
        state.nemesisProfile.lastOutcome = String(p.lastOutcome || 'none');
        state.nemesisProfile.lastSeenDay = Number(p.lastSeenDay) || 0;
    }
    if (payload.nemesis && payload.nemesis.runtime) {
        const r = payload.nemesis.runtime;
        state.nemesisRuntime.spawnTimer = Number(r.spawnTimer) || 0;
        state.nemesisRuntime.spawned = !!r.spawned;
        state.nemesisRuntime.resolved = !!r.resolved;
        state.nemesisRuntime.killed = !!r.killed;
    }

    const players = Array.isArray(payload.players) ? payload.players : [];
    const selfId = state.multiplayer.playerId;
    const seenRemote = new Set();

    for (let i = 0; i < players.length; i++) {
        const p = players[i];
        const id = String(p.id || '');
        if (!id) continue;

        if (id === selfId) {
            const x = Number(p.x) || 0;
            const y = Number(p.y) || (terrainHeight(x, Number(p.z) || 0) + CONFIG.PLAYER_HEIGHT * 0.5);
            const z = Number(p.z) || 0;
            state.multiplayer.authoritative.localTargetPos.set(x, y, z);
            state.multiplayer.authoritative.localTargetRot = Number(p.rot) || state.playerFacing;
            state.health = clamp(Number(p.health) || state.health, 0, 100);
            state.wood = Math.max(0, Math.floor(Number(p.wood) || 0));
            state.shards = Math.max(0, Math.floor(Number(p.shards) || 0));
            state.embers = Math.max(0, Math.floor(Number(p.embers) || state.embers));
            state.score = Math.max(0, Number(p.score) || state.score);
            state.multiplayer.pingMs = Math.max(0, Math.floor(Number(p.pingMs) || 0));

            if (p.cooldowns && typeof p.cooldowns === 'object') {
                const caps = payload.cooldownCaps || {};
                state.dashCooldown = Math.max(0, Number(p.cooldowns.dash) || 0);
                state.pulseCooldown = Math.max(0, Number(p.cooldowns.pulse) || 0);
                state.boltCooldown = Math.max(0, Number(p.cooldowns.shoot) || 0);
                state.weatherControlCooldown = Math.max(0, Number(p.cooldowns.weather) || 0);
                state.dashCooldownMax = Math.max(0.001, Number(caps.dash) || state.dashCooldownMax);
                state.pulseCooldownMax = Math.max(0.001, Number(caps.pulse) || state.pulseCooldownMax);
                state.boltCooldownMax = Math.max(0.001, Number(caps.shoot) || state.boltCooldownMax);
                state.weatherControlCooldownMax = Math.max(0.001, Number(caps.weather) || state.weatherControlCooldownMax);
            }
            continue;
        }

        seenRemote.add(id);
        if (!state.entities.remotePlayers[id]) {
            createRemotePlayer({
                id,
                name: p.name || 'Ranger',
                skin: p.skin || 'standard'
            });
        } else {
            updateRemotePlayerVisual(id, {
                name: p.name || 'Ranger',
                skin: p.skin || 'standard'
            });
        }

        applyRemotePlayerState({
            id,
            state: {
                x: Number(p.x) || 0,
                y: Number(p.y) || terrainHeight(Number(p.x) || 0, Number(p.z) || 0) + CONFIG.PLAYER_HEIGHT * 0.5,
                z: Number(p.z) || 0,
                rot: Number(p.rot) || 0,
                skin: p.skin || 'standard'
            }
        });
    }

    Object.keys(state.entities.remotePlayers).forEach((id) => {
        if (!seenRemote.has(id)) removeRemotePlayer(id);
    });

    if (payload.resources && typeof payload.resources === 'object') {
        const resources = payload.resources;
        if (Array.isArray(resources.wood)) {
            syncAuthoritativeResourceCollection('wood', resources.wood);
        }
        if (Array.isArray(resources.shards)) {
            syncAuthoritativeResourceCollection('shards', resources.shards);
        }
    }
    if (Array.isArray(payload.chests)) {
        syncAuthoritativeChests(payload.chests);
    }
    syncAuthoritativeEnemies(Array.isArray(payload.enemies) ? payload.enemies : []);
    syncAuthoritativeTraps(Array.isArray(payload.traps) ? payload.traps : []);
    syncAuthoritativeFlares(Array.isArray(payload.flares) ? payload.flares : []);
    rebuildAuthoritativeMirrorArrays();
}

function handleAuthoritativeGameEnded(payload = {}) {
    if (!state.multiplayer.authoritative.active) return;
    const reason = String(payload.reason || 'Authoritative session ended.');
    endAuthoritativeSession(reason);
    endGame(reason, {
        title: 'TEAM EXTINGUISHED',
        message: `${reason} Survived ${Math.max(1, Number(payload.day) || state.day)} day(s) in co-op.`,
        skipBasePayout: true,
        customPayout: 0,
        endType: 'defeat',
        feedKind: 'danger',
        feedText: reason
    });
}

function copyMultiplayerCode() {
    if (!state.multiplayer.inRoom || !state.multiplayer.roomCode) return;
    const code = state.multiplayer.roomCode;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
            pushFeed(`Room code copied: ${code}`, 'info');
        }).catch(() => {
            pushFeed(`Room code: ${code}`, 'info');
        });
        return;
    }
    pushFeed(`Room code: ${code}`, 'info');
}

function getPlayerColorFromSkin(skinId) {
    const skin = SKINS[skinId] || SKINS.standard;
    return {
        color: skin.color,
        emissive: skin.emissive
    };
}

function createNameTagSprite(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(8, 12, 18, 0.74)';
    ctx.fillRect(24, 34, 464, 60);
    ctx.strokeStyle = 'rgba(161, 208, 255, 0.82)';
    ctx.lineWidth = 3;
    ctx.strokeRect(24, 34, 464, 60);
    ctx.font = '700 44px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#e4f3ff';
    ctx.fillText(sanitizePlayerName(text), 256, 64);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        depthWrite: false
    });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(3.8, 0.95, 1);
    sprite.position.set(0, 2.7, 0);
    return { sprite, texture, material };
}

function createRemotePlayer(playerData) {
    const player = {
        id: playerData.id,
        name: sanitizePlayerName(playerData.name || 'Ranger'),
        skin: String(playerData.skin || 'standard')
    };
    const colors = getPlayerColorFromSkin(player.skin);

    const group = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({
        color: colors.color,
        emissive: colors.emissive,
        emissiveIntensity: 0.65,
        roughness: 0.36,
        metalness: 0.28
    });
    const coreMat = new THREE.MeshStandardMaterial({
        color: 0xffd58d,
        emissive: 0xff7a2e,
        emissiveIntensity: 1.2,
        roughness: 0.16,
        metalness: 0.5
    });

    const torso = new THREE.Mesh(
        THREE.CapsuleGeometry
            ? new THREE.CapsuleGeometry(0.34, 1.12, 6, 10)
            : new THREE.CylinderGeometry(0.34, 0.34, 1.58, 12),
        bodyMat
    );
    torso.position.y = 0.38;
    torso.castShadow = true;
    torso.receiveShadow = true;
    group.add(torso);

    const head = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 12), bodyMat);
    head.position.y = 1.48;
    head.castShadow = true;
    head.receiveShadow = true;
    group.add(head);

    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.2, 12), coreMat);
    core.rotation.x = Math.PI * 0.5;
    core.position.set(0, 0.56, 0.36);
    core.castShadow = true;
    group.add(core);

    const tag = createNameTagSprite(player.name);
    group.add(tag.sprite);

    const y = terrainHeight(0, 0) + CONFIG.PLAYER_HEIGHT * 0.5;
    group.position.set(0, y, 8);
    group.rotation.y = 0;
    world.scene.add(group);

    state.entities.remotePlayers[player.id] = {
        id: player.id,
        name: player.name,
        skin: player.skin,
        mesh: group,
        torso,
        core,
        bodyMat,
        coreMat,
        labelSprite: tag.sprite,
        labelTexture: tag.texture,
        labelMaterial: tag.material,
        targetPos: new THREE.Vector3(group.position.x, group.position.y, group.position.z),
        velocity: new THREE.Vector3(),
        targetRot: 0,
        lastSeen: performance.now(),
        lastStateAt: 0,
        seenState: false
    };
}

function updateRemotePlayerVisual(id, playerData) {
    const remote = state.entities.remotePlayers[id];
    if (!remote) return;
    const previousName = remote.name;
    const previousSkin = remote.skin;
    const name = sanitizePlayerName(playerData.name || remote.name || 'Ranger');
    const skin = String(playerData.skin || remote.skin || 'standard');
    remote.name = name;
    if (skin !== remote.skin) {
        remote.skin = skin;
        const colors = getPlayerColorFromSkin(skin);
        remote.bodyMat.color.setHex(colors.color);
        remote.bodyMat.emissive.setHex(colors.emissive);
    }

    if (name === previousName && skin === previousSkin) return;
    if (remote.labelSprite) remote.mesh.remove(remote.labelSprite);
    if (remote.labelTexture) remote.labelTexture.dispose();
    if (remote.labelMaterial) remote.labelMaterial.dispose();
    const nextTag = createNameTagSprite(name);
    remote.labelSprite = nextTag.sprite;
    remote.labelTexture = nextTag.texture;
    remote.labelMaterial = nextTag.material;
    remote.mesh.add(nextTag.sprite);
}

function removeRemotePlayer(id) {
    const remote = state.entities.remotePlayers[id];
    if (!remote) return;
    if (remote.mesh && remote.mesh.traverse) {
        remote.mesh.traverse((node) => {
            if (node && node.isMesh && node.geometry) node.geometry.dispose();
        });
    }
    if (remote.labelTexture) remote.labelTexture.dispose();
    if (remote.labelMaterial) remote.labelMaterial.dispose();
    if (remote.bodyMat) remote.bodyMat.dispose();
    if (remote.coreMat) remote.coreMat.dispose();
    if (remote.mesh && remote.mesh.parent) {
        remote.mesh.parent.remove(remote.mesh);
    }
    delete state.entities.remotePlayers[id];
}

function clearRemotePlayers() {
    const ids = Object.keys(state.entities.remotePlayers);
    for (let i = 0; i < ids.length; i++) {
        removeRemotePlayer(ids[i]);
    }
}

function syncRemotePlayersFromRoster() {
    if (!state.multiplayer.inRoom) {
        clearRemotePlayers();
        return;
    }

    const active = new Set();
    const players = Array.isArray(state.multiplayer.players) ? state.multiplayer.players : [];
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (!player.id || player.id === state.multiplayer.playerId) continue;
        active.add(player.id);
        if (!state.entities.remotePlayers[player.id]) {
            createRemotePlayer(player);
        } else {
            updateRemotePlayerVisual(player.id, player);
        }
    }

    Object.keys(state.entities.remotePlayers).forEach((id) => {
        if (!active.has(id)) removeRemotePlayer(id);
    });
}

function applyRemotePlayerState(payload = {}) {
    if (!state.multiplayer.inRoom || !state.multiplayer.connected) return;
    const id = String(payload.id || '');
    if (!id || id === state.multiplayer.playerId) return;
    const snapshot = payload.state || {};
    const x = Number(snapshot.x);
    const y = Number(snapshot.y);
    const z = Number(snapshot.z);
    const rot = Number(snapshot.rot);
    if (![x, y, z, rot].every(Number.isFinite)) return;

    if (!state.entities.remotePlayers[id]) {
        const rosterPlayer = (state.multiplayer.players || []).find((p) => p.id === id)
            || { id, name: 'Ranger', skin: snapshot.skin || 'standard' };
        createRemotePlayer(rosterPlayer);
    }
    const remote = state.entities.remotePlayers[id];
    if (!remote) return;
    if (snapshot.skin && snapshot.skin !== remote.skin) {
        updateRemotePlayerVisual(id, { skin: snapshot.skin, name: remote.name });
    }

    const now = performance.now();
    if (remote.lastStateAt > 0) {
        const dtSec = clamp((now - remote.lastStateAt) / 1000, 0.016, 0.35);
        remote.velocity.set(
            (x - remote.targetPos.x) / dtSec,
            (y - remote.targetPos.y) / dtSec,
            (z - remote.targetPos.z) / dtSec
        );
    } else {
        remote.velocity.set(0, 0, 0);
    }
    remote.targetPos.set(x, y, z);
    remote.targetRot = rot;
    remote.lastSeen = now;
    remote.lastStateAt = now;
    remote.seenState = true;
}

function updateRemotePlayers(dt) {
    const ids = Object.keys(state.entities.remotePlayers);
    if (ids.length === 0) return;
    const now = performance.now();
    const posLerp = 1 - Math.exp(-dt * CONFIG.MULTIPLAYER_REMOTE_POS_INTERP);
    const rotLerp = 1 - Math.exp(-dt * CONFIG.MULTIPLAYER_REMOTE_ROT_INTERP);
    const extrapMaxSec = CONFIG.MULTIPLAYER_REMOTE_EXTRAP_MS / 1000;

    for (let i = 0; i < ids.length; i++) {
        const remote = state.entities.remotePlayers[ids[i]];
        if (!remote || !remote.mesh) continue;

        if (remote.seenState && (now - remote.lastSeen > CONFIG.MULTIPLAYER_REMOTE_TIMEOUT * 1000)) {
            removeRemotePlayer(remote.id);
            continue;
        }

        const extrapSec = remote.lastStateAt > 0
            ? clamp((now - remote.lastStateAt) / 1000, 0, extrapMaxSec)
            : 0;
        TMP.remotePredPos.copy(remote.targetPos).addScaledVector(remote.velocity, extrapSec);
        remote.mesh.position.lerp(TMP.remotePredPos, posLerp);
        remote.mesh.rotation.y = lerpAngle(remote.mesh.rotation.y, remote.targetRot, rotLerp);
        if (remote.coreMat) {
            remote.coreMat.emissiveIntensity = 0.88 + Math.sin(world.time * 6 + i) * 0.28;
        }
    }
}

function emitMultiplayerState(dt) {
    if (!state.multiplayer.socket || !state.multiplayer.connected || !state.multiplayer.inRoom) return;
    if (!state.started || state.phase === 'GAME_OVER' || !state.entities.player) return;

    if (isAuthoritativeCoopActive()) {
        const move = getMovementDirection();
        const moveLen = Math.hypot(move.x, move.z);
        const mx = moveLen > 0.001 ? move.x / moveLen : 0;
        const mz = moveLen > 0.001 ? move.z / moveLen : 0;
        const sprinting = !!(state.keys.shift || state.keys.shiftleft || state.keys.shiftright || state.touchInput.sprint);

        const queue = state.multiplayer.authoritative.actionQueue;
        const hasPendingActions = !!(queue.interact || queue.pulse || queue.shoot || queue.dash || queue.weather || queue.trap || queue.flare || queue.craft);
        const idleInterval = CONFIG.MULTIPLAYER_IDLE_SEND_INTERVAL;
        const sendInterval = (moveLen < 0.001 && !sprinting && !hasPendingActions)
            ? idleInterval
            : CONFIG.MULTIPLAYER_SEND_INTERVAL;

        state.multiplayer.sendAccumulator += dt;
        if (state.multiplayer.sendAccumulator < sendInterval) return;
        state.multiplayer.sendAccumulator = 0;

        state.multiplayer.inputSeq += 1;

        state.multiplayer.socket.emit('player:input', {
            mx: netRound(mx, 4),
            mz: netRound(mz, 4),
            sprint: sprinting,
            look: netRound(state.playerFacing, 4),
            seq: state.multiplayer.inputSeq,
            sentAt: Date.now(),
            actions: takeAuthoritativeActions()
        });
        return;
    }

    state.multiplayer.sendAccumulator += dt;
    if (state.multiplayer.sendAccumulator < CONFIG.MULTIPLAYER_SEND_INTERVAL) return;
    state.multiplayer.sendAccumulator = 0;

    const p = state.entities.player.position;
    state.multiplayer.socket.emit('player:state', {
        x: netRound(p.x),
        y: netRound(p.y),
        z: netRound(p.z),
        rot: netRound(state.playerFacing),
        phase: state.phase,
        day: state.day,
        health: netRound(state.health, 1),
        skin: state.equippedSkin,
        partyMode: state.partyMode
    });
}

function requestNetworkRunStart() {
    if (!isMultiplayerEnabled()) {
        notifyMultiplayerDisabled();
        return false;
    }
    if (!state.multiplayer.socket || !state.multiplayer.connected || !state.multiplayer.inRoom) {
        openMultiplayerScreen();
        setMultiplayerStatus('Join a multiplayer room before entering With Others.', 'warn');
        return false;
    }
    if (!isMultiplayerHost()) {
        pushFeed('Host launches the multiplayer run.', 'warn');
        return false;
    }
    if (!Array.isArray(state.multiplayer.players) || state.multiplayer.players.length < 2) {
        pushFeed('Need at least 2 players in room for co-op launch.', 'warn');
        return false;
    }

    updateMultiplayerProfile();
    state.multiplayer.socket.emit('game:start-request', {
        partyMode: 'allies',
        selectedMode: state.selectedMode,
        selectedDifficulty: state.selectedDifficulty,
        authoritative: true
    });
    setMultiplayerStatus('Launching multiplayer run...');
    return true;
}

function handleNetworkGameStart(payload = {}) {
    if (!isMultiplayerEnabled()) return;
    if (!payload || payload.partyMode !== 'allies') return;
    if (!state.multiplayer.inRoom || payload.roomCode !== state.multiplayer.roomCode) return;

    setSelectedMode(payload.selectedMode, { silent: true, force: true });
    if (payload.selectedMode !== 'daily') {
        state.selectedDifficulty = ['easy', 'normal', 'hard'].includes(payload.selectedDifficulty)
            ? payload.selectedDifficulty
            : state.selectedDifficulty;
        syncDifficultyButtons();
    }

    const starter = (state.multiplayer.players || []).find((p) => p.id === payload.by);
    if (starter) {
        pushFeed(`Multiplayer launch by ${starter.name}.`, 'info');
    } else {
        pushFeed('Multiplayer launch confirmed.', 'info');
    }

    if (payload.authoritative) {
        beginAuthoritativeCoopRun(payload);
        return;
    }

    beginForestRun('allies', {
        fromNetwork: true,
        networkSeed: String(payload.seed || '')
    });
}

function bindUIActions() {
    if (ui.startBtn) {
        ui.startBtn.addEventListener('click', startGame);
    }
    if (ui.rewardedEmbersBtn) {
        ui.rewardedEmbersBtn.addEventListener('click', claimStartBonusReward);
    }
    if (ui.restartBtn) {
        ui.restartBtn.addEventListener('click', startGame);
    }
    if (ui.gameOverRewardedBtn) {
        ui.gameOverRewardedBtn.addEventListener('click', claimGameOverRewardBonus);
    }
    if (ui.openMultiplayerBtn) {
        ui.openMultiplayerBtn.addEventListener('click', openMultiplayerScreen);
    }

    if (ui.openShopBtn) {
        ui.openShopBtn.addEventListener('click', () => toggleShop(true));
    }
    if (ui.closeShopBtn) {
        ui.closeShopBtn.addEventListener('click', () => toggleShop(false));
    }
    if (ui.quickShopBtn) {
        ui.quickShopBtn.addEventListener('click', () => {
            if (state.phase === 'GAME_OVER' || !state.started) {
                toggleShop(true);
            }
        });
    }
    if (ui.settingsBtn) {
        ui.settingsBtn.addEventListener('click', openSettingsScreen);
    }
    if (ui.openSettingsStartBtn) {
        ui.openSettingsStartBtn.addEventListener('click', openSettingsScreen);
    }
    if (ui.openGuideBtn) {
        ui.openGuideBtn.addEventListener('click', openGuideScreen);
    }
    if (ui.guideCloseBtn) {
        ui.guideCloseBtn.addEventListener('click', () => closeGuideScreen(true));
    }
    if (ui.closeSettingsBtn) {
        ui.closeSettingsBtn.addEventListener('click', () => closeSettingsScreen(true));
    }
    if (ui.applySettingsBtn) {
        ui.applySettingsBtn.addEventListener('click', () => closeSettingsScreen(true));
    }
    if (ui.resetSettingsBtn) {
        ui.resetSettingsBtn.addEventListener('click', resetSettingsToDefaults);
    }
    if (ui.closeCraftingBtn) {
        ui.closeCraftingBtn.addEventListener('click', closeCraftingScreen);
    }
    if (ui.closeMultiplayerBtn) {
        ui.closeMultiplayerBtn.addEventListener('click', closeMultiplayerScreen);
    }
    if (ui.mpCreateBtn) {
        ui.mpCreateBtn.addEventListener('click', createMultiplayerRoom);
    }
    if (ui.mpJoinBtn) {
        ui.mpJoinBtn.addEventListener('click', joinMultiplayerRoom);
    }
    if (ui.mpLeaveBtn) {
        ui.mpLeaveBtn.addEventListener('click', leaveMultiplayerRoom);
    }
    if (ui.mpStartBtn) {
        ui.mpStartBtn.addEventListener('click', startMultiplayerFromLobby);
    }
    if (ui.mpCopyCodeBtn) {
        ui.mpCopyCodeBtn.addEventListener('click', copyMultiplayerCode);
    }
    if (ui.mpNameInput) {
        ui.mpNameInput.addEventListener('change', () => {
            state.multiplayer.name = sanitizePlayerName(ui.mpNameInput.value);
            ui.mpNameInput.value = state.multiplayer.name;
            saveStoredMultiplayerName(state.multiplayer.name);
            updateMultiplayerProfile();
            renderMultiplayerRoster();
        });
    }
    if (ui.mpRoomInput) {
        ui.mpRoomInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                joinMultiplayerRoom();
            }
        });
    }

    const liveSettingsInputs = [
        ui.settingVolume,
        ui.settingScreenShake,
        ui.settingSfxEnabled,
        ui.settingReduceFlash,
        ui.settingShowControls
    ];
    liveSettingsInputs.forEach((node) => {
        if (!node) return;
        node.addEventListener('input', () => {
            readSettingsFromUI();
            applySettingsRuntime({ save: false });
        });
        node.addEventListener('change', () => {
            readSettingsFromUI();
            applySettingsRuntime({ save: false });
        });
    });

    ui.shopTabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach((node) => node.classList.remove('active'));
            document.querySelectorAll('.shop-content').forEach((node) => node.classList.add('hidden'));
            tab.classList.add('active');
            const target = document.getElementById(`${tab.dataset.tab}-tab`);
            if (target) target.classList.remove('hidden');
        });
    });

    document.querySelectorAll('.buy-btn').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const item = event.currentTarget.closest('.shop-item');
            if (!item) return;
            const price = Number(item.dataset.price || 0);
            const id = item.dataset.id;
            purchaseItem(id, price);
        });
    });

    document.querySelectorAll('.difficulty-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            if (state.selectedMode === 'daily') return;
            document.querySelectorAll('.difficulty-btn').forEach((node) => node.classList.remove('active'));
            btn.classList.add('active');
            state.selectedDifficulty = btn.dataset.difficulty;
            pushFeed(`Difficulty: ${(DIFFICULTY[state.selectedDifficulty] || DIFFICULTY.normal).name}`, 'info');
        });
    });

    if (ui.modeButtons) {
        ui.modeButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                setSelectedMode(btn.dataset.mode);
            });
        });
    }
}

function bindInput() {
    window.addEventListener('keydown', (event) => {
        const key = event.key.toLowerCase();

        if (event.key === 'Escape') {
            event.preventDefault();
            if (isScreenVisible(ui.settingsScreen)) {
                closeSettingsScreen(true);
            } else if (isScreenVisible(ui.craftingScreen)) {
                closeCraftingScreen();
            } else if (isScreenVisible(ui.guideScreen)) {
                closeGuideScreen(true);
            } else if (isScreenVisible(ui.multiplayerScreen)) {
                closeMultiplayerScreen();
            } else {
                openSettingsScreen();
            }
            return;
        }

        if (isInputBlockedByOverlay()) return;

        state.keys[key] = true;

        if (key === 'e') {
            interact();
        }
        if (key === 'q') {
            castFlare();
        }
        if (key === 'f') {
            castPulseBlast();
        }
        if (key === 'r') {
            deployTrap();
        }
        if (key === 'c') {
            craftWeaponOrAmmo();
        }
        if (key === 'x') {
            fireBolt();
        }
        if (key === 'v') {
            triggerWeatherControl();
        }
        if (event.key === ' ') {
            event.preventDefault();
            performDash();
        }
        if ((key === '1' || key === '2' || key === '3') && state.paused && ui.perkScreen && !ui.perkScreen.classList.contains('hidden')) {
            const idx = Number(key) - 1;
            const optionBtn = ui.perkOptions ? ui.perkOptions.querySelectorAll('.perk-card')[idx] : null;
            if (optionBtn) optionBtn.click();
        }
        if (key === 'm' && (!state.started || state.phase === 'DEPLOY' || state.phase === 'GAME_OVER')) {
            event.preventDefault();
            notifyMultiplayerDisabled();
        }
    });

    window.addEventListener('keyup', (event) => {
        state.keys[event.key.toLowerCase()] = false;
    });

    window.addEventListener('blur', () => {
        state.keys = {};
        state.touchInput.sprint = false;
        if (state.touchInput.enabled) resetTouchMovement();
    });

    window.addEventListener('resize', onWindowResize);
}

function initRenderer() {
    world.canvas = document.getElementById('gameCanvas');
    world.renderer = new THREE.WebGLRenderer({
        canvas: world.canvas,
        antialias: true,
        powerPreference: 'high-performance'
    });

    world.renderer.shadowMap.enabled = true;
    world.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    world.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    world.renderer.setSize(window.innerWidth, window.innerHeight);

    if ('outputColorSpace' in world.renderer && THREE.SRGBColorSpace) {
        world.renderer.outputColorSpace = THREE.SRGBColorSpace;
    } else if ('outputEncoding' in world.renderer && THREE.sRGBEncoding) {
        world.renderer.outputEncoding = THREE.sRGBEncoding;
    }

    if ('toneMapping' in world.renderer) {
        world.renderer.toneMapping = THREE.ACESFilmicToneMapping || THREE.ReinhardToneMapping;
        world.renderer.toneMappingExposure = 1.05;
    }

    world.camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 900);
    world.camera.position.set(0, 20, 34);
}

function initSceneAndMaterials() {
    world.scene = new THREE.Scene();
    world.scene.background = new THREE.Color(0x0f1524);
    world.scene.fog = new THREE.FogExp2(0x0b1018, 0.0022);

    mats.ground = new THREE.MeshStandardMaterial({
        color: 0x27313f,
        roughness: 0.95,
        metalness: 0.05,
        flatShading: false
    });

    mats.treeTrunk = new THREE.MeshStandardMaterial({ color: 0x4a3422, roughness: 1, metalness: 0.02 });
    mats.treeLeaves = new THREE.MeshStandardMaterial({ color: 0x2c4d35, roughness: 0.86, metalness: 0.04 });
    mats.grass = new THREE.MeshStandardMaterial({ color: 0x2f5a3a, roughness: 0.8, metalness: 0.02 });
    mats.log = new THREE.MeshStandardMaterial({ color: 0x6a4530, roughness: 0.9 });
    mats.enemy = new THREE.MeshStandardMaterial({
        color: 0xff5f6d,
        emissive: 0x6f1025,
        emissiveIntensity: 1.7,
        roughness: 0.28,
        metalness: 0.3,
        transparent: true,
        opacity: 0.84
    });

    mats.shard = new THREE.MeshStandardMaterial({
        color: 0x9ceaff,
        emissive: 0x2a7baa,
        emissiveIntensity: 1.6,
        roughness: 0.2,
        metalness: 0.45
    });

    mats.wood = new THREE.MeshStandardMaterial({
        color: 0xb57745,
        roughness: 0.7,
        metalness: 0.1
    });

    mats.beaconBase = new THREE.MeshStandardMaterial({ color: 0x6f6f76, roughness: 0.65, metalness: 0.25 });
    mats.beaconCoreDormant = new THREE.MeshStandardMaterial({
        color: 0x6382a1,
        emissive: 0x0b1a30,
        emissiveIntensity: 0.8,
        roughness: 0.16,
        metalness: 0.6
    });
    mats.beaconCoreLit = new THREE.MeshStandardMaterial({
        color: 0xffc66d,
        emissive: 0xff7d29,
        emissiveIntensity: 2.1,
        roughness: 0.15,
        metalness: 0.55
    });

    mats.flare = new THREE.MeshBasicMaterial({
        color: 0x66d1ff,
        transparent: true,
        opacity: 0.26
    });

    mats.fireParticle = new THREE.MeshBasicMaterial({
        color: 0xffa45a,
        transparent: true,
        opacity: 0.84
    });

    mats.trapBase = new THREE.MeshStandardMaterial({
        color: 0x6b7ba1,
        emissive: 0x1e2b52,
        emissiveIntensity: 1.15,
        roughness: 0.26,
        metalness: 0.74
    });

    const hemisphere = new THREE.HemisphereLight(0xb6dcff, 0x1a1d20, 0.62);
    world.scene.add(hemisphere);

    const moon = new THREE.DirectionalLight(0xb8ceff, 0.45);
    moon.position.set(50, 80, 10);
    moon.castShadow = true;
    moon.shadow.mapSize.set(1024, 1024);
    moon.shadow.camera.near = 5;
    moon.shadow.camera.far = 220;
    moon.shadow.camera.left = -80;
    moon.shadow.camera.right = 80;
    moon.shadow.camera.top = 80;
    moon.shadow.camera.bottom = -80;
    world.scene.add(moon);

    const ambient = new THREE.AmbientLight(0xffffff, 0.18);
    world.scene.add(ambient);

    state.entities.ambient = ambient;
    state.entities.hemisphere = hemisphere;
    state.entities.moon = moon;
}

function buildStaticWorld() {
    buildSky();
    buildTerrain();
    buildForest();
    buildCampfire();
    buildCraftingTable();
    buildDeployHub();
    buildPlayer();
    buildStars();
    buildRainParticles();
    buildFireParticles();

    resetDynamicWorld();
    updateLighting(0);
}

function buildSky() {
    const skyGeo = new THREE.SphereGeometry(760, 40, 24);
    const skyMat = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: {
            topColor: { value: new THREE.Color(0x5a7faa) },
            bottomColor: { value: new THREE.Color(0xe5a45b) },
            nightFactor: { value: 0 }
        },
        vertexShader: `
            varying vec3 vWorldPosition;
            void main() {
                vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                vWorldPosition = worldPosition.xyz;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 topColor;
            uniform vec3 bottomColor;
            uniform float nightFactor;
            varying vec3 vWorldPosition;

            void main() {
                float h = normalize(vWorldPosition + vec3(0.0, 200.0, 0.0)).y;
                float t = clamp(pow(max(h, 0.0), 0.7), 0.0, 1.0);
                vec3 dayColor = mix(bottomColor, topColor, t);
                vec3 nightTop = vec3(0.03, 0.07, 0.15);
                vec3 nightBottom = vec3(0.02, 0.03, 0.05);
                vec3 nightColor = mix(nightBottom, nightTop, t);
                vec3 outColor = mix(dayColor, nightColor, clamp(nightFactor, 0.0, 1.0));
                gl_FragColor = vec4(outColor, 1.0);
            }
        `
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    world.scene.add(sky);
    state.entities.sky = sky;
}

function buildTerrain() {
    const resolution = 180;
    const geo = new THREE.PlaneGeometry(CONFIG.WORLD_SIZE, CONFIG.WORLD_SIZE, resolution, resolution);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const h = terrainHeight(x, y);
        pos.setZ(i, h);
    }
    geo.computeVertexNormals();
    geo.rotateX(-Math.PI / 2);

    const mesh = new THREE.Mesh(geo, mats.ground);
    mesh.receiveShadow = true;
    world.scene.add(mesh);
    state.entities.terrain = mesh;
}

function buildForest() {
    const trunkGeo = new THREE.CylinderGeometry(0.35, 0.52, 5.2, 6);
    const leavesGeo = new THREE.ConeGeometry(2.6, 7.3, 8);
    const grassGeo = new THREE.ConeGeometry(0.16, 1.1, 3);

    const trunks = new THREE.InstancedMesh(trunkGeo, mats.treeTrunk, CONFIG.TREE_COUNT);
    const leaves = new THREE.InstancedMesh(leavesGeo, mats.treeLeaves, CONFIG.TREE_COUNT);
    const grass = new THREE.InstancedMesh(grassGeo, mats.grass, CONFIG.GRASS_COUNT);

    trunks.castShadow = true;
    trunks.receiveShadow = true;
    leaves.castShadow = true;
    leaves.receiveShadow = true;

    state.entities.treeColliders = [];

    for (let i = 0; i < CONFIG.TREE_COUNT; i++) {
        let x = 0;
        let z = 0;
        let tries = 0;
        do {
            x = rand(-CONFIG.WORLD_SIZE * 0.48, CONFIG.WORLD_SIZE * 0.48);
            z = rand(-CONFIG.WORLD_SIZE * 0.48, CONFIG.WORLD_SIZE * 0.48);
            tries += 1;
        } while (
            (Math.hypot(x, z) < 22
                || dist2(x, z, CONFIG.DEPLOY_HUB_X, CONFIG.DEPLOY_HUB_Z) < 21)
            && tries < 40
        );

        const y = terrainHeight(x, z);
        const s = rand(0.72, 1.32);

        world.dummy.position.set(x, y + 2.6 * s, z);
        world.dummy.rotation.set(0, rand(0, Math.PI * 2), 0);
        world.dummy.scale.set(s, s, s);
        world.dummy.updateMatrix();
        trunks.setMatrixAt(i, world.dummy.matrix);

        world.dummy.position.set(x, y + 7.3 * s, z);
        world.dummy.scale.set(s * 1.2, s * 1.2, s * 1.2);
        world.dummy.updateMatrix();
        leaves.setMatrixAt(i, world.dummy.matrix);

        state.entities.treeColliders.push({
            x,
            z,
            r: 1.3 * s
        });
    }

    for (let i = 0; i < CONFIG.GRASS_COUNT; i++) {
        const x = rand(-CONFIG.WORLD_SIZE * 0.5, CONFIG.WORLD_SIZE * 0.5);
        const z = rand(-CONFIG.WORLD_SIZE * 0.5, CONFIG.WORLD_SIZE * 0.5);
        const y = terrainHeight(x, z);
        const s = rand(0.55, 1.8);

        world.dummy.position.set(x, y + 0.5 * s, z);
        world.dummy.rotation.set(rand(-0.2, 0.2), rand(0, Math.PI * 2), rand(-0.2, 0.2));
        world.dummy.scale.set(s, s, s);
        world.dummy.updateMatrix();
        grass.setMatrixAt(i, world.dummy.matrix);
    }

    trunks.instanceMatrix.needsUpdate = true;
    leaves.instanceMatrix.needsUpdate = true;
    grass.instanceMatrix.needsUpdate = true;

    world.scene.add(trunks);
    world.scene.add(leaves);
    world.scene.add(grass);

    state.entities.trunks = trunks;
    state.entities.leaves = leaves;
    state.entities.grass = grass;
}

function buildCampfire() {
    const campfire = new THREE.Group();

    const logGeo = new THREE.CylinderGeometry(0.22, 0.25, 4.6, 10);
    for (let i = 0; i < 3; i++) {
        const log = new THREE.Mesh(logGeo, mats.log);
        log.rotation.set(Math.PI / 2, i * (Math.PI / 3), (i - 1) * 0.7);
        log.position.y = terrainHeight(0, 0) + 0.38;
        log.castShadow = true;
        log.receiveShadow = true;
        campfire.add(log);
    }

    const core = new THREE.Mesh(
        new THREE.ConeGeometry(0.75, 1.9, 12),
        new THREE.MeshStandardMaterial({
            color: 0xffbc62,
            emissive: 0xff7a29,
            emissiveIntensity: 2.2,
            roughness: 0.2,
            metalness: 0.1
        })
    );
    core.position.y = terrainHeight(0, 0) + 1.05;
    campfire.add(core);

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.25, 0.09, 8, 20),
        new THREE.MeshBasicMaterial({ color: 0xffc47a, transparent: true, opacity: 0.38 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = terrainHeight(0, 0) + 0.24;
    campfire.add(ring);

    const fireLight = new THREE.PointLight(0xffa357, 2.5, CONFIG.FIRE_MAX_RADIUS, 2);
    fireLight.position.set(0, terrainHeight(0, 0) + 2.1, 0);
    fireLight.castShadow = true;
    fireLight.shadow.mapSize.set(1024, 1024);
    fireLight.shadow.bias = -0.0002;
    campfire.add(fireLight);

    world.scene.add(campfire);

    state.entities.campfire = campfire;
    state.entities.campCore = core;
    state.entities.campRing = ring;
    state.entities.fireLight = fireLight;
}

function buildCraftingTable() {
    const table = new THREE.Group();
    const x = 11.5;
    const z = 5.2;
    const y = terrainHeight(x, z);

    const top = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.2, 1.7),
        new THREE.MeshStandardMaterial({ color: 0x6a4c35, roughness: 0.86, metalness: 0.08 })
    );
    top.position.set(0, 1.35, 0);
    top.castShadow = true;
    top.receiveShadow = true;
    table.add(top);

    const legGeo = new THREE.BoxGeometry(0.2, 1.2, 0.2);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x4b3525, roughness: 0.9, metalness: 0.04 });
    const legPositions = [
        [-1.05, 0.7, -0.65],
        [1.05, 0.7, -0.65],
        [-1.05, 0.7, 0.65],
        [1.05, 0.7, 0.65]
    ];
    for (let i = 0; i < legPositions.length; i++) {
        const [lx, ly, lz] = legPositions[i];
        const leg = new THREE.Mesh(legGeo, legMat);
        leg.position.set(lx, ly, lz);
        leg.castShadow = true;
        leg.receiveShadow = true;
        table.add(leg);
    }

    const blueprint = new THREE.Mesh(
        new THREE.PlaneGeometry(1.2, 0.8),
        new THREE.MeshStandardMaterial({
            color: 0xa6d6ff,
            emissive: 0x1a3f62,
            emissiveIntensity: 0.7,
            roughness: 0.45,
            metalness: 0.22,
            side: THREE.DoubleSide
        })
    );
    blueprint.position.set(0.25, 1.47, 0.1);
    blueprint.rotation.x = -Math.PI * 0.5;
    table.add(blueprint);

    const core = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.24, 12),
        new THREE.MeshStandardMaterial({
            color: 0x91c9ff,
            emissive: 0x2f7dbf,
            emissiveIntensity: 1.3,
            roughness: 0.2,
            metalness: 0.45
        })
    );
    core.position.set(-0.6, 1.52, -0.2);
    core.castShadow = true;
    table.add(core);

    const glow = new THREE.PointLight(0x7fc7ff, 0.68, 11, 2);
    glow.position.set(0, 2.2, 0);
    table.add(glow);

    table.position.set(x, y, z);
    world.scene.add(table);
    state.entities.craftingTable = {
        mesh: table,
        x,
        z,
        core,
        glow,
        pulseOffset: rand(0, Math.PI * 2)
    };
}

function buildDeployHub() {
    const hub = new THREE.Group();
    const hx = CONFIG.DEPLOY_HUB_X;
    const hz = CONFIG.DEPLOY_HUB_Z;
    const hy = terrainHeight(hx, hz);

    const base = new THREE.Mesh(
        new THREE.CylinderGeometry(14, 16, 1.4, 36),
        new THREE.MeshStandardMaterial({ color: 0x2d3444, roughness: 0.84, metalness: 0.16 })
    );
    base.position.set(0, 0.7, 0);
    base.receiveShadow = true;
    base.castShadow = true;
    hub.add(base);

    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(11.8, 0.24, 12, 64),
        new THREE.MeshStandardMaterial({
            color: 0x9ecbff,
            emissive: 0x265784,
            emissiveIntensity: 1.1,
            roughness: 0.2,
            metalness: 0.55
        })
    );
    ring.rotation.x = Math.PI * 0.5;
    ring.position.y = 1.45;
    hub.add(ring);

    const centerBeacon = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.6, 3.8, 12),
        new THREE.MeshStandardMaterial({
            color: 0x7ab8ff,
            emissive: 0x3273b2,
            emissiveIntensity: 1.25,
            roughness: 0.32,
            metalness: 0.48
        })
    );
    centerBeacon.position.set(0, 2.5, 0);
    centerBeacon.castShadow = true;
    hub.add(centerBeacon);

    const makePortal = (portal, px) => {
        const alliesLocked = portal.id === 'allies' && !isMultiplayerEnabled();
        const group = new THREE.Group();
        const pedestal = new THREE.Mesh(
            new THREE.CylinderGeometry(1.25, 1.5, 0.9, 24),
            new THREE.MeshStandardMaterial({ color: 0x4f5f74, roughness: 0.76, metalness: 0.22 })
        );
        pedestal.position.y = 0.45;
        pedestal.castShadow = true;
        pedestal.receiveShadow = true;
        group.add(pedestal);

        const arch = new THREE.Mesh(
            new THREE.TorusGeometry(1.2, 0.16, 12, 40),
            new THREE.MeshStandardMaterial({
                color: portal.id === 'solo' ? 0x8be3ff : (alliesLocked ? 0x8d959f : 0xffc38a),
                emissive: portal.id === 'solo' ? 0x2b6e80 : (alliesLocked ? 0x3b434c : 0x7d4418),
                emissiveIntensity: 1.35,
                roughness: 0.2,
                metalness: 0.58
            })
        );
        arch.rotation.x = Math.PI * 0.5;
        arch.position.y = 1.55;
        group.add(arch);

        const glow = new THREE.PointLight(portal.id === 'solo' ? 0x71d4ff : (alliesLocked ? 0x8893a0 : 0xffb475), alliesLocked ? 0.55 : 1.2, 18, 2);
        glow.position.y = 2.6;
        group.add(glow);

        group.position.set(px, 0, 6.8);
        hub.add(group);
        return {
            id: portal.id,
            label: portal.label,
            desc: portal.desc,
            x: hx + px,
            z: hz + 6.8,
            mesh: group,
            glow,
            arch,
            pulseOffset: rand(0, Math.PI * 2)
        };
    };

    const portals = [
        makePortal(DEPLOY_PORTALS[0], -4.6),
        makePortal(DEPLOY_PORTALS[1], 4.6)
    ];

    hub.position.set(hx, hy, hz);
    world.scene.add(hub);
    state.entities.deployHub = {
        mesh: hub,
        x: hx,
        z: hz,
        baseY: hy,
        ring,
        centerBeacon,
        portals
    };
}

function clearChests() {
    for (let i = 0; i < state.entities.chests.length; i++) {
        const chest = state.entities.chests[i];
        if (chest.mesh && chest.mesh.parent) chest.mesh.parent.remove(chest.mesh);
    }
    state.entities.chests.length = 0;
}

function spawnChests() {
    clearChests();

    const lidMat = new THREE.MeshStandardMaterial({
        color: 0x8b5f35,
        roughness: 0.72,
        metalness: 0.14
    });
    const baseMat = new THREE.MeshStandardMaterial({
        color: 0x6f4a2d,
        roughness: 0.82,
        metalness: 0.1
    });
    const bandMat = new THREE.MeshStandardMaterial({
        color: 0x9cb4d1,
        emissive: 0x2b3f59,
        emissiveIntensity: 0.45,
        roughness: 0.32,
        metalness: 0.62
    });

    for (let i = 0; i < CONFIG.CHEST_COUNT; i++) {
        let x = 0;
        let z = 0;
        let tries = 0;
        do {
            x = rand(-CONFIG.WORLD_SIZE * 0.45, CONFIG.WORLD_SIZE * 0.45);
            z = rand(-CONFIG.WORLD_SIZE * 0.45, CONFIG.WORLD_SIZE * 0.45);
            tries += 1;
        } while (
            (Math.hypot(x, z) < 20
                || dist2(x, z, CONFIG.DEPLOY_HUB_X, CONFIG.DEPLOY_HUB_Z) < 28
                || (state.entities.craftingTable && dist2(x, z, state.entities.craftingTable.x, state.entities.craftingTable.z) < 14))
            && tries < 50
        );

        const y = terrainHeight(x, z);
        const chest = new THREE.Group();
        const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.68, 0.88), baseMat);
        base.position.y = 0.34;
        base.castShadow = true;
        base.receiveShadow = true;
        chest.add(base);

        const lidPivot = new THREE.Group();
        lidPivot.position.set(0, 0.65, -0.42);
        const lid = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.34, 0.88), lidMat);
        lid.position.set(0, 0.17, 0.42);
        lid.castShadow = true;
        lid.receiveShadow = true;
        lidPivot.add(lid);
        chest.add(lidPivot);

        const band = new THREE.Mesh(new THREE.BoxGeometry(1.26, 0.12, 0.18), bandMat);
        band.position.set(0, 0.52, 0.02);
        band.castShadow = true;
        chest.add(band);

        chest.position.set(x, y, z);
        chest.rotation.y = rand(0, Math.PI * 2);
        world.scene.add(chest);

        state.entities.chests.push({
            mesh: chest,
            lidPivot,
            x,
            z,
            opened: false,
            roll: random(),
            pulseOffset: rand(0, Math.PI * 2)
        });
    }
}

function buildPlayer() {
    const group = new THREE.Group();

    const bodyMat = new THREE.MeshStandardMaterial();
    const limbGeo = THREE.CapsuleGeometry
        ? new THREE.CapsuleGeometry(0.16, 0.72, 6, 10)
        : new THREE.CylinderGeometry(0.18, 0.16, 0.98, 10);

    const torso = new THREE.Mesh(new THREE.BoxGeometry(1.06, 1.2, 0.72), bodyMat);
    torso.position.y = 0.34;
    torso.castShadow = true;
    torso.receiveShadow = true;

    const hips = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.36, 0.56), bodyMat);
    hips.position.y = -0.48;
    hips.castShadow = true;
    hips.receiveShadow = true;

    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.39, 0), bodyMat);
    head.position.y = 1.18;
    head.castShadow = true;
    head.receiveShadow = true;

    const shoulderLeft = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), bodyMat);
    shoulderLeft.position.set(-0.68, 0.62, 0);
    shoulderLeft.castShadow = true;
    shoulderLeft.receiveShadow = true;

    const shoulderRight = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), bodyMat);
    shoulderRight.position.set(0.68, 0.62, 0);
    shoulderRight.castShadow = true;
    shoulderRight.receiveShadow = true;

    const armLeft = new THREE.Mesh(limbGeo, bodyMat);
    armLeft.position.set(-0.76, 0.12, 0);
    armLeft.castShadow = true;
    armLeft.receiveShadow = true;

    const armRight = new THREE.Mesh(limbGeo, bodyMat);
    armRight.position.set(0.76, 0.12, 0);
    armRight.castShadow = true;
    armRight.receiveShadow = true;

    const legLeft = new THREE.Mesh(limbGeo, bodyMat);
    legLeft.position.set(-0.24, -0.82, 0);
    legLeft.castShadow = true;
    legLeft.receiveShadow = true;

    const legRight = new THREE.Mesh(limbGeo, bodyMat);
    legRight.position.set(0.24, -0.82, 0);
    legRight.castShadow = true;
    legRight.receiveShadow = true;

    const bootLeft = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.58), bodyMat);
    bootLeft.position.set(-0.24, -1.26, 0.12);
    bootLeft.castShadow = true;
    bootLeft.receiveShadow = true;

    const bootRight = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.58), bodyMat);
    bootRight.position.set(0.24, -1.26, 0.12);
    bootRight.castShadow = true;
    bootRight.receiveShadow = true;

    const backpack = new THREE.Mesh(
        new THREE.BoxGeometry(0.64, 0.76, 0.36),
        new THREE.MeshStandardMaterial({
            color: 0x2f3544,
            emissive: 0x0f1420,
            emissiveIntensity: 0.38,
            roughness: 0.38,
            metalness: 0.6
        })
    );
    backpack.position.set(0, 0.22, -0.5);
    backpack.castShadow = true;
    backpack.receiveShadow = true;

    const core = new THREE.Mesh(
        new THREE.CylinderGeometry(0.16, 0.16, 0.18, 12),
        new THREE.MeshStandardMaterial({
            color: 0xffcf83,
            emissive: 0xff6d2a,
            emissiveIntensity: 1.2,
            roughness: 0.14,
            metalness: 0.42
        })
    );
    core.position.set(0, 0.36, 0.38);
    core.rotation.x = Math.PI / 2;
    core.castShadow = true;

    const visor = new THREE.Mesh(
        new THREE.SphereGeometry(0.26, 12, 10),
        new THREE.MeshStandardMaterial({
            color: 0xb8eeff,
            emissive: 0x3a6a7a,
            emissiveIntensity: 0.9,
            roughness: 0.14,
            metalness: 0.8
        })
    );
    visor.scale.set(1.05, 0.72, 0.45);
    visor.position.set(0, 1.12, 0.32);
    visor.castShadow = true;

    armLeft.rotation.x = 0.05;
    armRight.rotation.x = 0.05;
    legLeft.rotation.x = -0.03;
    legRight.rotation.x = -0.03;

    group.add(torso);
    group.add(hips);
    group.add(head);
    group.add(shoulderLeft);
    group.add(shoulderRight);
    group.add(armLeft);
    group.add(armRight);
    group.add(legLeft);
    group.add(legRight);
    group.add(bootLeft);
    group.add(bootRight);
    group.add(backpack);
    group.add(core);
    group.add(visor);

    const y = terrainHeight(0, 0) + CONFIG.PLAYER_HEIGHT * 0.5;
    group.position.set(0, y, 8);
    group.castShadow = true;
    group.rotation.y = 0;

    world.scene.add(group);
    state.entities.player = group;
    state.entities.playerBody = torso;
    state.entities.playerRig = {
        phase: rand(0, Math.PI * 2),
        torso,
        hips,
        head,
        shoulderLeft,
        shoulderRight,
        armLeft,
        armRight,
        legLeft,
        legRight,
        bootLeft,
        bootRight,
        backpack,
        core,
        visor,
        base: {
            torsoY: torso.position.y,
            hipsY: hips.position.y,
            hipsZ: hips.position.z,
            headY: head.position.y,
            armLeftY: armLeft.position.y,
            armRightY: armRight.position.y,
            armLeftRX: armLeft.rotation.x,
            armRightRX: armRight.rotation.x,
            legLeftRX: legLeft.rotation.x,
            legRightRX: legRight.rotation.x,
            shoulderLeftY: shoulderLeft.position.y,
            shoulderRightY: shoulderRight.position.y,
            bootLeftY: bootLeft.position.y,
            bootRightY: bootRight.position.y,
            backpackY: backpack.position.y,
            coreY: core.position.y,
            visorY: visor.position.y
        }
    };
    state.playerFacing = group.rotation.y;
    state.cameraHeading = group.rotation.y;

    applySkin(state.equippedSkin);
}

function applySkin(skinId) {
    const skin = SKINS[skinId] || SKINS.standard;
    if (!state.entities.playerBody) return;

    const mat = state.entities.playerBody.material;
    mat.color.setHex(skin.color);
    mat.emissive.setHex(skin.emissive);
    mat.roughness = skin.roughness;
    mat.metalness = skin.metalness;
    updateMultiplayerProfile();
}

function buildStars() {
    const count = 2200;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        const radius = rand(260, 520);
        const theta = rand(0, Math.PI * 2);
        const phi = rand(0.12, Math.PI * 0.48);

        const x = Math.cos(theta) * Math.sin(phi) * radius;
        const y = Math.cos(phi) * radius;
        const z = Math.sin(theta) * Math.sin(phi) * radius;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        sizes[i] = rand(0.6, 1.7);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
        color: 0xbad0ff,
        size: 1.3,
        transparent: true,
        opacity: 0,
        depthWrite: false
    });

    const stars = new THREE.Points(geo, mat);
    world.scene.add(stars);
    state.entities.stars = stars;
}

function buildRainParticles() {
    const dropCount = 1600;
    const positions = new Float32Array(dropCount * 3);
    const speeds = new Float32Array(dropCount);

    for (let i = 0; i < dropCount; i++) {
        positions[i * 3] = rand(-CONFIG.WORLD_SIZE * 0.45, CONFIG.WORLD_SIZE * 0.45);
        positions[i * 3 + 1] = rand(8, 80);
        positions[i * 3 + 2] = rand(-CONFIG.WORLD_SIZE * 0.45, CONFIG.WORLD_SIZE * 0.45);
        speeds[i] = rand(30, 80);
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

    const mat = new THREE.PointsMaterial({
        color: 0x9ecfff,
        size: 0.25,
        transparent: true,
        opacity: 0,
        depthWrite: false
    });

    const points = new THREE.Points(geo, mat);
    points.visible = false;
    world.scene.add(points);
    state.entities.rain = points;
}

function buildFireParticles() {
    const particleGeo = new THREE.SphereGeometry(0.12, 8, 8);

    for (let i = 0; i < 34; i++) {
        const p = new THREE.Mesh(particleGeo, mats.fireParticle.clone());
        p.material.opacity = rand(0.45, 0.92);
        p.position.set(rand(-0.8, 0.8), terrainHeight(0, 0) + rand(0.5, 1.5), rand(-0.8, 0.8));
        p.userData = {
            speed: rand(1.2, 2.8),
            drift: rand(0.5, 1.5),
            age: rand(0, 10)
        };
        world.scene.add(p);
        state.entities.fireParticles.push(p);
    }
}

function resetDynamicWorld(opts = {}) {
    const spawnResourcesNow = opts.spawnResources !== false;
    const spawnChestsNow = opts.spawnChests !== false;
    const spawnBeaconsNow = opts.spawnBeacons !== false;

    clearResources();
    clearChests();
    clearBeacons();
    clearEnemies();
    clearFlares();
    clearPulses();
    clearTraps();
    clearHazards();
    clearProjectiles();
    clearEmberOrbs();

    if (spawnResourcesNow) {
        spawnResources('wood', CONFIG.WOOD_NODE_COUNT);
        spawnResources('shard', CONFIG.SHARD_NODE_COUNT);
    }
    if (spawnChestsNow) {
        spawnChests();
    }
    if (spawnBeaconsNow) {
        spawnBeacons();
    }
}

function rebuildForestForRun() {
    const layers = ['trunks', 'leaves', 'grass'];
    for (let i = 0; i < layers.length; i++) {
        const key = layers[i];
        const mesh = state.entities[key];
        if (mesh && mesh.parent) mesh.parent.remove(mesh);
        if (mesh && mesh.geometry) mesh.geometry.dispose();
        state.entities[key] = null;
    }

    state.entities.treeColliders = [];
    buildForest();
}

function beginAuthoritativeCoopRun(payload = {}) {
    AudioManager.init();
    state.multiplayer.authoritative.active = true;
    state.multiplayer.authoritative.seed = String(payload.seed || '');
    state.multiplayer.inputSeq = 0;
    state.multiplayer.pingMs = 0;
    resetAuthoritativeActionQueue();
    clearAuthoritativeWorldMeshes();

    refreshDailyChallenge();
    state.partyMode = 'allies';
    state.activeMode = state.selectedMode;
    state.activeChallengeId = '';

    state.started = true;
    resetRunSystems();
    state.settingsResumeOnClose = false;
    state.craftingResumeOnClose = false;
    state.deployment.awaitingChoice = false;
    applyRelicLoadout();
    state.runAssist = computeRunAssist();
    state.phase = 'GATHER';
    state.day = 1;
    state.timeLeft = 0;

    state.health = 100;
    state.stamina = 100;
    state.playerHitCooldown = 0;
    state.wood = 0;
    state.shards = 0;
    state.score = 0;
    state.fireRadius = getMaxFireRadius() * 0.58;
    state.beaconsLit = 0;
    state.ghostProximity = 0;

    state.playerVelocity.set(0, 0, 0);
    const py = terrainHeight(0, 8) + CONFIG.PLAYER_HEIGHT * 0.5;
    state.entities.player.position.set(0, py, 8);
    state.entities.player.rotation.y = 0;
    state.playerFacing = 0;
    state.cameraHeading = 0;
    state.multiplayer.authoritative.localTargetPos.set(0, py, 8);
    state.multiplayer.authoritative.localTargetRot = 0;
    state.pauseReason = 'none';
    state.touchInput.sprint = false;
    if (state.touchInput.enabled) resetTouchMovement();
    state.cameraTarget.set(0, py + 1.65, 8);
    world.camera.position.set(0, py + 10, -4);
    world.camera.lookAt(state.cameraTarget);
    world.camera.fov = 62;
    world.camera.updateProjectionMatrix();

    state.weather.rain = 0;
    state.weather.wind = 0;
    state.weather.fog = 0.002;

    rebuildForestForRun();
    clearEnemies();
    clearResources();
    clearChests();
    clearBeacons();
    clearFlares();
    clearPulses();
    clearTraps();
    clearHazards();
    clearProjectiles();
    clearEmberOrbs();
    clearAlliedSentinels();
    // In authoritative co-op, the server owns resource/chest state.
    // Avoid spawning local placeholders that can appear collectible but are not.
    resetDynamicWorld({
        spawnResources: false,
        spawnChests: false,
        spawnBeacons: false
    });

    setWeatherTargets();

    if (ui.startScreen) ui.startScreen.classList.add('hidden');
    if (ui.shopScreen) ui.shopScreen.classList.add('hidden');
    if (ui.guideScreen) ui.guideScreen.classList.add('hidden');
    if (ui.settingsScreen) ui.settingsScreen.classList.add('hidden');
    if (ui.craftingScreen) ui.craftingScreen.classList.add('hidden');
    if (ui.gameOverScreen) ui.gameOverScreen.classList.add('hidden');
    if (ui.perkScreen) ui.perkScreen.classList.add('hidden');
    if (ui.multiplayerScreen) ui.multiplayerScreen.classList.add('hidden');

    clearInterval(state.timers.phase);
    state.telemetry.session = createTelemetrySession();
    trackTelemetry('run_start', {
        mode: state.activeMode,
        difficulty: state.selectedDifficulty,
        party: state.partyMode,
        authoritative: 1
    });

    pushFeed('Authoritative co-op session active. Server now owns enemies, resources, and combat.', 'info');
    notifyPlatformGameplayStart();
    updateHUD();
}

function beginForestRun(partyMode = state.partyMode, options = {}) {
    if (state.multiplayer.authoritative.active) {
        endAuthoritativeSession('Exited authoritative co-op session.');
    }
    state.partyMode = partyMode === 'allies' ? 'allies' : 'solo';
    AudioManager.init();

    refreshDailyChallenge();
    state.activeMode = state.selectedMode;
    const challenge = state.activeMode === 'daily' ? state.daily : null;
    state.activeChallengeId = challenge ? challenge.id : '';

    if (options.networkSeed) {
        setRunSeed(options.networkSeed);
    } else if (challenge) {
        setRunSeed(challenge.seed);
    } else {
        clearRunSeed();
    }

    const diff = challenge ? DIFFICULTY.normal : (DIFFICULTY[state.selectedDifficulty] || DIFFICULTY.normal);
    state.runtime.dayDuration = diff.dayDuration;
    state.runtime.nightDuration = diff.nightDuration;
    state.runtime.enemySpeed = diff.enemySpeed;
    state.runtime.spawnMultiplier = diff.spawnMultiplier;
    state.runtime.damageMultiplier = diff.damageMultiplier;
    state.runtime.decayMultiplier = diff.decayMultiplier;
    state.runtime.emberMultiplier = diff.emberMultiplier;
    if (hasGadget('sundial')) {
        state.runtime.dayDuration += 18;
    }

    state.started = true;
    resetRunSystems();
    state.settingsResumeOnClose = false;
    state.craftingResumeOnClose = false;
    state.deployment.awaitingChoice = false;
    applyDailyChallengeToRun(challenge);
    applyRelicLoadout();
    state.runAssist = computeRunAssist();
    state.phase = 'GATHER';
    state.day = 1;
    state.timeLeft = state.runtime.dayDuration;

    state.health = 100;
    state.stamina = 100;
    state.playerHitCooldown = 0;

    state.wood = 2 + state.relicRuntime.startWoodBonus + state.runAssist.startWoodBonus + (challenge ? challenge.startWoodOffset : 0);
    state.shards = 1 + state.relicRuntime.startShardBonus + state.runAssist.startShardBonus + (challenge ? challenge.startShardOffset : 0);
    state.wood = Math.max(0, state.wood);
    state.shards = Math.max(0, state.shards);

    state.fireRadius = getMaxFireRadius() * (0.58 + state.runAssist.startWoodBonus * 0.018);
    state.beaconsLit = 0;
    state.ghostProximity = 0;

    state.playerVelocity.set(0, 0, 0);
    const py = terrainHeight(0, 8) + CONFIG.PLAYER_HEIGHT * 0.5;
    state.entities.player.position.set(0, py, 8);
    state.entities.player.rotation.y = 0;
    state.playerFacing = 0;
    state.cameraHeading = 0;
    state.pauseReason = 'none';
    state.touchInput.sprint = false;
    if (state.touchInput.enabled) resetTouchMovement();
    state.cameraTarget.set(0, py + 1.65, 8);
    world.camera.position.set(0, py + 10, -4);
    world.camera.lookAt(state.cameraTarget);
    world.camera.fov = 62;
    world.camera.updateProjectionMatrix();

    state.weather.rain = 0;
    state.weather.wind = 0;
    state.weather.fog = 0.002;

    rebuildForestForRun();
    clearEnemies();
    clearFlares();
    clearAlliedSentinels();
    resetDynamicWorld();
    spawnAlliedSentinels();

    setWeatherTargets();

    if (ui.startScreen) ui.startScreen.classList.add('hidden');
    if (ui.shopScreen) ui.shopScreen.classList.add('hidden');
    if (ui.guideScreen) ui.guideScreen.classList.add('hidden');
    if (ui.settingsScreen) ui.settingsScreen.classList.add('hidden');
    if (ui.craftingScreen) ui.craftingScreen.classList.add('hidden');
    if (ui.gameOverScreen) ui.gameOverScreen.classList.add('hidden');
    if (ui.perkScreen) ui.perkScreen.classList.add('hidden');
    if (ui.multiplayerScreen) ui.multiplayerScreen.classList.add('hidden');

    clearInterval(state.timers.phase);
    state.timers.phase = setInterval(gameTick, 1000);
    state.telemetry.session = createTelemetrySession();
    trackTelemetry('run_start', {
        mode: state.activeMode,
        difficulty: state.selectedDifficulty,
        party: state.partyMode,
        assist: Number((1 - state.runAssist.enemySpawnMult).toFixed(2))
    });

    rollContract('GATHER');
    if (challenge) {
        pushFeed(`Daily challenge ${challenge.id}: ${challenge.title}`, 'warn');
    } else {
        pushFeed('Gather resources and keep the fire alive.', 'info');
    }
    if (state.equippedRelics.length > 0) {
        pushFeed(`Relics online: ${getRelicLoadoutText()}`, 'info');
    }
    if (isRealMultiplayerSession()) {
        pushFeed(`Multiplayer squad online (${state.multiplayer.players.length} players).`, 'info');
    } else if (state.partyMode === 'allies') {
        pushFeed('Allied sentinels linked. Shared run started.', 'info');
    } else {
        pushFeed('Solo run started.', 'info');
    }
    if (state.runAssist.startWoodBonus > 0 || state.runAssist.startShardBonus > 0) {
        pushFeed(`Recovery boost active: +${state.runAssist.startWoodBonus} wood, +${state.runAssist.startShardBonus} shards.`, 'info');
    }
    notifyPlatformGameplayStart();
    updateHUD();
}

function startGame() {
    notifyPlatformGameplayStop();
    state.ads.gameOverBasePayout = 0;
    state.ads.gameOverBonus = 0;
    state.ads.gameOverRewardClaimed = false;
    updateRewardedOfferUI();
    beginForestRun('solo');
}

function gameTick() {
    if (!state.started || state.phase === 'GAME_OVER' || state.phase === 'DEPLOY' || state.paused) return;

    state.timeLeft -= 1;
    if (state.timeLeft <= 0) {
        if (state.phase === 'GATHER') {
            startNight();
        } else if (state.phase === 'SURVIVE') {
            finishNight();
        }
    }

    updateHUD();
}

function startNight() {
    state.phase = 'SURVIVE';
    state.timeLeft = state.runtime.nightDuration;
    state.beaconsLit = 0;
    state.fireOutTimer = CONFIG.FIRE_OUT_GRACE;
    state.fireCriticalWarned = false;
    state.director.target = clamp(0.26 + state.pushStreak * 0.1, 0.18, 1.05);
    state.director.intensity = state.director.target;
    state.director.reinforceTimer = rand(CONFIG.DIRECTOR_REINFORCE_MIN, CONFIG.DIRECTOR_REINFORCE_MAX);
    state.director.wavesSpawned = 0;
    resetNightEventCycle();

    clearEnemies();
    clearFlares();
    clearPulses();
    clearHazards();
    clearProjectiles();
    clearEmberOrbs();
    resetBeaconsState();
    spawnNightEnemies();
    trackTelemetry('phase_night', {
        day: state.day,
        enemies: state.entities.enemies.length,
        assistSpawnMult: Number(state.runAssist.enemySpawnMult.toFixed(2))
    });

    rollContract('SURVIVE');
    setWeatherTargets();

    const threatPct = Math.round((1 + state.pushStreak * CONFIG.PUSH_THREAT_STEP) * 100);
    pushFeed(`Nightfall. Threat index ${threatPct}%. Ignite beacons to hold the line.`, 'warn');
    spawnFloatingText('NIGHT FALLS', state.entities.player.position, '#ff8f8f');
    triggerFlash('rgba(255,0,0,0.3)', 0.25);
    AudioManager.play('night');

    updateHUD();
}

function finishNight() {
    const baseBonus = 20 + state.day * 9 + state.beaconsLit * 14;
    const bonus = grantEmbers(baseBonus, { useDifficulty: true, useCombo: true });
    state.score += bonus;
    addMomentum(14);

    state.day += 1;
    state.phase = 'GATHER';
    state.timeLeft = state.runtime.dayDuration;

    state.health = clamp(state.health + 28, 0, 100);
    state.stamina = clamp(state.stamina + 45, 0, 100);
    state.fireRadius = clamp(state.fireRadius + 18, CONFIG.FIRE_MIN_RADIUS, getMaxFireRadius());

    endNightEventCycle();
    resolveNemesisEscape('dawn');
    clearEnemies();
    clearFlares();
    clearPulses();
    clearHazards();
    clearProjectiles();
    clearEmberOrbs();
    respawnResourcesForNewDay();
    spawnBeacons();

    rollContract('GATHER');
    setWeatherTargets();

    pushFeed(`Dawn secured: +${bonus} embers`, 'info');
    trackTelemetry('phase_day', {
        day: state.day,
        bonus,
        beacons: state.beaconsLit
    });
    spawnFloatingText(`+${bonus} EMBERS`, state.entities.player.position, '#ffd375');
    AudioManager.play('day');
    rollRelicDrop('night');

    if (state.day > 1) {
        showDawnDecision();
    }

    saveProgress();
    updateHUD();
}

function rollContract(phase) {
    const pool = CONTRACT_POOL[phase];
    if (!pool || pool.length === 0) {
        state.currentContract = null;
        return;
    }

    const template = pool[Math.floor(random() * pool.length)];
    const goal = Math.max(1, Math.floor(template.base + state.day * template.perDay));

    state.currentContract = {
        id: template.id,
        label: template.label,
        metric: template.metric,
        goal,
        reward: template.reward,
        phase,
        startValue: state.metrics[template.metric] || 0,
        progress: 0,
        completed: false
    };

    pushFeed(`Contract: ${template.label} (${goal})`, 'info');
    updateContractProgress();
}

function updateContractProgress() {
    const contract = state.currentContract;
    if (!contract || contract.completed) return;

    const current = state.metrics[contract.metric] || 0;
    contract.progress = Math.max(0, current - contract.startValue);

    if (contract.progress >= contract.goal) {
        completeContract(contract);
    }
}

function completeContract(contract) {
    if (!contract || contract.completed) return;
    contract.completed = true;

    const rewardBase = contract.reward * state.runMods.contractRewardMult;
    const payout = grantEmbers(rewardBase, { useDifficulty: true, useCombo: true });
    state.score += payout;
    state.shards += 1;
    addMomentum(20);

    pushFeed(`Contract complete: +${payout} embers`, 'info');
    spawnFloatingText('CONTRACT COMPLETE', state.entities.player.position, '#9be6ff');
    AudioManager.play('perk');
    trackTelemetry('contract_complete', {
        id: contract.id,
        payout,
        day: state.day
    });
}

function pickPerkOptions(count = 3) {
    const available = PERK_POOL.filter((perk) => !state.runPerks.includes(perk.id));
    if (available.length <= count) return available;

    const bag = available.slice();
    for (let i = bag.length - 1; i > 0; i--) {
        const j = Math.floor(random() * (i + 1));
        [bag[i], bag[j]] = [bag[j], bag[i]];
    }
    return bag.slice(0, count);
}

function applyPerk(perkId) {
    if (state.runPerks.includes(perkId)) return;

    state.runPerks.push(perkId);

    switch (perkId) {
        case 'inferno_core':
            state.runMods.fireRadiusMult += 0.25;
            state.runMods.fireDecayMult *= 0.8;
            break;
        case 'kinetic_loop':
            state.runMods.dashCooldownMult *= 0.72;
            state.runMods.staminaRecoveryMult *= 1.3;
            break;
        case 'flare_matrix':
            state.runMods.flareRadiusMult *= 1.35;
            state.runMods.flareDurationMult *= 1.35;
            state.runMods.flareCostOffset -= 1;
            break;
        case 'overclock_pulse':
            state.runMods.pulseDamageMult *= 1.45;
            state.runMods.pulseCooldownMult *= 0.65;
            state.runMods.pulseRadiusMult *= 1.1;
            break;
        case 'hunter_engine':
            state.runMods.killHeal += 3;
            state.runMods.comboGainMult *= 1.18;
            break;
        case 'beacon_flux':
            state.runMods.beaconBonusTime += 4;
            state.runMods.beaconBonusHeal += 6;
            break;
        case 'ember_drive':
            state.runMods.comboDecayMult *= 0.65;
            state.runMods.contractRewardMult *= 1.2;
            break;
        case 'guardian_shell':
            state.runMods.damageTakenMult *= 0.78;
            break;
        case 'crystal_magnet':
            state.runMods.enemyDropBonus += 0.2;
            state.runMods.shardNodeBonus += 1;
            break;
        case 'trailblazer':
            state.runMods.speedFlatBonus += 1.8;
            state.runMods.contractRewardMult *= 1.15;
            break;
        default:
            break;
    }

    if (state.runMods.flareCostOffset < -1) {
        state.runMods.flareCostOffset = -1;
    }

    state.fireRadius = clamp(state.fireRadius, 0, getMaxFireRadius());
    AudioManager.play('perk');
}

function hidePerkDraft() {
    if (ui.perkScreen) ui.perkScreen.classList.add('hidden');
    state.paused = false;
    state.pauseReason = 'none';
    if (state.started && state.phase !== 'GAME_OVER' && state.phase !== 'DEPLOY') {
        notifyPlatformGameplayStart();
    }
    updateRewardedOfferUI();
}

function showPerkDraft(opts = {}) {
    if (!ui.perkScreen || !ui.perkOptions) return;
    if (!opts.fromRewardedReroll) {
        state.ads.perkRerollUsed = false;
    }

    const options = pickPerkOptions(3);
    if (options.length === 0) return;

    state.paused = true;
    state.pauseReason = 'perk';
    notifyPlatformGameplayStop();
    state.keys = {};

    if (ui.perkTitle) {
        ui.perkTitle.textContent = 'CHOOSE AUGMENT';
    }
    if (ui.perkSubtitle) {
        ui.perkSubtitle.textContent = `Day ${state.day}: choose one augment (${state.runPerks.length} selected). Press 1/2/3 or click.`;
    }

    ui.perkOptions.innerHTML = '';
    options.forEach((perk, idx) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'perk-card';
        button.innerHTML = `
            <span class="perk-name">${idx + 1}. ${perk.name}</span>
            <span class="perk-desc">${perk.desc}</span>
        `;
        button.addEventListener('click', () => {
            applyPerk(perk.id);
            hidePerkDraft();
            pushFeed(`Augment online: ${perk.name}`, 'info');
            updateHUD();
        });
        ui.perkOptions.appendChild(button);
    });

    const allowRewardedReroll = !state.ads.perkRerollUsed && canRequestRewardedAd('perk_reroll');
    if (allowRewardedReroll) {
        const rerollButton = document.createElement('button');
        rerollButton.type = 'button';
        rerollButton.className = 'perk-card rewarded';
        rerollButton.innerHTML = `
            <span class="perk-name">R. Rewarded Reroll</span>
            <span class="perk-desc">Watch a rewarded ad to reroll all augment choices once.</span>
        `;
        rerollButton.addEventListener('click', claimPerkRerollReward);
        ui.perkOptions.appendChild(rerollButton);
    }

    ui.perkScreen.classList.remove('hidden');
    updateRewardedOfferUI();
    updateHUD();
}

function showDawnDecision() {
    if (!ui.perkScreen || !ui.perkOptions) return;

    state.paused = true;
    state.pauseReason = 'perk';
    notifyPlatformGameplayStop();
    state.keys = {};

    if (ui.perkTitle) {
        ui.perkTitle.textContent = 'DAWN DECISION';
    }

    const extractBase = 16 + state.day * 10 + state.beaconsLit * 12 + Math.floor(state.score * 0.06);
    const extractEstimate = Math.floor(extractBase * (1 + state.pushStreak * 0.22));
    const nextPush = state.pushStreak + 1;
    const threatPct = Math.round((1 + nextPush * CONFIG.PUSH_THREAT_STEP) * 100);
    const rewardPct = Math.round(nextPush * CONFIG.PUSH_REWARD_STEP * 100);

    if (ui.perkSubtitle) {
        ui.perkSubtitle.textContent = `Extract to secure +${extractEstimate} embers, or push for +${rewardPct}% ember scaling at ${threatPct}% threat.`;
    }

    ui.perkOptions.innerHTML = '';

    const makeOption = (idx, name, desc, onPick) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'perk-card';
        button.innerHTML = `
            <span class="perk-name">${idx}. ${name}</span>
            <span class="perk-desc">${desc}</span>
        `;
        button.addEventListener('click', onPick);
        ui.perkOptions.appendChild(button);
    };

    makeOption(1, 'Extract Now', 'End the run and bank the haul safely.', () => {
        const payout = grantEmbers(extractEstimate, { useDifficulty: true, useCombo: false });
        state.score += payout;
        hidePerkDraft();
        endGame('You evacuated before the next nightfall.', {
            title: 'EXTRACTED',
            customPayout: payout,
            skipBasePayout: true,
            endType: 'extract',
            feedKind: 'info',
            feedText: 'Extraction complete. Embers secured.'
        });
    });

    makeOption(2, 'Push Deeper', 'Escalate the run for better rewards and stronger pressure.', () => {
        state.pushStreak += 1;
        hidePerkDraft();
        pushFeed(`Push streak ${state.pushStreak}: director pressure escalating.`, 'warn');
        showPerkDraft();
    });

    ui.perkScreen.classList.remove('hidden');
    updateRewardedOfferUI();
    updateHUD();
}

function endGame(reason = 'The forest consumed your spark.', opts = {}) {
    notifyPlatformGameplayStop();
    if (state.multiplayer.authoritative.active) {
        endAuthoritativeSession(reason || 'Authoritative session ended.');
    }
    const endType = opts.endType || (opts.title === 'EXTRACTED' ? 'extract' : 'defeat');
    if (endType === 'defeat') {
        resolveNemesisEscape('player_down');
    } else {
        resolveNemesisEscape('evaded');
    }
    endNightEventCycle();

    state.phase = 'GAME_OVER';
    state.started = false;
    state.paused = false;
    state.pauseReason = 'none';
    state.touchInput.sprint = false;
    if (state.touchInput.enabled) resetTouchMovement();
    state.currentContract = null;
    clearInterval(state.timers.phase);
    clearEnemies();
    clearFlares();
    clearPulses();
    clearTraps();
    clearHazards();
    clearProjectiles();
    clearEmberOrbs();

    const survivedDays = Math.max(1, state.day);
    state.highScore = Math.max(state.highScore, survivedDays);

    const payoutBase = 12 + survivedDays * 6 + state.beaconsLit * 8 + Math.floor(state.score * 0.04);
    let payout = 0;
    if (typeof opts.customPayout === 'number') {
        payout = Math.floor(opts.customPayout);
    } else if (!opts.skipBasePayout) {
        payout = grantEmbers(payoutBase, { useDifficulty: true, useCombo: false });
    }

    const dailyResult = resolveDailyChallengeResult();
    if (dailyResult && dailyResult.bonus > 0) {
        payout += dailyResult.bonus;
    }

    if (dailyResult && dailyResult.bonus > 0) {
        pushFeed(`Daily bonus +${dailyResult.bonus} embers secured.`, 'info');
    }
    if (dailyResult && dailyResult.isBest) {
        pushFeed(`New daily best: ${dailyResult.score}.`, 'warn');
    }

    state.ads.gameOverBasePayout = Math.max(0, Math.floor(payout));
    state.ads.gameOverBonus = 0;
    state.ads.gameOverRewardClaimed = false;

    const profile = normalizeProfile(state.profile);
    profile.totalRuns += 1;
    profile.bestDay = Math.max(profile.bestDay, survivedDays);
    profile.recentDays.push(survivedDays);
    if (profile.recentDays.length > 8) profile.recentDays.shift();
    if (endType === 'extract') {
        profile.extracts += 1;
        profile.lossStreak = 0;
    } else {
        profile.defeats += 1;
        profile.lossStreak += 1;
    }
    state.profile = profile;

    trackTelemetry('run_end', {
        endType,
        reason,
        day: survivedDays,
        payout
    });
    finalizeTelemetrySession({ result: endType, reason });

    saveProgress();
    updateShopButtons();

    if (ui.gameOverScreen) ui.gameOverScreen.classList.remove('hidden');
    if (ui.perkScreen) ui.perkScreen.classList.add('hidden');
    if (ui.craftingScreen) ui.craftingScreen.classList.add('hidden');

    if (ui.gameOverTitle) ui.gameOverTitle.textContent = opts.title || 'EXTINGUISHED';
    if (ui.gameOverMessage) {
        let messageText = opts.message || `${reason} Survived ${survivedDays} day(s), score ${Math.floor(state.score)}, augments ${state.runPerks.length}.`;
        messageText += ` Best chain ${state.chain.best}, overdrive activations ${state.overdrive.activations}.`;
        messageText += ` Night events: ${state.nightEvent.completedCount} clear / ${state.nightEvent.failedCount} failed.`;
        if (dailyResult) {
            messageText += ` Daily score ${dailyResult.score}.`;
            if (dailyResult.isBest) messageText += ' New personal best.';
        }
        ui.gameOverMessage.textContent = messageText;
    }
    if (ui.gameOverEarned) ui.gameOverEarned.textContent = String(payout);

    const feedText = opts.feedText || (opts.title === 'EXTRACTED'
        ? 'Run extracted. Refit and redeploy.'
        : 'Run ended. Upgrade and try a tougher route.');
    pushFeed(feedText, opts.feedKind || (opts.title === 'EXTRACTED' ? 'info' : 'danger'));
    state.activeChallengeId = '';
    updateRewardedOfferUI();
    updateHUD();
}

function animate(now) {
    state.gameLoopId = requestAnimationFrame(animate);

    const dt = Math.min((now - state.lastTime) / 1000, 0.06);
    state.lastTime = now;
    world.time += dt;

    updateFireParticles(dt);
    updateWorldInteractables(dt);
    updateRemotePlayers(dt);

    if (state.started && state.phase !== 'GAME_OVER') {
        if (state.phase === 'DEPLOY') {
            updatePlayer(dt);
            updateWeather(dt);
            updateLighting(dt);
            updateVFX(dt);
            updateInteractionPrompt();
            updateCamera(dt);
            drawRadar();
            updateHUD();
        } else if (!state.paused && isAuthoritativeCoopActive()) {
            updatePlayer(dt);
            updateAuthoritativeVisualSmoothing(dt);
            updateWeather(dt);
            updateLighting(dt);
            updateVFX(dt);
            updateInteractionPrompt();
            updateCamera(dt);
            drawRadar();
            updateHUD();
        } else if (!state.paused) {
            updateAbilityCooldowns(dt);
            updatePlayer(dt);
            updateResourcesCollection();
            updateFlares(dt);
            updatePulses(dt);
            updateTraps(dt);
            updateHazards(dt);
            updateProjectiles(dt);
            updateEmberOrbs(dt);
            updateAlliedSentinels(dt);
            updateBeacons(dt);
            updateDirector(dt);
            updateNightEvent(dt);
            updateNemesis(dt);
            updateEnemies(dt);
            updateFireSystem(dt);
            updateMomentum(dt);
            updateCombatLoops(dt);
            updateWeather(dt);
            updateLighting(dt);
            updateVFX(dt);
            updateInteractionPrompt();
            updateCamera(dt);
            drawRadar();
            updateHUD();
        } else {
            updateHazards(dt);
            updateVFX(dt);
            updateInteractionPrompt();
            updateCamera(dt);
            drawRadar();
            updateHUD();
        }
    } else {
        updateIdleCamera(dt);
        updateWeather(dt);
        updateLighting(dt);
        updateVFX(dt);
        drawRadar();
    }

    emitMultiplayerState(dt);
    world.renderer.render(world.scene, world.camera);
}

function updatePlayer(dt) {
    const player = state.entities.player;
    if (!player) return;

    if (isAuthoritativeCoopActive()) {
        const auth = state.multiplayer.authoritative;
        const targetPos = auth.localTargetPos;
        const targetRot = auth.localTargetRot;

        const moveDir = getMovementDirection();
        const moving = moveDir.lengthSq() > 0.0001;
        const sprinting = !!(state.keys.shift || state.keys.shiftleft || state.keys.shiftright || state.touchInput.sprint);
        const predictedSpeed = CONFIG.PLAYER_BASE_SPEED * (sprinting ? CONFIG.PLAYER_SPRINT_MULT : 1);
        const predictedVel = TMP.moveTarget.copy(moveDir).multiplyScalar(predictedSpeed);
        const accel = 1 - Math.exp(-dt * 10);
        state.playerVelocity.lerp(predictedVel, accel);

        const drag = Math.max(0, 1 - CONFIG.PLAYER_DRAG * 0.9 * dt);
        state.playerVelocity.multiplyScalar(drag);

        const predictedPos = TMP.authPredPos.copy(player.position).addScaledVector(state.playerVelocity, dt);
        const correction = TMP.authCorrection.copy(targetPos).sub(predictedPos);
        const correctionDist = correction.length();
        const pingMs = Math.max(0, Number(state.multiplayer.pingMs) || 0);
        const snapDistance = CONFIG.MULTIPLAYER_LOCAL_SNAP_DISTANCE_BASE
            + clamp((pingMs - 80) * CONFIG.MULTIPLAYER_LOCAL_SNAP_DISTANCE_PING_SCALE, 0, 16);

        if (correctionDist > snapDistance) {
            player.position.copy(targetPos);
            state.playerVelocity.set(0, 0, 0);
        } else {
            const correctionStrength = correctionDist > 5
                ? CONFIG.MULTIPLAYER_LOCAL_CORRECTION_FAR
                : CONFIG.MULTIPLAYER_LOCAL_CORRECTION_NEAR;
            const pingScale = pingMs > 140 ? 0.62 : pingMs > 90 ? 0.78 : 1;
            const correctionGain = 1 - Math.exp(-dt * correctionStrength * pingScale);
            predictedPos.addScaledVector(correction, correctionGain);
            player.position.copy(predictedPos);
        }

        if (moving && state.playerVelocity.lengthSq() > 0.05) {
            const targetFacing = Math.atan2(state.playerVelocity.x, state.playerVelocity.z);
            player.rotation.y = lerpAngle(player.rotation.y, targetFacing, 1 - Math.exp(-dt * 12));
        }
        player.rotation.y = lerpAngle(player.rotation.y, targetRot, 1 - Math.exp(-dt * 10));
        state.playerFacing = player.rotation.y;
        state.cameraHeading = state.playerFacing;

        const horizontalSpeed = Math.hypot(state.playerVelocity.x, state.playerVelocity.z);
        updatePlayerRigAnimation(dt, horizontalSpeed, horizontalSpeed > 0.1);
        return;
    }

    const moveDir = getMovementDirection();
    const moveAmount = moveDir.lengthSq();

    const sprinting = (state.keys.shift || state.keys.shiftleft || state.keys.shiftright || state.touchInput.sprint) && state.stamina > 3;

    let maxSpeed = CONFIG.PLAYER_BASE_SPEED + state.runMods.speedFlatBonus;
    if (hasUpgrade('speed_boots')) maxSpeed *= 1.15;
    if (sprinting) maxSpeed *= CONFIG.PLAYER_SPRINT_MULT;
    if (state.overdrive.active) maxSpeed *= CONFIG.OVERDRIVE_SPEED_MULT;

    const targetVel = TMP.moveTarget.copy(moveDir).multiplyScalar(maxSpeed);
    const accel = 1 - Math.exp(-CONFIG.PLAYER_ACCEL * dt);
    state.playerVelocity.lerp(targetVel, accel);

    const drag = Math.max(0, 1 - CONFIG.PLAYER_DRAG * dt);
    state.playerVelocity.multiplyScalar(drag);

    if (sprinting && moveAmount > 0.06) {
        state.stamina -= CONFIG.STAMINA_DRAIN * dt;
    } else {
        const recover = state.phase === 'SURVIVE' ? CONFIG.STAMINA_RECOVERY_COMBAT : CONFIG.STAMINA_RECOVERY;
        state.stamina += recover * state.runMods.staminaRecoveryMult * dt;
    }
    state.stamina = clamp(state.stamina, 0, 100);

    if (state.playerHitCooldown > 0) {
        state.playerHitCooldown -= dt;
    }

    let nextX = player.position.x + state.playerVelocity.x * dt;
    let nextZ = player.position.z + state.playerVelocity.z * dt;

    nextX = clamp(nextX, -CONFIG.WORLD_SIZE * 0.48, CONFIG.WORLD_SIZE * 0.48);
    nextZ = clamp(nextZ, -CONFIG.WORLD_SIZE * 0.48, CONFIG.WORLD_SIZE * 0.48);

    resolveTreeCollision((resolvedX, resolvedZ) => {
        nextX = resolvedX;
        nextZ = resolvedZ;
    }, nextX, nextZ);

    const targetY = terrainHeight(nextX, nextZ) + CONFIG.PLAYER_HEIGHT * 0.5;
    player.position.x = nextX;
    player.position.z = nextZ;
    player.position.y = lerp(player.position.y, targetY, 1 - Math.exp(-dt * 20));

    const input = getInputAxes();
    const inputX = input.x;
    const inputY = input.y;
    const hasMoveInput = inputX !== 0 || inputY !== 0;
    const horizontalSpeed = Math.hypot(state.playerVelocity.x, state.playerVelocity.z);
    if (horizontalSpeed > 0.25 && hasMoveInput) {
        let facing = Math.atan2(state.playerVelocity.x, state.playerVelocity.z);
        if (inputY < 0 && inputX === 0) {
            facing = state.cameraHeading;
        }
        state.playerFacing = lerpAngle(state.playerFacing, facing, 1 - Math.exp(-dt * 12));
        player.rotation.y = state.playerFacing;
    }

    updatePlayerRigAnimation(dt, horizontalSpeed, hasMoveInput);
}

function updatePlayerRigAnimation(dt, horizontalSpeed, hasMoveInput) {
    const rig = state.entities.playerRig;
    if (!rig || !rig.base) return;

    const moving = hasMoveInput && horizontalSpeed > 0.18;
    const gait = clamp(horizontalSpeed / (CONFIG.PLAYER_BASE_SPEED * 1.45), 0, 1.2);
    const walkFreq = 6.4 + gait * 4.1;
    rig.phase += dt * walkFreq;

    const stride = moving ? Math.sin(rig.phase) * 0.7 * gait : 0;
    const bounce = moving ? Math.abs(Math.sin(rig.phase * 2)) * 0.045 * gait : 0;
    const idle = Math.sin(world.time * 2.8) * 0.022 + Math.cos(world.time * 1.7) * 0.011;
    const driveShake = state.overdrive.active ? Math.sin(world.time * 14.5) * 0.008 : 0;

    rig.torso.position.y = rig.base.torsoY + idle + bounce;
    rig.hips.position.y = rig.base.hipsY + idle * 0.45 + bounce * 0.6;
    rig.head.position.y = rig.base.headY + idle * 1.2 + bounce * 0.8;
    rig.shoulderLeft.position.y = rig.base.shoulderLeftY + idle * 0.7;
    rig.shoulderRight.position.y = rig.base.shoulderRightY + idle * 0.7;
    rig.backpack.position.y = rig.base.backpackY + idle * 0.45 + bounce * 0.35;
    rig.core.position.y = rig.base.coreY + idle * 0.9 + bounce * 0.35;
    rig.visor.position.y = rig.base.visorY + idle * 1.1 + bounce * 0.75;
    rig.bootLeft.position.y = rig.base.bootLeftY + bounce * 0.28;
    rig.bootRight.position.y = rig.base.bootRightY + bounce * 0.28;

    rig.armLeft.rotation.x = rig.base.armLeftRX + stride * 0.95 + driveShake;
    rig.armRight.rotation.x = rig.base.armRightRX - stride * 0.95 - driveShake;
    rig.legLeft.rotation.x = rig.base.legLeftRX - stride * 1.1;
    rig.legRight.rotation.x = rig.base.legRightRX + stride * 1.1;

    const armTwist = moving ? Math.sin(rig.phase * 0.5) * 0.12 * gait : 0;
    rig.armLeft.rotation.z = -0.04 - armTwist;
    rig.armRight.rotation.z = 0.04 + armTwist;
    rig.legLeft.rotation.z = 0.02 + armTwist * 0.4;
    rig.legRight.rotation.z = -0.02 - armTwist * 0.4;
    rig.hips.rotation.z = Math.sin(rig.phase * 0.5) * 0.09 * gait;
    rig.torso.rotation.z = -rig.hips.rotation.z * 0.42;
    rig.head.rotation.z = rig.hips.rotation.z * 0.25;
}

function resolveTreeCollision(onResolve, nextX, nextZ) {
    let rx = nextX;
    let rz = nextZ;

    for (let i = 0; i < state.entities.treeColliders.length; i++) {
        const tree = state.entities.treeColliders[i];
        const dx = rx - tree.x;
        const dz = rz - tree.z;
        const d2 = dx * dx + dz * dz;
        const min = tree.r + CONFIG.PLAYER_RADIUS;

        if (d2 < min * min) {
            const d = Math.sqrt(Math.max(d2, 0.0001));
            const push = min - d;
            rx += (dx / d) * push;
            rz += (dz / d) * push;
        }
    }

    onResolve(rx, rz);
}

function updateAbilityCooldowns(dt) {
    const cooldownRate = state.overdrive.active ? CONFIG.OVERDRIVE_COOLDOWN_MULT : 1;
    if (state.dashCooldown > 0) {
        state.dashCooldown -= dt * cooldownRate;
        if (state.dashCooldown < 0) state.dashCooldown = 0;
    }
    if (state.pulseCooldown > 0) {
        state.pulseCooldown -= dt * cooldownRate;
        if (state.pulseCooldown < 0) state.pulseCooldown = 0;
    }
    if (state.boltCooldown > 0) {
        state.boltCooldown -= dt * cooldownRate;
        if (state.boltCooldown < 0) state.boltCooldown = 0;
    }
    if (state.weatherControlCooldown > 0) {
        state.weatherControlCooldown -= dt * cooldownRate;
        if (state.weatherControlCooldown < 0) state.weatherControlCooldown = 0;
    }
}

function performDash() {
    if (!state.started || state.phase === 'GAME_OVER' || state.paused) return;
    if (isAuthoritativeCoopActive()) {
        queueAuthoritativeAction('dash');
        return;
    }
    if (state.dashCooldown > 0) return;

    const dir = getMovementDirection().clone();

    if (dir.lengthSq() < 0.001) {
        dir.set(Math.sin(state.playerFacing), 0, Math.cos(state.playerFacing));
    } else {
        dir.normalize();
    }

    const force = hasUpgrade('speed_boots') ? CONFIG.DASH_FORCE * 1.16 : CONFIG.DASH_FORCE;
    state.playerVelocity.addScaledVector(dir, force);

    state.dashCooldownMax = hasUpgrade('speed_boots') ? CONFIG.DASH_COOLDOWN * 0.82 : CONFIG.DASH_COOLDOWN;
    state.dashCooldownMax *= state.runMods.dashCooldownMult;
    state.dashCooldown = state.dashCooldownMax;

    triggerFlash('rgba(140,220,255,0.26)', 0.13);
    triggerScreenShake(0.12);
    AudioManager.play('dash');
    addMomentum(3);
}

function spawnResources(kind, count) {
    const isWood = kind === 'wood';
    const list = isWood ? state.entities.resources.wood : state.entities.resources.shards;

    const geo = isWood
        ? new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8)
        : new THREE.OctahedronGeometry(0.35, 0);

    const mat = isWood ? mats.wood : mats.shard;

    for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(geo, mat.clone());

        let x = 0;
        let z = 0;
        let tries = 0;
        do {
            x = rand(-CONFIG.WORLD_SIZE * 0.46, CONFIG.WORLD_SIZE * 0.46);
            z = rand(-CONFIG.WORLD_SIZE * 0.46, CONFIG.WORLD_SIZE * 0.46);
            tries += 1;
        } while (Math.hypot(x, z) < 16 && tries < 60);

        const y = terrainHeight(x, z);
        mesh.position.set(x, y + (isWood ? 0.12 : 0.5), z);
        mesh.rotation.set(
            isWood ? Math.PI / 2 : rand(0, Math.PI),
            rand(0, Math.PI * 2),
            isWood ? rand(0, Math.PI * 2) : rand(0, Math.PI)
        );

        if (isWood) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        }

        mesh.userData.spin = rand(0.5, 1.4);
        mesh.userData.floatOffset = rand(0, Math.PI * 2);
        mesh.userData.baseY = mesh.position.y;

        world.scene.add(mesh);

        list.push({
            mesh,
            active: true
        });
    }
}

function clearResources() {
    const collections = [state.entities.resources.wood, state.entities.resources.shards];
    collections.forEach((arr) => {
        arr.forEach((entry) => {
            if (entry.mesh && entry.mesh.parent) entry.mesh.parent.remove(entry.mesh);
        });
        arr.length = 0;
    });
}

function respawnResourcesForNewDay() {
    clearResources();

    const woodExtra = Math.min(18, state.day * 2);
    const shardExtra = Math.min(10, Math.floor(state.day * 0.8) + state.runMods.shardNodeBonus * 2);

    spawnResources('wood', CONFIG.WOOD_NODE_COUNT + woodExtra);
    spawnResources('shard', CONFIG.SHARD_NODE_COUNT + shardExtra);
}

function updateResourcesCollection() {
    const player = state.entities.player;
    const p = player.position;

    state.entities.resources.wood.forEach((node) => {
        if (!node.active) return;

        node.mesh.rotation.y += 0.02;
        if (dist2(p.x, p.z, node.mesh.position.x, node.mesh.position.z) < 1.95) {
            node.active = false;
            node.mesh.visible = false;
            state.wood += 1;
            addMetric('woodCollected', 1);
            addMomentum(4);
            AudioManager.play('collect');
            spawnFloatingText('+WOOD', p, '#a67a49');
        }
    });

    state.entities.resources.shards.forEach((node) => {
        if (!node.active) return;

        node.mesh.rotation.y += 0.05;
        const baseY = Number.isFinite(node.mesh.userData.baseY)
            ? node.mesh.userData.baseY
            : node.mesh.position.y;
        node.mesh.userData.baseY = baseY;
        node.mesh.position.y = baseY + Math.sin(world.time * 2 + node.mesh.userData.floatOffset) * 0.18;

        if (dist2(p.x, p.z, node.mesh.position.x, node.mesh.position.z) < 2.05) {
            node.active = false;
            node.mesh.visible = false;
            let gain = hasUpgrade('blue_flame') ? 2 : 1;
            gain += state.runMods.shardNodeBonus;
            state.shards += gain;
            addMetric('shardsCollected', gain);
            addMomentum(6);
            AudioManager.play('shard');
            spawnFloatingText('+SHARD', p, '#8ad7ff');
        }
    });
}

function spawnBeacons() {
    clearBeacons();

    const radiusMin = 72;
    const radiusMax = 140;
    const baseAngle = rand(0, Math.PI * 2);

    for (let i = 0; i < CONFIG.BEACON_COUNT; i++) {
        const angle = baseAngle + (i / CONFIG.BEACON_COUNT) * Math.PI * 2 + rand(-0.2, 0.2);
        const radius = rand(radiusMin, radiusMax);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = terrainHeight(x, z);

        const group = new THREE.Group();

        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.2, 2.2, 8), mats.beaconBase);
        base.position.y = y + 1.1;
        base.castShadow = true;
        base.receiveShadow = true;
        group.add(base);

        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.65, 0), mats.beaconCoreDormant.clone());
        crystal.position.y = y + 2.7;
        group.add(crystal);

        const light = new THREE.PointLight(0x8cb5e4, 0.18, 12, 2);
        light.position.y = y + 2.7;
        group.add(light);

        group.position.set(x, 0, z);

        world.scene.add(group);

        state.entities.beacons.push({
            group,
            crystal,
            light,
            x,
            z,
            active: false,
            baseCrystalY: y + 2.7,
            pulseOffset: rand(0, Math.PI * 2)
        });
    }

    state.beaconsLit = 0;
}

function resetBeaconsState() {
    state.beaconsLit = 0;
    state.entities.beacons.forEach((beacon) => {
        beacon.active = false;
        beacon.crystal.material = mats.beaconCoreDormant.clone();
        beacon.light.color.set(0x8cb5e4);
        beacon.light.intensity = 0.18;
        beacon.light.distance = 12;
    });
}

function clearBeacons() {
    state.entities.beacons.forEach((beacon) => {
        if (beacon.group && beacon.group.parent) beacon.group.parent.remove(beacon.group);
    });
    state.entities.beacons.length = 0;
    state.beaconsLit = 0;
}

function updateBeacons(dt) {
    const t = world.time;

    state.entities.beacons.forEach((beacon) => {
        beacon.crystal.rotation.y += dt * (beacon.active ? 1.9 : 0.6);
        const bob = Math.sin(t * 2 + beacon.pulseOffset) * 0.06;
        beacon.crystal.position.y = beacon.baseCrystalY + bob;

        if (beacon.active) {
            beacon.light.intensity = 1.1 + Math.sin(t * 7 + beacon.pulseOffset) * 0.2;
        } else {
            beacon.light.intensity = 0.18 + Math.sin(t * 2 + beacon.pulseOffset) * 0.04;
        }
    });
}

function igniteBeacon(beacon) {
    if (beacon.active) return;
    if (state.wood <= 0) {
        pushFeed('Need wood to ignite beacon.', 'warn');
        return;
    }

    state.wood -= 1;
    beacon.active = true;
    beacon.crystal.material = mats.beaconCoreLit.clone();
    beacon.light.color.set(0xffbe6f);
    beacon.light.intensity = 1.4;
    beacon.light.distance = 34;

    state.beaconsLit += 1;
    state.timeLeft += 6 + state.runMods.beaconBonusTime;
    state.shards += 1;
    state.health = clamp(state.health + state.runMods.beaconBonusHeal, 0, 100);

    state.fireRadius = clamp(state.fireRadius + 6, CONFIG.FIRE_MIN_RADIUS, getMaxFireRadius());
    addMetric('beaconsIgnited', 1);
    addMomentum(18);

    spawnFloatingText('BEACON IGNITED', state.entities.player.position, '#ffd17b');
    pushFeed(`Beacon online (${state.beaconsLit}/${CONFIG.BEACON_COUNT})`, 'info');
    AudioManager.play('beacon');

    updateHUD();
}

function pickArchetypeForSpawn(day, index, bossNight) {
    if (bossNight && index === 0) return ENEMY_ARCHETYPES.titan;

    const roll = random();
    if (day >= 7 && roll < 0.18) return ENEMY_ARCHETYPES.brute;
    if (day >= 4 && roll < 0.44) return ENEMY_ARCHETYPES.charger;
    if (day >= 3 && roll < 0.66) return ENEMY_ARCHETYPES.leech;
    return ENEMY_ARCHETYPES.wraith;
}

function pickEliteModifier(day, archetype, bossNight) {
    if (!archetype || archetype.id === 'titan' || day < 2) return null;

    let chance = CONFIG.ELITE_BASE_CHANCE + day * CONFIG.ELITE_DAY_BONUS;
    if (bossNight) chance += CONFIG.ELITE_BOSS_BONUS;
    chance = clamp(chance, 0, CONFIG.ELITE_MAX_CHANCE);
    if (random() > chance) return null;

    const pool = ['frenzy'];
    if (day >= 3) pool.push('armored');
    if (day >= 4) pool.push('volatile');
    if (day >= 5) pool.push('siphon');
    const pick = pool[Math.floor(random() * pool.length)];
    return ELITE_MODIFIERS[pick] || null;
}

function spawnNightEnemies() {
    const threatMult = 1 + state.pushStreak * CONFIG.PUSH_THREAT_STEP;
    const directorMult = 1 + state.director.intensity * 0.12;
    const count = Math.floor((CONFIG.NIGHT_ENEMY_BASE + state.day * CONFIG.NIGHT_ENEMY_GROWTH) * state.runtime.spawnMultiplier * state.runAssist.enemySpawnMult * threatMult * directorMult);
    const enemyCount = clamp(count, 3, 16);
    const bossNight = state.day > 0 && state.day % 5 === 0;
    let eliteCount = 0;

    for (let i = 0; i < enemyCount; i++) {
        const archetype = pickArchetypeForSpawn(state.day, i, bossNight);
        const modifier = pickEliteModifier(state.day, archetype, bossNight);
        if (modifier) eliteCount += 1;
        const baseSize = rand(0.52, 0.86) * archetype.sizeMul;

        const geometry = archetype.id === 'titan'
            ? new THREE.DodecahedronGeometry(baseSize * 1.1, 1)
            : new THREE.IcosahedronGeometry(baseSize, 1);

        const material = mats.enemy.clone();
        if (archetype.id === 'charger') {
            material.color.setHex(0xff8b5f);
            material.emissive.setHex(0x742212);
        } else if (archetype.id === 'leech') {
            material.color.setHex(0xa1ff8a);
            material.emissive.setHex(0x11420d);
        } else if (archetype.id === 'brute') {
            material.color.setHex(0xff5fbe);
            material.emissive.setHex(0x4a1035);
        } else if (archetype.id === 'titan') {
            material.color.setHex(0xffd27a);
            material.emissive.setHex(0x6f2e00);
            material.opacity = 0.9;
            material.emissiveIntensity = 2.35;
        }
        if (modifier) {
            const tint = new THREE.Color(modifier.tint);
            material.color.lerp(tint, 0.42);
            material.emissive.lerp(tint, 0.28);
            material.emissiveIntensity *= 1.18;
            material.opacity = Math.min(0.96, material.opacity + 0.08);
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = false;

        const angle = rand(0, Math.PI * 2);
        const radius = archetype.id === 'titan' ? rand(150, 210) : rand(130, 200);
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = terrainHeight(x, z) + 1.1 + (archetype.id === 'titan' ? 1 : 0);

        mesh.position.set(x, y, z);

        const glowColor = archetype.id === 'leech'
            ? 0xa2ff88
            : archetype.id === 'charger'
                ? 0xff8e5e
                : archetype.id === 'titan'
                    ? 0xffb247
                    : 0xff4a65;
        const finalGlowColor = modifier ? modifier.tint : glowColor;
        const glowRange = archetype.id === 'titan' ? 24 : modifier ? 14 : 12;
        const glowIntensity = archetype.id === 'titan' ? 1.1 : modifier ? 0.72 : 0.5;
        const glow = new THREE.PointLight(finalGlowColor, glowIntensity, glowRange, 2);
        mesh.add(glow);

        world.scene.add(mesh);

        const baseHp = (54 + state.day * 10) * archetype.hpMul * (modifier ? modifier.hpMul : 1);
        state.entities.enemies.push({
            mesh,
            archetype,
            modifier,
            velocity: new THREE.Vector3(),
            hp: baseHp,
            maxHp: baseHp,
            incomingMult: modifier ? modifier.incomingMult : 1,
            phase: 0,
            attackCooldown: rand(0, modifier && modifier.id === 'frenzy' ? 0.26 : 0.5),
            chargeCooldown: rand(1.2, 2.8),
            slamCooldown: rand(2.5, CONFIG.TITAN_SLAM_COOLDOWN),
            chargeTimer: 0,
            wobble: rand(0, Math.PI * 2),
            flankSign: random() > 0.5 ? 1 : -1,
            siphonCooldown: rand(1.2, CONFIG.SIPHON_INTERVAL)
        });
    }

    if (bossNight) {
        pushFeed('Boss night: Titan signature detected.', 'danger');
    }
    if (eliteCount > 0) {
        pushFeed(`Elite signatures detected: ${eliteCount}`, 'warn');
    }
}

function getActiveNemesisEnemy() {
    for (let i = 0; i < state.entities.enemies.length; i++) {
        if (state.entities.enemies[i].nemesis) return state.entities.enemies[i];
    }
    return null;
}

function pickNemesisArchetype() {
    const rank = state.nemesisProfile.rank;
    if (rank >= 8) return ENEMY_ARCHETYPES.titan;
    if (rank >= 4) return ENEMY_ARCHETYPES.brute;
    if (rank >= 2) return ENEMY_ARCHETYPES.leech;
    return ENEMY_ARCHETYPES.charger;
}

function spawnNemesis() {
    if (state.phase !== 'SURVIVE' || state.nemesisRuntime.spawned || state.nemesisRuntime.resolved) return false;
    if (getActiveNemesisEnemy()) return false;

    const profile = state.nemesisProfile;
    const archetype = pickNemesisArchetype();
    const baseSize = rand(0.78, 1.02) * archetype.sizeMul * (1 + profile.rank * 0.04);
    const geometry = archetype.id === 'titan'
        ? new THREE.DodecahedronGeometry(baseSize * 1.1, 1)
        : new THREE.IcosahedronGeometry(baseSize, 1);

    const material = mats.enemy.clone();
    material.color.setHex(0xffb676);
    material.emissive.setHex(0x7a2004);
    material.emissiveIntensity = 2.3;
    material.opacity = 0.95;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    const player = state.entities.player.position;
    const angle = rand(0, Math.PI * 2);
    const radius = rand(56, 82);
    const x = clamp(player.x + Math.cos(angle) * radius, -CONFIG.WORLD_SIZE * 0.47, CONFIG.WORLD_SIZE * 0.47);
    const z = clamp(player.z + Math.sin(angle) * radius, -CONFIG.WORLD_SIZE * 0.47, CONFIG.WORLD_SIZE * 0.47);
    const y = terrainHeight(x, z) + 1.3 + archetype.sizeMul * 0.2;
    mesh.position.set(x, y, z);

    const glow = new THREE.PointLight(0xff9c66, 1.15, 28, 2);
    mesh.add(glow);
    world.scene.add(mesh);

    const hp = 140 + state.day * 16 + profile.rank * 48 + profile.rage * 34;
    state.entities.enemies.push({
        mesh,
        archetype,
        modifier: null,
        velocity: new THREE.Vector3(),
        hp,
        maxHp: hp,
        incomingMult: 0.9,
        phase: 0,
        attackCooldown: rand(0.2, 0.7),
        chargeCooldown: rand(1.3, 2.6),
        slamCooldown: rand(4.5, 7.5),
        chargeTimer: 0,
        wobble: rand(0, Math.PI * 2),
        flankSign: random() > 0.5 ? 1 : -1,
        siphonCooldown: rand(1.0, CONFIG.SIPHON_INTERVAL),
        nemesis: true,
        nemesisName: profile.name,
        nemesisEnraged: false
    });

    state.nemesisRuntime.spawned = true;
    pushFeed(`Nemesis emerges: ${profile.name} (rank ${profile.rank})`, 'danger');
    spawnFloatingText(`${profile.name.toUpperCase()} HUNTS`, state.entities.player.position, '#ffb07c');
    return true;
}

function updateNemesis(dt) {
    if (state.phase !== 'SURVIVE' || state.paused || state.nemesisRuntime.resolved) return;
    if (state.nemesisRuntime.spawned) return;

    const profile = state.nemesisProfile;
    const minDay = Math.max(2, 5 - Math.min(profile.rank, 3));
    if (state.day < minDay) return;

    const pressure = 1 + profile.rage * 0.14 + state.pushStreak * 0.08;
    state.nemesisRuntime.spawnTimer -= dt * pressure;
    if (state.nemesisRuntime.spawnTimer <= 0) {
        spawnNemesis();
    }
}

function resolveNemesisDefeat(enemy) {
    if (!enemy || !enemy.nemesis || state.nemesisRuntime.resolved) return;

    const profile = state.nemesisProfile;
    profile.encounters += 1;
    profile.defeats += 1;
    profile.rank = clamp(profile.rank + 1, 1, CONFIG.NEMESIS_MAX_RANK);
    profile.rage = Math.max(0, profile.rage - 1);
    profile.bounty = Math.max(0, Math.floor(profile.bounty * 0.34));
    profile.lastOutcome = 'slain';
    profile.lastSeenDay = state.day;

    state.nemesisRuntime.resolved = true;
    state.nemesisRuntime.killed = true;

    const bounty = 36 + profile.rank * 11 + profile.bounty;
    const payout = grantEmbers(bounty, { useDifficulty: true, useCombo: true });
    state.score += payout;
    state.fireRadius = clamp(state.fireRadius + 10, CONFIG.FIRE_MIN_RADIUS, getMaxFireRadius());
    rollRelicDrop('elite');
    saveProgress();

    pushFeed(`Nemesis down: ${profile.name}. +${payout} embers`, 'info');
    spawnFloatingText('NEMESIS DEFEATED', state.entities.player.position, '#ffd08a');
}

function resolveNemesisEscape(reason = 'escaped') {
    if (state.nemesisRuntime.resolved) return;
    const enemy = getActiveNemesisEnemy();
    if (!enemy) return;

    const idx = state.entities.enemies.indexOf(enemy);
    if (idx !== -1) state.entities.enemies.splice(idx, 1);
    if (enemy.mesh && enemy.mesh.parent) enemy.mesh.parent.remove(enemy.mesh);

    const profile = state.nemesisProfile;
    profile.encounters += 1;
    profile.rage = clamp(profile.rage + (reason === 'player_down' ? 2 : 1), 0, 6);
    profile.rank = clamp(profile.rank + (reason === 'player_down' ? 1 : 0), 1, CONFIG.NEMESIS_MAX_RANK);
    if (reason === 'player_down') profile.kills += 1;
    profile.bounty += 22 + profile.rank * 6;
    profile.lastOutcome = reason;
    profile.lastSeenDay = state.day;

    state.nemesisRuntime.resolved = true;
    saveProgress();

    if (reason === 'player_down') {
        pushFeed(`${profile.name} marked this defeat and grew stronger.`, 'danger');
    } else {
        pushFeed(`${profile.name} escaped. Bounty increased.`, 'warn');
    }
}

function pickDirectorArchetype(day, intensity) {
    const roll = random();
    const shifted = roll - intensity * 0.18;
    if (day >= 8 && shifted < 0.13) return ENEMY_ARCHETYPES.brute;
    if (day >= 5 && shifted < 0.42) return ENEMY_ARCHETYPES.charger;
    if (day >= 4 && shifted < 0.62) return ENEMY_ARCHETYPES.leech;
    return ENEMY_ARCHETYPES.wraith;
}

function spawnDirectorReinforcement(count = 1, opts = {}) {
    if (state.phase !== 'SURVIVE') return;

    const player = state.entities.player.position;
    const forceElite = opts.forceElite === true;
    const forceArchetype = opts.forceArchetype || null;
    const allowAnnounce = opts.allowAnnounce !== false;
    let eliteCount = 0;
    for (let i = 0; i < count; i++) {
        const archetype = forceArchetype || pickDirectorArchetype(state.day, state.director.intensity);
        let modifier = null;
        if (forceElite && archetype.id !== 'titan') {
            modifier = pickEliteModifier(state.day + 3, archetype, true) || ELITE_MODIFIERS.frenzy;
        } else {
            modifier = pickEliteModifier(state.day, archetype, false);
            if (!modifier && random() < state.director.intensity * 0.18) {
                modifier = pickEliteModifier(state.day + 2, archetype, true);
            }
        }
        if (modifier) eliteCount += 1;

        const baseSize = rand(0.48, 0.82) * archetype.sizeMul;
        const geometry = archetype.id === 'titan'
            ? new THREE.DodecahedronGeometry(baseSize * 1.1, 1)
            : new THREE.IcosahedronGeometry(baseSize, 1);

        const material = mats.enemy.clone();
        if (archetype.id === 'charger') {
            material.color.setHex(0xff8b5f);
            material.emissive.setHex(0x742212);
        } else if (archetype.id === 'leech') {
            material.color.setHex(0xa1ff8a);
            material.emissive.setHex(0x11420d);
        } else if (archetype.id === 'brute') {
            material.color.setHex(0xff5fbe);
            material.emissive.setHex(0x4a1035);
        } else if (archetype.id === 'titan') {
            material.color.setHex(0xffd27a);
            material.emissive.setHex(0x6f2e00);
            material.opacity = 0.9;
            material.emissiveIntensity = 2.35;
        }
        if (modifier) {
            const tint = new THREE.Color(modifier.tint);
            material.color.lerp(tint, 0.42);
            material.emissive.lerp(tint, 0.28);
            material.emissiveIntensity *= 1.18;
            material.opacity = Math.min(0.96, material.opacity + 0.08);
        }

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = false;

        const angle = rand(0, Math.PI * 2);
        const radius = rand(48, 78);
        const x = clamp(player.x + Math.cos(angle) * radius, -CONFIG.WORLD_SIZE * 0.47, CONFIG.WORLD_SIZE * 0.47);
        const z = clamp(player.z + Math.sin(angle) * radius, -CONFIG.WORLD_SIZE * 0.47, CONFIG.WORLD_SIZE * 0.47);
        const y = terrainHeight(x, z) + 1.1;
        mesh.position.set(x, y, z);

        const glowColor = archetype.id === 'leech'
            ? 0xa2ff88
            : archetype.id === 'charger'
                ? 0xff8e5e
                : archetype.id === 'titan'
                    ? 0xffb247
                    : 0xff4a65;
        const finalGlowColor = modifier ? modifier.tint : glowColor;
        const glowRange = archetype.id === 'titan' ? 24 : modifier ? 14 : 12;
        const glowIntensity = archetype.id === 'titan' ? 1.1 : modifier ? 0.72 : 0.5;
        mesh.add(new THREE.PointLight(finalGlowColor, glowIntensity, glowRange, 2));

        world.scene.add(mesh);

        const baseHp = (46 + state.day * 8) * archetype.hpMul * (modifier ? modifier.hpMul : 1);
        state.entities.enemies.push({
            mesh,
            archetype,
            modifier,
            velocity: new THREE.Vector3(),
            hp: baseHp,
            maxHp: baseHp,
            incomingMult: modifier ? modifier.incomingMult : 1,
            phase: 0,
            attackCooldown: rand(0, modifier && modifier.id === 'frenzy' ? 0.2 : 0.45),
            chargeCooldown: rand(1.0, 2.2),
            slamCooldown: 999,
            chargeTimer: 0,
            wobble: rand(0, Math.PI * 2),
            flankSign: random() > 0.5 ? 1 : -1,
            siphonCooldown: rand(1.2, CONFIG.SIPHON_INTERVAL)
        });
    }

    if (allowAnnounce && random() < 0.45) {
        const note = eliteCount > 0 ? `Director wave incoming (${count} targets, ${eliteCount} elite).` : `Director wave incoming (${count} targets).`;
        pushFeed(note, 'warn');
    }
}

function updateDirector(dt) {
    if (state.phase !== 'SURVIVE' || state.paused) return;

    const healthT = clamp(state.health / 100, 0, 1);
    const comboT = clamp(state.comboValue / CONFIG.COMBO_MAX, 0, 1);
    const fireT = clamp(state.fireRadius / Math.max(getMaxFireRadius(), 1), 0, 1);
    const beaconT = clamp(state.beaconsLit / CONFIG.BEACON_COUNT, 0, 1);
    const nightT = 1 - clamp(state.timeLeft / Math.max(state.runtime.nightDuration, 1), 0, 1);

    let target = 0.28 + nightT * 0.24 + comboT * 0.16 + beaconT * 0.1 + state.pushStreak * 0.08;
    target += Math.max(0, healthT - 0.6) * 0.14;
    target -= Math.max(0, 0.52 - healthT) * 0.36;
    target -= Math.max(0, 0.35 - fireT) * 0.26;
    target *= lerp(0.9, 1.08, clamp(state.runAssist.enemySpawnMult, 0.72, 1.22));
    state.director.target = clamp(target, 0.14, 1.12);
    state.director.intensity = lerp(state.director.intensity, state.director.target, 1 - Math.exp(-dt * 1.5));

    const aliveCap = clamp(Math.floor((8 + state.day + Math.floor(state.director.intensity * 4)) * state.runAssist.enemySpawnMult), 4, 28);
    state.director.reinforceTimer -= dt * (0.8 + state.director.intensity * 0.92);
    if (state.director.reinforceTimer <= 0 && state.entities.enemies.length < aliveCap) {
        const waveSize = state.director.intensity > 0.82 ? 2 : 1;
        spawnDirectorReinforcement(waveSize);
        state.director.wavesSpawned += 1;
        const cadence = rand(CONFIG.DIRECTOR_REINFORCE_MIN, CONFIG.DIRECTOR_REINFORCE_MAX);
        state.director.reinforceTimer = cadence * (1 - Math.min(state.director.intensity * 0.28, 0.55));
    }
}

function clearEnemies() {
    state.entities.enemies.forEach((enemy) => {
        if (enemy.mesh && enemy.mesh.parent) enemy.mesh.parent.remove(enemy.mesh);
    });
    state.entities.enemies.length = 0;
}

function updateEnemies(dt) {
    if (state.phase !== 'SURVIVE') {
        state.ghostProximity = 0;
        return;
    }

    const player = state.entities.player;
    const playerPos = player.position;
    let nearest = Infinity;

    for (let i = state.entities.enemies.length - 1; i >= 0; i--) {
        const enemy = state.entities.enemies[i];
        const archetype = enemy.archetype || ENEMY_ARCHETYPES.wraith;
        const mesh = enemy.mesh;
        const modifier = enemy.modifier || null;

        enemy.attackCooldown = Math.max(0, enemy.attackCooldown - dt);
        enemy.chargeCooldown = Math.max(0, enemy.chargeCooldown - dt);
        enemy.slamCooldown = Math.max(0, enemy.slamCooldown - dt);
        enemy.chargeTimer = Math.max(0, enemy.chargeTimer - dt);
        enemy.siphonCooldown = Math.max(0, (enemy.siphonCooldown == null ? rand(1.2, CONFIG.SIPHON_INTERVAL) : enemy.siphonCooldown) - dt);

        const px = playerPos.x;
        const pz = playerPos.z;
        const ex = mesh.position.x;
        const ez = mesh.position.z;

        const distToPlayer = dist2(px, pz, ex, ez);
        nearest = Math.min(nearest, distToPlayer);

        const lightStrength = getLightStrengthAt(ex, ez);
        const trapEffect = getTrapEffectAt(ex, ez);
        const steer = new THREE.Vector3();

        const lightFearThreshold = 0.12 * archetype.lightFear;
        if (lightStrength > lightFearThreshold) {
            const repel = getLightRepelVector(ex, ez);
            steer.add(repel.multiplyScalar(1.45 + lightStrength * 2.2));
        } else {
            const toPlayer = new THREE.Vector3(px - ex, 0, pz - ez);
            if (toPlayer.lengthSq() > 0.0001) {
                toPlayer.normalize();
                const flankWeight = archetype.id === 'charger' ? 0.16 : 0.35;
                const flank = new THREE.Vector3(-toPlayer.z, 0, toPlayer.x).multiplyScalar(enemy.flankSign * flankWeight);
                steer.add(toPlayer.multiplyScalar(1.2 + Math.sin(world.time * 2 + enemy.wobble) * 0.08));
                steer.add(flank);
            }
        }

        for (let j = 0; j < state.entities.enemies.length; j++) {
            if (i === j) continue;
            const other = state.entities.enemies[j].mesh.position;
            const dx = ex - other.x;
            const dz = ez - other.z;
            const d2 = dx * dx + dz * dz;
            if (d2 < 16 && d2 > 0.0001) {
                const d = Math.sqrt(d2);
                steer.x += (dx / d) * 0.65;
                steer.z += (dz / d) * 0.65;
            }
        }

        steer.x += Math.sin(world.time * 1.7 + enemy.wobble) * 0.06;
        steer.z += Math.cos(world.time * 1.5 + enemy.wobble) * 0.06;

        if (archetype.id === 'charger' && enemy.chargeCooldown <= 0 && distToPlayer < 18 && lightStrength < 0.2) {
            enemy.chargeTimer = 0.85;
            enemy.chargeCooldown = 4.2;
        }

        if (enemy.chargeTimer > 0) {
            const toPlayer = new THREE.Vector3(px - ex, 0, pz - ez);
            if (toPlayer.lengthSq() > 0.001) {
                steer.copy(toPlayer.normalize());
            }
        }

        if (archetype.id === 'leech' && Math.hypot(ex, ez) < state.fireRadius + 14) {
            state.fireRadius = Math.max(0, state.fireRadius - dt * 0.9);
        }

        if (modifier && modifier.id === 'siphon' && enemy.siphonCooldown <= 0 && lightStrength > 0.2 && Math.hypot(ex, ez) < state.fireRadius + 18) {
            enemy.siphonCooldown = CONFIG.SIPHON_INTERVAL + rand(0, 1.4);
            const drain = CONFIG.SIPHON_FIRE_DRAIN * (1 + state.day * 0.03);
            state.fireRadius = Math.max(CONFIG.FIRE_MIN_RADIUS, state.fireRadius - drain);
            enemy.hp = Math.min(enemy.maxHp, enemy.hp + drain * 5.8);
            if (random() < 0.35) {
                pushFeed('Siphon elite drains your firelight.', 'warn');
            }
            spawnFloatingText('SIPHON', mesh.position, '#9cffbf');
        }

        if (archetype.id === 'titan') {
            const hpRatio = enemy.hp / Math.max(enemy.maxHp, 1);
            if (hpRatio < 0.66 && enemy.phase < 1) {
                enemy.phase = 1;
                enemy.slamCooldown = 2.2;
                pushFeed('Titan phase 2: seismic pulses intensify.', 'danger');
            }
            if (hpRatio < 0.33 && enemy.phase < 2) {
                enemy.phase = 2;
                enemy.slamCooldown = 1.6;
                pushFeed('Titan phase 3: call of the abyss.', 'danger');

                const extra = Math.min(2, state.day >= 8 ? 2 : 1);
                for (let spawn = 0; spawn < extra; spawn++) {
                    const addAngle = rand(0, Math.PI * 2);
                    const addRadius = rand(20, 30);
                    const sx = ex + Math.cos(addAngle) * addRadius;
                    const sz = ez + Math.sin(addAngle) * addRadius;
                    const sy = terrainHeight(sx, sz) + 1.1;
                    const mat = mats.enemy.clone();
                    mat.color.setHex(0xff8b5f);
                    mat.emissive.setHex(0x742212);
                    const addMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(rand(0.5, 0.72), 1), mat);
                    addMesh.position.set(sx, sy, sz);
                    addMesh.castShadow = true;
                    addMesh.add(new THREE.PointLight(0xff8e5e, 0.5, 10, 2));
                    world.scene.add(addMesh);
                    state.entities.enemies.push({
                        mesh: addMesh,
                        archetype: ENEMY_ARCHETYPES.charger,
                        modifier: null,
                        velocity: new THREE.Vector3(),
                        hp: 42 + state.day * 7,
                        maxHp: 42 + state.day * 7,
                        incomingMult: 1,
                        phase: 0,
                        attackCooldown: rand(0, 0.4),
                        chargeCooldown: rand(0.7, 1.4),
                        slamCooldown: 999,
                        chargeTimer: 0,
                        wobble: rand(0, Math.PI * 2),
                        flankSign: random() > 0.5 ? 1 : -1,
                        siphonCooldown: rand(1.2, CONFIG.SIPHON_INTERVAL)
                    });
                }
            }

            if (enemy.slamCooldown <= 0 && distToPlayer < 24) {
                const slamRadius = CONFIG.TITAN_SLAM_RADIUS + enemy.phase * 1.6;
                const slamDamage = CONFIG.TITAN_SLAM_DAMAGE + enemy.phase * 7;
                const tx = playerPos.x + rand(-1.7, 1.7);
                const tz = playerPos.z + rand(-1.7, 1.7);
                spawnHazard('titan_slam', tx, tz, slamRadius, CONFIG.TITAN_SLAM_DELAY - enemy.phase * 0.15, slamDamage, enemy);
                enemy.slamCooldown = CONFIG.TITAN_SLAM_COOLDOWN - enemy.phase * 1.6;
                pushFeed('Titan telegraph: move out!', 'warn');
            }
        }

        if (archetype.id === 'titan' && distToPlayer < 10 && random() < dt * 0.9) {
            triggerScreenShake(0.2);
        }

        if (enemy.nemesis) {
            const profile = state.nemesisProfile;
            const hpRatio = enemy.hp / Math.max(enemy.maxHp, 1);
            if (!enemy.nemesisEnraged && hpRatio < 0.45) {
                enemy.nemesisEnraged = true;
                pushFeed(`${profile.name} is enraged.`, 'danger');
            }

            if (enemy.slamCooldown <= 0 && distToPlayer < 22) {
                const burstRadius = CONFIG.TITAN_SLAM_RADIUS + profile.rank * 0.45;
                const burstDamage = CONFIG.TITAN_SLAM_DAMAGE + profile.rank * 3.4 + profile.rage * 4.2;
                const tx = playerPos.x + rand(-1.2, 1.2);
                const tz = playerPos.z + rand(-1.2, 1.2);
                spawnHazard('nemesis_burst', tx, tz, burstRadius, 0.85, burstDamage, enemy);
                enemy.slamCooldown = Math.max(3.2, 7.2 - profile.rank * 0.24);
                if (random() < 0.42) {
                    pushFeed(`${profile.name} marks the ground.`, 'warn');
                }
            }
        }

        if (steer.lengthSq() > 0.00001) steer.normalize();

        const modifierSpeed = modifier ? modifier.speedMul : 1;
        const baseSpeed = (state.runtime.enemySpeed + clamp(state.day * 0.22, 0, 3.4)) * archetype.speedMul * modifierSpeed;
        let speed = lightStrength > lightFearThreshold ? baseSpeed * 0.74 : baseSpeed * 1.18;
        if (archetype.id === 'titan') {
            speed *= 1 + enemy.phase * 0.12;
        }
        if (modifier && modifier.id === 'frenzy' && enemy.hp / Math.max(enemy.maxHp, 1) < 0.45) {
            speed *= 1.22;
        }
        if (enemy.chargeTimer > 0) speed *= 2.25;
        if (enemy.nemesis) {
            const profile = state.nemesisProfile;
            speed *= 1.12 + profile.rank * 0.04 + profile.rage * 0.08;
            if (enemy.nemesisEnraged) speed *= 1.22;
        }
        const directorPressure = 0.9 + state.director.intensity * 0.28 + state.pushStreak * 0.04;
        speed *= directorPressure;
        speed *= 1 - trapEffect.slow;

        enemy.velocity.lerp(steer.multiplyScalar(speed), 1 - Math.exp(-dt * 6.5));

        mesh.position.x += enemy.velocity.x * dt;
        mesh.position.z += enemy.velocity.z * dt;

        if (!inBounds(mesh.position.x, mesh.position.z, 4)) {
            mesh.position.x = clamp(mesh.position.x, -CONFIG.WORLD_SIZE * 0.48, CONFIG.WORLD_SIZE * 0.48);
            mesh.position.z = clamp(mesh.position.z, -CONFIG.WORLD_SIZE * 0.48, CONFIG.WORLD_SIZE * 0.48);
        }

        mesh.position.y = terrainHeight(mesh.position.x, mesh.position.z) + 1.1 + archetype.sizeMul * 0.2
            + Math.sin(world.time * 6 + enemy.wobble) * 0.28;

        const moveMag = Math.hypot(enemy.velocity.x, enemy.velocity.z);
        if (moveMag > 0.03) {
            const rot = Math.atan2(enemy.velocity.x, enemy.velocity.z);
            mesh.rotation.y = lerpAngle(mesh.rotation.y, rot, 1 - Math.exp(-dt * 10));
        }

        const flareDps = getFlareDamageAt(mesh.position.x, mesh.position.z);
        if (flareDps > 0) {
            damageEnemy(enemy, flareDps * dt);
        }
        if (trapEffect.dps > 0) {
            damageEnemy(enemy, trapEffect.dps * dt);
        }

        if (enemy.hp <= 0) {
            resolveEnemyDeath(enemy, 'burn');
            continue;
        }

        const attackRange = 1.7 * archetype.sizeMul;
        if (distToPlayer < attackRange && lightStrength < 0.1 * archetype.lightFear && enemy.attackCooldown <= 0) {
            enemy.attackCooldown = 0.85;
            let damage = CONFIG.ENEMY_DAMAGE * state.runtime.damageMultiplier * archetype.damageMul;
            if (modifier) damage *= modifier.damageMul;
            if (enemy.nemesis) {
                const profile = state.nemesisProfile;
                damage *= 1.18 + profile.rank * 0.055 + profile.rage * 0.08;
            }
            damage *= 0.92 + state.director.intensity * 0.24 + state.pushStreak * 0.05;
            if (modifier && modifier.id === 'frenzy' && enemy.hp / Math.max(enemy.maxHp, 1) < 0.45) {
                damage *= 1.2;
            }
            if (enemy.chargeTimer > 0.25) damage *= 1.5;
            applyPlayerDamage(damage, `${archetype.label} strike`);
        }
    }

    state.ghostProximity = nearest === Infinity ? 0 : clamp(1 - nearest / 36, 0, 1);
}

function castFlare() {
    if (!state.started || state.phase === 'GAME_OVER' || state.paused) return;
    if (isAuthoritativeCoopActive()) {
        queueAuthoritativeAction('flare');
        return;
    }
    const flareCost = Math.max(0, CONFIG.FLARE_COST + state.runMods.flareCostOffset);
    if (state.shards < flareCost) {
        pushFeed('No shards left for a flare.', 'warn');
        return;
    }

    state.shards -= flareCost;

    const boost = hasUpgrade('blue_flame') ? 1.32 : 1;
    const duration = CONFIG.FLARE_DURATION * boost * state.runMods.flareDurationMult;
    const radius = CONFIG.FLARE_RADIUS * boost * state.runMods.flareRadiusMult;

    const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(radius, 20, 20),
        mats.flare.clone()
    );
    mesh.position.copy(state.entities.player.position);
    mesh.position.y = terrainHeight(mesh.position.x, mesh.position.z) + 1.1;

    const ring = new THREE.Mesh(
        new THREE.RingGeometry(radius * 0.75, radius * 0.9, 36),
        new THREE.MeshBasicMaterial({
            color: 0x7bd7ff,
            transparent: true,
            opacity: 0.36,
            side: THREE.DoubleSide
        })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = terrainHeight(mesh.position.x, mesh.position.z) + 0.16;

    const light = new THREE.PointLight(0x66d7ff, 1.6, radius * 2, 2);
    light.position.copy(mesh.position);

    world.scene.add(mesh);
    world.scene.add(ring);
    world.scene.add(light);

    state.entities.activeFlares.push({
        mesh,
        ring,
        light,
        life: duration,
        maxLife: duration,
        radius
    });

    spawnFloatingText('FLARE DEPLOYED', state.entities.player.position, '#8ad9ff');
    triggerFlash('rgba(130, 230, 255, 0.28)', 0.16);
    AudioManager.play('flare');
    addMomentum(8);
}

function craftWeaponOrAmmo() {
    if (!state.started || state.phase === 'GAME_OVER' || state.paused) return;
    if (isAuthoritativeCoopActive()) {
        queueAuthoritativeAction('craft');
        return;
    }

    if (!state.weapon.crafted) {
        const woodCost = Math.max(3, CONFIG.CRAFT_BOW_WOOD_COST - (hasUpgrade('arc_bow') ? 1 : 0));
        const shardCost = CONFIG.CRAFT_BOW_SHARD_COST;

        if (state.wood < woodCost || state.shards < shardCost) {
            pushFeed(`Need ${woodCost} wood + ${shardCost} shards to craft Arc Bow.`, 'warn');
            return;
        }

        state.wood -= woodCost;
        state.shards -= shardCost;
        state.weapon.crafted = true;
        state.weapon.ammo = Math.min(CONFIG.BOLT_MAX_AMMO, 8 + (hasUpgrade('rail_quiver') ? 4 : 0));
        state.boltCooldown = 0;
        state.boltCooldownMax = CONFIG.BOLT_FIRE_COOLDOWN;

        spawnFloatingText('ARC BOW ONLINE', state.entities.player.position, '#ffd691');
        pushFeed('Arc Bow crafted. Press X to fire.', 'info');
        AudioManager.play('perk');
        addMomentum(10);
        return;
    }

    const packWood = CONFIG.BOLT_PACK_WOOD_COST;
    const packShards = Math.max(0, CONFIG.BOLT_PACK_SHARD_COST - (hasUpgrade('rail_quiver') ? 1 : 0));
    if (state.wood < packWood || state.shards < packShards) {
        pushFeed(`Need ${packWood} wood + ${packShards} shard for bolt bundle.`, 'warn');
        return;
    }

    state.wood -= packWood;
    state.shards -= packShards;

    const packMult = hasUpgrade('rail_quiver') ? 1.6 : 1;
    const gain = Math.floor(CONFIG.BOLT_PACK_SIZE * packMult);
    state.weapon.ammo = Math.min(CONFIG.BOLT_MAX_AMMO, state.weapon.ammo + gain);

    spawnFloatingText(`+${gain} BOLTS`, state.entities.player.position, '#9bd8ff');
    pushFeed(`Ammo crafted: +${gain} bolts.`, 'info');
    AudioManager.play('collect');
    addMomentum(5);
}

function fireBolt() {
    if (!state.started || state.phase === 'GAME_OVER' || state.paused) return;
    if (isAuthoritativeCoopActive()) {
        queueAuthoritativeAction('shoot');
        return;
    }
    if (!state.weapon.crafted) {
        pushFeed('Craft Arc Bow first (C).', 'warn');
        return;
    }
    if (state.weapon.ammo <= 0) {
        pushFeed('Out of bolts. Craft ammo (C).', 'warn');
        return;
    }
    if (state.boltCooldown > 0) return;

    state.weapon.ammo -= 1;

    const fireCooldown = CONFIG.BOLT_FIRE_COOLDOWN * (hasUpgrade('rail_quiver') ? 0.7 : 1);
    state.boltCooldownMax = fireCooldown;
    state.boltCooldown = fireCooldown;

    const baseDamage = CONFIG.BOLT_BASE_DAMAGE * (hasUpgrade('arc_bow') ? 1.35 : 1);
    const speed = CONFIG.BOLT_SPEED * (hasUpgrade('rail_quiver') ? 1.12 : 1);
    const pierce = hasUpgrade('arc_bow') ? 1 : 0;

    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8),
        new THREE.MeshBasicMaterial({ color: hasUpgrade('arc_bow') ? 0xffd17c : 0xb9e6ff })
    );

    const px = state.entities.player.position.x;
    const pz = state.entities.player.position.z;
    const py = terrainHeight(px, pz) + 1.35;
    const dir = new THREE.Vector3(Math.sin(state.playerFacing), 0, Math.cos(state.playerFacing)).normalize();

    mesh.position.set(px + dir.x * 1.15, py, pz + dir.z * 1.15);
    mesh.lookAt(mesh.position.x + dir.x, mesh.position.y, mesh.position.z + dir.z);
    mesh.rotation.x = Math.PI / 2;

    world.scene.add(mesh);
    state.entities.projectiles.push({
        mesh,
        velocity: dir.multiplyScalar(speed),
        life: CONFIG.BOLT_LIFETIME,
        damage: baseDamage,
        pierce,
        hitIds: new Set()
    });

    AudioManager.play('shot');
}

function castPulseBlast() {
    if (!state.started || state.phase === 'GAME_OVER' || state.paused) return;
    if (isAuthoritativeCoopActive()) {
        queueAuthoritativeAction('pulse');
        return;
    }
    if (state.pulseCooldown > 0) return;
    if (state.shards < 1) {
        pushFeed('Need at least 1 shard to trigger pulse.', 'warn');
        return;
    }

    state.shards -= 1;

    const stabilizer = hasUpgrade('pulse_stabilizer');
    const radius = CONFIG.PULSE_BASE_RADIUS * state.runMods.pulseRadiusMult * (stabilizer ? 1.08 : 1);
    const damage = CONFIG.PULSE_BASE_DAMAGE * state.runMods.pulseDamageMult * (stabilizer ? 1.2 : 1);
    const cooldown = CONFIG.PULSE_BASE_COOLDOWN * state.runMods.pulseCooldownMult * (stabilizer ? 0.8 : 1);

    state.pulseCooldownMax = cooldown;
    state.pulseCooldown = cooldown;

    addMetric('pulseCasts', 1);
    addMomentum(12);

    const playerPos = state.entities.player.position;
    const ring = new THREE.Mesh(
        new THREE.TorusGeometry(1.6, 0.2, 10, 40),
        new THREE.MeshBasicMaterial({ color: 0xb488ff, transparent: true, opacity: 0.95 })
    );
    ring.position.set(playerPos.x, terrainHeight(playerPos.x, playerPos.z) + 0.7, playerPos.z);
    ring.rotation.x = Math.PI / 2;
    world.scene.add(ring);

    state.entities.activePulses.push({
        mesh: ring,
        life: 0.45,
        maxLife: 0.45,
        radius
    });

    let hits = 0;
    for (let i = state.entities.enemies.length - 1; i >= 0; i--) {
        const enemy = state.entities.enemies[i];
        const ePos = enemy.mesh.position;
        const d = dist2(playerPos.x, playerPos.z, ePos.x, ePos.z);
        if (d > radius) continue;

        const falloff = 1 - d / Math.max(radius, 0.001);
        damageEnemy(enemy, damage * (0.45 + falloff * 0.85));
        TMP.pulsePush.set(ePos.x - playerPos.x, 0, ePos.z - playerPos.z);
        if (TMP.pulsePush.lengthSq() > 0.0001) {
            TMP.pulsePush.normalize().multiplyScalar(8 + falloff * 10);
            enemy.velocity.add(TMP.pulsePush);
        }
        if (enemy.hp <= 0) {
            resolveEnemyDeath(enemy, 'pulse');
        }
        hits += 1;
    }

    if (hits > 0) {
        pushFeed(`Pulse hit ${hits} target${hits > 1 ? 's' : ''}.`, 'info');
    }

    spawnFloatingText('PULSE BLAST', state.entities.player.position, '#d6adff');
    triggerFlash('rgba(182, 130, 255, 0.34)', 0.2);
    triggerScreenShake(0.16);
    AudioManager.play('pulse');
}

function damageEnemy(enemy, amount) {
    const mult = enemy.incomingMult || 1;
    const dealt = amount * mult;
    enemy.hp -= dealt;
    return dealt;
}

function resolveEnemyDeath(enemy, cause = 'unknown') {
    const idx = state.entities.enemies.indexOf(enemy);
    if (idx !== -1) state.entities.enemies.splice(idx, 1);

    if (enemy.mesh && enemy.mesh.parent) {
        enemy.mesh.parent.remove(enemy.mesh);
    }

    const archetype = enemy.archetype || ENEMY_ARCHETYPES.wraith;
    const modifier = enemy.modifier || null;

    if (enemy.nemesis) {
        resolveNemesisDefeat(enemy);
    }

    const reward = archetype.reward + (modifier ? modifier.rewardBonus : 0);
    const emberGain = grantEmbers(reward, { useDifficulty: false, useCombo: true });
    state.score += emberGain;

    const shardDropChance = 0.2 + state.runMods.enemyDropBonus + state.runAssist.dropBonus + (modifier ? 0.05 : 0);
    if (random() < shardDropChance) state.shards += 1;
    if (state.runMods.killHeal > 0) state.health = clamp(state.health + state.runMods.killHeal, 0, 100);

    addMetric('enemiesKilled', 1);
    addMomentum(10 + archetype.reward + (modifier ? 4 : 0));
    registerNightEventKill(enemy);
    registerKillChain(reward);
    spawnEmberOrb(
        enemy.mesh.position,
        reward,
        !!modifier || archetype.id === 'titan',
        !!enemy.nemesis
    );

    if (modifier) {
        if (modifier.id === 'volatile') {
            spawnHazard(
                'volatile_blast',
                enemy.mesh.position.x,
                enemy.mesh.position.z,
                CONFIG.VOLATILE_BLAST_RADIUS,
                0.35,
                CONFIG.VOLATILE_BLAST_DAMAGE,
                enemy
            );
            if (random() < 0.45) {
                pushFeed('Volatile elite detonated.', 'warn');
            }
        } else if (modifier.id === 'siphon') {
            state.fireRadius = clamp(state.fireRadius + 3.5, CONFIG.FIRE_MIN_RADIUS, getMaxFireRadius());
        }

        if (random() < 0.22) {
            rollRelicDrop('elite');
        }
    } else if (archetype.id === 'titan') {
        rollRelicDrop('elite');
    }

    if (cause === 'bolt' && emberGain >= 10) {
        spawnFloatingText('ARC HIT', enemy.mesh.position, '#ffce85');
    }

    const kills = state.metrics.enemiesKilled;
    if (enemy.nemesis || archetype.id === 'titan' || (kills > 0 && kills % 5 === 0)) {
        trackTelemetry('kill_marker', {
            kills,
            combo: Number(state.comboMultiplier.toFixed(2)),
            nemesis: enemy.nemesis ? 1 : 0,
            elite: modifier ? 1 : 0
        });
    }
}

function updateProjectiles(dt) {
    for (let i = state.entities.projectiles.length - 1; i >= 0; i--) {
        const projectile = state.entities.projectiles[i];
        projectile.life -= dt;
        projectile.mesh.position.addScaledVector(projectile.velocity, dt);

        const p = projectile.mesh.position;
        if (projectile.life <= 0 || !inBounds(p.x, p.z, -8)) {
            if (projectile.mesh.parent) projectile.mesh.parent.remove(projectile.mesh);
            state.entities.projectiles.splice(i, 1);
            continue;
        }

        for (let j = 0; j < state.entities.enemies.length; j++) {
            const enemy = state.entities.enemies[j];
            if (projectile.hitIds.has(enemy)) continue;

            const enemyRadius = CONFIG.BOLT_HIT_RADIUS * ((enemy.archetype && enemy.archetype.sizeMul) || 1);
            const d = dist2(p.x, p.z, enemy.mesh.position.x, enemy.mesh.position.z);
            if (d > enemyRadius) continue;

            projectile.hitIds.add(enemy);
            const dealt = damageEnemy(enemy, projectile.damage);
            AudioManager.play('hit');
            addMomentum(3);

            if (dealt > 30 && random() < 0.25) {
                spawnFloatingText('CRIT', enemy.mesh.position, '#ffcc8a');
            }

            if (enemy.hp <= 0) {
                resolveEnemyDeath(enemy, 'bolt');
                j -= 1;
            }

            projectile.pierce -= 1;
            if (projectile.pierce < 0) {
                if (projectile.mesh.parent) projectile.mesh.parent.remove(projectile.mesh);
                state.entities.projectiles.splice(i, 1);
                break;
            }
        }
    }
}

function deployTrap() {
    if (!state.started || state.phase === 'GAME_OVER' || state.paused) return;
    if (isAuthoritativeCoopActive()) {
        queueAuthoritativeAction('trap');
        return;
    }
    const trapKit = hasUpgrade('trap_kit');
    const trapLimit = CONFIG.MAX_ACTIVE_TRAPS + (trapKit ? 1 : 0);
    const woodCost = CONFIG.TRAP_COST_WOOD;
    const shardCost = Math.max(0, CONFIG.TRAP_COST_SHARD - (trapKit ? 1 : 0));

    if (state.entities.activeTraps.length >= trapLimit) {
        pushFeed('Trap limit reached. Wait for one to expire.', 'warn');
        return;
    }
    if (state.wood < woodCost || state.shards < shardCost) {
        pushFeed(`Trap requires ${woodCost} wood + ${shardCost} shard.`, 'warn');
        return;
    }

    state.wood -= woodCost;
    state.shards -= shardCost;

    const playerPos = state.entities.player.position;
    const x = playerPos.x;
    const z = playerPos.z;
    const y = terrainHeight(x, z);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 1.1, 0.4, 10), mats.trapBase.clone());
    base.position.set(x, y + 0.22, z);
    base.castShadow = true;
    base.receiveShadow = true;

    const trapRadius = CONFIG.TRAP_RADIUS * (trapKit ? 1.2 : 1);
    const trapDuration = CONFIG.TRAP_DURATION + (trapKit ? 6 : 0);
    const trapDps = CONFIG.TRAP_DPS * (trapKit ? 1.35 : 1);

    const ring = new THREE.Mesh(
        new THREE.RingGeometry(trapRadius * 0.75, trapRadius * 0.9, 42),
        new THREE.MeshBasicMaterial({
            color: 0x6bc5ff,
            transparent: true,
            opacity: 0.32,
            side: THREE.DoubleSide
        })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, y + 0.12, z);

    const light = new THREE.PointLight(0x7bd0ff, 0.9, trapRadius * 2, 2);
    light.position.set(x, y + 1, z);

    world.scene.add(base);
    world.scene.add(ring);
    world.scene.add(light);

    state.entities.activeTraps.push({
        base,
        ring,
        light,
        x,
        z,
        radius: trapRadius,
        life: trapDuration,
        maxLife: trapDuration,
        dps: trapDps,
        slow: CONFIG.TRAP_SLOW
    });

    addMomentum(9);
    spawnFloatingText('TRAP DEPLOYED', playerPos, '#8bcfff');
    pushFeed('Trap deployed.', 'info');
    AudioManager.play('flare');
}

function updatePulses(dt) {
    for (let i = state.entities.activePulses.length - 1; i >= 0; i--) {
        const pulse = state.entities.activePulses[i];
        pulse.life -= dt;
        const t = clamp(pulse.life / pulse.maxLife, 0, 1);
        const growth = 1 + (1 - t) * (pulse.radius / 4);
        pulse.mesh.scale.set(growth, growth, 1);
        pulse.mesh.material.opacity = 0.06 + t * 0.9;

        if (pulse.life <= 0) {
            if (pulse.mesh.parent) pulse.mesh.parent.remove(pulse.mesh);
            state.entities.activePulses.splice(i, 1);
        }
    }
}

function getTrapEffectAt(x, z) {
    let dps = 0;
    let slow = 0;
    for (let i = 0; i < state.entities.activeTraps.length; i++) {
        const trap = state.entities.activeTraps[i];
        const d = dist2(x, z, trap.x, trap.z);
        if (d > trap.radius) continue;
        const influence = 1 - d / Math.max(trap.radius, 0.001);
        dps += trap.dps * influence;
        slow = Math.max(slow, trap.slow * influence);
    }
    return { dps, slow: clamp(slow, 0, 0.8) };
}

function updateTraps(dt) {
    for (let i = state.entities.activeTraps.length - 1; i >= 0; i--) {
        const trap = state.entities.activeTraps[i];
        trap.life -= dt;

        const t = clamp(trap.life / trap.maxLife, 0, 1);
        trap.ring.material.opacity = 0.06 + t * 0.34;
        trap.light.intensity = 0.2 + t * 0.9;
        trap.ring.rotation.z += dt * 0.9;
        const pulse = 0.94 + Math.sin(world.time * 6 + i) * 0.08;
        trap.ring.scale.set(pulse, pulse, 1);

        if (trap.life <= 0) {
            if (trap.base.parent) trap.base.parent.remove(trap.base);
            if (trap.ring.parent) trap.ring.parent.remove(trap.ring);
            if (trap.light.parent) trap.light.parent.remove(trap.light);
            state.entities.activeTraps.splice(i, 1);
        }
    }
}

function updateFlares(dt) {
    for (let i = state.entities.activeFlares.length - 1; i >= 0; i--) {
        const flare = state.entities.activeFlares[i];

        flare.life -= dt;
        const lifeT = clamp(flare.life / flare.maxLife, 0, 1);

        flare.mesh.material.opacity = 0.06 + lifeT * 0.24;
        flare.ring.material.opacity = 0.06 + lifeT * 0.38;
        flare.light.intensity = 0.3 + lifeT * 1.5;

        flare.mesh.scale.setScalar(0.92 + (1 - lifeT) * 0.24);
        flare.ring.scale.setScalar(0.95 + (1 - lifeT) * 0.12);

        if (flare.life <= 0) {
            if (flare.mesh.parent) flare.mesh.parent.remove(flare.mesh);
            if (flare.ring.parent) flare.ring.parent.remove(flare.ring);
            if (flare.light.parent) flare.light.parent.remove(flare.light);
            state.entities.activeFlares.splice(i, 1);
        }
    }
}

function clearFlares() {
    state.entities.activeFlares.forEach((flare) => {
        if (flare.mesh.parent) flare.mesh.parent.remove(flare.mesh);
        if (flare.ring.parent) flare.ring.parent.remove(flare.ring);
        if (flare.light.parent) flare.light.parent.remove(flare.light);
    });
    state.entities.activeFlares.length = 0;
}

function clearPulses() {
    state.entities.activePulses.forEach((pulse) => {
        if (pulse.mesh.parent) pulse.mesh.parent.remove(pulse.mesh);
    });
    state.entities.activePulses.length = 0;
}

function clearTraps() {
    state.entities.activeTraps.forEach((trap) => {
        if (trap.base.parent) trap.base.parent.remove(trap.base);
        if (trap.ring.parent) trap.ring.parent.remove(trap.ring);
        if (trap.light.parent) trap.light.parent.remove(trap.light);
    });
    state.entities.activeTraps.length = 0;
}

function clearProjectiles() {
    state.entities.projectiles.forEach((projectile) => {
        if (projectile.mesh.parent) projectile.mesh.parent.remove(projectile.mesh);
    });
    state.entities.projectiles.length = 0;
}

function spawnHazard(type, x, z, radius, delay, damage, owner = null) {
    const volatile = type === 'volatile_blast';
    const nemesis = type === 'nemesis_burst';
    const telegraphColor = volatile ? 0xffa867 : nemesis ? 0xff8c4a : 0xff5b79;
    const y = terrainHeight(x, z) + 0.12;
    const ring = new THREE.Mesh(
        new THREE.RingGeometry(radius * (volatile ? 0.6 : 0.72), radius * 0.92, 46),
        new THREE.MeshBasicMaterial({
            color: telegraphColor,
            transparent: true,
            opacity: volatile ? 0.34 : 0.28,
            side: THREE.DoubleSide
        })
    );
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(x, y, z);
    world.scene.add(ring);

    state.entities.hazards.push({
        type,
        x,
        z,
        radius,
        timer: delay,
        maxTimer: delay,
        damage,
        owner,
        ring,
        exploded: false
    });
}

function updateHazards(dt) {
    for (let i = state.entities.hazards.length - 1; i >= 0; i--) {
        const hazard = state.entities.hazards[i];
        hazard.timer -= dt;

        if (!hazard.exploded) {
            const t = clamp(hazard.timer / Math.max(hazard.maxTimer, 0.001), 0, 1);
            const pulse = 0.9 + (1 - t) * 0.45;
            hazard.ring.scale.set(pulse, pulse, 1);
            hazard.ring.material.opacity = 0.12 + (1 - t) * 0.55;
            hazard.ring.rotation.z += dt * 1.8;

            if (hazard.timer <= 0) {
                hazard.exploded = true;
                hazard.timer = 0.28;
                hazard.ring.material.color.setHex(
                    hazard.type === 'volatile_blast'
                        ? 0xfff0b2
                        : hazard.type === 'nemesis_burst'
                            ? 0xffd68c
                            : 0xffca8b
                );
                hazard.ring.material.opacity = 0.85;
                hazard.ring.scale.set(1.25, 1.25, 1);

                const player = state.entities.player.position;
                const d = dist2(player.x, player.z, hazard.x, hazard.z);
                if (d <= hazard.radius) {
                    const falloff = 1 - d / Math.max(hazard.radius, 0.001);
                    const reason = hazard.type === 'volatile_blast'
                        ? 'Volatile detonation'
                        : hazard.type === 'nemesis_burst'
                            ? `${state.nemesisProfile.name} burst`
                            : 'Titan slam';
                    applyPlayerDamage(hazard.damage * (0.65 + falloff * 0.65), reason);
                    triggerScreenShake(0.24);
                    triggerFlash('rgba(255, 132, 76, 0.34)', 0.16);
                    pushFeed('Shockwave impact!', 'danger');
                }

                if (hazard.type === 'volatile_blast') {
                    for (let e = state.entities.enemies.length - 1; e >= 0; e--) {
                        const enemy = state.entities.enemies[e];
                        if (enemy === hazard.owner) continue;
                        const ex = enemy.mesh.position.x;
                        const ez = enemy.mesh.position.z;
                        const ed = dist2(ex, ez, hazard.x, hazard.z);
                        if (ed > hazard.radius) continue;

                        const efalloff = 1 - ed / Math.max(hazard.radius, 0.001);
                        damageEnemy(enemy, hazard.damage * (0.35 + efalloff * 0.85));
                        if (enemy.hp <= 0) {
                            resolveEnemyDeath(enemy, 'volatile');
                        }
                    }
                }
            }
        } else {
            const t = clamp(hazard.timer / 0.28, 0, 1);
            hazard.ring.material.opacity = t;
            hazard.ring.scale.multiplyScalar(1 + dt * 2.2);
            if (hazard.timer <= 0) {
                if (hazard.ring.parent) hazard.ring.parent.remove(hazard.ring);
                state.entities.hazards.splice(i, 1);
            }
        }
    }
}

function clearHazards() {
    state.entities.hazards.forEach((hazard) => {
        if (hazard.ring.parent) hazard.ring.parent.remove(hazard.ring);
    });
    state.entities.hazards.length = 0;
}

function getFlareDamageAt(x, z) {
    let damage = 0;
    for (let i = 0; i < state.entities.activeFlares.length; i++) {
        const flare = state.entities.activeFlares[i];
        const d = dist2(x, z, flare.mesh.position.x, flare.mesh.position.z);
        if (d < flare.radius) {
            const t = 1 - d / flare.radius;
            damage += 26 * t;
        }
    }
    return damage;
}

function getLightStrengthAt(x, z) {
    let strength = 0;

    const campDist = Math.hypot(x, z);
    if (campDist < state.fireRadius) {
        strength = Math.max(strength, 1 - campDist / Math.max(state.fireRadius, 0.001));
    }

    for (let i = 0; i < state.entities.beacons.length; i++) {
        const beacon = state.entities.beacons[i];
        if (!beacon.active) continue;
        const radius = 30;
        const d = dist2(x, z, beacon.x, beacon.z);
        if (d < radius) {
            strength = Math.max(strength, 0.2 + (1 - d / radius) * 0.8);
        }
    }

    for (let i = 0; i < state.entities.activeFlares.length; i++) {
        const flare = state.entities.activeFlares[i];
        const d = dist2(x, z, flare.mesh.position.x, flare.mesh.position.z);
        if (d < flare.radius) {
            strength = Math.max(strength, 0.2 + (1 - d / flare.radius) * 0.8);
        }
    }

    for (let i = 0; i < state.entities.activePulses.length; i++) {
        const pulse = state.entities.activePulses[i];
        const d = dist2(x, z, pulse.mesh.position.x, pulse.mesh.position.z);
        if (d < pulse.radius * 0.8) {
            strength = Math.max(strength, 0.12 + (1 - d / (pulse.radius * 0.8)) * 0.5);
        }
    }

    return clamp(strength, 0, 1);
}

function getLightRepelVector(x, z) {
    const out = new THREE.Vector3();

    const addRepel = (cx, cz, radius, weight) => {
        const dx = x - cx;
        const dz = z - cz;
        const d = Math.hypot(dx, dz);
        if (d >= radius) return;

        const k = (1 - d / radius) * weight;
        out.x += (dx / Math.max(d, 0.001)) * k;
        out.z += (dz / Math.max(d, 0.001)) * k;
    };

    addRepel(0, 0, state.fireRadius + 4, 1.2);

    for (let i = 0; i < state.entities.beacons.length; i++) {
        const beacon = state.entities.beacons[i];
        if (beacon.active) addRepel(beacon.x, beacon.z, 32, 0.95);
    }

    for (let i = 0; i < state.entities.activeFlares.length; i++) {
        const flare = state.entities.activeFlares[i];
        addRepel(flare.mesh.position.x, flare.mesh.position.z, flare.radius + 5, 1.6);
    }

    for (let i = 0; i < state.entities.activePulses.length; i++) {
        const pulse = state.entities.activePulses[i];
        addRepel(pulse.mesh.position.x, pulse.mesh.position.z, pulse.radius * 0.7, 0.9);
    }

    return out;
}

function updateFireSystem(dt) {
    const core = state.entities.campCore;
    const ring = state.entities.campRing;
    const light = state.entities.fireLight;

    if (!core || !ring || !light) return;

    const t = world.time;
    let decay = state.phase === 'GATHER' ? CONFIG.FIRE_DECAY_DAY : CONFIG.FIRE_DECAY_NIGHT;
    decay *= state.runtime.decayMultiplier;
    decay *= state.runMods.fireDecayMult;
    decay *= state.runAssist.fireDecayMult;

    if (hasUpgrade('blue_flame')) decay *= 0.74;
    if (state.overdrive.active) decay *= CONFIG.OVERDRIVE_FIRE_DECAY_MULT;

    const weatherPenalty = 1 + state.weather.rain * 1.35 + state.weather.wind * 0.4;
    decay *= hasGadget('lightning_rods') ? lerp(weatherPenalty, 1, 0.45) : weatherPenalty;

    state.fireRadius -= decay * dt;
    state.fireRadius = clamp(state.fireRadius, 0, getMaxFireRadius());

    const alive = state.fireRadius > 0.1;
    const lifeT = clamp(state.fireRadius / getMaxFireRadius(), 0, 1);

    if (alive) {
        state.fireOutTimer = CONFIG.FIRE_OUT_GRACE;
    }
    if (state.fireRadius <= CONFIG.FIRE_CRITICAL_RADIUS && !state.fireCriticalWarned) {
        state.fireCriticalWarned = true;
        pushFeed('Campfire critical. Add fuel or risk total blackout.', 'danger');
    } else if (state.fireRadius > CONFIG.FIRE_CRITICAL_RADIUS + 4) {
        state.fireCriticalWarned = false;
    }

    if (alive) {
        const flicker = Math.sin(t * 16) * 0.2 + Math.cos(t * 23) * 0.15;
        light.intensity = 1.4 + lifeT * 2.3 + flicker;
        light.distance = Math.max(4, state.fireRadius);

        const emberColor = new THREE.Color().setHSL(0.07 - lifeT * 0.02, 0.9, 0.5);
        core.material.color.copy(emberColor);
        core.material.emissive.setHSL(0.05, 0.95, 0.34 + lifeT * 0.2);
        core.material.emissiveIntensity = 1.3 + lifeT * 1.4;

        core.scale.set(0.85 + lifeT * 0.45 + Math.sin(t * 10) * 0.06, 0.9 + lifeT * 0.55, 0.85 + lifeT * 0.45);
        ring.material.opacity = 0.08 + lifeT * 0.35;
    } else {
        if (state.phase === 'SURVIVE' && state.relicRuntime.phoenixReady) {
            state.relicRuntime.phoenixReady = false;
            state.fireRadius = clamp(CONFIG.FIRE_MIN_RADIUS + 20, 0, getMaxFireRadius());
            state.fireOutTimer = CONFIG.FIRE_OUT_GRACE;
            state.fireCriticalWarned = false;
            spawnFloatingText('PHOENIX RELIGHT', state.entities.player.position, '#ffd18a');
            pushFeed('Phoenix Spool relit the campfire.', 'info');
            AudioManager.play('perk');
            return;
        }

        light.intensity = 0;
        light.distance = 0;
        ring.material.opacity = 0;

        if (state.phase === 'SURVIVE') {
            state.fireOutTimer -= dt;
            if (state.fireOutTimer <= 0) {
                endGame('The campfire went out.');
                return;
            }
        }
    }

    if (state.phase === 'SURVIVE') {
        const player = state.entities.player.position;
        const safe = getLightStrengthAt(player.x, player.z);
        if (safe < 0.08) {
            applyPlayerDamage(CONFIG.DARKNESS_DAMAGE * state.runtime.damageMultiplier * dt, 'The dark closes in');
        }
    }
}

function applyPlayerDamage(amount, reason) {
    if (state.phase === 'GAME_OVER') return;
    if (state.playerHitCooldown > 0 && amount > 1.5) return;

    amount *= state.runMods.damageTakenMult;

    if (amount > 1.5) {
        state.playerHitCooldown = CONFIG.PLAYER_DAMAGE_COOLDOWN;
    }

    state.health -= amount;
    state.health = clamp(state.health, 0, 100);
    addMetric('damageTaken', amount);
    state.comboValue = Math.max(0, state.comboValue - amount * 1.4);
    state.comboMultiplier = 1 + Math.floor(state.comboValue / 20) * 0.2;
    if (amount > 6) {
        state.chain.count = Math.max(0, state.chain.count - 1);
        if (state.chain.count === 0) state.chain.timer = 0;
    }

    triggerFlash('rgba(255, 60, 60, 0.32)', 0.12);
    triggerScreenShake(0.12);

    if (amount > 1.5) {
        AudioManager.play('damage');
    }

    if (state.health <= 0) {
        endGame(reason);
    }
}

function updateWeather(dt) {
    const r = state.weather;
    r.rain = lerp(r.rain, r.targetRain, 1 - Math.exp(-dt * 1.7));
    r.wind = lerp(r.wind, r.targetWind, 1 - Math.exp(-dt * 1.5));
    r.fog = lerp(r.fog, r.targetFog, 1 - Math.exp(-dt * 1.4));

    world.scene.fog.density = r.fog;

    updateRainParticles(dt);
}

function setWeatherTargets() {
    const hasRods = hasGadget('lightning_rods');
    const hasController = hasGadget('weather_controller');
    if (state.phase === 'SURVIVE') {
        const progression = clamp((state.day - 1) / 8, 0, 1);
        state.weather.targetRain = state.day >= 3 ? lerp(0.15, 0.9, progression) : 0;
        state.weather.targetWind = state.day >= 2 ? lerp(0.2, 1.0, progression) : 0.08;
        state.weather.targetFog = 0.003 + progression * 0.008;
    } else {
        const progression = clamp((state.day - 1) / 8, 0, 1);
        state.weather.targetRain = 0;
        state.weather.targetWind = 0.05 + progression * 0.2;
        state.weather.targetFog = 0.002 + progression * 0.003;
    }

    if (hasRods) {
        state.weather.targetRain *= 0.72;
        state.weather.targetWind *= 0.76;
        state.weather.targetFog *= 0.88;
    }
    if (hasController) {
        state.weather.targetRain *= 0.9;
        state.weather.targetWind *= 0.92;
    }
}

function updateRainParticles(dt) {
    const rain = state.entities.rain;
    if (!rain) return;

    const rainAmount = state.weather.rain;
    const visible = rainAmount > 0.05;

    rain.visible = visible;
    rain.material.opacity = rainAmount * 0.72;

    if (!visible) return;

    const posAttr = rain.geometry.attributes.position;
    const speedAttr = rain.geometry.attributes.speed;

    for (let i = 0; i < posAttr.count; i++) {
        let x = posAttr.getX(i);
        let y = posAttr.getY(i);
        let z = posAttr.getZ(i);

        const speed = speedAttr.getX(i);

        y -= (speed + rainAmount * 90) * dt;
        x += state.weather.wind * 20 * dt;
        z += Math.sin((world.time + i) * 0.3) * state.weather.wind * 0.7 * dt;

        if (y < -2 || !inBounds(x, z, -20)) {
            x = rand(-CONFIG.WORLD_SIZE * 0.46, CONFIG.WORLD_SIZE * 0.46);
            y = rand(35, 90);
            z = rand(-CONFIG.WORLD_SIZE * 0.46, CONFIG.WORLD_SIZE * 0.46);
        }

        posAttr.setXYZ(i, x, y, z);
    }

    posAttr.needsUpdate = true;
}

function updateFireParticles(dt) {
    const lifeT = clamp(state.fireRadius / getMaxFireRadius(), 0, 1);

    for (let i = 0; i < state.entities.fireParticles.length; i++) {
        const p = state.entities.fireParticles[i];
        const u = p.userData;

        u.age += dt;
        p.position.y += u.speed * dt * (0.45 + lifeT * 1.25);
        p.position.x += Math.sin(u.age * 3 + u.drift) * 0.02;
        p.position.z += Math.cos(u.age * 3 + u.drift * 1.3) * 0.02;

        p.material.opacity = 0.15 + lifeT * 0.65;
        p.scale.setScalar(0.2 + lifeT * 0.55);

        if (p.position.y > terrainHeight(0, 0) + 3.4 + lifeT * 3.2 || lifeT < 0.05) {
            p.position.x = rand(-0.8, 0.8);
            p.position.z = rand(-0.8, 0.8);
            p.position.y = terrainHeight(0, 0) + 0.55;
            u.speed = rand(1.1, 3.0);
        }
    }
}

function updateLighting(dt) {
    const targetNight = state.phase === 'SURVIVE' ? 1 : 0;
    state.nightBlend = lerp(state.nightBlend, targetNight, 1 - Math.exp(-dt * 1.9));

    const nightT = smoothStep(state.nightBlend);

    if (state.entities.sky) {
        state.entities.sky.material.uniforms.nightFactor.value = nightT;
    }

    if (state.entities.stars) {
        state.entities.stars.material.opacity = nightT * 0.92;
        state.entities.stars.rotation.y += dt * 0.01;
    }

    if (state.entities.ambient) {
        state.entities.ambient.intensity = lerp(0.26, 0.12, nightT);
    }

    if (state.entities.hemisphere) {
        state.entities.hemisphere.intensity = lerp(0.75, 0.22, nightT);
    }

    if (state.entities.moon) {
        state.entities.moon.intensity = lerp(0.28, 1.05, nightT);
        const shift = lerp(0.0, 0.12, nightT);
        state.entities.moon.color.setHSL(0.58 + shift, 0.55, 0.7);
    }

    const dayFog = new THREE.Color(0x7e95ab);
    const nightFog = new THREE.Color(0x0c121b);
    world.scene.fog.color.copy(dayFog).lerp(nightFog, nightT);
}

function updateVFX(dt) {
    const vignette = document.getElementById('vfx-vignette');
    const flash = document.getElementById('vfx-flash');
    const heartbeat = document.getElementById('vfx-heartbeat');
    const rainOverlay = document.getElementById('vfx-rain');
    const flashScale = state.settings.reduceFlashes ? 0.3 : 1;

    if (vignette) {
        const healthStress = clamp(1 - state.health / 100, 0, 1);
        const danger = clamp(Math.max(healthStress, state.ghostProximity * 0.8), 0, 1);
        vignette.style.opacity = (danger * 0.82).toFixed(2);
    }

    if (flash) {
        if (state.vfx.flashTimer > 0) {
            state.vfx.flashTimer -= dt;
            const alpha = clamp(state.vfx.flashTimer * 5, 0, 1);
            flash.style.background = state.vfx.flashColor;
            flash.style.opacity = (alpha * flashScale).toFixed(2);
        } else {
            flash.style.opacity = '0';
        }
    }

    if (heartbeat) {
        if (!state.settings.reduceFlashes && state.phase === 'SURVIVE' && state.ghostProximity > 0.25) {
            heartbeat.classList.add('active');
            heartbeat.style.opacity = (0.2 + state.ghostProximity * 0.65).toFixed(2);
        } else {
            heartbeat.classList.remove('active');
            heartbeat.style.opacity = '0';
        }
    }

    if (rainOverlay) {
        if (state.weather.rain > 0.06) {
            rainOverlay.classList.add('active');
            rainOverlay.style.setProperty('--rain-opacity', clamp(state.weather.rain * 0.35, 0, 0.55).toFixed(2));
        } else {
            rainOverlay.classList.remove('active');
            rainOverlay.style.setProperty('--rain-opacity', '0');
        }
    }

    if (state.vfx.screenShakeTimer > 0) {
        state.vfx.screenShakeTimer -= dt;
        if (!state.vfx.screenShakeClassOn) {
            document.body.classList.add('screen-shake');
            state.vfx.screenShakeClassOn = true;
        }
    } else if (state.vfx.screenShakeClassOn) {
        document.body.classList.remove('screen-shake');
        state.vfx.screenShakeClassOn = false;
    }
}

function updateWorldInteractables(dt) {
    const table = state.entities.craftingTable;
    if (table) {
        table.core.rotation.y += dt * 1.8;
        table.core.position.y = 1.52 + Math.sin(world.time * 3 + table.pulseOffset) * 0.06;
        table.glow.intensity = 0.55 + Math.sin(world.time * 4 + table.pulseOffset) * 0.22;
    }

    const hub = state.entities.deployHub;
    if (hub) {
        hub.ring.rotation.z += dt * 0.35;
        hub.centerBeacon.material.emissiveIntensity = 1 + Math.sin(world.time * 2.2) * 0.25;
        const portals = hub.portals || [];
        for (let i = 0; i < portals.length; i++) {
            const portal = portals[i];
            portal.arch.rotation.z += dt * (portal.id === 'solo' ? 0.9 : -0.9);
            const alliesLocked = portal.id === 'allies' && !isMultiplayerEnabled();
            const baseIntensity = alliesLocked ? 0.28 : 0.9;
            const amp = alliesLocked ? 0.08 : 0.32;
            portal.glow.intensity = baseIntensity + Math.sin(world.time * 3 + portal.pulseOffset) * amp;
        }
    }

    for (let i = 0; i < state.entities.chests.length; i++) {
        const chest = state.entities.chests[i];
        if (chest.opened) continue;
        const bob = Math.sin(world.time * 2 + chest.pulseOffset) * 0.02;
        chest.mesh.position.y = terrainHeight(chest.x, chest.z) + bob;
    }
}

function triggerFlash(color, duration) {
    state.vfx.flashColor = color;
    state.vfx.flashTimer = Math.max(state.vfx.flashTimer, duration);
}

function triggerScreenShake(duration) {
    const scaledDuration = duration * state.settings.screenShakeScale;
    if (scaledDuration <= 0.01) return;
    state.vfx.screenShakeTimer = Math.max(state.vfx.screenShakeTimer, scaledDuration);
}

function updateCamera(dt) {
    const player = state.entities.player;

    const lookAhead = state.playerVelocity.clone();
    lookAhead.y = 0;
    if (lookAhead.lengthSq() > 0.001) lookAhead.normalize().multiplyScalar(2.3);

    const desiredTarget = new THREE.Vector3(
        player.position.x + lookAhead.x,
        player.position.y + 1.65,
        player.position.z + lookAhead.z
    );

    state.cameraTarget.lerp(desiredTarget, 1 - Math.exp(-dt * 7));

    const speedFactor = clamp(Math.hypot(state.playerVelocity.x, state.playerVelocity.z) / 20, 0, 1);
    const angle = state.cameraHeading;

    const backOffset = new THREE.Vector3(
        Math.sin(angle) * -12,
        10 + speedFactor * 2,
        Math.cos(angle) * -12
    );

    const desiredPos = state.cameraTarget.clone().add(backOffset);
    world.camera.position.lerp(desiredPos, 1 - Math.exp(-dt * 4.5));

    world.camera.lookAt(state.cameraTarget);
    world.camera.fov = lerp(world.camera.fov, 62 + speedFactor * 5, 1 - Math.exp(-dt * 4));
    world.camera.updateProjectionMatrix();
}

function updateIdleCamera(dt) {
    const radius = 38;
    const angle = world.time * 0.12;
    const y = 16 + Math.sin(world.time * 0.45) * 1.5;

    const target = new THREE.Vector3(0, terrainHeight(0, 0) + 2, 0);
    const desired = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);

    world.camera.position.lerp(desired, 1 - Math.exp(-dt * 2));
    world.camera.lookAt(target);
    state.cameraHeading = lerpAngle(state.cameraHeading, angle + Math.PI, 1 - Math.exp(-dt * 2));
}

function interact() {
    if (!state.started || state.phase === 'GAME_OVER' || state.paused) return;

    if (state.phase === 'DEPLOY') {
        const portal = getNearbyDeployPortal();
        if (portal) {
            if (portal.id === 'allies') {
                notifyMultiplayerDisabled();
            } else {
                beginForestRun('solo');
            }
        } else {
            pushFeed('Move to the Solo Rift gate to deploy.', 'warn');
        }
        return;
    }

    if (isAuthoritativeCoopActive()) {
        queueAuthoritativeAction('interact');
        return;
    }

    const player = state.entities.player.position;
    const chest = getNearbyChest();
    if (chest) {
        openChest(chest);
        return;
    }

    if (getCraftingTableDistance() < 4.4) {
        openCraftingScreen();
        return;
    }

    const nearCamp = Math.hypot(player.x, player.z) < 9.8;
    if (nearCamp) {
        if (state.wood <= 0) {
            pushFeed('Need wood to feed the campfire.', 'warn');
            return;
        }

        state.wood -= 1;
        let fuelValue = CONFIG.WOOD_FUEL_VALUE;
        if (hasUpgrade('blue_flame')) fuelValue *= 1.25;

        state.fireRadius = clamp(state.fireRadius + fuelValue, CONFIG.FIRE_MIN_RADIUS, getMaxFireRadius());
        addMetric('fuelAdded', 1);
        addMomentum(6);

        spawnFloatingText('+FUEL', state.entities.player.position, '#ffb16c');
        AudioManager.play('fuel');
        updateHUD();
        return;
    }

    if (state.phase === 'SURVIVE') {
        for (let i = 0; i < state.entities.beacons.length; i++) {
            const beacon = state.entities.beacons[i];
            if (beacon.active) continue;
            const d = dist2(player.x, player.z, beacon.x, beacon.z);
            if (d < 6.2) {
                igniteBeacon(beacon);
                return;
            }
        }
    }
}

function updateInteractionPrompt() {
    if (!ui.interactionPrompt || !ui.interactionText || !state.started || state.phase === 'GAME_OVER' || state.paused) {
        if (ui.interactionPrompt) ui.interactionPrompt.classList.add('hidden');
        return;
    }

    if (state.phase === 'DEPLOY') {
        const portal = getNearbyDeployPortal();
        if (!portal) {
            ui.interactionText.textContent = 'MOVE TO SOLO RIFT';
        } else if (portal.id === 'allies') {
            ui.interactionText.textContent = 'WITH OTHERS: COMING SOON';
        } else {
            ui.interactionText.textContent = 'E: ENTER SOLO RIFT';
        }
        ui.interactionPrompt.classList.remove('hidden');
        return;
    }

    const player = state.entities.player.position;

    if (!isAuthoritativeCoopActive() && getCraftingTableDistance() < 4.4) {
        ui.interactionText.textContent = 'OPEN CRAFTING TABLE';
        ui.interactionPrompt.classList.remove('hidden');
        return;
    }

    const chest = getNearbyChest();
    if (chest) {
        ui.interactionText.textContent = 'OPEN CHEST';
        ui.interactionPrompt.classList.remove('hidden');
        return;
    }

    const lootedChest = getNearbyOpenedChest();
    if (lootedChest) {
        ui.interactionText.textContent = 'CHEST LOOTED';
        ui.interactionPrompt.classList.remove('hidden');
        return;
    }

    if (Math.hypot(player.x, player.z) < 9.8) {
        ui.interactionText.textContent = state.wood > 0 ? 'STOKE FIRE' : 'NEED WOOD';
        ui.interactionPrompt.classList.remove('hidden');
        return;
    }

    if (state.phase === 'SURVIVE') {
        const beacon = state.entities.beacons.find((b) => !b.active && dist2(player.x, player.z, b.x, b.z) < 6.2);
        if (beacon) {
            ui.interactionText.textContent = state.wood > 0 ? 'IGNITE BEACON' : 'NEED WOOD';
            ui.interactionPrompt.classList.remove('hidden');
            return;
        }
    }

    ui.interactionPrompt.classList.add('hidden');
}

function drawRadar() {
    if (!ui.radarCtx || !ui.radarCanvas) return;

    const ctx = ui.radarCtx;
    const w = ui.radarCanvas.width;
    const h = ui.radarCanvas.height;
    const cx = w * 0.5;
    const cy = h * 0.5;
    const radius = w * 0.44;
    const radarRange = getRadarRange();

    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = 'rgba(5, 9, 14, 0.78)';
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(120, 170, 210, 0.35)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius / 3) * i, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(120, 170, 210, 0.26)';
    ctx.beginPath();
    ctx.moveTo(cx, cy - radius);
    ctx.lineTo(cx, cy + radius);
    ctx.moveTo(cx - radius, cy);
    ctx.lineTo(cx + radius, cy);
    ctx.stroke();

    if (!state.entities.player) return;

    const px = state.entities.player.position.x;
    const pz = state.entities.player.position.z;

    const plot = (x, z, color, size) => {
        const rx = (x - px) / radarRange;
        const rz = (z - pz) / radarRange;
        const sx = cx + rx * radius;
        const sy = cy + rz * radius;

        const d = Math.hypot(sx - cx, sy - cy);
        if (d > radius) return;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
    };

    plot(0, 0, '#ffb46b', 3);

    state.entities.beacons.forEach((beacon) => {
        plot(beacon.x, beacon.z, beacon.active ? '#ffd46d' : '#7c90a8', beacon.active ? 2.8 : 2);
    });

    if (state.entities.deployHub && state.entities.deployHub.portals) {
        state.entities.deployHub.portals.forEach((portal) => {
            const alliesLocked = portal.id === 'allies' && !isMultiplayerEnabled();
            const color = portal.id === 'solo' ? '#82ddff' : (alliesLocked ? '#7b8692' : '#ffbe82');
            plot(portal.x, portal.z, color, 2.8);
        });
    }

    const remoteIds = Object.keys(state.entities.remotePlayers);
    for (let i = 0; i < remoteIds.length; i++) {
        const remote = state.entities.remotePlayers[remoteIds[i]];
        if (!remote || !remote.mesh) continue;
        plot(remote.mesh.position.x, remote.mesh.position.z, '#79e7ff', 2.6);
    }

    state.entities.enemies.forEach((enemy) => {
        const type = enemy.archetype ? enemy.archetype.id : 'wraith';
        let color = enemy.nemesis
            ? '#ffb271'
            : type === 'charger'
                ? '#ff9f6b'
                : type === 'leech'
                    ? '#9dff9a'
                    : type === 'brute'
                        ? '#ff78d8'
                        : type === 'titan'
                            ? '#ffd171'
                            : '#ff6d7e';
        if (enemy.modifier) {
            color = `#${enemy.modifier.tint.toString(16).padStart(6, '0')}`;
        }
        const size = (type === 'titan' ? 3.4 : type === 'brute' ? 3 : 2.4) + (enemy.modifier ? 0.4 : 0) + (enemy.nemesis ? 0.9 : 0);
        plot(enemy.mesh.position.x, enemy.mesh.position.z, color, size);
    });

    state.entities.activeTraps.forEach((trap) => {
        plot(trap.x, trap.z, '#73cfff', 2.2);
    });

    state.entities.hazards.forEach((hazard) => {
        if (!hazard.exploded) {
            const color = hazard.type === 'volatile_blast'
                ? '#ffc07d'
                : hazard.type === 'nemesis_burst'
                    ? '#ffb06b'
                    : '#ff8a8a';
            plot(hazard.x, hazard.z, color, 2.6);
        }
    });

    state.entities.emberOrbs.forEach((orb) => {
        plot(orb.mesh.position.x, orb.mesh.position.z, orb.nemesis ? '#ffd18a' : '#ffcf8f', orb.nemesis ? 2.8 : 2.1);
    });

    if (hasGadget('map_kit') || hasGadget('radar_array')) {
        let shownChests = 0;
        state.entities.chests.forEach((chest) => {
            if (!chest.opened && shownChests < (hasGadget('map_kit') ? 32 : 18)) {
                plot(chest.x, chest.z, '#ffc07c', 2);
                shownChests += 1;
            }
        });
    }

    let shownWood = 0;
    const woodLimit = hasGadget('map_kit') ? 46 : 24;
    state.entities.resources.wood.forEach((node) => {
        if (node.active && shownWood < woodLimit) {
            plot(node.mesh.position.x, node.mesh.position.z, '#9f7448', 1.6);
            shownWood += 1;
        }
    });

    let shownShards = 0;
    const shardLimit = hasGadget('map_kit') ? 26 : 16;
    state.entities.resources.shards.forEach((node) => {
        if (node.active && shownShards < shardLimit) {
            plot(node.mesh.position.x, node.mesh.position.z, '#77d7ff', 1.8);
            shownShards += 1;
        }
    });

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(cx, cy, 3.2, 0, Math.PI * 2);
    ctx.fill();

    const heading = state.playerFacing;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.sin(heading) * 10, cy + Math.cos(heading) * 10);
    ctx.stroke();
}

function pushFeed(text, kind = 'info') {
    if (!ui.eventFeed) return;

    const existing = ui.eventFeed.querySelectorAll('.feed-item');
    if (existing.length >= 4) {
        existing[0].remove();
    }

    const item = document.createElement('div');
    item.className = `feed-item ${kind}`;
    item.textContent = text;
    ui.eventFeed.appendChild(item);

    setTimeout(() => {
        item.remove();
    }, 2600);
}

function spawnFloatingText(text, position3, color = '#ffffff') {
    const label = document.createElement('div');
    label.textContent = text;

    Object.assign(label.style, {
        position: 'absolute',
        left: '0px',
        top: '0px',
        color,
        fontWeight: '700',
        fontSize: '18px',
        letterSpacing: '0.6px',
        textShadow: '0 2px 6px rgba(0,0,0,0.85)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        transition: 'transform 0.9s ease, opacity 0.9s ease',
        opacity: '1'
    });

    document.body.appendChild(label);

    const p = position3.clone();
    p.y += 2.6;
    p.project(world.camera);

    const x = (p.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-p.y * 0.5 + 0.5) * window.innerHeight;

    label.style.left = `${x}px`;
    label.style.top = `${y}px`;

    requestAnimationFrame(() => {
        label.style.transform = 'translate(-50%, -80px)';
        label.style.opacity = '0';
    });

    setTimeout(() => label.remove(), 930);
}

function updateHUD() {
    if (!ui.phase || !ui.timer) return;

    ui.day.textContent = `DAY ${state.day}`;
    if (state.paused) {
        if (state.pauseReason === 'settings') {
            ui.phase.textContent = 'PAUSED';
        } else if (state.pauseReason === 'crafting') {
            ui.phase.textContent = 'CRAFTING';
        } else {
            const decisionMode = ui.perkTitle && ui.perkTitle.textContent === 'DAWN DECISION';
            ui.phase.textContent = decisionMode ? 'DECISION' : 'AUGMENT';
        }
    } else {
        ui.phase.textContent = state.phase;
    }
    ui.timer.textContent = String(Math.max(0, Math.ceil(state.timeLeft)));

    const authoritative = isAuthoritativeCoopActive();
    const phaseTotal = authoritative
        ? (state.phase === 'SURVIVE' ? 65 : 70)
        : (state.phase === 'SURVIVE' ? state.runtime.nightDuration : state.runtime.dayDuration);
    const ring = clamp((state.timeLeft / Math.max(phaseTotal, 1)) * 100, 0, 100);
    if (ui.timerCircle) ui.timerCircle.setAttribute('stroke-dasharray', `${ring}, 100`);

    if (ui.wood) ui.wood.textContent = String(Math.floor(state.wood));
    if (ui.shard) ui.shard.textContent = String(Math.floor(state.shards));
    if (ui.flareCount) ui.flareCount.textContent = String(Math.floor(state.shards));

    if (ui.beacon) ui.beacon.textContent = `${state.beaconsLit} / ${CONFIG.BEACON_COUNT}`;
    if (ui.embers) ui.embers.textContent = String(Math.floor(state.embers));

    if (ui.healthBar) ui.healthBar.style.width = `${clamp(state.health, 0, 100).toFixed(1)}%`;
    if (ui.staminaBar) ui.staminaBar.style.width = `${clamp(state.stamina, 0, 100).toFixed(1)}%`;

    const dashPct = state.dashCooldown <= 0
        ? 100
        : (1 - state.dashCooldown / Math.max(state.dashCooldownMax, 0.001)) * 100;
    if (ui.dashBar) ui.dashBar.style.width = `${clamp(dashPct, 0, 100).toFixed(1)}%`;

    const pulsePct = state.pulseCooldown <= 0
        ? 100
        : (1 - state.pulseCooldown / Math.max(state.pulseCooldownMax, 0.001)) * 100;
    if (ui.pulseBar) ui.pulseBar.style.width = `${clamp(pulsePct, 0, 100).toFixed(1)}%`;

    if (ui.weaponStatus) {
        if (!state.weapon.crafted) {
            ui.weaponStatus.textContent = 'OFFLINE';
        } else if (state.boltCooldown > 0) {
            ui.weaponStatus.textContent = `RECHARGE ${state.boltCooldown.toFixed(1)}s`;
        } else {
            ui.weaponStatus.textContent = 'ONLINE';
        }
    }
    if (ui.boltCount) ui.boltCount.textContent = state.weapon.crafted ? String(Math.max(0, Math.floor(state.weapon.ammo))) : '--';

    if (ui.comboBar) {
        const comboPct = (state.comboValue / CONFIG.COMBO_MAX) * 100;
        ui.comboBar.style.width = `${clamp(comboPct, 0, 100).toFixed(1)}%`;
    }
    if (ui.comboValue) {
        let comboText = `x${state.comboMultiplier.toFixed(2)}`;
        if (state.chain.count > 1) comboText += ` • CHAIN ${state.chain.count}`;
        if (state.overdrive.active) comboText += ` • OVERDRIVE ${Math.max(0, Math.ceil(state.overdrive.timer))}s`;
        ui.comboValue.textContent = comboText;
    }

    const firePct = Math.round(clamp(state.fireRadius / Math.max(getMaxFireRadius(), 1), 0, 1) * 100);
    const nemesis = getActiveNemesisEnemy();
    const event = state.nightEvent;
    const modePrefix = state.activeMode === 'daily' ? '[DAILY] ' : '';
    const assistLabel = state.runAssist.enemySpawnMult < 0.98 ? ' | RECOVERY BOOST' : '';
    const weatherCtl = hasGadget('weather_controller')
        ? ` | Weather Ctrl ${state.weatherControlCooldown > 0 ? `${state.weatherControlCooldown.toFixed(1)}s` : 'READY (V)'}`
        : '';

    if (ui.objectiveText) {
        if (state.paused) {
            if (state.pauseReason === 'settings') {
                ui.objectiveText.textContent = 'Settings open. Press Esc to resume.';
            } else if (state.pauseReason === 'crafting') {
                ui.objectiveText.textContent = 'Crafting table active. Build upgrades and continue.';
            } else {
                const decisionMode = ui.perkTitle && ui.perkTitle.textContent === 'DAWN DECISION';
                ui.objectiveText.textContent = decisionMode
                    ? 'Choose to extract or push deeper.'
                    : 'Choose an augment to continue the run.';
            }
        } else if (state.phase === 'GATHER' && authoritative) {
            ui.objectiveText.textContent = `${modePrefix}Server-authoritative co-op: gather resources and stoke fire (${firePct}%).`;
        } else if (state.phase === 'GATHER') {
            ui.objectiveText.textContent = `${modePrefix}Gather wood and shards. Fire ${firePct}%${assistLabel}${weatherCtl}.`;
        } else if (state.phase === 'SURVIVE' && authoritative) {
            const enemyCount = state.entities.enemies.length;
            ui.objectiveText.textContent = `${modePrefix}Server-authoritative survival: hold zone and clear hostiles (${enemyCount}). Fire ${firePct}%.`;
        } else if (state.phase === 'SURVIVE') {
            const threatPct = Math.round((1 + state.pushStreak * CONFIG.PUSH_THREAT_STEP) * 100);
            const nemesisText = nemesis ? ` | Nemesis ${state.nemesisProfile.name}` : '';
            const orbText = state.entities.emberOrbs.length > 0 ? ` | Orbs ${state.entities.emberOrbs.length}` : '';
            const driveText = state.overdrive.active ? ' | OVERDRIVE' : '';
            let eventText = '';
            if (event.active) {
                eventText = ` | Event ${event.label} ${Math.min(event.progress, event.goal)}/${event.goal} (${Math.max(0, Math.ceil(event.timer))}s)`;
            } else if (!event.resolved) {
                eventText = ` | Event inbound ${Math.max(0, Math.ceil(event.triggerTimer))}s`;
            } else if (event.outcome === 'success') {
                eventText = ' | Event clear';
            } else if (event.outcome === 'failed') {
                eventText = ' | Event failed';
            }
            ui.objectiveText.textContent = `${modePrefix}Ignite beacons (${state.beaconsLit}/${CONFIG.BEACON_COUNT}). Fire ${firePct}% | Threat ${threatPct}%${assistLabel}${weatherCtl}${nemesisText}${orbText}${driveText}${eventText}.`;
        } else if (state.phase === 'DEPLOY') {
            ui.objectiveText.textContent = 'Deployment Nexus: step into Solo Rift to start.';
        } else if (state.phase === 'GAME_OVER') {
            ui.objectiveText.textContent = 'Run ended. Upgrade and deploy again.';
        } else {
            ui.objectiveText.textContent = 'Enter the forest.';
        }
    }

    if (ui.contractText) {
        if (state.paused && state.pauseReason === 'settings') {
            ui.contractText.textContent = 'Settings open';
        } else if (state.paused && state.pauseReason === 'crafting') {
            ui.contractText.textContent = 'Crafting in progress';
        } else if (authoritative && state.phase === 'SURVIVE') {
            ui.contractText.textContent = `Authoritative co-op online • Enemies ${state.entities.enemies.length}`;
        } else if (state.phase === 'SURVIVE' && event.active) {
            ui.contractText.textContent = `Event ${event.label}: ${Math.min(event.progress, event.goal)} / ${event.goal} (${Math.max(0, Math.ceil(event.timer))}s)`;
        } else if (state.phase === 'SURVIVE' && !event.resolved) {
            ui.contractText.textContent = `Night event inbound: ${Math.max(0, Math.ceil(event.triggerTimer))}s`;
        } else if (state.phase === 'DEPLOY') {
            ui.contractText.textContent = 'Solo Rift online • With Others coming soon';
        } else {
            const c = state.currentContract;
            if (!c) {
                ui.contractText.textContent = 'No active contract';
            } else if (c.completed) {
                ui.contractText.textContent = `${c.label}: COMPLETE`;
            } else {
                ui.contractText.textContent = `${c.label}: ${Math.min(c.progress, c.goal)} / ${c.goal}`;
            }
        }
    }
    if (ui.relicText) ui.relicText.textContent = getRelicLoadoutText();

    if (ui.screenEmbers) ui.screenEmbers.textContent = String(Math.floor(state.embers));
    if (ui.highScore) ui.highScore.textContent = `${Math.max(0, state.highScore)} Nights`;
    if (ui.skinName) ui.skinName.textContent = state.equippedSkin.replace(/_/g, ' ').toUpperCase();
    updateTouchControlsVisibility();
}

function hasUpgrade(id) {
    return state.inventory.upgrades.includes(id);
}

function isOwned(id) {
    return state.inventory.skins.includes(id) || state.inventory.upgrades.includes(id);
}

function purchaseItem(id, price) {
    const isSkin = Object.prototype.hasOwnProperty.call(SKINS, id);
    const owned = isOwned(id);
    const lossDiscount = clamp((state.profile.lossStreak || 0) * 0.04, 0, 0.2);
    const effectivePrice = Math.max(1, Math.floor(price * (1 - lossDiscount)));

    if (owned) {
        if (isSkin) {
            state.equippedSkin = id;
            applySkin(state.equippedSkin);
            saveProgress();
            pushFeed(`Equipped: ${id.replace(/_/g, ' ')}`, 'info');
            updateShopButtons();
            updateHUD();
        }
        return;
    }

    if (state.embers < effectivePrice) {
        pushFeed('Not enough embers.', 'warn');
        return;
    }

    state.embers -= effectivePrice;

    if (isSkin) {
        state.inventory.skins.push(id);
    } else {
        state.inventory.upgrades.push(id);
    }

    if (isSkin) {
        state.equippedSkin = id;
        applySkin(state.equippedSkin);
    }

    saveProgress();
    updateShopButtons();
    updateHUD();

    pushFeed(`Unlocked ${id.replace(/_/g, ' ')} for ${effectivePrice} embers`, 'info');
    trackTelemetry('shop_purchase', { id, price: effectivePrice, discounted: effectivePrice < price ? 1 : 0 });
}

function updateShopButtons() {
    const lossDiscount = clamp((state.profile.lossStreak || 0) * 0.04, 0, 0.2);
    document.querySelectorAll('.shop-item').forEach((item) => {
        const id = item.dataset.id;
        const price = Number(item.dataset.price || 0);
        const effectivePrice = Math.max(1, Math.floor(price * (1 - lossDiscount)));
        const btn = item.querySelector('.buy-btn');
        if (!btn) return;

        const owned = isOwned(id);
        const isSkin = Object.prototype.hasOwnProperty.call(SKINS, id);

        if (!owned) {
            btn.disabled = false;
            if (effectivePrice !== price) {
                btn.innerHTML = `${effectivePrice} <i class="fa-solid fa-fire-flame-curved"></i>`;
                btn.title = `Discounted from ${price}`;
            } else {
                btn.innerHTML = `${price} <i class="fa-solid fa-fire-flame-curved"></i>`;
                btn.title = '';
            }
            return;
        }

        if (isSkin && state.equippedSkin === id) {
            btn.disabled = true;
            btn.textContent = 'EQUIPPED';
        } else if (isSkin) {
            btn.disabled = false;
            btn.textContent = 'OWNED';
        } else {
            btn.disabled = true;
            btn.textContent = 'OWNED';
        }
    });

    renderRelicLoadoutUI();
}

function toggleShop(open) {
    if (!ui.shopScreen || !ui.startScreen) return;

    if (open) {
        ui.shopScreen.classList.remove('hidden');
        renderRelicLoadoutUI();
        if (!state.started || state.phase === 'GAME_OVER') {
            ui.startScreen.classList.add('hidden');
        }
    } else {
        ui.shopScreen.classList.add('hidden');
        if (!state.started || state.phase === 'GAME_OVER') {
            ui.startScreen.classList.remove('hidden');
        }
    }
}

function loadProgress() {
    let parsed = null;

    const save = localStorage.getItem(CONFIG.SAVE_KEY) || localStorage.getItem(CONFIG.LEGACY_SAVE_KEY);
    if (save) {
        try {
            parsed = JSON.parse(save);
        } catch (err) {
            console.warn('Invalid save data:', err);
        }
    }

    state.settings = normalizeSettings(parsed ? parsed.settings : null);
    state.profile = normalizeProfile(parsed ? parsed.profile : null);
    state.guideSeen = !!(parsed && parsed.guideSeen);
    state.gadgets = {
        map_kit: false,
        sundial: false,
        radar_array: false,
        lightning_rods: false,
        weather_controller: false
    };
    state.telemetry.history = Array.isArray(parsed && parsed.telemetryHistory)
        ? parsed.telemetryHistory.slice(0, CONFIG.TELEMETRY_HISTORY_LIMIT)
        : [];
    state.telemetry.session = null;
    state.ads.busy = false;
    state.ads.lastRewardedAt = 0;
    state.ads.perkRerollUsed = false;
    state.ads.gameOverBasePayout = 0;
    state.ads.gameOverBonus = 0;
    state.ads.gameOverRewardClaimed = false;

    if (parsed) {
        state.embers = Number(parsed.embers) || 0;
        state.highScore = Number(parsed.highScore) || 0;
        state.equippedSkin = parsed.equippedSkin || 'standard';
        state.selectedMode = parsed.selectedMode === 'daily' ? 'daily' : 'standard';
        state.partyMode = parsed.partyMode === 'allies' ? 'allies' : 'solo';
        state.challengeHistory = parsed.challengeHistory && typeof parsed.challengeHistory === 'object'
            ? parsed.challengeHistory
            : {};
        state.nemesisProfile = normalizeNemesisProfile(parsed.nemesisProfile);

        const inventory = parsed.inventory || {};
        state.inventory.skins = Array.isArray(inventory.skins) && inventory.skins.length > 0
            ? inventory.skins.filter((id) => id in SKINS)
            : ['standard'];

        if (!state.inventory.skins.includes('standard')) {
            state.inventory.skins.unshift('standard');
        }

        state.inventory.upgrades = Array.isArray(inventory.upgrades)
            ? inventory.upgrades.filter((id) => UPGRADE_IDS.has(id))
            : [];

        state.inventory.relics = Array.isArray(inventory.relics)
            ? inventory.relics.filter((id) => RELIC_IDS.has(id))
            : [];
        state.inventory.relics = Array.from(new Set(state.inventory.relics));

        const rawEquippedRelics = Array.isArray(inventory.equippedRelics)
            ? inventory.equippedRelics
            : Array.isArray(parsed.equippedRelics)
                ? parsed.equippedRelics
                : [];
        state.equippedRelics = rawEquippedRelics
            .filter((id) => RELIC_IDS.has(id) && state.inventory.relics.includes(id))
            .slice(0, CONFIG.RELIC_MAX_EQUIPPED);

        if (!state.inventory.skins.includes(state.equippedSkin)) {
            state.equippedSkin = 'standard';
        }

        if (parsed.gadgets && typeof parsed.gadgets === 'object') {
            CRAFTING_RECIPES.forEach((recipe) => {
                state.gadgets[recipe.id] = !!parsed.gadgets[recipe.id];
            });
        }

        const adSave = parsed.ads && typeof parsed.ads === 'object' ? parsed.ads : {};
        state.ads.dailyDate = typeof adSave.dailyDate === 'string' ? adSave.dailyDate : getTodayDateId();
        state.ads.dailyViews = Math.max(0, Math.floor(Number(adSave.dailyViews) || 0));
        state.ads.startBonusClaims = Math.max(0, Math.floor(Number(adSave.startBonusClaims) || 0));
    } else {
        state.challengeHistory = {};
        state.nemesisProfile = normalizeNemesisProfile(null);
        state.ads.dailyDate = getTodayDateId();
        state.ads.dailyViews = 0;
        state.ads.startBonusClaims = 0;
    }

    ensureRewardedDailyState();

    ensureStarterRelic();
    if (state.equippedRelics.length === 0 && state.inventory.relics.length > 0) {
        state.equippedRelics = state.inventory.relics.slice(0, CONFIG.RELIC_MAX_EQUIPPED);
    }
    state.equippedRelics = Array.from(new Set(state.equippedRelics)).slice(0, CONFIG.RELIC_MAX_EQUIPPED);

    refreshDailyChallenge();
    applySkin(state.equippedSkin);
    applySettingsRuntime({ save: false });
    syncSettingsUI();
    updateRewardedOfferUI();
}

function saveProgress() {
    const payload = {
        embers: Math.floor(state.embers),
        highScore: Math.floor(state.highScore),
        selectedMode: state.selectedMode,
        partyMode: state.partyMode,
        equippedSkin: state.equippedSkin,
        challengeHistory: state.challengeHistory,
        profile: normalizeProfile(state.profile),
        guideSeen: !!state.guideSeen,
        settings: normalizeSettings(state.settings),
        gadgets: { ...state.gadgets },
        ads: {
            dailyDate: state.ads.dailyDate,
            dailyViews: Math.max(0, Math.floor(state.ads.dailyViews)),
            startBonusClaims: Math.max(0, Math.floor(state.ads.startBonusClaims))
        },
        telemetryHistory: Array.isArray(state.telemetry.history)
            ? state.telemetry.history.slice(0, CONFIG.TELEMETRY_HISTORY_LIMIT)
            : [],
        nemesisProfile: state.nemesisProfile,
        inventory: {
            skins: Array.from(new Set(state.inventory.skins)),
            upgrades: Array.from(new Set(state.inventory.upgrades)),
            relics: Array.from(new Set(state.inventory.relics)),
            equippedRelics: Array.from(new Set(state.equippedRelics)).slice(0, CONFIG.RELIC_MAX_EQUIPPED)
        }
    };

    localStorage.setItem(CONFIG.SAVE_KEY, JSON.stringify(payload));
}

function onWindowResize() {
    if (!world.camera || !world.renderer) return;
    world.camera.aspect = window.innerWidth / window.innerHeight;
    world.camera.updateProjectionMatrix();
    world.renderer.setSize(window.innerWidth, window.innerHeight);
}
