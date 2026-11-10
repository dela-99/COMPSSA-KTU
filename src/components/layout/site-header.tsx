"use client";

import * as React from "react";
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
 *   • The primary pill is centred relative to the viewport.
 *   • It hides on scroll-down and returns on scroll-up (with hysteresis).
 *   • The reserved space stays constant so no layout shift occurs.
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
            <div className="pointer-events-none relative mx-auto h-11 max-w-[1320px]">
              {/* Viewport-centred pill with no neighboring control to shift it. */}
              <div
                className="pointer-events-auto absolute left-1/2 top-0 w-max -translate-x-1/2"
              >
                <div
                  className={cn(
                    "glass-nav glass-nav-surface relative rounded-full transition-colors duration-300 ease-editorial",
                    scrolled && "glass-nav-scrolled",
                  )}
                >
                  <div className="px-2 py-1.5">
                    <Nav items={primaryNavigation} orientation="horizontal" />
                  </div>
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
