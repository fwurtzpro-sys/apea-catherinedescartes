import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const ROUTES = [
  "",
  "/qui-sommes-nous",
  "/evenements",
  "/evenements/inscriptions",
  "/evenements/troc-et-puces",
  "/nos-actions",
  "/nos-partenaires",
  "/actualites",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
  }));
}
