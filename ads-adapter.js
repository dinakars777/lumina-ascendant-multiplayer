'use strict';

// Pluggable rewarded-ad bridge for Lumina.
// Exposes window.LUMINA_ADS with:
// - isAvailable(): boolean
// - showRewarded({ placement }): Promise<boolean>
(function bootstrapLuminaAds(globalScope) {
    const root = globalScope || (typeof window !== 'undefined' ? window : null);
    if (!root) return;

    function hasCrazyGamesSdk() {
        const sdk = root.CrazyGames && root.CrazyGames.SDK;
        return !!(sdk && sdk.ad && typeof sdk.ad.requestAd === 'function');
    }

    function hasGoogleAdBreak() {
        return typeof root.adBreak === 'function';
    }

    function providerName() {
        if (hasCrazyGamesSdk()) return 'crazygames';
        if (hasGoogleAdBreak()) return 'google-adbreak';
        return 'none';
    }

    function isAvailable() {
        return providerName() !== 'none';
    }

    function runCrazyGamesRewarded(placement) {
        return new Promise((resolve) => {
            const sdk = root.CrazyGames && root.CrazyGames.SDK;
            if (!sdk || !sdk.ad || typeof sdk.ad.requestAd !== 'function') {
                resolve(false);
                return;
            }

            let settled = false;
            const finish = (granted) => {
                if (settled) return;
                settled = true;
                resolve(!!granted);
            };

            const callbacks = {
                adFinished: () => finish(true),
                adError: () => finish(false)
            };

            try {
                const maybePromise = sdk.ad.requestAd('rewarded', callbacks);
                if (maybePromise && typeof maybePromise.then === 'function') {
                    maybePromise
                        .then((result) => {
                            if (settled) return;
                            if (!result || typeof result !== 'object') {
                                finish(false);
                                return;
                            }
                            const rawStatus = String(result.status || result.breakStatus || '').toLowerCase();
                            const granted = rawStatus === 'viewed'
                                || rawStatus === 'finished'
                                || rawStatus === 'reward'
                                || rawStatus === 'complete'
                                || rawStatus === 'completed';
                            finish(granted);
                        })
                        .catch(() => finish(false));
                } else {
                    setTimeout(() => finish(false), 25000);
                }
            } catch (_err) {
                finish(false);
            }
        });
    }

    function runGoogleRewarded(placement) {
        return new Promise((resolve) => {
            if (typeof root.adBreak !== 'function') {
                resolve(false);
                return;
            }

            let settled = false;
            const finish = (granted) => {
                if (settled) return;
                settled = true;
                resolve(!!granted);
            };

            try {
                root.adBreak({
                    type: 'reward',
                    name: `lumina_${String(placement || 'rewarded')}`,
                    beforeReward: (showAdFn) => {
                        if (typeof showAdFn === 'function') {
                            showAdFn();
                        } else {
                            finish(false);
                        }
                    },
                    adDismissed: () => finish(false),
                    adViewed: () => finish(true),
                    adBreakDone: (placementInfo) => {
                        if (settled) return;
                        const status = String((placementInfo && placementInfo.breakStatus) || '').toLowerCase();
                        const granted = status === 'viewed' || status === 'rewarded' || status === 'completed';
                        finish(granted);
                    }
                });
            } catch (_err) {
                finish(false);
            }
        });
    }

    async function showRewarded({ placement } = {}) {
        const provider = providerName();
        if (provider === 'crazygames') {
            return runCrazyGamesRewarded(placement);
        }
        if (provider === 'google-adbreak') {
            return runGoogleRewarded(placement);
        }
        return false;
    }

    root.LUMINA_ADS = {
        getProviderName: providerName,
        isAvailable,
        showRewarded
    };
})(typeof window !== 'undefined' ? window : globalThis);
