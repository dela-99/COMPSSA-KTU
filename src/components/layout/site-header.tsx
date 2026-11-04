"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { primaryNavigation } from "@/lib/navigation";
import { Nav } from "./nav";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { cn } from "@/lib/utils";

/**
 * SiteHeader — floating liquid-glass navigation bar.
 *
 * Structure:  [ Department identity ] | [ Navigation links ] | [ Actions ]
 *
 * The bar is fixed and centred with a max-width, so it floats over the page
 * rather than occupying the full viewport width. Surface is translucent with a
 * backdrop blur, a hairline border and a restrained shadow; it uses the
 * department's existing tokens and typography.
 *
 * The ribbon/bookmark accent that previously lived here has been removed.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Floating navigation bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="pointer-events-auto mx-auto w-full max-w-[1280px]">
          <div
            className={cn(
              "glass-nav relative rounded-full transition-colors duration-300 ease-editorial",
              scrolled
                ? "glass-nav-scrolled bg-paper/[0.88]"
                : "bg-paper/[0.72]",
            )}
          >
            <div className="relative flex items-center justify-between gap-2 py-2 pl-3 pr-2 sm:gap-4 sm:pl-4 sm:pr-3">
              {/* Identity */}
              <Link
                href="/"
                className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
                aria-label={`${siteConfig.name} — home`}
              >
                <CrestMark />
                <div className="flex flex-col leading-tight">
                  <span className="font-serif text-[0.95rem] font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-[1.0625rem]">
                    {siteConfig.shortName}
                  </span>
                  <span className="font-sans text-[0.6rem] uppercase tracking-[0.16em] text-ink-subtle sm:text-[0.7rem]">
                    Faculty of Science
                  </span>
                </div>
              </Link>

              {/* Navigation */}
              <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
                <Nav items={primaryNavigation} orientation="horizontal" />
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <Link
                  href="/admin"
                  className="hidden h-8 items-center rounded-full border border-rule-strong/70 px-3 font-sans text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-ink hover:text-ink sm:inline-flex"
                >
                  Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
        Reserves the height the fixed bar occupies so page content is never
        pushed underneath it. Reserves space without reserving visual space:
        the bar floats over the page.
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
