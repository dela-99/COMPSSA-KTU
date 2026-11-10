"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavIcon, IconChevronDown } from "@/components/ui/icons";
import type { NavGroup } from "@/lib/navigation";

type Props = {
  items: NavGroup[];
  className?: string;
  onNavigate?: () => void;
  orientation?: "horizontal" | "vertical";
};

/**
 * Nav — the department's navigation surface.
 *
 * Horizontal (desktop glass bar):
 *   • A label link that navigates to the section index.
 *   • A disclosure button that opens the section's panel.
 *   • Panels are rounded glass rectangles with a fine border, a soft shadow,
 *     refined spacing and a subtle icon per destination — Reference 1.
 *   • Escape closes and returns focus to the trigger, outside clicks close,
 *     arrow keys move between destinations.
 *
 * Vertical: a plain stacked list used by the admin rail.
 */
export function Nav({
  items,
  className,
  onNavigate,
  orientation = "horizontal",
}: Props) {
  const pathname = usePathname();

  if (orientation === "vertical") {
    return (
      <nav className={cn("flex flex-col gap-1", className)} aria-label="Primary">
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
            const hasChildren = !!item.children?.length;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "block py-2 font-sans text-[0.9375rem] leading-snug text-ink transition-colors duration-150",
                    "hover:text-accent",
                    isActive && "text-accent font-medium"
                  )}
                >
                  {item.label}
                </Link>
                {hasChildren && (
                  <ul className="ml-4 border-l border-rule pl-3 mt-0.5 mb-1 space-y-1">
                    {item.children!.map((child) => {
                      const childActive = pathname === child.href;
                      return (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onNavigate}
                            className={cn(
                              "block py-1 font-sans text-[0.875rem] leading-snug text-ink-muted transition-colors duration-150",
                              "hover:text-ink",
                              childActive && "text-accent font-medium"
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  // Desktop Horizontal Navigation
  return (
    <nav
      className={cn("flex items-center gap-0.5 xl:gap-1.5", className)}
      aria-label="Primary"
    >
      <ul className="flex items-center gap-0.5 xl:gap-1.5">
        {items.map((item, index) => (
          <DesktopNavItem
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={onNavigate}
            alignRight={index === items.length - 1}
          />
        ))}
      </ul>
    </nav>
  );
}

function DesktopNavItem({
  item,
  pathname,
  onNavigate,
  alignRight = false,
}: {
  item: NavGroup;
  pathname: string;
  onNavigate?: () => void;
  alignRight?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const closeTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const navRef = React.useRef<HTMLLIElement>(null);

  const panelId = `nav-panel-${item.label.toLowerCase().replace(/\s+/g, "-")}`;

  const isActive =
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(item.href + "/")) ||
    item.children?.some((c) => pathname === c.href.split("#")[0]);

  const hasChildren = !!item.children?.length;
  /** "More" has no page of its own — it is a menu trigger only. */
  const isMenuOnly = item.href === "#";

  // Close the panel whenever the route changes.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close when focus or a pointer leaves the whole item.
  React.useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  React.useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const openNow = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpen(true);
  };

  const closeSoon = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpen(false), 140);
  };

  const closeAndRestore = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" && hasChildren) {
      event.preventDefault();
      setOpen(true);
      // Focus the first destination once the panel is visible.
      window.requestAnimationFrame(() => {
        panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
      });
    }
    if (event.key === "Escape" && open) {
      event.preventDefault();
      closeAndRestore();
    }
  };

  const onPanelKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeAndRestore();
      return;
    }
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    const links = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>("a[href]") ?? [],
    );
    if (links.length === 0) return;

    const index = links.indexOf(document.activeElement as HTMLElement);
    event.preventDefault();
    const next =
      event.key === "ArrowDown"
        ? (index + 1) % links.length
        : (index - 1 + links.length) % links.length;
    links[next]?.focus();
  };

  const triggerClasses = cn(
    "relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1.5 font-sans text-[0.8125rem] transition-colors duration-150 xl:px-3 xl:text-[0.875rem]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dept-blue focus-visible:ring-offset-2",
    "after:absolute after:bottom-0.5 after:left-2.5 after:right-2.5 after:h-px after:bg-accent after:opacity-0 after:transition-opacity after:duration-150",
    isActive || open
      ? "text-ink font-semibold after:opacity-100"
      : "text-ink-soft/90 hover:bg-paper-warm/70 hover:text-ink",
  );

  return (
    <li
      ref={navRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse" && hasChildren && !isMenuOnly) openNow();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse" && hasChildren && !isMenuOnly) closeSoon();
      }}
    >
      {isMenuOnly ? (
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-haspopup="true"
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          onKeyDown={onTriggerKeyDown}
          className={triggerClasses}
        >
          <span>{item.label}</span>
          <IconChevronDown
            className={cn(
              "h-3 w-3 text-ink-subtle transition-transform duration-200",
              open && "rotate-180",
            )}
          />
        </button>
      ) : (
        <>
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={triggerClasses}
          >
            <span>{item.label}</span>
          </Link>
          {hasChildren && (
            <button
              ref={triggerRef}
              type="button"
              aria-expanded={open}
              aria-haspopup="true"
              aria-controls={panelId}
              onClick={() => setOpen((v) => !v)}
              onKeyDown={onTriggerKeyDown}
              className="-ml-1 inline-flex h-6 w-5 items-center justify-center rounded-full text-ink-subtle transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dept-blue"
            >
              <span className="sr-only">{`Show ${item.label} section`}</span>
              <IconChevronDown
                className={cn(
                  "h-3 w-3 transition-transform duration-200",
                  open && "rotate-180",
                )}
              />
            </button>
          )}
        </>
      )}

      {/* Dropdown panel */}
      {hasChildren && (
        <div
          ref={panelRef}
          id={panelId}
          role="group"
          aria-label={item.label}
          data-state={open ? "open" : "closed"}
          onKeyDown={onPanelKeyDown}
          className={cn(
            "panel-reveal absolute top-full z-50 mt-2 w-64",
            alignRight ? "right-0" : "left-0",
            open
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-1.5 opacity-0 pointer-events-none",
          )}
        >
          <div className="glass-panel rounded-2xl bg-paper/[0.94] p-2">
            <ul className="space-y-0.5">
              {item.children!.map((child) => {
                const isChildActive = pathname === child.href.split("#")[0];
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      aria-current={isChildActive ? "page" : undefined}
                      onClick={() => {
                        setOpen(false);
                        onNavigate?.();
                      }}
                      className={cn(
                        "group/item flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dept-blue",
                        isChildActive
                          ? "bg-paper-warm text-accent"
                          : "text-ink-soft hover:bg-paper-warm hover:text-ink",
                      )}
                    >
                      {child.icon && (
                        <span
                          className={cn(
                            "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-150",
                            isChildActive
                              ? "bg-accent/10 text-accent"
                              : "bg-paper-warm text-ink-subtle group-hover/item:text-ink",
                          )}
                          aria-hidden
                        >
                          <NavIcon name={child.icon} className="h-4 w-4" />
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block font-sans text-[0.875rem] font-medium leading-snug">
                          {child.label}
                        </span>
                        {child.description && (
                          <span className="mt-0.5 block font-sans text-[0.75rem] leading-snug text-ink-subtle line-clamp-2">
                            {child.description}
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
      )}
    </li>
  );
}
