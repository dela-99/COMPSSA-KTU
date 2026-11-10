import type { Metadata } from "next";
import Image from "next/image";
import {
  Container,
  Section,
  Eyebrow,
  Heading,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardMedia,
  CardAction,
  CardMeta,
  Reveal,
} from "@/components/ui";
import { NavIcon } from "@/components/ui/icons";
import { libraryDestinations } from "@/lib/navigation";
import {
  news,
  gallery,
  researchAreas,
  researchProjects,
  publications,
  pastQuestions,
} from "@/data";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Library",
  description:
    "A curated collection of departmental resources, news, photographs, research outputs and academic materials.",
};

/**
 * The four destinations are resolved from the existing navigation
 * configuration and enriched with live counts from the existing data layer.
 * Library is a presentation and navigation layer only — it creates no
 * dataset, no table and no service of its own.
 */
const [newsDestination, galleryDestination, researchDestination, pastQuestionsDestination] =
  libraryDestinations as [
    typeof libraryDestinations[0],
    typeof libraryDestinations[1],
    typeof libraryDestinations[2],
    typeof libraryDestinations[3],
  ];

const latestNews = [...news].sort((a, b) =>
  b.publishedAt.localeCompare(a.publishedAt),
)[0];
const latestGallery = gallery[0];
const publishedPapers = pastQuestions.filter((pq) => pq.published);
const academicYears = Array.from(
  new Set(publishedPapers.map((pq) => pq.academicYear)),
).sort((a, b) => b.localeCompare(a));

