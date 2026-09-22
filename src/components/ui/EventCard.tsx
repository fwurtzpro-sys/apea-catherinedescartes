import { ArrowRight, Calendar, Clock, MapPin, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PlaceholderPhoto } from "@/components/ui/PlaceholderPhoto";
import type { ApeaEvent } from "@/lib/events-data";

type EventCardProps = {
  event: ApeaEvent;
  eyebrow?: string;
  photoLabel?: string;
};

export function EventCard({
  event,
  eyebrow = "Événement à venir",
  photoLabel = "Photo — édition précédente de l'événement",
}: EventCardProps) {
  return (
    <div
      id={event.slug}
      className="grid scroll-mt-24 grid-cols-1 overflow-hidden rounded-[2.5rem] bg-cream-100 lg:grid-cols-2"
    >
      <PlaceholderPhoto
        icon={ShoppingBag}
        label={photoLabel}
        className="aspect-[16/10] w-full lg:aspect-auto"
      />

      <div className="flex flex-col justify-center gap-4 p-8 sm:p-10 lg:p-12">
        <p className="text-sm font-bold uppercase tracking-widest text-orange-500">
          {eyebrow}
        </p>
        <h3 className="text-3xl font-extrabold text-navy-900 sm:text-4xl">
          {event.title}
        </h3>

        <ul className="mt-2 flex flex-col gap-3">
          <li className="flex items-center gap-3 text-navy-900/80">
            <Calendar className="h-5 w-5 shrink-0 text-orange-500" />
            <span className="font-medium">{event.date}</span>
          </li>
          <li className="flex items-center gap-3 text-navy-900/80">
            <Clock className="h-5 w-5 shrink-0 text-orange-500" />
            <span className="font-medium">{event.time}</span>
          </li>
          <li className="flex items-center gap-3 text-navy-900/80">
            <MapPin className="h-5 w-5 shrink-0 text-orange-500" />
            <span className="font-medium">{event.location}</span>
          </li>
        </ul>

        <Button
          href="/evenements/inscriptions"
          size="lg"
          icon={<ArrowRight className="h-4 w-4" />}
          className="mt-4 w-fit"
        >
          {event.ctaLabel}
        </Button>
      </div>
    </div>
  );
}
