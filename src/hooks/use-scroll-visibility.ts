"use client";

import * as React from "react";

type ScrollSubscriber = (y: number, delta: number) => void;

const scrollSubscribers = new Set<ScrollSubscriber>();
let sharedScrollFrame: number | null = null;
let sharedLastScrollY = 0;
let sharedScrollHandler: (() => void) | null = null;

/** Share one passive, frame-coalesced document scroll listener across navs. */
function subscribeToScroll(subscriber: ScrollSubscriber) {
  scrollSubscribers.add(subscriber);

  if (scrollSubscribers.size === 1) {
    sharedLastScrollY = window.scrollY;
    sharedScrollHandler = () => {
      if (sharedScrollFrame !== null) return;
      sharedScrollFrame = window.requestAnimationFrame(() => {
        sharedScrollFrame = null;
        const y = window.scrollY;
        const delta = y - sharedLastScrollY;
        sharedLastScrollY = y;
        for (const currentSubscriber of scrollSubscribers) {
          currentSubscriber(y, delta);
        }
      });
    };
    window.addEventListener("scroll", sharedScrollHandler, { passive: true });
  }

  return () => {
    scrollSubscribers.delete(subscriber);
    if (scrollSubscribers.size > 0 || !sharedScrollHandler) return;
    window.removeEventListener("scroll", sharedScrollHandler);
    sharedScrollHandler = null;
    if (sharedScrollFrame !== null) {
      window.cancelAnimationFrame(sharedScrollFrame);
      sharedScrollFrame = null;
    }
  };
}

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
 *   • All navigation surfaces share one passive listener and one animation
 *     frame callback, regardless of how many surfaces are mounted.
 *
 * Interaction safeguards — the caller passes `pinned` when the user is
 * interacting with the navigation (pointer over it, keyboard focus inside it,
 * or a menu is open). Pinned surfaces are always visible.
 */
export function useScrollVisibility({
  threshold = 14,
  topOffset = 8,
  pinned = false,
  hideDirection = "down",
  showAfterIdleMs = 0,
}: {
  /** Pixels of accumulated movement required before direction is committed. */
  threshold?: number;
  /** Scroll offset below which the surface is always visible. */
  topOffset?: number;
  /** Force the surface visible regardless of scroll direction. */
  pinned?: boolean;
  /** Direction that hides the surface. */
  hideDirection?: "up" | "down";
  /** Reveal the surface after scrolling stops. Disabled when zero. */
  showAfterIdleMs?: number;
} = {}) {
  const [hidden, setHidden] = React.useState(false);
  const accumulatedDeltaRef = React.useRef(0);
  const idleTimerRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const unsubscribe = subscribeToScroll((y, delta) => {
      if (showAfterIdleMs > 0) {
        if (idleTimerRef.current !== null) window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = window.setTimeout(() => {
          idleTimerRef.current = null;
          setHidden(false);
        }, showAfterIdleMs);
      }

      if (pinned) {
        setHidden(false);
        return;
      }

      // At the top of the document the navigation is always shown.
      if (y <= topOffset) {
        accumulatedDeltaRef.current = 0;
        setHidden(false);
        return;
      }

      // Hysteresis — ignore movement below the threshold.
      accumulatedDeltaRef.current += delta;
      if (Math.abs(accumulatedDeltaRef.current) < threshold) return;

      setHidden(
        hideDirection === "down"
          ? accumulatedDeltaRef.current > 0
          : accumulatedDeltaRef.current < 0,
      );
      accumulatedDeltaRef.current = 0;
    });

    return () => {
      unsubscribe();
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };
  }, [threshold, topOffset, hideDirection, showAfterIdleMs, pinned]);

  // A pinned surface (menu open / pointer / focus inside) is always visible.
  React.useEffect(() => {
    if (pinned) {
      setHidden(false);
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    }
  }, [pinned]);

  return pinned ? false : hidden;
}
