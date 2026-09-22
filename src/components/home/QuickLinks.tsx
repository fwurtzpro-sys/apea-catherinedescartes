import Link from "next/link";
import { ArrowRight, Calendar, Heart, Users, ClipboardList } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type QuickLink = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

const QUICK_LINKS: QuickLink[] = [
  {
    icon: Calendar,
    title: "Nos événements",
    description: "Des moments de partage tout au long de l'année",
    href: "/evenements",
  },
  {
    icon: Users,
    title: "Nous rejoindre",
    description: "Devenez bénévole et faites la différence",
    href: "/contact",
  },
  {
    icon: Heart,
    title: "Nos actions",
    description: "Soutien aux projets des élèves",
    href: "/nos-actions",
  },
  {
    icon: ClipboardList,
    title: "Nos actualités",
    description: "Restez informés de la vie de l'association",
    href: "/actualites",
  },
];

export function QuickLinks() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map(({ icon: Icon, title, description, href }) => (
          <Link
            key={href + title}
            href={href}
            className="group flex flex-col items-center gap-3 rounded-3xl bg-cream-100 p-7 text-center transition-shadow hover:shadow-lg hover:shadow-orange-500/10"
          >
            <Icon
              className="h-11 w-11 text-orange-500"
              strokeWidth={1.75}
              fill="currentColor"
              fillOpacity={0.15}
            />
            <span className="text-lg font-bold text-navy-900">{title}</span>
            <span className="text-sm text-navy-900/60">{description}</span>
            <span className="mt-1 flex items-center text-orange-500 transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
