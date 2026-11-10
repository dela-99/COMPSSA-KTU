"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

/**
 * A short opacity-only route entrance for public App Router pages.
 * The key follows the pathname, so back/forward navigation uses the same path.
 */
export function PublicPageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="public-page-enter">
      {children}
    </div>
  );
}
