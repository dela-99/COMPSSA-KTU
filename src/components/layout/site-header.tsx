"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { primaryNavigation } from "@/lib/navigation";
import { Nav } from "./nav";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";
import { cn } from "@/lib/utils";

/**
 * SiteHeader — the department identity bar.
 *
 * Two deliberately separate responsibilities (Phase 1.1):
 *
 *   1. THIS BAR — identity only. Crest, department name, faculty label and
 *      the Portal button. Plain editorial paper with a hairline rule: no
 *      glass, no navigation links, no social icons. It establishes who the
 *      department is without competing with the navigation.
 *
 *   2. THE NAVIGATION — the floating glass bar (desktop, directly beneath
 *      this one) and the floating glass dock (mobile, pinned to the bottom
 *      edge). Both read the same destination set, so the information
 *      architecture is identical at every breakpoint.
 *
 * The glass bar hides on scroll-down and returns on scroll-up. The space it
 * occupies stays reserved, so nothing on the page ever shifts.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [navHovered, setNavHovered] = React.useState(false);
  const [navFocusWithin, setNavFocusWithin] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The glass bar stays put while the pointer is on it, while it holds
  // keyboard focus, and while one of its panels is open.
  const navHidden = useScrollVisibility({
    pinned: navHovered || navFocusWithin,
  });

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* 1 — Identity bar. Plain paper, hairline rule, no glass. */}
        <div className="border-b border-rule bg-paper">
          <div className="mx-auto flex h-14 max-w-[1320px] items-center justify-between gap-4 px-5 sm:h-16 sm:px-6 lg:px-10">
            <Link
              href="/"
              className="group flex min-w-0 items-center gap-2.5 sm:gap-3"
              aria-label={`${siteConfig.name} — home`}
            >
              <CrestMark />
              <span className="flex min-w-0 flex-col leading-tight">
                <span className="truncate font-serif text-[0.95rem] font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-[1.0625rem]">
                  {siteConfig.shortName}
                </span>
                <span className="truncate font-sans text-[0.6rem] uppercase tracking-[0.16em] text-ink-subtle sm:text-[0.7rem]">
                  Faculty of Science
                </span>
              </span>
            </Link>

            {/* Portal — the only action in the identity bar. */}
            <Link
              href="/admin"
              className="inline-flex h-8 shrink-0 items-center rounded-full border border-rule-strong/70 px-3 font-sans text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-ink hover:text-ink sm:px-4"
            >
              Portal
            </Link>
          </div>
        </div>

        {/* 2 — Floating glass navigation (desktop). */}
        <div
          className="nav-visibility nav-float pointer-events-none hidden lg:block"
          data-visible={navHidden ? "false" : "true"}
          onPointerEnter={() => setNavHovered(true)}
          onPointerLeave={() => setNavHovered(false)}
          onFocusCapture={() => setNavFocusWithin(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setNavFocusWithin(false);
            }
          }}
        >
          <div className="px-5 pt-3 lg:px-6">
            <div className="pointer-events-auto mx-auto w-fit max-w-full">
              <div
                className={cn(
                  "glass-nav relative rounded-full transition-colors duration-300 ease-editorial",
                  scrolled ? "glass-nav-scrolled bg-paper/[0.88]" : "bg-paper/[0.72]",
                )}
              >
                <div className="px-2 py-1.5">
                  <Nav items={primaryNavigation} orientation="horizontal" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/*
        Reserves the height the fixed chrome occupies so page content is never
        pushed underneath it. The space stays reserved whether the navigation
        is shown or hidden, so hiding it never shifts the page.
      */}
      <div className="h-[var(--nav-offset)]" aria-hidden />

      <MobileBottomNav />
    </>
  );
}

function CrestMark() {
  return (
    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-ink bg-ink text-paper shadow-sm transition-transform duration-200 group-hover:scale-105">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-paper"
        aria-hidden
      >
        {/* Heraldic wreath / laurel styling */}
        <path d="M12 2L4 7v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V7l-8-5z" />
        <path d="M12 7v8" />
        <path d="M9 11l3-3 3 3" />
      </svg>
    </div>
  );
}
