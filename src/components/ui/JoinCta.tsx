import { Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeartDoodle } from "@/components/ui/Decorations";
import { Reveal } from "@/components/ui/Reveal";

type JoinCtaProps = {
  title?: string;
  description?: string;
};

/** Recurring "join the association" banner reused across secondary pages. */
export function JoinCta({
  title = "Envie de vous investir avec nous ?",
  description = "L'APEA fonctionne uniquement grâce à l'énergie de parents bénévoles. Chaque coup de main, ponctuel ou régulier, compte.",
}: JoinCtaProps) {
  return (
    <Container className="my-16 sm:my-24">
      <Reveal
        strong
        className="relative overflow-hidden rounded-[2.5rem] bg-navy-900 px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        <HeartDoodle className="absolute right-6 top-6 h-7 w-7 text-orange-400/70 sm:right-10 sm:top-10" />
        <h2 className="mx-auto max-w-xl text-2xl font-extrabold text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-white/70">{description}</p>
        <Button
          href="/contact"
          size="lg"
          icon={<Users className="h-4 w-4" />}
          className="mx-auto mt-6 w-fit"
        >
          Nous rejoindre
        </Button>
      </Reveal>
    </Container>
  );
}
