import type { Metadata } from "next";
import {
  Container,
  Section,
  Eyebrow,
  Heading,
} from "@/components/ui";
import { gallery } from "@/data";
import { GalleryBook } from "@/components/public/gallery-book";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photo gallery of the Department of Computer Science.",
};

export default function GalleryPage() {
  return (
    <>
      <Section spacing="loose" rule>
        <Container size="wide">
          <Eyebrow>Gallery</Eyebrow>
          <Heading as="h1" size="display" className="mt-3 max-w-[18ch]">
            The COMPSSA photo book.
          </Heading>
          <p className="mt-6 font-serif text-[1.125rem] leading-relaxed text-ink-soft max-w-[60ch]">
            Open the album to explore photographs from the Department of Computer Science and Koforidua Technical University.
          </p>
        </Container>
      </Section>
      <Section spacing="default">
        <Container size="wide">
          <GalleryBook items={gallery} />
        </Container>
      </Section>
    </>
  );
}
