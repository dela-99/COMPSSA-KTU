import {
  Container,
  Section,
  Eyebrow,
  Heading,
  Button,
} from "@/components/ui";

export default function NotFound() {
  return (
    <Section spacing="loose">
      <Container size="narrow">
        <Eyebrow>404</Eyebrow>
        <Heading as="h1" size="display" className="mt-3">
          Page not found.
        </Heading>
        <p className="mt-6 font-serif text-[1.125rem] leading-relaxed text-ink-soft max-w-[58ch]">
          The page you are looking for has moved, or the link is no longer
          valid. You can return to the start of the site.
        </p>
        <div className="mt-8">
          <Button href="/" variant="secondary">
            Return home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
