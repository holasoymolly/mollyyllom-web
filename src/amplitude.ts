// amplitude.ts
"use client";

/**
 * Amplitude (Analytics + Session Replay), set up as in Amplitude's Next.js
 * guide (`initAll` with autocapture and Session Replay at sample rate 1), with
 * one change: the SDK is imported on demand, only where it is switched on.
 *
 * Production only. The key is deliberately absent from Preview, Development
 * and local .env.local, so dev and beta traffic never reaches Amplitude. Since
 * 28 Nov 2026 the SDK (about 123 KB compressed with Session Replay) is also
 * never downloaded there: before, it was bundled into every page even with no
 * key. Where the key exists it loads right away, as before, and measures the
 * same things; calls made before it finishes loading wait for it.
 */
type AmplitudeModule = typeof import("@amplitude/unified");

const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

/** True only where an API key is configured, i.e. production. */
export const isAmplitudeEnabled = Boolean(apiKey);

let ready: Promise<AmplitudeModule> | null = null;

/** Loads and initializes the SDK once; only ever called when enabled. */
const load = (): Promise<AmplitudeModule> =>
  (ready ??= import("@amplitude/unified").then(async (amplitude) => {
    await amplitude.initAll(apiKey!, {
      analytics: {
        autocapture: true,
      },
      sessionReplay: {
        sampleRate: 1,
      },
    });
    return amplitude;
  }));

if (typeof window !== "undefined" && isAmplitudeEnabled) {
  load();
}

/** Sends a named event; a no-op outside production. */
export const amplitudeTrack = (name: string, props: Record<string, unknown>) => {
  if (!isAmplitudeEnabled) return;
  load().then((amplitude) => amplitude.track(name, props));
};

export const Amplitude = () => null;
