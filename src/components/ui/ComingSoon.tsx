import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ComingSoon({ label }: { label: string }) {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-20 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
        <Sparkles className="h-6 w-6" />
      </span>
      <p className="text-navy-900/70">
        La page « {label} » est en cours de rédaction avec les contenus
        officiels de l&rsquo;association.
      </p>
      <Button href="/" variant="outline">
        Retour à l&rsquo;accueil
      </Button>
    </div>
  );
}
