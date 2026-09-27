import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const ROUTES: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "", changeFrequency: "weekly", priority: 1.0 },
  { path: "/qui-sommes-nous", changeFrequency: "monthly", priority: 0.7 },
  { path: "/evenements", changeFrequency: "weekly", priority: 0.8 },
  { path: "/evenements/inscriptions", changeFrequency: "monthly", priority: 0.6 },
  { path: "/evenements/troc-et-puces", changeFrequency: "weekly", priority: 0.8 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/activites-enfants", changeFrequency: "monthly", priority: 0.8 },
  { path: "/boite-a-idees", changeFrequency: "monthly", priority: 0.6 },
  { path: "/calendrier-scolaire", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
