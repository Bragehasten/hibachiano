import Script from "next/script";

/**
 * Central place for any future third-party scripts (analytics, marketing
 * pixels, the eventual Mailchimp tracker, etc). Nothing renders today —
 * this exists to demonstrate the pattern to follow: next/script with
 * strategy="lazyOnload" so the script downloads after the page is
 * interactive and never competes with render-blocking or Core Web Vitals.
 *
 * To wire up Mailchimp's site-tracking snippet once an audience exists,
 * just add NEXT_PUBLIC_MAILCHIMP_TRACKING_ID to .env.local / Vercel env
 * vars — the logic below already reads it and activates automatically,
 * so this component is always safe to render as-is in the meantime.
 */
export function ThirdPartyScripts() {
  const mailchimpTrackingId = process.env.NEXT_PUBLIC_MAILCHIMP_TRACKING_ID;

  if (!mailchimpTrackingId) {
    return null;
  }

  return (
    <Script
      id="mailchimp-site-tracking"
      src={`https://chimpstatic.com/mcjs-connected/js/users/${mailchimpTrackingId}/site.js`}
      strategy="lazyOnload"
    />
  );
}
