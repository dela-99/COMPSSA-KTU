import type { Metadata } from "next";
import Link from "next/link";
import { SectionPlaceholder, makeMetadata } from "@/components/layout/section-placeholder";
import { primaryNavigation } from "@/lib/navigation";

const peopleDestinations =
  primaryNavigation.find((item) => item.href === "/people")?.children ?? [];

export const metadata: Metadata = makeMetadata(
  "People",
  "HOD, lecturers, staff, and the student executive council.",
);

export default function PeoplePage() {
  return (
    <SectionPlaceholder
      eyebrow="People"
      title="The people of the department."
      description="Find department leadership, lecturers and staff, and the student executive councils, including previous academic years."
    >
      <ul className="grid gap-3 sm:grid-cols-2">
        {peopleDestinations.map((destination) => (
          <li key={destination.href}>
            <Link
              href={destination.href}
              className="group block h-full rounded-xl border border-rule bg-paper/80 p-4 transition-colors hover:border-dept-blue/50 hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dept-blue focus-visible:ring-offset-2"
            >
              <span className="block font-serif text-lg text-ink group-hover:text-dept-blue">
                {destination.label}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-ink-muted">
                {destination.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SectionPlaceholder>
  );
}
