// amplitude.ts
"use client";

import * as amplitude from "@amplitude/unified";

const apiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

async function initAmplitude() {
  await amplitude.initAll(apiKey!, {
    analytics: {
      autocapture: true,
    },
    sessionReplay: {
      sampleRate: 1,
    },
  });
}

// Production only. The key is deliberately absent from Preview, Development
// and local .env.local, so dev and beta traffic never reaches Amplitude —
// no key means no init, and every `track()` call becomes a silent no-op.
if (typeof window !== "undefined" && apiKey) {
  initAmplitude();
}

/** True only where an API key is configured — i.e. production. */
export const isAmplitudeEnabled = Boolean(apiKey);

export const Amplitude = () => null;

export default amplitude;
