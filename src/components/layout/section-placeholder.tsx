import type { Metadata } from "next";
import {
  Container,
  Section,
  Eyebrow,
  Heading,
  Prose,
  Divider,
} from "@/components/ui";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

/**
 * SectionPlaceholder — a calm "coming next" surface for routes whose content
 * lands in Phase 2. Editorial, never decorative. Lists planned subsections so
 * the navigation feels intentional rather than broken.
 */
export function SectionPlaceholder({
  eyebrow,
  title,
  description,
  children,
}: Props) {
  return (
    <Section spacing="loose">
      <Container size="narrow">
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className="mt-3">
          <Heading as="h1" size="display" className="text-balance">
            {title}
          </Heading>
        </div>
        <Prose className="mt-8">
          <p>{description}</p>
        </Prose>
        {children && (
          <>
            <Divider className="my-10" />
            <div className="font-sans text-[0.9375rem] text-ink-soft">
              {children}
            </div>
          </>
        )}
      </Container>
    </Section>
  );
}

/** Helper to standardise metadata for stub pages. */
export function makeMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
  };
}
