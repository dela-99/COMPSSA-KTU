"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { dockNavigation } from "@/lib/navigation";
import { NavIcon, IconClose } from "@/components/ui/icons";
import { useScrollVisibility } from "@/hooks/use-scroll-visibility";

/**
 * MobileBottomNav — persistent floating bottom dock.
 *
 * Five destinations: Home, Academics, People, Library, More.
 * When "More" is tapped, an expandable glass panel opens ABOVE the dock.
 *
 * Craft notes (Phase 1.2 / 1.3):
 *   • The dock floats above the bottom edge and is horizontally centred.
 *   • Real safe-area insets are honoured on all four edges — the notch and
 *     the home indicator no longer overlap the dock.
 *   • Touch targets are at least 48×48px.
 *   • It hides while scrolling up and returns while scrolling down or after
 *     scrolling stops, with hysteresis to avoid jitter.
 *   • It stays visible while it is being interacted with, while the More
 *     panel is open, while it holds keyboard focus, at the top of the page,
 *     and at the very end of the document.
 *   • The space it occupies stays reserved, so nothing on the page shifts.
 */

/** Matches a route (and its descendants) against a navigation href. */
function isRouteActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [focusWithin, setFocusWithin] = React.useState(false);

  const panelRef = React.useRef<HTMLDivElement>(null);
  const moreButtonRef = React.useRef<HTMLButtonElement>(null);
  const restoreFocusRef = React.useRef(false);

  // Close the panel whenever the route changes.
  React.useEffect(() => {
    if (moreOpen) setMoreOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock the page behind the panel while it is open.
  React.useEffect(() => {
    if (!moreOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [moreOpen]);

  // Move focus into the panel on open; return it to the trigger on close.
  React.useEffect(() => {
    if (moreOpen) {
      const first = panelRef.current?.querySelector<HTMLElement>("a[href]");
      first?.focus();
      return;
    }
    if (restoreFocusRef.current) {
      restoreFocusRef.current = false;
      moreButtonRef.current?.focus();
    }
  }, [moreOpen]);

  // Escape dismisses, Tab is trapped inside the panel while it is open.
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

  // The dock must not disappear while the user is using it.
  const hidden = useScrollVisibility({
    hideDirection: "up",
    showAfterIdleMs: 500,
    threshold: 18,
    pinned: moreOpen || hovered || focusWithin,
  });

  const dismiss = () => {
    restoreFocusRef.current = true;
    setMoreOpen(false);
  };

  const moreItem = dockNavigation.find((item) => item.href === "#");
  const directItems = dockNavigation.filter((item) => item.href !== "#");
  const moreRouteActive = Boolean(
    moreItem?.children?.some((item) =>
      isRouteActive(pathname, item.href.split("#")[0] ?? item.href),
    ),
  );

  // Active state resolution (Phase 6 fix):
  // - When More panel is open, ONLY More is highlighted (takes visual precedence)
  // - When More panel is closed, route-based active state applies
  const getItemActive = (href: string) => {
    if (moreOpen) return false; // No direct item is active when More is open
    return isRouteActive(pathname, href);
  };

  return (
    <>
      {/* Scrim — dismisses the panel on an outside click. */}
      <div
        onClick={dismiss}
        className={cn(
          "fixed inset-0 z-[55] transition-opacity duration-200 ease-editorial lg:hidden",
          moreOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        style={{ backgroundColor: "hsl(60 5% 4% / 0.32)" }}
        aria-hidden="true"
      />

      {/* Bottom dock */}
      <nav
        aria-label="Primary"
        className="nav-visibility nav-dock fixed inset-x-0 bottom-0 z-[60] lg:hidden"
        data-visible={hidden ? "false" : "true"}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocusWithin(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setFocusWithin(false);
          }
        }}
      >
        <div
          className="mx-auto w-full max-w-[520px]"
          style={{
            paddingLeft: "calc(0.75rem + env(safe-area-inset-left, 0px))",
            paddingRight: "calc(0.75rem + env(safe-area-inset-right, 0px))",
            paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <div className="glass-panel flex items-center justify-between gap-0.5 rounded-full bg-paper/[0.94] p-1.5">
            {directItems.map((item) => {
              const active = getItemActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-full px-1 py-1.5 transition-colors duration-150",
                    active
                      ? "bg-accent/10 text-accent"
                      : "text-ink-muted hover:bg-paper-warm/70 hover:text-ink",
                  )}
                >
                  <NavIcon name={item.icon ?? "more"} className="h-5 w-5" />
                  <span className="font-sans text-[0.625rem] uppercase leading-none tracking-[0.08em]">
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {moreItem && (
              <button
                ref={moreButtonRef}
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                aria-expanded={moreOpen}
                aria-controls="more-panel"
                aria-current={moreRouteActive && !moreOpen ? "page" : undefined}
                aria-label={moreOpen ? "Close more options" : "More options"}
                className={cn(
                  "flex min-h-12 flex-1 flex-col items-center justify-center gap-1 rounded-full px-1 py-1.5 transition-colors duration-150",
                  moreOpen || moreRouteActive
                    ? "bg-accent/10 text-accent"
                    : "text-ink-muted hover:bg-paper-warm/70 hover:text-ink",
                )}
              >
                <NavIcon name="more" className="h-5 w-5" />
                <span className="font-sans text-[0.625rem] uppercase leading-none tracking-[0.08em]">
                  More
                </span>
              </button>
            )}
          </div>
        </div>

        {/* More panel — opens ABOVE the dock (Reference 1). */}
        <div
          ref={panelRef}
          id="more-panel"
          role="dialog"
          aria-modal="true"
          aria-label="More navigation options"
          data-state={moreOpen ? "open" : "closed"}
          className={cn(
            "panel-reveal absolute bottom-full left-0 right-0 z-10 mx-auto mb-2 w-[calc(100%-1.5rem)] max-w-[420px] rounded-2xl",
            moreOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-2 opacity-0 pointer-events-none",
          )}
        >
          <div className="glass-panel max-h-[min(62dvh,440px)] overflow-y-auto overscroll-contain rounded-2xl bg-paper/[0.96] p-2">
            <div className="flex items-center justify-between px-3 pb-2 pt-2">
              <span className="font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ink-subtle">
                More
              </span>
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-ink-subtle transition-colors hover:bg-paper-warm hover:text-ink"
                aria-label="Close more options"
              >
                <IconClose className="h-3.5 w-3.5" />
              </button>
            </div>

            <ul className="space-y-0.5 pb-1">
              {moreItem?.children?.map((item) => {
                const active = isRouteActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={dismiss}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150",
                        active
                          ? "bg-paper-warm text-accent"
                          : "text-ink-soft hover:bg-paper-warm hover:text-ink",
                      )}
                    >
                      {item.icon && (
                        <span
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-150",
                            active
                              ? "bg-accent/10 text-accent"
                              : "bg-paper-warm text-ink-subtle",
                          )}
                          aria-hidden
                        >
                          <NavIcon name={item.icon} className="h-4 w-4" />
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block font-sans text-[0.9375rem] font-medium leading-snug">
                          {item.label}
                        </span>
                        {item.description && (
                          <span className="mt-0.5 block font-sans text-[0.75rem] leading-snug text-ink-subtle line-clamp-1">
                            {item.description}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
