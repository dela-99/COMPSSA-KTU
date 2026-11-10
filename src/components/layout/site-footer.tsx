import Image from "next/image";
import Link from "next/link";
import { Container, Eyebrow } from "@/components/ui";
import { footerNavigation } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

/** Compact department identity, useful routes, configured socials and attribution. */
export function SiteFooter() {
  const socialLinks = siteConfig.socialLinks.filter(({ href }) =>
    /^https:\/\/(www\.)?(tiktok\.com|linkedin\.com)\//i.test(href),
  );

  return (
    <footer className="relative mt-12 overflow-hidden bg-dept-blue text-white sm:mt-16">
      <Container size="wide" className="py-6 sm:py-9">
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 sm:gap-8 lg:grid-cols-4">
          <div className="col-span-2 flex flex-row items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-start sm:justify-start sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="footer-logo flex h-12 w-12 shrink-0 items-center justify-center rounded-xl p-1.5">
                <Image src="/compssa-logo.png" alt="" width={447} height={447} className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="font-sans text-[0.625rem] font-medium uppercase tracking-[0.15em] text-white/75">Department of Computer Science</p>
                <p className="mt-1 font-serif text-lg font-semibold leading-tight">COMPSSA - KTU</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => <FooterSocialDot key={social.label} {...social} />)}
            </div>
          </div>

          {footerNavigation.map((group) => (
            <div key={group.label}>
              <Eyebrow className="text-white/75">{group.label}</Eyebrow>
              <ul className="mt-2.5 space-y-1.5 sm:mt-3 sm:space-y-2">
                {group.children?.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="font-sans text-xs text-white/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:underline sm:text-sm">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2 border-t border-white/25 pt-3 text-[0.6875rem] text-white/80 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <p>© {new Date().getUTCFullYear()} Computer Science · COMPSSA - KTU</p>
          <DeveloperAttribution />
        </div>
      </Container>
    </footer>
  );
}

function DeveloperAttribution() {
  const { name, logoSrc } = siteConfig.developerAttribution;
  return (
    <div className="flex items-center gap-2" aria-label={name ? `Developed by ${name}` : "Developer attribution details pending"}>
      <span className="text-white/70">Developed by</span>
      <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-md border border-white/35 bg-white/10 text-[0.45rem] uppercase tracking-wide text-white/80">
        {logoSrc ? (
          <Image src={logoSrc} alt={name ? name + " logo" : "Developer logo"} width={28} height={28} className="h-full w-full object-contain" />
        ) : "Logo"}
      </span>
      <span className="font-medium text-white/90">{name ?? "Name pending"}</span>
    </div>
  );
}

function FooterSocialDot({ href, label, icon }: {
  href: string;
  label: string;
  icon: "tiktok" | "linkedin" | "whatsapp";
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/90 transition-colors hover:bg-white/20 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" aria-label={label}>
      {icon === "tiktok" ? (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M19.6 6.2a6.3 6.3 0 0 1-4-1.5v9.1a6.4 6.4 0 1 1-6.4-6.4c.5 0 1 .1 1.5.2v3.5a3 3 0 1 0 1.6 2.7V1h3.5a6.3 6.3 0 0 0 3.8 5.2v0Z" /></svg>
      ) : (
        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" /></svg>
      )}
    </a>
  );
}
