"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/lib/navigation";

type Props = {
  items: NavGroup[];
  className?: string;
  onNavigate?: () => void;
  orientation?: "horizontal" | "vertical";
};

/**
 * Nav — Supports both desktop horizontal navigation with dropdowns
 * and vertical navigation for mobile sheets or sidebars.
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
        {items.map((item) => (
          <DesktopNavItem
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={onNavigate}
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
}: {
  item: NavGroup;
  pathname: string;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const isActive =
    pathname === item.href ||
    (item.href !== "/" && pathname.startsWith(item.href + "/")) ||
    item.children?.some((c) => pathname === c.href);

  const hasChildren = !!item.children?.length;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false), 150;
    });
  };

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "relative inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1.5 font-sans text-[0.8125rem] transition-colors duration-150 xl:px-2.5 xl:text-[0.875rem]",
          // Active indicator drawn as a pseudo-element so it never affects layout.
          "after:absolute after:bottom-0.5 after:left-2 after:right-2 after:h-px after:bg-accent after:opacity-0 after:transition-opacity after:duration-150 xl:after:left-2.5 xl:after:right-2.5",
          isActive
            ? "text-ink font-semibold after:opacity-100"
            : "text-ink-soft/90 hover:bg-paper-warm/70 hover:text-ink",
        )}
      >
        <span>{item.label}</span>
        {hasChildren && (
          <svg
            className={cn(
              "w-3 h-3 text-ink-subtle transition-transform duration-200",
              open && "rotate-180"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </Link>

      {/* Dropdown Menu */}
      {hasChildren && (
        <div
          className={cn(
            "absolute left-0 top-full pt-2 z-50 transition-all duration-200 transform origin-top",
            open
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          )}
        >
          <div className="glass-panel w-56 rounded-xl bg-paper/[0.94] p-2 space-y-1">
            {item.children!.map((child) => {
              const isChildActive = pathname === child.href;
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  aria-current={isChildActive ? "page" : undefined}
                  onClick={() => {
                    setOpen(false);
                    onNavigate?.();
                  }}
                  className={cn(
                    "block rounded-lg px-3 py-2 font-sans text-[0.875rem] transition-colors duration-150",
                    isChildActive
                      ? "bg-paper-warm text-accent font-medium"
                      : "text-ink-soft hover:bg-paper-warm hover:text-ink"
                  )}
                >
                  <span className="block font-medium">{child.label}</span>
                  {child.description && (
                    <span className="block text-[0.75rem] text-ink-subtle mt-0.5 line-clamp-1">
                      {child.description}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </li>
  );
}