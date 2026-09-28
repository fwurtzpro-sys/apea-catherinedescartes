import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { CHILDREN_ACTIVITIES } from "@/lib/children-activities-data";

/**
 * Internal PDF viewer for one coloring page. It exists only so the
 * browser tab shows the activity's real title: the source PDFs carry
 * unreliable embedded /Title metadata (often literally "(anonymous)"),
 * which Chrome uses as the tab title when a PDF is opened directly.
 * Embedding the PDF in an <iframe> inside a normal Next.js page lets
 * this page's own <title> (set below from the existing activity data)
 * win instead — the PDF itself is never modified.
 */

type Props = { params: Promise<{ id: string }> };

function getActivity(id: string) {
  return CHILDREN_ACTIVITIES.find(
    (activity) => activity.id === id && activity.available && activity.pdf
  );
}

export function generateStaticParams() {
  return CHILDREN_ACTIVITIES.filter((activity) => activity.available && activity.pdf).map(
    (activity) => ({ id: activity.id })
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const activity = getActivity(id);
  if (!activity) return {};
  return {
    title: activity.title,
    robots: { index: false, follow: false },
  };
}

export default async function ColoriagePage({ params }: Props) {
  const { id } = await params;
  const activity = getActivity(id);
  if (!activity) notFound();

  return (
    <Container className="flex h-[calc(100vh-4.5rem)] flex-col py-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/activites-enfants"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour aux activités
        </Link>

        <div className="flex items-center gap-3">
          <h1 className="text-base font-extrabold text-navy-900">{activity.title}</h1>
          <a
            href={activity.pdf}
            download
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-orange-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Télécharger
          </a>
        </div>
      </div>

      <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-cream-100 ring-1 ring-navy-900/10">
        {/* Mobile Safari's built-in PDF-in-iframe viewer ignores the
            iframe's box and renders at the PDF's native point size, so on
            phones it shows a giant, cropped page instead of fitting it —
            the pre-rendered preview image below avoids that entirely. */}
        {activity.thumbnail && (
          <Image
            src={activity.thumbnail}
            alt={`Aperçu du coloriage ${activity.title}`}
            fill
            sizes="100vw"
            className="object-contain p-3 sm:hidden"
          />
        )}
        <iframe
          src={activity.pdf}
          title={activity.title}
          className={
            activity.thumbnail ? "hidden h-full w-full sm:block" : "h-full w-full"
          }
        />
      </div>
    </Container>
  );
}
