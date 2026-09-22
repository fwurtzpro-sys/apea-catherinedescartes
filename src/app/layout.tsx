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

export const metadata: Metadata = {
  title: {
    default: "APEA Catherine Descartes — Association de parents d'élèves à Elven",
    template: "%s — APEA Catherine Descartes",
  },
  description:
    "L'APEA Catherine Descartes est l'association des parents d'élèves et amis de l'école élémentaire publique Catherine Descartes à Elven. Découvrez nos événements, nos actions et rejoignez-nous.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${poppins.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-navy-900">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
