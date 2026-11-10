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
 * SiteHeader — floating glass navigation as the PRIMARY navigation.
 *
 * Phase 2+3:
 *   • Removed the static identity header entirely.
 *   • The floating glass pill is now the ONLY top navigation on desktop.
 *   • An isolated "Admin Login" button sits to the right of the pill,
 *     visually secondary and clearly separate from the main navigation.
 *   • Both hide on scroll-down and return on scroll-up (with hysteresis).
 *   • The reserved space stays constant so no layout shift occurs.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const [navHovered, setNavHovered] = React.useState(false);
  const [navFocusWithin, setNavFocusWithin] = React.useState(false);
  const [adminHovered, setAdminHovered] = React.useState(false);
  const [adminFocusWithin, setAdminFocusWithin] = React.useState(false);

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

  // Admin login button uses its own visibility logic (pinned on hover/focus)
  const adminHidden = useScrollVisibility({
    pinned: adminHovered || adminFocusWithin,
  });

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* Floating glass navigation (desktop) — now the PRIMARY nav */}
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
            <div className="pointer-events-auto mx-auto flex items-center justify-between gap-4 max-w-[1320px]">
              {/* Main navigation pill */}
              <div className="w-fit">
                <div
                  className={cn(
                    "glass-nav relative rounded-full transition-colors duration-300 ease-editorial",
                    scrolled ? "glass-nav-scrolled bg-paper/[0.92]" : "bg-paper/[0.8]",
                  )}
                >
                  <div className="px-2 py-1.5">
                    <Nav items={primaryNavigation} orientation="horizontal" />
                  </div>
                </div>
              </div>

              {/* Isolated Admin Login — visually secondary, separate from main nav */}
              <div className="shrink-0">
                <div
                  className={cn(
                    "glass-nav relative rounded-full transition-colors duration-300 ease-editorial",
                    adminHidden ? "opacity-0 pointer-events-none" : "opacity-100",
                    scrolled
                      ? "glass-nav-scrolled bg-paper/[0.92]"
                      : "bg-paper/[0.72]",
                  )}
                  onPointerEnter={() => setAdminHovered(true)}
                  onPointerLeave={() => setAdminHovered(false)}
                  onFocusCapture={() => setAdminFocusWithin(true)}
                  onBlurCapture={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                      setAdminFocusWithin(false);
                    }
                  }}
                >
                  <Link
                    href="/admin"
                    className="inline-flex h-9 items-center rounded-full border border-rule-strong/60 px-3.5 font-sans text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-ink-muted transition-colors hover:border-ink hover:text-ink"
                    aria-label="Admin login"
                  >
                    Admin Login
                  </Link>
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

        Desktop: glass nav pill (~44px) + gap (12px) = ~56px at 640px, ~64px at 1024px+
      */}
      <div className="h-[var(--nav-offset)]" aria-hidden />

      <MobileBottomNav />
    </>
  );
}