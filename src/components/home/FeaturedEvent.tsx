import { ArrowRight, Calendar, Clock, MapPin, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";

export const featuredEvent = {
  title: "Troc et Puces",
  date: "Dimanche 15 novembre 2026",
  time: "De 8h30 à 17h30",
  location: "Salle Roger Michel – Elven",
};

export function FeaturedEvent() {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:mt-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 overflow-hidden rounded-[2.5rem] bg-cream-100 lg:grid-cols-2">
        <PlaceholderPhoto
          icon={ShoppingBag}
          label="Photo — édition précédente du Troc et Puces"
          className="aspect-[16/10] w-full lg:aspect-auto"
        />

        <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Événement à venir
          </p>
          <h2 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
            {featuredEvent.title}
          </h2>

          <ul className="mt-2 flex flex-col gap-3">
            <li className="flex items-center gap-3 text-navy-900/80">
              <Calendar className="h-5 w-5 text-orange-500" />
              <span className="font-medium">{featuredEvent.date}</span>
            </li>
            <li className="flex items-center gap-3 text-navy-900/80">
              <Clock className="h-5 w-5 text-orange-500" />
              <span className="font-medium">{featuredEvent.time}</span>
            </li>
            <li className="flex items-center gap-3 text-navy-900/80">
              <MapPin className="h-5 w-5 text-orange-500" />
              <span className="font-medium">{featuredEvent.location}</span>
            </li>
          </ul>

          <Button
            href="/evenements#a-venir"
            size="lg"
            icon={<ArrowRight className="h-4 w-4" />}
            className="mt-4 w-fit"
          >
            J&rsquo;aide sur cet événement
          </Button>
        </div>
      </div>
    </section>
  );
}
