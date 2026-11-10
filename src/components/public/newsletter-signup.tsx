"use client";

import * as React from "react";

export type NewsletterSubscriptionResult = "subscribed" | "already-subscribed";

/**
 * Integration seam for a future consent-aware newsletter provider.
 * Resolve only after the provider confirms the address is subscribed.
 */
export type NewsletterSubscribe = (
  email: string,
  consent: true,
) => Promise<NewsletterSubscriptionResult>;

type NewsletterSignupProps = {
  subscribe?: NewsletterSubscribe;
};

type SignupStatus =
  | "idle"
  | "loading"
  | "subscribed"
  | "already-subscribed"
  | "error"
  | "unavailable";

export function NewsletterSignup({ subscribe }: NewsletterSignupProps) {
  const [status, setStatus] = React.useState<SignupStatus>("idle");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const consent = formData.get("consent") === "on";

    if (!subscribe) {
      setStatus("unavailable");
      return;
    }

    if (!consent) return;

    setStatus("loading");
    try {
      setStatus(await subscribe(email, true));
    } catch {
      setStatus("error");
    }
  };

  const statusMessage = {
    idle: "",
    loading: "Submitting your request…",
    subscribed: "Your subscription has been confirmed.",
    "already-subscribed": "This address is already subscribed.",
    error: "We couldn’t confirm your subscription. Please try again later.",
    unavailable:
      "Newsletter sign-up is not connected yet. Your email was not sent or stored.",
  }[status];

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="rounded-2xl border border-rule bg-paper/90 p-5 shadow-sm sm:p-6"
    >
      <h2 id="newsletter-heading" className="font-serif text-xl text-ink">
        Department newsletter
      </h2>
      <p className="mt-2 max-w-[60ch] text-sm leading-relaxed text-ink-muted">
        Receive department news and announcements by email. Once sign-up is
        enabled, each newsletter will include an unsubscribe link.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4">
        <div>
          <label
            htmlFor="newsletter-email"
            className="mb-1.5 block text-sm font-medium text-ink"
          >
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            disabled={status === "loading"}
            placeholder="you@example.com"
            className="min-h-11 w-full rounded-lg border border-rule-strong bg-white px-3 text-sm text-ink placeholder:text-ink-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dept-blue focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
          />
        </div>

        <label className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
          <input
            type="checkbox"
            name="consent"
            required
            disabled={status === "loading"}
            className="mt-1 h-4 w-4 shrink-0 accent-dept-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dept-blue focus-visible:ring-offset-2"
          />
          <span>I agree to receive departmental newsletter emails.</span>
        </label>

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg bg-dept-blue px-5 text-sm font-semibold text-white transition-colors hover:bg-dept-blue/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dept-blue focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "loading" ? "Submitting…" : "Subscribe"}
        </button>
      </form>

      <p
        className="mt-4 min-h-5 text-sm text-ink-muted"
        role={status === "error" ? "alert" : "status"}
        aria-live={status === "error" ? "assertive" : "polite"}
      >
        {statusMessage}
        {status === "idle" && !subscribe && (
          <span>
            Sign-up is currently unavailable; email addresses are not collected.
          </span>
        )}
      </p>
    </section>
  );
}
