# Monetization Setup

This project now supports rewarded ads through a bridge in `ads-adapter.js`.
Current implementation is set up for a CrazyGames-first rollout.

## Current rewarded placements

1. Start screen: `Watch Ad +30 Embers` (max 2/day)
2. Game over: `Watch Ad: +50% Embers` (once per run end)
3. Augment draft: `Rewarded Reroll` (once per draft)

Global limits:

1. Total rewarded views: `6/day`
2. Cooldown between rewarded requests: `900ms`

## Providers supported by adapter

The adapter checks these providers at runtime:

1. CrazyGames SDK (`window.CrazyGames.SDK.ad.requestAd`)
2. Google Ad Placement API (`window.adBreak`)

If no provider is available, rewarded buttons show `REWARDED ADS OFFLINE`.

## CrazyGames-first status

Already wired in code:

1. CrazyGames SDK script is loaded dynamically when running on CrazyGames host (or with `?cg_sdk=1` for test)
2. Runtime bridge auto-detects `window.CrazyGames.SDK`
3. Gameplay lifecycle hooks are connected:
   - loading start/stop
   - gameplay start/stop
4. Rewarded ad calls route through CrazyGames when available

What you still need:

1. Create CrazyGames developer account
2. Submit this game build
3. Move from Basic Launch to Full Launch to enable monetization

## Test mode (local/dev)

Use either:

1. URL flag: `?ads_test=1`
2. Global flag before game loads: `window.LUMINA_ADS_TEST = true`

In test mode, rewarded flow succeeds after a short simulated delay.

## Account prerequisites

### CrazyGames

1. Register as a developer.
2. Submit the game and integrate SDK according to their docs.
3. Use CrazyGames ads for the CrazyGames build.

### Google (own site)

1. Create/approve AdSense account.
2. Apply for H5/Ad Placement access.
3. Load the Google ad script and configure `adBreak`/`adConfig`.

## Important

Keep separate builds if you publish in multiple channels:

1. CrazyGames build (CrazyGames monetization rules)
2. Direct web build (Google monetization)
