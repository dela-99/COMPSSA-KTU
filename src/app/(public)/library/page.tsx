import type { Metadata } from "next";
import Link from "next/link";
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
  Button,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Library",
  description: "Explore the department&rsquo;s digital library &mdash; news, gallery, research, and past questions.",
};

const libraryItems = [
  {
    label: "News",
    href: "/news",
    description: "Latest announcements, departmental updates, and news from the Department of Computer Science.",
    icon: NewspaperIcon,
  },
  {
    label: "Gallery",
    href: "/gallery",
    description: "Browse photographs from departmental events, ceremonies, and student life.",
    icon: ImageIcon,
  },
  {
    label: "Research",
    href: "/research",
    description: "Research areas, active projects, and publications from faculty and postgraduate students.",
    icon: FlaskIcon,
  },
  {
    label: "Past Questions",
    href: "/past-questions",
    description: "Searchable archive of past examination papers filtered by course, level, and academic year.",
    icon: FileIcon,
  },
] as const;

export default function LibraryPage() {
  return (
    <>
      <Section spacing="loose" rule>
        <Container size="wide">
          <Eyebrow>Library</Eyebrow>
          <Heading as="h1" size="display" className="mt-3 max-w-[20ch]">
            The department&rsquo;s digital library.
          </Heading>
          <p className="mt-6 font-serif text-[1.125rem] leading-relaxed text-ink-soft max-w-[60ch]">
            A curated collection of resources &mdash; news, photographs, research output, and examination papers &mdash;
            maintained by the Department of Computer Science for students, staff, and visitors.
          </p>
        </Container>
      </Section>

      <Section spacing="default">
        <Container size="wide">
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {libraryItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Card
                    interactive
                    href={item.href}
                    className="h-full flex flex-col"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <Icon className="h-5 w-5" aria-hidden />
                        </div>
                        <CardTitle className="text-[1.125rem]">{item.label}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardDescription className="flex-1">
                      {item.description}
                    </CardDescription>
                    <CardFooter className="border-t-0 pt-0 mt-auto">
                      <Link href={item.href}>
                        <Button variant="ghost" size="sm">
                          Explore →
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
    </>
  );
}

// Icon components
function NewspaperIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  );
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function FlaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function FileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}