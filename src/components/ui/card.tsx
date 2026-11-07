import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IconArrowRight } from "./icons";

/**
 * Card — the shared card system for the whole site.
 *
 * Design language (Phase 3):
 *   • Rounded rectangles with a controlled radius — never squares, never pills.
 *   • Hairline border, layered surfaces, a restrained shadow.
 *   • An optional department-colour edge accent: a single soft hairline,
 *     never a neon glow.
 *   • Subtle motion: a hair of lift and a deepening border on hover, plus an
 *     optional media scale and an action arrow that nudges on hover.
 *   • Touch-friendly: the hover lift is suppressed on coarse pointers, and
 *     every card remains fully legible and tappable without hover.
 *
 * Semantics: when `href` is set the whole card is a single anchor, so a card
 * never exposes two competing links to the same destination. The visible
 * action label is decorative text, not a nested link.
 */

type CardTone = "surface" | "quiet";

type CardProps = {
  as?: "div" | "article" | "li" | "section";
  interactive?: boolean;
  href?: string;
  tone?: CardTone;
  /** Restrained department-colour edge treatment. */
  accent?: boolean;
  /** Drop the default inner padding — for media-led cards. */
  flush?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "as" | "href" | "children" | "className">;

export function Card({
  as = "div",
  interactive = false,
  href,
  tone = "surface",
  accent = false,
  flush = false,
  className,
  children,
  ...rest
}: CardProps) {
  const base = cn(
    "card-surface group block",
    !flush && "p-6 sm:p-7",
    interactive && "card-surface-interactive",
    accent && "card-accent",
    tone === "quiet" && "bg-paper-warm",
    className,
  );

  if (href) {
    const linkProps = rest as Omit<React.ComponentProps<typeof Link>, "href">;
    return (
      <Link href={href} className={base} {...linkProps}>
        {children}
      </Link>
    );
  }

  const Tag = as as React.ElementType;
  return (
    <Tag className={base} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * CardMedia — the media well of a card.
 * Keeps a consistent aspect ratio and clips the image so it can scale on
 * hover without breaking the card's rounded corners.
 */
export function CardMedia({
  className,
  ratio = "4 / 3",
  image,
  alt = "",
  texture = true,
  children,
}: {
  className?: string;
  ratio?: string;
  image?: string;
  alt?: string;
  /** Engraved texture for placeholder frames. */
  texture?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn("card-media", texture && "card-media-texture", className)}
      style={{ aspectRatio: ratio }}
    >
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        children
      )}
    </div>
  );
}

export function CardHeader({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("mb-4", className)} {...rest} />;
}

export function CardTitle({
  className,
  as: Tag = "h3",
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement> & { as?: "h2" | "h3" | "h4" }) {
  return (
    <Tag
      className={cn(
        "font-serif text-[1.25rem] leading-snug tracking-[-0.012em] text-ink",
        className,
      )}
      {...rest}
    />
  );
}

export function CardDescription({
  className,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("font-sans text-[0.9375rem] leading-relaxed text-ink-muted", className)}
      {...rest}
    />
  );
}

export function CardFooter({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-6 flex items-center justify-between border-t border-rule pt-4",
        className,
      )}
      {...rest}
    />
  );
}

/**
 * CardAction — the navigation indicator of a card.
 *
 * Decorative by design: the surrounding card is the actual link. The arrow
 * nudges on hover, and the label stays legible for touch users.
 */
export function CardAction({
  className,
  children = "Explore",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-sans text-[0.75rem] font-medium uppercase tracking-[0.14em] text-accent",
        className,
      )}
    >
      {children}
      <IconArrowRight
        className="h-3.5 w-3.5 transition-transform duration-200 ease-editorial group-hover:translate-x-0.5"
        aria-hidden
      />
    </span>
  );
}

/**
 * CardMeta — a small metadata line (date, tag, count) used above the title
 * inside a card. Keeps the hierarchy consistent across cards.
 */
export function CardMeta({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "font-sans text-[0.6875rem] uppercase tracking-[0.16em] text-ink-subtle",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
