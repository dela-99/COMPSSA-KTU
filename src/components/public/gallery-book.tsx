"use client";

import * as React from "react";
import Image from "next/image";
import type { GalleryItem } from "@/types";

function wrap(index: number, length: number) {
  return (index + length) % length;
}

export function GalleryBook({ items }: { items: GalleryItem[] }) {
  const [opened, setOpened] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const [lightbox, setLightbox] = React.useState(false);
  const dragStartRef = React.useRef<number | null>(null);
  const suppressImageClickRef = React.useRef(false);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const active = items[index];

  const turn = React.useCallback((direction: -1 | 1) => {
    if (items.length > 1) setIndex((current) => wrap(current + direction, items.length));
  }, [items.length]);

  React.useEffect(() => {
    if (!lightbox) return;
    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowLeft") turn(-1);
      if (event.key === "ArrowRight") turn(1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox, turn]);

  if (!active) {
    return (
      <div className="rounded-3xl border border-rule bg-paper-warm p-8 text-center">
        <p className="font-serif text-xl text-ink">The gallery is being prepared.</p>
        <p className="mt-2 font-sans text-sm text-ink-muted">Please check back soon.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="gallery-book-scene">
        <div className={`gallery-book ${opened ? "is-open" : ""}`}>
          <div className="gallery-book-back" aria-hidden="true" />
          <button
            type="button"
            className="gallery-book-cover"
            onClick={() => setOpened((value) => !value)}
            aria-label={opened ? "Close the COMPSSA photo book" : "Open the COMPSSA photo book"}
            aria-expanded={opened}
          >
            <span className="gallery-cover-mark">
              <Image src="/compssa-logo.png" alt="" width={96} height={96} priority className="h-20 w-20 object-contain sm:h-24 sm:w-24" />
            </span>
            <span className="gallery-cover-rule" />
            <span className="font-serif text-2xl font-semibold tracking-wide sm:text-3xl">COMPSSA-KTU</span>
            <span className="mt-2 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-white/75">Department photo album</span>
            <span className="mt-8 rounded-full border border-white/35 px-4 py-2 font-sans text-xs uppercase tracking-[0.16em] text-white/90">{opened ? "Close book" : "Tap to open"}</span>
          </button>

          <div className="gallery-book-pages" aria-live="polite">
            <div className="gallery-book-copy">
              <span className="font-sans text-[0.65rem] uppercase tracking-[0.2em] text-ink-subtle">COMPSSA · KTU</span>
              <h2 className="mt-4 font-serif text-2xl text-ink sm:text-3xl">Campus moments</h2>
              <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-ink-muted">A growing collection of photographs from the Department of Computer Science and the university community.</p>
              <span className="mt-auto pt-8 font-sans text-xs uppercase tracking-[0.14em] text-ink-subtle">{String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}</span>
            </div>
            <button
              type="button"
              className="gallery-book-photo"
              onPointerDown={(event) => { dragStartRef.current = event.clientX; }}
              onPointerUp={(event) => {
                if (dragStartRef.current === null) return;
                const distance = event.clientX - dragStartRef.current;
                if (Math.abs(distance) > 45) {
                  suppressImageClickRef.current = true;
                  turn(distance > 0 ? -1 : 1);
                }
                dragStartRef.current = null;
              }}
              onPointerCancel={() => { dragStartRef.current = null; }}
              onClick={(event) => {
                if (suppressImageClickRef.current) {
                  suppressImageClickRef.current = false;
                  event.preventDefault();
                  return;
                }
                setLightbox(true);
              }}
              aria-label={`View ${active.title} in full screen`}
            >
              <span key={active.id} className="gallery-photo-turn">
                <Image src={active.imageUrl} alt={active.title} fill sizes="(max-width: 768px) 90vw, 42vw" priority className="object-cover" />
              </span>
              <span className="gallery-photo-caption">
                <span className="block font-serif text-base">{active.title}</span>
                {active.caption && <span className="mt-1 block font-sans text-xs text-ink-muted">{active.caption}</span>}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button type="button" onClick={() => turn(-1)} disabled={!opened || items.length < 2} className="gallery-turn-button" aria-label="Previous photo">←</button>
        <span className="min-w-24 text-center font-sans text-xs uppercase tracking-[0.14em] text-ink-subtle">{opened ? `${index + 1} of ${items.length}` : "Photo album"}</span>
        <button type="button" onClick={() => turn(1)} disabled={!opened || items.length < 2} className="gallery-turn-button" aria-label="Next photo">→</button>
        {opened && <button type="button" onClick={() => setOpened(false)} className="ml-2 font-sans text-xs uppercase tracking-[0.12em] text-accent">Close book</button>}
      </div>

      {lightbox && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${active.title} photo viewer`} onClick={() => setLightbox(false)}>
          <button ref={closeButtonRef} type="button" className="gallery-lightbox-close" onClick={() => setLightbox(false)} aria-label="Close photo viewer">×</button>
          {items.length > 1 && <button type="button" className="gallery-lightbox-arrow left-4" onClick={(event) => { event.stopPropagation(); turn(-1); }} aria-label="Previous photo">←</button>}
          <div className="gallery-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <div className="relative h-[min(76dvh,850px)] w-[min(92vw,1100px)]">
              <Image src={active.imageUrl} alt={active.title} fill sizes="92vw" className="object-contain" priority />
            </div>
            <p className="mt-3 text-center font-serif text-lg text-white">{active.title}</p>
          </div>
          {items.length > 1 && <button type="button" className="gallery-lightbox-arrow right-4" onClick={(event) => { event.stopPropagation(); turn(1); }} aria-label="Next photo">→</button>}
        </div>
      )}
    </div>
  );
}
