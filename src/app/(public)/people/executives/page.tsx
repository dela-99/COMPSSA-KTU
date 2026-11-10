import type { Metadata } from "next";
import Link from "next/link";
import {
  Container,
  Section,
  Eyebrow,
  Heading,
  Badge,
} from "@/components/ui";
import {
  getCurrentExecutiveTerm,
  getPastExecutiveTerms,
  academicYearToSlug,
} from "@/data";
import { MemberCard } from "@/components/public";

export const metadata: Metadata = {
  title: "Executives",
  description: "Current and past student executive councils of the Department of Computer Science.",
};

export default function ExecutivesPage() {
  const current = getCurrentExecutiveTerm();
  const past = getPastExecutiveTerms();

  return (
    <>
      <Section spacing="loose" rule>
        <Container size="wide">
          <Eyebrow>People</Eyebrow>
          <Heading as="h1" size="display" className="mt-3 max-w-[20ch]">
            Student executives.
          </Heading>
          <p className="mt-6 font-serif text-[1.125rem] leading-relaxed text-ink-soft max-w-[60ch]">
            The student executive council represents the undergraduate body of
            the department. The current council is shown below; previous
            councils are kept as a record and can be browsed by academic year.
          </p>
        </Container>
      </Section>

      {current && (
        <Section spacing="default">
          <Container size="wide">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <Badge tone="accent">Current council</Badge>
                <Heading as="h2" size="lg" className="mt-3">
                  {current.academicYear}
                </Heading>
                <p className="mt-2 font-sans text-[0.9375rem] text-ink-muted">
                  {current.members.length} members
                </p>
              </div>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {current.members.map((m) => (
                <li key={m.id} className="list-none">
                  <MemberCard
                    name={m.name}
                    position={m.position}
                    biography={m.biography}
                    photoUrl={m.photoUrl}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      <Section spacing="default" tone="warm" rule>
        <Container size="wide">
          <div id="executive-history" className="scroll-mt-24">
            <Eyebrow>Executive history</Eyebrow>
            <Heading as="h2" size="lg" className="mt-3 max-w-[24ch]">
              Previous councils.
            </Heading>
            <p className="mt-4 font-sans text-[0.9375rem] text-ink-muted max-w-[60ch]">
              Browse any academic year to view the executive council that served.
            </p>
            <ul className="mt-10 divide-y divide-rule border-y border-rule">
              {past.map((t) => (
                <li key={t.id}>
                  <Link
                    href={`/people/executives/history/${academicYearToSlug(t.academicYear)}`}
                    className="group flex items-center justify-between gap-6 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dept-blue"
                  >
                    <div>
                      <p className="font-serif text-[1.25rem] text-ink group-hover:text-accent transition-colors">
                        {t.academicYear}
                      </p>
                      <p className="mt-1 font-sans text-[0.875rem] text-ink-muted">
                        {t.members.length} members
                      </p>
                    </div>
                    <span className="font-sans text-[0.875rem] text-ink-subtle">
                      View →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
