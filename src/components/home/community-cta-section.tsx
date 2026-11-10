import * as React from "react";
import Link from "next/link";
import { Container, Eyebrow, Reveal, Button } from "@/components/ui";
import { programmes } from "@/data";

/**
 * CommunityCTASection — Academic highlights and community resources connecting into the footer.
 */
export function CommunityCTASection() {
  return (
    <section className="relative border-t border-rule bg-paper text-ink py-20 sm:py-24 overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <Eyebrow className="text-ink/70">
                Academic Excellence & Student Community
              </Eyebrow>
            </Reveal>

            <Reveal delay={200}>
              <h2 className="mt-3 font-serif text-[2.25rem] sm:text-[3rem] font-medium leading-tight text-ink max-w-[20ch]">
                Shaping the future of computing, one graduate at a time.
              </h2>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-4 font-serif text-[1.0625rem] leading-relaxed text-ink/80 max-w-[58ch]">
                Explore our comprehensive degree pathways, browse historical examination papers, or connect with our active student executive council.
              </p>
            </Reveal>

            {/* Quick Badges / Links */}
            <Reveal delay={400}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href="/academics/programmes"
                  size="md"
                  className="bg-dept-blue text-white hover:bg-dept-blue/90 border-dept-blue font-medium"
                >
                  Explore Programmes ({programmes.length})
                </Button>
                <Button
                  href="/past-questions"
                  size="md"
                  variant="secondary"
                  className="bg-transparent text-ink border-rule-strong hover:bg-white/50 hover:border-dept-blue"
                >
                  Past Questions Archive
                </Button>
                <Button
                  href="/people/executives"
                  size="md"
                  variant="ghost"
                  className="text-ink/80 hover:text-dept-blue hover:bg-white/50"
                >
                  Executive Council →
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Highlight Box */}
          <div className="lg:col-span-4">
            <Reveal delay={300} direction="left">
              <div className="rounded-xl border border-rule bg-white/50 p-6 sm:p-7">
                <span className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.14em] text-ink block">
                  Quick Access
                </span>
                <ul className="mt-4 space-y-3 font-sans text-[0.875rem] text-ink/80">
                  <li className="flex items-center justify-between border-b border-rule pb-2">
                    <Link href="/academics/courses" className="hover:text-dept-blue transition-colors">
                      Course Directory
                    </Link>
                    <span className="text-ink/50">→</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-rule pb-2">
                    <Link href="/people/staff" className="hover:text-dept-blue transition-colors">
                      Faculty & Staff List
                    </Link>
                    <span className="text-ink/50">→</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-rule pb-2">
                    <Link href="/people/hod" className="hover:text-dept-blue transition-colors">
                      Head of Department
                    </Link>
                    <span className="text-ink/50">→</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-rule pb-2">
                    <Link href="/gallery" className="hover:text-dept-blue transition-colors">
                      Department Photo Gallery
                    </Link>
                    <span className="text-ink/50">→</span>
                  </li>
                  <li className="flex items-center justify-between pt-1">
                    <Link href="/feedback" className="hover:text-dept-blue transition-colors">
                      Student Feedback & Inquiries
                    </Link>
                    <span className="text-ink/50">→</span>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
