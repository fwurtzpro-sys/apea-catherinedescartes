import type { Metadata } from "next";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Euro,
  Mail,
  MapPin,
  Ticket,
  TreePine,
  Users,
  Utensils,
} from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Troc et Puces 2026 à Elven | APEA Catherine Descartes",
  description:
    "Retrouvez toutes les informations sur la 29ème édition du Troc et Puces d'Elven organisée le dimanche 15 novembre 2026 au Complexe sportif Roger Michel.",
};

const RESERVATION_EMAIL = "apeaelven@gmail.com";

export default function TrocEtPucesPage() {
  return (
    <>
      <PageHero
        eyebrow="29ème édition"
        title="Troc et Puces d'Elven"
        description={
          <>
            Dimanche 15 novembre 2026, de 8h30 à 17h30{" "}
            <span className="whitespace-nowrap">
              Complexe sportif Roger Michel – Elven
            </span>
            .
          </>
        }
      />

      {/* Visuel + informations pratiques */}
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 overflow-hidden rounded-[2.5rem] bg-cream-100 lg:grid-cols-2">
          <div className="relative aspect-[16/10] w-full bg-cream-200 lg:aspect-auto">
            <Image
              src="/apea-troc-et-puces-2026.png"
              alt="Affiche officielle du Troc et Puces d'Elven 2026"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-contain p-4"
            />
          </div>

          <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
              Informations pratiques
            </p>
            <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
              Troc et Puces
            </h2>

            <ul className="mt-2 flex flex-col gap-3">
              <li className="flex items-center gap-3 text-navy-900/80">
                <Calendar className="h-5 w-5 shrink-0 text-orange-500" />
                <span className="font-medium">Dimanche 15 novembre 2026</span>
              </li>
              <li className="flex items-center gap-3 text-navy-900/80">
                <Clock className="h-5 w-5 shrink-0 text-orange-500" />
                <span className="font-medium">De 8h30 à 17h30</span>
              </li>
              <li className="flex items-center gap-3 text-navy-900/80">
                <MapPin className="h-5 w-5 shrink-0 text-orange-500" />
                <span className="font-medium">
                  Complexe sportif Roger Michel – Elven
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Informations visiteurs */}
      <Container className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Visiteurs
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-navy-900 sm:text-3xl">
            Infos pratiques pour votre visite
          </h2>
        </div>

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-cream-100 p-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <Euro className="h-5 w-5" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
            </span>
            <p className="font-bold text-navy-900">Entrée&nbsp;: 1,50&nbsp;€</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-cream-100 p-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <Ticket className="h-5 w-5" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
            </span>
            <p className="font-bold text-navy-900">
              Gratuit pour les moins de 16 ans
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-cream-100 p-6 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <Utensils className="h-5 w-5" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
            </span>
            <p className="font-bold text-navy-900">
              Buvette et restauration sur place
            </p>
          </div>
        </div>
      </Container>

      {/* Informations exposants */}
      <Container className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Exposants
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-navy-900 sm:text-3xl">
            Vous souhaitez exposer&nbsp;?
          </h2>
        </div>

        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-cream-100 p-7 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <Users className="h-6 w-6" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
            </span>
            <p className="text-lg font-bold text-navy-900">Intérieur</p>
            <p className="text-navy-900/70">4&nbsp;€ / mètre</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-3xl bg-cream-100 p-7 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <TreePine className="h-6 w-6" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
            </span>
            <p className="text-lg font-bold text-navy-900">Extérieur</p>
            <p className="text-navy-900/70">2&nbsp;€ / mètre</p>
          </div>
        </div>
      </Container>

      {/* Réservation */}
      <Container className="pb-16 sm:pb-20">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-[2.5rem] bg-navy-900 p-8 text-center sm:p-12">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-orange-400">
            <Mail className="h-6 w-6" strokeWidth={1.5} fill="currentColor" fillOpacity={0.35} />
          </span>
          <p className="text-sm font-bold uppercase tracking-widest text-orange-400">
            Réservation
          </p>
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            Réserver un emplacement
          </h2>
          <p className="text-white/70">
            Pour réserver votre emplacement exposant, contactez-nous à
            l&rsquo;adresse {RESERVATION_EMAIL}.
          </p>
          <Button
            href={`mailto:${RESERVATION_EMAIL}`}
            size="lg"
            icon={<Mail className="h-4 w-4" />}
            className="mt-2"
          >
            Réserver un emplacement
          </Button>
        </div>
      </Container>
    </>
  );
}
