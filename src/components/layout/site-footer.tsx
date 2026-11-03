import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { footerNavigation } from "@/lib/navigation";
import { Container, Divider, Eyebrow } from "@/components/ui";

/**
 * SiteFooter — Editorial, prestigious university dark footer with multi-column
 * navigation, department crest, contact information, and social links.
 */
export function SiteFooter() {
  return (
    <footer className="relative mt-20 border-t border-ink bg-ink text-paper overflow-hidden">
      <Container size="wide">
        <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          {/* Department Branding & Socials */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <FooterCrest />
                <div>
                  <h3 className="font-serif text-[1.125rem] font-semibold text-paper leading-tight">
                    {siteConfig.name}
                  </h3>
                  <p className="font-sans text-[0.7rem] uppercase tracking-[0.16em] text-paper/60">
                    Faculty of Science
                  </p>
                </div>
              </div>

              <p className="mt-4 font-serif text-[0.95rem] leading-relaxed text-paper/75 max-w-[34ch]">
                {siteConfig.tagline}
              </p>

              <div className="mt-6 flex items-center gap-2 text-paper/80">
                <FooterSocialDot href="https://github.com" label="GitHub" icon="github" />
                <FooterSocialDot href="https://linkedin.com" label="LinkedIn" icon="linkedin" />
                <FooterSocialDot href="https://twitter.com" label="Twitter" icon="x" />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-paper/10">
              <span className="font-sans text-[0.75rem] uppercase tracking-[0.14em] text-paper/50 block mb-1">
                Academic Portal
              </span>
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 font-sans text-[0.875rem] text-paper/90 hover:text-white transition-colors"
              >
                <span>Department Staff & Admin Portal</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Nav Directory Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {footerNavigation.map((group) => (
              <div key={group.label}>
                <Eyebrow className="text-paper/50">{group.label}</Eyebrow>
                <ul className="mt-4 space-y-2.5">
                  {group.children?.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="font-sans text-[0.875rem] text-paper/70 hover:text-white transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact & Location Column */}
          <div className="lg:col-span-3">
            <Eyebrow className="text-paper/50">Contact & Inquiries</Eyebrow>
            <address className="mt-4 font-sans not-italic text-[0.875rem] leading-relaxed text-paper/70 space-y-1">
              {siteConfig.address.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
              <div className="mt-4 pt-3 border-t border-paper/10 space-y-1">
                <span className="block">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-paper/90 underline decoration-paper/30 underline-offset-4 hover:text-white hover:decoration-white transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </span>
                <span className="block text-paper/60 text-[0.8125rem]">
                  {siteConfig.phone}
                </span>
              </div>
            </address>
          </div>
        </div>

        <Divider className="bg-paper/15" />

        {/* Sub-footer Bar */}
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between text-paper/50">
          <p className="font-sans text-[0.8125rem]">
            © {new Date().getFullYear()} {siteConfig.institution} — Department of Computer Science. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-5 font-sans text-[0.8125rem]">
            <li>
              <Link href="/about" className="hover:text-paper transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-paper transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/feedback" className="hover:text-paper transition-colors">
                Feedback
              </Link>
            </li>
            <li>
              <Link href="/past-questions" className="hover:text-paper transition-colors">
                Past Questions
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterCrest() {
  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-sm bg-paper/10 border border-paper/20">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5 text-paper"
      >
        <path d="M12 2L4 7v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V7l-8-5z" />
        <path d="M12 7v8" />
        <path d="M9 11l3-3 3 3" />
      </svg>
    </div>
  );
}

function FooterSocialDot({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: "github" | "linkedin" | "x";
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-paper/10 border border-paper/15 text-paper/80 hover:text-white hover:bg-paper/20 hover:border-paper/40 transition-all"
      aria-label={label}
    >
      {icon === "github" && (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      )}
      {icon === "linkedin" && (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
        </svg>
      )}
      {icon === "x" && (
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )}
    </a>
  );
}