import { Container } from "@/components/ui/Container";
import { EventCard } from "@/components/ui/EventCard";
import { UPCOMING_EVENTS } from "@/lib/events-data";

export function FeaturedEvent() {
  const event = UPCOMING_EVENTS[0];
  if (!event) return null;

  return (
    <Container className="mt-16 sm:mt-20">
      <EventCard
        event={event}
        ctaLabel="En savoir plus"
        ctaHref="/evenements/troc-et-puces"
      />
    </Container>
  );
}
