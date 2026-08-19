import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("react", async () => {
  const actual = await vi.importActual<typeof import("react")>("react");
  return {
    ...actual,
    useCallback: <T extends (...args: unknown[]) => unknown>(cb: T) => cb,
  };
});

const CONSENT_KEY = "medcalchub-consent";

function createLocalStorageMock() {
  const store = new Map<string, string>();
  return {
    store,
    mock: {
      getItem: vi.fn((key: string) => store.get(key) ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store.set(key, value);
      }),
      removeItem: vi.fn((key: string) => {
        store.delete(key);
      }),
      clear: vi.fn(() => store.clear()),
    },
  };
}

describe("ConsentPreferencesButton", () => {
  let ls: ReturnType<typeof createLocalStorageMock>;
  let dispatchEventSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.resetModules();

    ls = createLocalStorageMock();
    vi.stubGlobal("localStorage", ls.mock);

    dispatchEventSpy = vi.fn();
    vi.stubGlobal("window", {
      dispatchEvent: dispatchEventSpy,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  it("returns a button element", async () => {
    const { ConsentPreferencesButton } = await import(
      "../../components/consent/consent-preferences-button"
    );
    const result = ConsentPreferencesButton();
    expect(result).not.toBeNull();
    expect(result).toHaveProperty("type", "button");
  });

  it("clears consent when clicked", async () => {
    ls.store.set(CONSENT_KEY, "true");
    const { ConsentPreferencesButton } = await import(
      "../../components/consent/consent-preferences-button"
    );
    const result = ConsentPreferencesButton();

    expect(result.props.onClick).toBeDefined();
    result.props.onClick();
    expect(ls.mock.removeItem).toHaveBeenCalledWith(CONSENT_KEY);
    expect(dispatchEventSpy).toHaveBeenCalled();
  });

  it("causes getConsent to return null after click", async () => {
    ls.store.set(CONSENT_KEY, "true");
    const mod1 = await import("../../lib/consent/consent");
    expect(mod1.getConsent()).toBe(true);

    const { ConsentPreferencesButton } = await import(
      "../../components/consent/consent-preferences-button"
    );
    const result = ConsentPreferencesButton();
    result.props.onClick();

    const mod2 = await import("../../lib/consent/consent");
    expect(mod2.getConsent()).toBeNull();
  });
});
