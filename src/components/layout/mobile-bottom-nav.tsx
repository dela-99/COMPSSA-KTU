"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { primaryNavigation } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

/**
 * MobileBottomNav — persistent floating bottom dock for mobile.
 *
 * Five primary destinations: Home, Academics, People, Library, More.
 * When "More" is tapped, an expandable glass panel opens ABOVE the dock.
 *
 * Uses the same liquid-glass styling as the desktop navbar.
 * Respects safe-area insets, has accessible touch targets (min 44x44px),
 * maintains active states, and supports keyboard/Escape/outside-click dismissal.
 */

type DockItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  isMore?: boolean;
};

type MoreItem = {
  label: string;
  href: string;
};

const DOCK_ITEMS: DockItem[] = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Academics", href: "/academics", icon: BookIcon },
  { label: "People", href: "/people", icon: UsersIcon },
  { label: "Library", href: "/library", icon: LibraryIcon },
  { label: "More", href: "#", icon: MoreIcon, isMore: true },
];

const MORE_ITEMS: MoreItem[] = [
  { label: "About", href: "/about" },
  { label: "Students", href: "/students" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
  { label: "Portal", href: "/admin" },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const moreButtonRef = React.useRef<HTMLButtonElement>(null);
  const restoreFocusRef = React.useRef(false);

  // Close panel on route change
  React.useEffect(() => {
    if (moreOpen) setMoreOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll when panel is open
  React.useEffect(() => {
    if (!moreOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [moreOpen]);

  // Focus management
  React.useEffect(() => {
    if (moreOpen) {
      moreButtonRef.current?.focus();
      return;
    }
    if (restoreFocusRef.current) {
      restoreFocusRef.current = false;
      moreButtonRef.current?.focus();
    }
  }, [moreOpen]);

  // Escape + Tab trapping
  React.useEffect(() => {
    if (!moreOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        restoreFocusRef.current = true;
        setMoreOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [moreOpen]);

  const dismiss = () => {
    restoreFocusRef.current = true;
    setMoreOpen(false);
  };

  const isHome = pathname === "/";
  const isAcademics = pathname.startsWith("/academics");
  const isPeople = pathname.startsWith("/people");
  const isLibrary = pathname.startsWith("/library");
  const isEvents = pathname.startsWith("/events");

  return (
    <>
      {/* Scrim */}
      <div
        onClick={dismiss}
        className={cn(
          "fixed inset-0 z-[55] lg:hidden transition-opacity duration-200 ease-editorial bg-ink/35 backdrop-blur-[2px]",
          moreOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        aria-hidden="true"
      />

      {/* Bottom Dock */}
      <nav
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[60] lg:hidden",
          "safe-area-inset-bottom",
        )}
      >
        <div className="mx-auto max-w-[1280px] px-2 pb-2">
          <div className="glass-panel relative flex items-center justify-around gap-1 rounded-full bg-paper/[0.92] p-1.5 shadow-xl border border-rule/90">
            {DOCK_ITEMS.map((item) => {
              const Icon = item.icon;
              let isActive = false;
              if (item.isMore) {
                isActive = moreOpen;
              } else if (item.href === "/") {
                isActive = isHome;
              } else if (item.href === "/academics") {
                isActive = isAcademics;
              } else if (item.href === "/people") {
                isActive = isPeople;
              } else if (item.href === "/library") {
                isActive = isLibrary;
              } else if (item.href === "/events") {
                isActive = isEvents;
              }

              if (item.isMore) {
                return (
                  <button
                    ref={moreButtonRef}
                    key={item.label}
                    type="button"
                    onClick={() => setMoreOpen(!moreOpen)}
                    aria-expanded={moreOpen}
                    aria-controls="more-panel"
                    aria-label={moreOpen ? "Close more options" : "More options"}
                    className={cn(
                      "relative flex flex-col items-center gap-1 rounded-full p-2 min-w-[56px] min-h-[56px] transition-colors duration-150",
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-ink-muted hover:bg-paper-warm/70 hover:text-ink",
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                    <span className="font-sans text-[0.625rem] uppercase tracking-[0.1em] leading-none">
                      {item.label}
                    </span>
                  </button>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative flex flex-col items-center gap-1 rounded-full p-2 min-w-[56px] min-h-[56px] transition-colors duration-150",
                    isActive
                      ? "bg-accent/10 text-accent"
                      : "text-ink-muted hover:bg-paper-warm/70 hover:text-ink",
                  )}
                >
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="font-sans text-[0.625rem] uppercase tracking-[0.1em] leading-none">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* More Panel — opens ABOVE the dock */}
        <div
          ref={panelRef}
          id="more-panel"
          role="dialog"
          aria-modal="true"
          aria-label="More navigation options"
          data-state={moreOpen ? "open" : "closed"}
          className={cn(
            "mobile-panel glass-panel absolute bottom-full left-2 right-2 mx-auto mb-2 max-w-[1280px] rounded-2xl bg-paper/[0.96] p-3 shadow-2xl border border-rule/90",
            "transition-opacity duration-200 ease-editorial transition-transform duration-200 cubic-bezier(0.2,0.7,0.2,1) transition-visibility",
            moreOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-2 opacity-0 pointer-events-none",
          )}
        >
          <div className="flex items-center justify-between border-b border-rule px-2 py-2.5">
            <span className="font-sans text-[0.7rem] uppercase tracking-[0.14em] text-ink-subtle">
              More
            </span>
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex h-8 items-center rounded-full border border-rule px-3 font-sans text-[0.8125rem] text-ink-muted transition-colors hover:border-ink hover:text-ink"
              aria-label="Close"
            >
              Close
            </button>
          </div>

          <div className="py-2 space-y-1">
            {MORE_ITEMS.map((item) => {
              let isActive = false;
              if (item.href === "/about") isActive = pathname.startsWith("/about");
              else if (item.href === "/students") isActive = pathname.startsWith("/students");
              else if (item.href === "/events") isActive = pathname.startsWith("/events");
              else if (item.href === "/contact") isActive = pathname.startsWith("/contact");
              else if (item.href === "/admin") isActive = pathname.startsWith("/admin");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={dismiss}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 font-sans text-[0.9375rem] transition-colors duration-150",
                    isActive
                      ? "bg-paper-warm text-accent font-medium"
                      : "text-ink hover:bg-paper-warm/50",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

// Icon components
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  );
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function LibraryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  );
}

function MoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}