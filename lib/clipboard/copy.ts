
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    if (!navigator.clipboard) {
      return false;
    }

    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}