export default function LibraryPage() {
  return (
    <>
      <Section spacing="loose" rule>
        <Container size="wide">
          <Eyebrow>Library</Eyebrow>
          <Heading as="h1" size="display" className="mt-3 max-w-[22ch]">
            A curated collection of departmental resources.
          </Heading>
          <p className="mt-6 max-w-[60ch] font-serif text-[1.125rem] leading-relaxed text-ink-soft">
            News, photographs, research outputs and academic materials —
            maintained by the Department of Computer Science for students,
            staff and visitors.
          </p>
        </Container>
      </Section>

      <Section spacing="default">
        <Container size="wide">
          {/*
            An intentionally asymmetric composition — one large featured
            card, two medium cards and one wide supporting card. The grid
            collapses to a single column on small screens, so the order
            stays intact everywhere.
          */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
            {/* Featured — News */}
            <Reveal className="lg:col-span-7 lg:row-span-2" delay={0}>
              <Card
                href={newsDestination.href}
                interactive
                accent
                flush
                className="flex h-full flex-col overflow-hidden"
              >
                <div className="p-6 pb-0 sm:p-7 sm:pb-0">
                  <CardHeader className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"
                      aria-hidden
                    >
                      <NavIcon name={newsDestination.icon ?? "news"} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <CardTitle className="text-[1.375rem]">
                        {newsDestination.label}
                      </CardTitle>
                      <CardMeta className="mt-1 block">
                        {news.length} article{news.length === 1 ? "" : "s"}
                      </CardMeta>
                    </div>
                  </CardHeader>
                </div>

                <CardMedia ratio="16 / 9" className="mt-6 w-full">
                  <span className="absolute inset-0 flex items-center justify-center">
                    <NavIcon
                      name={newsDestination.icon ?? "news"}
                      className="h-10 w-10 text-ink-subtle/40"
                    />
                  </span>
                </CardMedia>

                <div className="flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-5">
                  <CardDescription className="flex-1">
                    {newsDestination.description}
                  </CardDescription>
                  {latestNews && (
                    <p className="mt-4 border-l-2 border-accent/30 pl-3 font-sans text-[0.8125rem] leading-relaxed text-ink-subtle">
                      <span className="block uppercase tracking-[0.14em]">
                        Latest · {formatDate(latestNews.publishedAt)}
                      </span>
                      <span className="mt-1 block font-serif text-[0.9375rem] leading-snug text-ink">
                        {latestNews.title}
                      </span>
                    </p>
                  )}
                  <CardFooter className="mt-5 border-t-0 pt-0">
                    <CardAction>Read the news</CardAction>
                  </CardFooter>
                </div>
              </Card>
            </Reveal>

            {/* Medium — Gallery */}
            <Reveal className="lg:col-span-5" delay={80}>
              <Card
                href={galleryDestination.href}
                interactive
                flush
                className="flex h-full flex-col overflow-hidden"
              >
                <CardMedia ratio="16 / 9" className="w-full">
                  {latestGallery ? (
                    <Image
                      src={latestGallery.imageUrl}
                      alt={latestGallery.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <NavIcon name={galleryDestination.icon ?? "gallery"} className="h-9 w-9 text-ink-subtle/40" />
                    </span>
                  )}
                </CardMedia>
                <div className="flex flex-1 flex-col p-6 pt-5 sm:p-7 sm:pt-5">
                  <CardHeader className="mb-3 flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper-warm text-ink-subtle"
                      aria-hidden
                    >
                      <NavIcon
                        name={galleryDestination.icon ?? "gallery"}
                        className="h-4 w-4"
                      />
                    </span>
                    <CardTitle className="text-[1.125rem]">
                      {galleryDestination.label}
                    </CardTitle>
                  </CardHeader>
                  <CardDescription className="flex-1">
                    {galleryDestination.description}
                  </CardDescription>
                  {latestGallery && (
                    <p className="mt-4 font-sans text-[0.8125rem] text-ink-subtle">
                      {gallery.length} photographs · most recent{" "}
                      <span className="text-ink">{latestGallery.title}</span>
                    </p>
                  )}
                  <CardFooter className="mt-4 border-t-0 pt-0">
                    <CardAction>Browse the gallery</CardAction>
                  </CardFooter>
                </div>
              </Card>
            </Reveal>

            {/* Medium — Research */}
            <Reveal className="lg:col-span-5" delay={140}>
              <Card
                href={researchDestination.href}
                interactive
                className="flex h-full flex-col"
              >
                <CardHeader className="mb-3 flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-paper-warm text-ink-subtle"
                    aria-hidden
                  >
                    <NavIcon
                      name={researchDestination.icon ?? "research"}
                      className="h-4 w-4"
                    />
                  </span>
                  <CardTitle className="text-[1.125rem]">
                    {researchDestination.label}
                  </CardTitle>
                </CardHeader>
                <CardDescription className="flex-1">
                  {researchDestination.description}
                </CardDescription>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {researchAreas.map((area) => (
                    <li
                      key={area.id}
                      className="rounded-full border border-rule px-2.5 py-1 font-sans text-[0.75rem] text-ink-muted"
                    >
                      {area.name}
                    </li>
                  ))}
                </ul>
                <CardFooter className="mt-5 border-t-0 pt-0">
                  <CardAction>Explore research</CardAction>
                  <span className="font-sans text-[0.75rem] text-ink-subtle">
                    {researchAreas.length} areas · {researchProjects.length} projects ·{" "}
                    {publications.length} publications
                  </span>
                </CardFooter>
              </Card>
            </Reveal>

            {/* Wide supporting — Past Questions */}
            <Reveal className="lg:col-span-12" delay={200}>
              <Card
                href={pastQuestionsDestination.href}
                interactive
                accent
                className="flex h-full flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10"
              >
                <div className="flex min-w-0 items-start gap-4">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent"
                    aria-hidden
                  >
                    <NavIcon
                      name={pastQuestionsDestination.icon ?? "past-questions"}
                      className="h-5 w-5"
                    />
                  </span>
                  <div className="min-w-0">
                    <CardTitle className="text-[1.25rem]">
                      {pastQuestionsDestination.label}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {pastQuestionsDestination.description}
                    </CardDescription>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col gap-4 sm:items-end">
                  <div className="flex flex-wrap gap-1.5 sm:justify-end">
                    {academicYears.map((year) => (
                      <span
                        key={year}
                        className="rounded-full border border-rule px-2.5 py-1 font-sans text-[0.75rem] text-ink-muted"
                      >
                        {year}
                      </span>
                    ))}
                  </div>
                  <CardAction>Search the archive</CardAction>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

    </>
  );
}
