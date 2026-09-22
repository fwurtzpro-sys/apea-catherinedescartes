import type { Metadata } from "next";
import { Poppins, Caveat } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

/**
 * À définir une fois le nom de domaine définitif du site connu (variable
 * d'environnement NEXT_PUBLIC_SITE_URL) — sert de base aux URLs
 * canoniques et aux aperçus OpenGraph.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const SITE_TITLE = "APEA Catherine Descartes — Association de parents d'élèves à Elven";
const SITE_DESCRIPTION =
  "L'APEA Catherine Descartes est l'association des parents d'élèves et amis de l'école élémentaire publique Catherine Descartes à Elven. Découvrez nos événements, nos actions et rejoignez-nous.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s — APEA Catherine Descartes",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "APEA Catherine Descartes",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/logo-apea.png", width: 342, height: 344 }],
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/logo-apea.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-navy-900">
        <Header />
        <main className="flex-1 overflow-x-clip">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
