import * as React from "react";
import Link from "next/link";
import { Container, Reveal } from "@/components/ui";
import { news } from "@/data";
import { EventCalendarWidget } from "./event-calendar-widget";
import { formatShortDate } from "@/lib/utils";

/**
 * NewsBentoSection — Dynamic, image-rich editorial bento grid matching the blueprint layout.
 * Integrates news cards, monthly interactive calendar, announcement pill, and community join CTA.
 */
export function NewsBentoSection() {
  const featured = news[0];
  const secondary = news[1];
  const tertiary = news[2];

  // Curated editorial images for the news cards
  const cardImages = {
    featured: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    secondary: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
    tertiary: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
  };

  return (
    <section className="relative bg-[#0F141C] text-white py-20 sm:py-28 overflow-hidden">
      {/* Background Campus Graphic with Scrim */}
      <div className="absolute inset-0 z-0 opacity-25">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1920&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-[#0F141C]/85" />
      </div>

      <Container size="wide" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/15 pb-6">
          <Reveal>
            <div className="flex items-center gap-3">
              <span className="inline-block w-3.5 h-3.5 rounded-full bg-[#2563EB] shadow-md shadow-blue-500/50" />
              <h2 className="font-serif text-[2.25rem] sm:text-[2.75rem] font-medium tracking-tight text-white">
                News & Updates.
              </h2>
            </div>
            <p className="mt-2 font-sans text-[0.875rem] text-white/60 tracking-wide">
              Communication Center · Stories, achievements, research developments, and departmental events.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 font-sans text-[0.875rem] text-white/80 hover:text-white transition-colors"
            >
              <span>View all news</span>
              <span>→</span>
            </Link>
          </Reveal>
        </div>

        {/* Bento Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left & Center: 8 Columns for News Cards Grid */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Top Large Featured Card */}
            {featured && (
              <Reveal delay={100}>
                <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-[#161D27] min-h-[300px] sm:min-h-[340px] flex flex-col justify-end p-6 sm:p-8 shadow-2xl transition-all duration-300 hover:border-white/30">
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-45"
                    style={{ backgroundImage: `url('${cardImages.featured}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F16] via-[#0B0F16]/60 to-transparent" />

                  {/* Content */}
                  <div className="relative z-10 max-w-[50ch]">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-2.5 py-1 rounded-full text-[0.6875rem] font-sans font-bold uppercase tracking-[0.14em] bg-[#2563EB] text-white">
                        {featured.tag ?? "Announcement"}
                      </span>
                      <span className="font-sans text-[0.75rem] uppercase tracking-[0.12em] text-white/70">
                        {formatShortDate(featured.publishedAt, true)}
                      </span>
                    </div>

                    <h3 className="font-serif text-[1.5rem] sm:text-[1.875rem] font-semibold leading-tight text-white text-balance group-hover:text-blue-200 transition-colors">
                      {featured.title}
                    </h3>

                    <p className="mt-2.5 font-sans text-[0.9375rem] leading-relaxed text-white/80 line-clamp-2">
                      {featured.excerpt}
                    </p>

                    <div className="mt-5">
                      <Link
                        href={`/news/${featured.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#2563EB] hover:bg-blue-600 text-white font-sans text-[0.8125rem] font-semibold tracking-wide shadow-lg shadow-blue-900/40 transition-all hover:gap-3"
                      >
                        <span>READ MORE</span>
                        <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            )}

            {/* Bottom 2-Card Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Secondary Card */}
              {secondary && (
                <Reveal delay={200}>
                  <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-[#161D27] min-h-[320px] flex flex-col justify-end p-6 shadow-xl transition-all duration-300 hover:border-white/30">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-40"
                      style={{ backgroundImage: `url('${cardImages.secondary}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F16] via-[#0B0F16]/70 to-transparent" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[0.625rem] font-sans font-bold uppercase tracking-[0.12em] bg-white/15 text-white">
                          {secondary.tag ?? "Research"}
                        </span>
                        <span className="font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-white/60">
                          {formatShortDate(secondary.publishedAt)}
                        </span>
                      </div>

                      <h4 className="font-serif text-[1.1875rem] font-semibold leading-snug text-white group-hover:text-blue-200 transition-colors">
                        {secondary.title}
                      </h4>

                      <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-white/70 line-clamp-2">
                        {secondary.excerpt}
                      </p>

                      <div className="mt-4">
                        <Link
                          href={`/news/${secondary.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-[#2563EB] text-white font-sans text-[0.75rem] font-medium transition-all"
                        >
                          <span>READ MORE</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Tertiary Card */}
              {tertiary && (
                <Reveal delay={300}>
                  <div className="group relative rounded-2xl overflow-hidden border border-white/15 bg-[#161D27] min-h-[320px] flex flex-col justify-end p-6 shadow-xl transition-all duration-300 hover:border-white/30">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-40"
                      style={{ backgroundImage: `url('${cardImages.tertiary}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F16] via-[#0B0F16]/70 to-transparent" />

                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[0.625rem] font-sans font-bold uppercase tracking-[0.12em] bg-white/15 text-white">
                          {tertiary.tag ?? "Opportunity"}
                        </span>
                        <span className="font-sans text-[0.6875rem] uppercase tracking-[0.12em] text-white/60">
                          {formatShortDate(tertiary.publishedAt)}
                        </span>
                      </div>

                      <h4 className="font-serif text-[1.1875rem] font-semibold leading-snug text-white group-hover:text-blue-200 transition-colors">
                        {tertiary.title}
                      </h4>

                      <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-white/70 line-clamp-2">
                        {tertiary.excerpt}
                      </p>

                      <div className="mt-4">
                        <Link
                          href={`/news/${tertiary.slug}`}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-[#2563EB] text-white font-sans text-[0.75rem] font-medium transition-all"
                        >
                          <span>READ MORE</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          {/* Right Column: 4 Columns for Calendar, Spotlight & Join Card */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Top Bulletin / Spotlight Pill */}
            <Reveal delay={150}>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2563EB]/20 border border-[#2563EB]/40 flex items-center justify-center text-[#2563EB] shrink-0 font-serif font-bold text-sm">
                  CS
                </div>
                <div className="min-w-0 flex-1">
                  <span className="font-sans text-[0.6875rem] uppercase tracking-[0.14em] text-white/50 block">
                    Latest Bulletin
                  </span>
                  <p className="font-serif text-[0.875rem] font-medium text-white truncate">
                    Academic calendar & tutorial schedules live
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Interactive Calendar Widget */}
            <Reveal delay={250}>
              <EventCalendarWidget />
            </Reveal>

            {/* "Join Now | Welcoming New Members" Bright Blue / Accent Card */}
            <Reveal delay={350}>
              <div className="rounded-xl p-6 bg-[#2563EB] text-white shadow-xl relative overflow-hidden">
                {/* Decorative shape */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

                <span className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-white/80 font-bold block">
                  ADMISSIONS & COMMUNITY
                </span>

                <h4 className="mt-2 font-serif text-[1.375rem] font-semibold leading-tight text-white">
                  JOIN NOW! | Welcoming new students & members
                </h4>

                <p className="mt-2 font-sans text-[0.8125rem] leading-relaxed text-white/90">
                  Connect with the student executive council, explore academic mentorship, and join our computing societies.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Link
                    href="/students"
                    className="inline-flex items-center justify-center px-4 py-2 rounded bg-white text-ink hover:bg-white/90 font-sans text-[0.8125rem] font-semibold transition-all shadow-md"
                  >
                    Student Hub
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-4 py-2 rounded bg-black/20 hover:bg-black/30 border border-white/20 text-white font-sans text-[0.8125rem] font-medium transition-all"
                  >
                    Inquire
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
