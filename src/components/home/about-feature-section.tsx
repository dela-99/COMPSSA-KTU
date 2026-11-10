import * as React from "react";
import Link from "next/link";
import { Container, Eyebrow, Reveal, Button } from "@/components/ui";
import { siteConfig } from "@/lib/site";
import { programmes, getCurrentHOD } from "@/data";

/**
 * AboutFeatureSection — The Middle Composition from the blueprint.
 * Combines an editorial left column with an overlapping graduate/student image on the right.
 */
export function AboutFeatureSection() {
  const currentHOD = getCurrentHOD();

  return (
    <section className="relative border-t border-rule bg-paper text-ink py-20 sm:py-28 overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Department Introduction */}
          <div className="lg:col-span-7 z-10">
            <Reveal delay={100}>
              <Eyebrow className="text-ink/70">
                About the Department
              </Eyebrow>
            </Reveal>

            <Reveal delay={200}>
              <h2 className="mt-4 font-serif text-[2.5rem] sm:text-[3.25rem] lg:text-[3.75rem] leading-[1.08] font-medium tracking-tight text-ink">
                {siteConfig.name}
              </h2>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-6 space-y-4 font-serif text-[1.0625rem] sm:text-[1.125rem] leading-relaxed text-ink/85 max-w-[56ch]">
                <p>
                  We are a premier academic department dedicated to advancing computing education,
                  scientific inquiry, and technological innovation. Our rigorous curriculum bridges
                  foundational computer science principles with modern software architectures, artificial
                  intelligence, and distributed systems.
                </p>
                <p className="text-ink/75 text-[0.95rem] font-sans">
                  From undergraduate research to industry collaborations, our students and faculty work
                  together to solve complex real-world computing challenges across Africa and the global tech ecosystem.
                </p>
              </div>
            </Reveal>

            {/* Quick Metrics / Institutional Badges */}
            <Reveal delay={400}>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-rule">
                <div>
                  <span className="block font-serif text-[1.75rem] font-semibold text-ink">
                    {programmes.length}
                  </span>
                  <span className="block font-sans text-[0.75rem] uppercase tracking-[0.14em] text-ink/70">
                    Degree Pathways
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-[1.75rem] font-semibold text-ink">
                    100%
                  </span>
                  <span className="block font-sans text-[0.75rem] uppercase tracking-[0.14em] text-ink/70">
                    Accredited
                  </span>
                </div>
                <div>
                  <span className="block font-serif text-[1.75rem] font-semibold text-ink">
                    Active
                  </span>
                  <span className="block font-sans text-[0.75rem] uppercase tracking-[0.14em] text-ink/70">
                    HOD: {currentHOD?.staff?.name?.split(" ")[0] ?? "Faculty"}
                  </span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/about" size="md" className="bg-dept-blue text-white hover:bg-dept-blue/90 border-dept-blue">
                  Learn more about us
                </Button>
                <Button
                  href="/academics/programmes"
                  size="md"
                  variant="secondary"
                  className="bg-transparent text-ink border-rule-strong hover:bg-white/50 hover:border-dept-blue"
                >
                  View Programmes
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Large Overlapping Student / Graduate Image */}
          <div className="lg:col-span-5 relative">
            <Reveal delay={250} direction="left">
              <div className="relative mx-auto max-w-[420px] lg:max-w-none">
                {/* Image Frame with Layering */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-rule shadow-2xl bg-ink">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop')`,
                    }}
                  />
                  {/* Subtle vignette / lighting overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D12]/80 via-transparent to-transparent" />

                  {/* Overlaid Badge */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-[#0B0D12]/85 backdrop-blur-md border border-white/15">
                    <span className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-white/60 block">
                      Student Community
                    </span>
                    <p className="mt-1 font-serif text-[1rem] font-medium text-white">
                      Empowering graduates with analytical rigor and engineering mastery.
                    </p>
                  </div>
                </div>

                {/* Decorative Frame Border Offset */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-2 rounded-xl border border-rule -z-10 pointer-events-none transform translate-x-2 translate-y-2"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
