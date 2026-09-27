/**
 * Shared OpenGraph/Twitter defaults, reused by the root layout and by
 * every page that needs its own `openGraph`/`twitter` object (e.g. to
 * get a page-specific title instead of the site's default one).
 *
 * Next.js shallow-merges metadata across segments: as soon as a page
 * defines its own `openGraph` (or `twitter`) object, the whole object
 * replaces the layout's — nested fields are not merged individually.
 * Spreading these constants into a page's own object keeps the shared
 * fields (type, locale, site name, image) consistent everywhere
 * without repeating them by hand on every page.
 */

export const OG_IMAGE = {
  url: "/og-apea-catherine-descartes.png",
  width: 1200,
  height: 630,
  alt: "APEA de l'école Catherine Descartes à Elven",
};

export const OG_DEFAULTS = {
  type: "website" as const,
  locale: "fr_FR",
  siteName: "APEA Catherine Descartes",
  images: [OG_IMAGE],
};

export const TWITTER_DEFAULTS = {
  card: "summary_large_image" as const,
  images: [OG_IMAGE],
};
