const ADSENSE_PUB_ID =
  process.env.NEXT_PUBLIC_ADSENSE_PUB_ID ?? "";

function parseAdsEnabled(): boolean {
  const raw = process.env.NEXT_PUBLIC_ADS_ENABLED;

  if (raw === undefined || raw === null || raw === "") {
    return false;
  }

  return raw.toLowerCase() === "true" || raw === "1";
}

function isValidPubId(id: string): boolean {
  if (!id || id.length === 0) return false;
  if (id.includes("X")) return false;
  return id.startsWith("ca-pub-");
}

export function isValidSlotId(id: string | undefined): boolean {
  if (!id || id.length === 0) return false;
  if (id.includes("X")) return false;
  return /^\d{10,}$/.test(id);
}

export const adsConfig = {
  enabled: parseAdsEnabled(),
  adsensePubId: ADSENSE_PUB_ID,
  get adsenseReady(): boolean {
    return this.enabled && isValidPubId(this.adsensePubId);
  },
} as const;
