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
    <section className="mx-auto -mt-2 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map(({ icon: Icon, title, description, href }) => (
          <Link
            key={href + title}
            href={href}
            className="group flex flex-col gap-4 rounded-3xl bg-cream-100 p-6 transition-shadow hover:shadow-lg hover:shadow-orange-500/10"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
              <Icon className="h-6 w-6" strokeWidth={2.2} />
            </span>
            <span>
              <span className="block text-lg font-bold text-navy-900">
                {title}
              </span>
              <span className="mt-1 block text-sm text-navy-900/60">
                {description}
              </span>
            </span>
            <span className="mt-auto flex items-center gap-1 text-sm font-semibold text-orange-500 transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
