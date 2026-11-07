"use client";

import * as React from "react";

/**
 * useScrollVisibility — intelligent scroll-based visibility for floating
 * navigation surfaces.
 *
 * Behaviour (Phase 1.3):
 *   • Visible on first paint.
 *   • Hides when the document scroll position INCREASES (scrolling down).
 *   • Reappears when the scroll position DECREASES (scrolling back up).
 *   • Always visible at the top of the document.
 *   • Hysteresis: movement is accumulated until it exceeds `threshold`, so
 *     small jitter never produces a show/hide flicker.
 *
 * Efficiency:
 *   • A single passive scroll listener, throttled through requestAnimationFrame
 *     so scroll handling never runs more than once per frame.
 *   • The listener is removed on unmount.
 *
 * Interaction safeguards — the caller passes `pinned` when the user is
 * interacting with the navigation (pointer over it, keyboard focus inside it,
 * or a menu is open). Pinned surfaces are always visible.
 */
export function useScrollVisibility({
  threshold = 14,
  topOffset = 8,
  pinned = false,
}: {
  /** Pixels of accumulated movement required before direction is committed. */
  threshold?: number;
  /** Scroll offset below which the surface is always visible. */
  topOffset?: number;
  /** Force the surface visible regardless of scroll direction. */
  pinned?: boolean;
} = {}) {
  const [hidden, setHidden] = React.useState(false);
  const lastYRef = React.useRef(0);
  const frameRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    lastYRef.current = window.scrollY;

    const onScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;

        const y = window.scrollY;
        const delta = y - lastYRef.current;

        // At the top of the document the navigation is always shown.
        if (y <= topOffset) {
          lastYRef.current = y;
          setHidden(false);
          return;
        }

        // Hysteresis — ignore movement below the threshold.
        if (Math.abs(delta) < threshold) return;

        lastYRef.current = y;
        setHidden(delta > 0);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [threshold, topOffset]);

  // A pinned surface (menu open / pointer / focus inside) is always visible.
  React.useEffect(() => {
    if (pinned) setHidden(false);
  }, [pinned]);

  return pinned ? false : hidden;
}
