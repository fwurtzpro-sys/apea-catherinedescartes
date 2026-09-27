import type { Metadata } from "next";
import { Compass, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-24 text-center sm:py-32">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
        <Compass className="h-7 w-7" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
      </span>

      <p className="mt-6 text-sm font-bold uppercase tracking-widest text-orange-a11y">
        Erreur 404
      </p>
      <h1 className="mt-2 text-3xl font-extrabold text-navy-900 sm:text-4xl">
        Page introuvable
      </h1>
      <p className="mt-4 max-w-md text-navy-900/70">
        Oups&nbsp;! Cette page semble avoir disparu.
      </p>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
        <Button href="/" size="lg" icon={<Home className="h-4 w-4" />}>
          Retour à l&rsquo;accueil
        </Button>
        <Button href="/contact" variant="ghost" size="md">
          Nous contacter
        </Button>
      </div>
    </Container>
  );
}
