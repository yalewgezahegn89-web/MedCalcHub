const ADSENSE_PUB_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "";

function parseAdsEnabled(): boolean {
  const raw = process.env.NEXT_PUBLIC_ADS_ENABLED;

  if (raw === undefined || raw === null || raw === "") {
    return false;
  }

  return raw.toLowerCase() === "true" || raw === "1";
}

export const adsConfig = {
  enabled: parseAdsEnabled(),
  adsensePubId: ADSENSE_PUB_ID,
  get adsenseReady(): boolean {
    return this.enabled && this.adsensePubId.length > 0;
  },
} as const;
