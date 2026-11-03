"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/lib/navigation";

/**
 * MobileNav — floating glass menu that drops from the navigation bar.
 *
 * Consistent with the desktop bar: same glass surface, same tokens, same
 * typography. Keyboard accessible — Escape closes, focus moves into the
 * panel on open and returns to the trigger on close, and Tab is trapped
 * inside the panel while it is open.
 */
export function MobileNav({
  items,
  open,
  onClose,
}: {
  items: NavGroup[];
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const panelRef = React.useRef<HTMLDivElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  /** Only restore focus to the trigger when the user dismissed the menu
   *  themselves — not when a route change closed it. */
  const restoreFocusRef = React.useRef(false);

  // Close whenever the route changes while open.
  React.useEffect(() => {
    if (open) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll while open.
  React.useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Move focus into the panel on open; return it to the trigger on
  // user-initiated close.
  React.useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
      return;
    }
    if (restoreFocusRef.current) {
      restoreFocusRef.current = false;
      const trigger = document.getElementById("mobile-menu-trigger");
      trigger?.focus();
    }
  }, [open]);

  // Escape to close + keep Tab inside the panel while it is open.
  React.useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        restoreFocusRef.current = true;
        onClose();
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
  }, [open, onClose]);

  const dismiss = () => {
    restoreFocusRef.current = true;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" aria-hidden={!open}>
      {/* Scrim */}
      <div
        onClick={dismiss}
        className={cn(
          "absolute inset-0 bg-ink/35 backdrop-blur-[2px] transition-opacity duration-200 ease-editorial",
          open ? "opacity-100" : "opacity-0",
        )}
      />

      {/* Floating glass panel */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        data-state={open ? "open" : "closed"}
        className={cn(
          "mobile-panel glass-panel absolute inset-x-3 top-[var(--nav-offset)] mx-auto max-w-[560px] overflow-hidden rounded-2xl bg-paper/[0.94]",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0 pointer-events-none",
        )}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-3.5">
          <span className="font-sans text-[0.75rem] uppercase tracking-[0.14em] text-ink-subtle">
            Menu
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={dismiss}
            className="inline-flex h-8 items-center rounded-full border border-rule px-3 font-sans text-[0.8125rem] text-ink-muted transition-colors hover:border-ink hover:text-ink"
          >
            Close
          </button>
        </div>

        <div className="max-h-[calc(100dvh-var(--nav-offset)-4.5rem)] overflow-y-auto overscroll-contain px-5 py-4">
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.href} className="border-b border-rule last:border-b-0">
                <Link
                  href={item.href}
                  onClick={dismiss}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "block py-3 font-sans text-[1rem] text-ink transition-colors hover:text-accent",
                    pathname === item.href && "text-accent",
                  )}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-3 ml-3">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          onClick={dismiss}
                          aria-current={pathname === child.href ? "page" : undefined}
                          className="block py-1.5 font-sans text-[0.875rem] text-ink-muted transition-colors hover:text-ink"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="mt-4">
              <Link
                href="/admin"
                onClick={dismiss}
                className="block py-3 font-sans text-[0.875rem] text-ink-subtle transition-colors hover:text-ink"
              >
                Admin portal →
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
