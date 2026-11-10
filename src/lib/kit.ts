/**
 * Kit (formerly ConvertKit) forms: the /talleres waitlist and the footer newsletter.
 *
 * The form id is public: it is the same number Kit prints in its own HTML
 * embed, so it lives in code rather than in an env var. While it is empty the
 * page renders the form disabled ("Muy pronto") instead of posting nowhere.
 *
 * The waitlist form redirects to /talleres?lista=ok after signup and to
 * /talleres?lista=confirmada after the subscriber confirms by email; both are
 * set in the form's Settings in Kit and drive the page's thank-you states.
 * The newsletter form posts into a hidden iframe instead, so the reader never
 * leaves the page they are on.
 */
export const KIT_WAITLIST_FORM_ID: string = '10170146'; // "Lista de espera · Talleres (web)"

/** "Newsletter · Web (footer)": shows its own success state, no redirect. */
export const KIT_NEWSLETTER_FORM_ID: string = '10170155';

export const kitFormAction = (formId: string) =>
  `https://app.kit.com/forms/${formId}/subscriptions`;
