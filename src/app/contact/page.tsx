import type { Metadata } from "next";
import { Mail, MapPin, Users } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Restons en contact"
        title="Contact"
        description="Une question, une envie de rejoindre l'aventure ? Écrivez-nous."
      />

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-start gap-4 rounded-3xl bg-cream-100 p-6 transition-shadow hover:shadow-lg hover:shadow-orange-500/10"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <Mail className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-bold text-navy-900">
                Par e-mail
              </span>
              <span className="mt-1 block text-sm text-navy-900/70">
                {SITE.email}
              </span>
            </span>
          </a>

          <div className="flex items-start gap-4 rounded-3xl bg-cream-100 p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <MapPin className="h-5 w-5" />
            </span>
            <span>
              <span className="block font-bold text-navy-900">
                À l&rsquo;école
              </span>
              <span className="mt-1 block text-sm text-navy-900/70">
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-orange-300/60 bg-orange-50 p-8 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
            <Users className="h-5 w-5" />
          </span>
          <p className="font-bold text-navy-900">
            Envie de devenir bénévole&nbsp;?
          </p>
          <p className="max-w-md text-sm text-navy-900/70">
            Contactez-nous par e-mail en précisant vos disponibilités : nous
            revenons vers vous rapidement pour vous accueillir dans
            l&rsquo;association.
          </p>
          <Button href={`mailto:${SITE.email}`} className="mt-2">
            Nous écrire
          </Button>
        </div>
      </section>
    </>
  );
}
