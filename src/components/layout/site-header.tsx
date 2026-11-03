"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { primaryNavigation } from "@/lib/navigation";
import { Nav } from "./nav";
import { MobileNav } from "./mobile-nav";
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
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu if the viewport grows past the desktop breakpoint,
  // otherwise the scroll lock would stay applied with no visible trigger.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
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
                <div className="hidden items-center gap-1 text-ink-subtle xl:flex">
                  <SocialDot href="https://github.com" label="GitHub" icon="github" />
                  <SocialDot href="https://linkedin.com" label="LinkedIn" icon="linkedin" />
                  <SocialDot href="https://twitter.com" label="Twitter" icon="x" />
                </div>

                <Link
                  href="/admin"
                  className="hidden h-8 items-center rounded-full border border-rule-strong/70 px-3 font-sans text-[0.7rem] font-medium uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-ink hover:text-ink sm:inline-flex"
                >
                  Portal
                </Link>

                <button
                  type="button"
                  id="mobile-menu-trigger"
                  onClick={() => setOpen(true)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-rule-strong/70 px-3 font-sans text-[0.8125rem] font-medium text-ink transition-colors hover:border-ink hover:text-accent lg:hidden"
                  aria-label="Open menu"
                  aria-expanded={open}
                  aria-controls="mobile-menu"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  <span>Menu</span>
                </button>
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

      <MobileNav
        items={primaryNavigation}
        open={open}
        onClose={() => setOpen(false)}
      />
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

function SocialDot({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: "github" | "linkedin" | "x";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-rule bg-paper-warm text-ink-muted transition-colors hover:border-rule-strong hover:bg-paper hover:text-ink"
      aria-label={label}
    >
      {icon === "github" && (
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden>
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )}
      {icon === "linkedin" && (
        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden>
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
        </svg>
      )}
      {icon === "x" && (
        <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )}
    </a>
  );
}
