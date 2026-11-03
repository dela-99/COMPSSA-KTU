import * as React from "react";
import Link from "next/link";
import { Container, Reveal } from "@/components/ui";
import { siteConfig } from "@/lib/site";

type FeatureCardItem = {
  icon: "scholarship" | "campus" | "programs";
  title: string;
  subtitle: string;
  description: string;
  href: string;
};

const featureCards: FeatureCardItem[] = [
  {
    icon: "scholarship",
    title: "PROGRAMMES",
    subtitle: "Undergraduate & Postgraduate",
    description: "Four accredited computing degrees spanning software engineering, systems, and theoretical foundations.",
    href: "/academics/programmes",
  },
  {
    icon: "campus",
    title: "OUR LABS & RESEARCH",
    subtitle: "State-of-the-art Facilities",
    description: "Cutting-edge computing laboratories, AI systems group, distributed systems research and student projects.",
    href: "/research",
  },
  {
    icon: "programs",
    title: "PAST QUESTIONS & ARCHIVE",
    subtitle: "Academic Exam Repository",
    description: "Complete searchable archive of end-of-semester examination papers organized by course and level.",
    href: "/past-questions",
  },
];

export function HeroSection() {
  return (
    // The negative offset lets this section slide underneath the floating
    // glass navigation bar, so the blur reads the campus image through it.
    // The matching top padding keeps the hero content clear of the bar.
    <section className="relative -mt-[var(--nav-offset)] bg-[#0E1117] text-white pt-[calc(4rem+var(--nav-offset))] pb-28 sm:pt-[calc(6rem+var(--nav-offset))] sm:pb-36 overflow-hidden">
      {/* Background Campus/Architecture Graphic with Atmospheric Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />
        {/* Editorial gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D13]/90 via-[#0B0D13]/70 to-[#0B0D13]" />
        {/* Subtle grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <Container size="wide" className="relative z-10">
        {/* Top Centered Heraldic Emblem */}
        <div className="flex flex-col items-center text-center">
          <Reveal delay={100}>
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-3">
                {/* Wreath Emblem */}
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full text-white/90 drop-shadow-md"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="50" cy="50" r="42" stroke="white" strokeOpacity="0.4" strokeDasharray="3 3" />
                  {/* Laurel Wreath */}
                  <path
                    d="M30,70 C22,50 25,30 50,20 C75,30 78,50 70,70"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path d="M40,65 L50,45 L60,65" stroke="white" strokeWidth="2" />
                  <path d="M45,55 L55,55" stroke="white" strokeWidth="2" />
                  {/* Crown / Cap symbol */}
                  <path d="M42,28 L50,22 L58,28 L50,33 Z" fill="white" fillOpacity="0.8" />
                </svg>
              </div>

              <span className="font-sans text-[0.7rem] sm:text-[0.75rem] font-semibold uppercase tracking-[0.24em] text-white/70">
                Department of Computer Science
              </span>
            </div>
          </Reveal>

          {/* Large Editorial Headline */}
          <Reveal delay={200}>
            <h1 className="mt-4 font-serif text-[2.75rem] sm:text-[4rem] lg:text-[4.75rem] leading-[1.04] font-medium tracking-tight text-white max-w-[18ch] drop-shadow-sm">
              {siteConfig.shortName}
            </h1>
          </Reveal>

          <Reveal delay={300}>
            <p className="mt-3 font-sans text-[0.8125rem] sm:text-[0.9375rem] uppercase tracking-[0.22em] text-white/75 max-w-[40ch]">
              The Pursuit of Computing Excellence · Est. 19xx
            </p>
          </Reveal>
        </div>

        {/* Floating Feature Cards (Overlapping Lower Hero) */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {featureCards.map((card, idx) => (
            <Reveal key={card.title} delay={350 + idx * 100}>
              <Link
                href={card.href}
                className="group relative flex flex-col h-full bg-[#161B22]/85 hover:bg-[#1E242E] backdrop-blur-md border border-white/10 hover:border-white/25 rounded-lg p-6 sm:p-7 transition-all duration-300 shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-white/5 border border-white/10 text-white shrink-0 group-hover:scale-105 group-hover:bg-white/10 transition-all">
                    {card.icon === "scholarship" && (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    )}
                    {card.icon === "campus" && (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )}
                    {card.icon === "programs" && (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>

                  <div className="flex-1">
                    <span className="block font-sans text-[0.75rem] font-bold uppercase tracking-[0.14em] text-white/80 group-hover:text-white">
                      {card.title}
                    </span>
                    <span className="block text-[0.8125rem] text-white/50 font-serif mt-0.5">
                      {card.subtitle}
                    </span>
                  </div>
                </div>

                <p className="mt-4 font-sans text-[0.875rem] leading-relaxed text-white/70 flex-1">
                  {card.description}
                </p>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[0.8125rem] text-white/60 group-hover:text-white transition-colors">
                  <span>Explore detail</span>
                  <span>→</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Centered Scroll Indicator */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-white/20 text-white/60 animate-bounce">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
}
