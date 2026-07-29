// amplitude.ts
"use client";

import * as amplitude from "@amplitude/unified";

async function initAmplitude() {
  await amplitude.initAll(process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!, {
    analytics: {
      autocapture: true,
    },
    sessionReplay: {
      sampleRate: 1,
    },
  });
}

if (typeof window !== "undefined") {
  initAmplitude();
}

export const Amplitude = () => null;

export default amplitude;
