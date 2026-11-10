import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PublicPageTransition } from "@/components/layout/public-page-transition";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {/*
        `dock-safe` reserves the space the floating mobile dock occupies so it
        never covers the end of a page — footer links, filter results or
        buttons. The reservation collapses to zero on desktop, where the
        navigation floats at the top instead.
      */}
      <div className="dock-safe">
        <main id="main" className="min-h-[60vh]">
          <PublicPageTransition>{children}</PublicPageTransition>
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
