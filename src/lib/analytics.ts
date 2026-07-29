'use client';

import amplitude, { isAmplitudeEnabled } from '@/amplitude';
import type { Language } from '@/i18n/translations';

/**
 * No-ops outside production, where the SDK is never initialized — otherwise
 * these calls would sit in the SDK's pre-init queue forever.
 */
const track = (name: string, props: Record<string, unknown>) => {
  if (!isAmplitudeEnabled) return;
  amplitude.track(name, props);
};

/**
 * Named conversion events for Amplitude.
 *
 * Autocapture already records every click, page view and form interaction as a
 * generic `[Amplitude] Element Clicked` / `Page Viewed` event. These helpers
 * exist for the handful of high-intent actions worth building funnels and
 * charts on, so they get a stable name instead of being identified by CSS
 * selector — which would break the moment the markup changes.
 *
 * Keep event names stable: renaming one in code splits its history in Amplitude.
 */

/** Which page the interaction happened on. */
type Surface =
  | 'home'
  | 'conoceme'
  | 'contacto'
  | 'descargas'
  | 'proyecto'
  | 'footer';

/** Clicked through to Calendly to book a 30-min call — the strongest buying signal on the site. */
export const trackBookingCTAClicked = (location: Surface, lang: Language) =>
  track('Booking CTA Clicked', { location, lang });

/** Clicked the hola@mollyyllom.com mailto link. */
export const trackEmailCTAClicked = (location: Surface, lang: Language) =>
  track('Email CTA Clicked', { location, lang });

/** Clicked through to the newsletter signup form. */
export const trackNewsletterCTAClicked = (location: Surface, lang: Language) =>
  track('Newsletter CTA Clicked', { location, lang });

/** Opened a downloadable asset from /descargas. */
export const trackAssetDownloaded = (
  assetTitle: string,
  assetUrl: string,
  lang: Language,
) => track('Asset Downloaded', { assetTitle, assetUrl, lang });

/** Viewed a single case study — shows which work attracts the most interest. */
export const trackProjectViewed = (
  projectSlug: string,
  projectTitle: string,
  lang: Language,
) => track('Project Viewed', { projectSlug, projectTitle, lang });
