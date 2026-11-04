import * as React from "react";
import type { NavIconName } from "@/lib/navigation";

/**
 * Icon — the single icon set for the site.
 *
 * One shared vocabulary for the navigation bar, the mobile dock, the dropdown
 * panels and the Library cards. Icons are stroke-based 24×24 so they sit
 * optically consistent with the department's restrained typography, and they
 * inherit `currentColor` so active/hover states tint them for free.
 */

type IconProps = {
  className?: string;
};

function Svg({
  className,
  children,
  strokeWidth = 1.75,
}: IconProps & { children: React.ReactNode; strokeWidth?: number }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function IconHome({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M3.25 11.4 12 4l8.75 7.4" />
      <path d="M5.5 10.2V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-8.8" />
      <path d="M9.75 20v-5.5h4.5V20" />
    </Svg>
  );
}

export function IconAcademics({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 4 2.75 8.5 12 13l9.25-4.5L12 4Z" />
      <path d="M6.5 10.4V16c0 1.6 2.9 2.9 5.5 2.9s5.5-1.3 5.5-2.9v-5.6" />
      <path d="M20.25 9v5.5" />
    </Svg>
  );
}

export function IconPeople({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M15.5 20v-1.8a3.7 3.7 0 0 0-3.7-3.7H6.7A3.7 3.7 0 0 0 3 18.2V20" />
      <circle cx="9.25" cy="7.5" r="3.5" />
      <path d="M21 20v-1.8a3.7 3.7 0 0 0-2.8-3.58" />
      <path d="M15.5 4.22a3.7 3.7 0 0 1 0 7.06" />
    </Svg>
  );
}

export function IconLibrary({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M4 4.5h3v15H4z" />
      <path d="M9.5 4.5h3v15h-3z" />
      <path d="M15.2 5.4l2.9-.9 3.3 14.1-2.9.9z" />
      <path d="M3 20.5h18" />
    </Svg>
  );
}

export function IconMore({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </Svg>
  );
}

export function IconAbout({ className }: IconProps) {
  return (
    <Svg className={className}>
      <circle cx="12" cy="12" r="8.75" />
      <path d="M12 11v5.5" />
      <path d="M12 7.75h.01" />
    </Svg>
  );
}

export function IconStudents({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M12 4 2.75 8.5 12 13l9.25-4.5L12 4Z" />
      <path d="M6.5 10.4V16c0 1.6 2.9 2.9 5.5 2.9 1 0 2-.16 2.8-.45" />
      <path d="M20.25 9v5.5" />
    </Svg>
  );
}

export function IconEvents({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.75h17" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M8 13.5h2.5" />
      <path d="M8 17h5.5" />
    </Svg>
  );
}

export function IconContact({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </Svg>
  );
}

export function IconPortal({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3.5" y="4" width="17" height="16" rx="2" />
      <path d="M3.5 9h17" />
      <path d="M9.5 9v11" />
    </Svg>
  );
}

export function IconResearch({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M9.5 3.5v5.2L4.9 16.4A2 2 0 0 0 6.6 19.5h10.8a2 2 0 0 0 1.7-3.1l-4.6-7.7V3.5" />
      <path d="M8 3.5h8" />
      <path d="M7.5 14.5h9" />
    </Svg>
  );
}

export function IconNews({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M18.5 19.5H5.5A2.5 2.5 0 0 1 3 17V5.5h13v11.5a2.5 2.5 0 0 0 2.5 2.5Z" />
      <path d="M16 8.5h3a2 2 0 0 1 2 2V17a2.5 2.5 0 0 1-2.5 2.5" />
      <path d="M6.5 9h6" />
      <path d="M6.5 12.5h6" />
      <path d="M6.5 16h3.5" />
    </Svg>
  );
}

export function IconGallery({ className }: IconProps) {
  return (
    <Svg className={className}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="8.75" cy="9.75" r="1.75" />
      <path d="m4 16.5 4.6-4.1a1.8 1.8 0 0 1 2.4 0L16 17.5" />
      <path d="m14 13.5 1.4-1.25a1.8 1.8 0 0 1 2.4 0L20 14" />
    </Svg>
  );
}

export function IconPastQuestions({ className }: IconProps) {
  return (
    <Svg className={className}>
      <path d="M13.5 3.5H7A2.5 2.5 0 0 0 4.5 6v12A2.5 2.5 0 0 0 7 20.5h10a2.5 2.5 0 0 0 2.5-2.5V9.5Z" />
      <path d="M13.5 3.5v6h6" />
      <path d="M8.5 14.5h7" />
      <path d="M8.5 17.5h4.5" />
    </Svg>
  );
}

export function IconArrowRight({ className }: IconProps) {
  return (
    <Svg className={className} strokeWidth={2}>
      <path d="M4 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </Svg>
  );
}

export function IconChevronDown({ className }: IconProps) {
  return (
    <Svg className={className} strokeWidth={2}>
      <path d="m6 9.5 6 6 6-6" />
    </Svg>
  );
}

export function IconClose({ className }: IconProps) {
  return (
    <Svg className={className} strokeWidth={2}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </Svg>
  );
}

/**
 * NavIcon — resolves a navigation icon by name.
 * Keeps the name → component mapping in one place so navigation config can
 * stay serialisable (plain data, no JSX).
 */
const NAV_ICONS: Record<NavIconName, React.ComponentType<IconProps>> = {
  home: IconHome,
  academics: IconAcademics,
  people: IconPeople,
  library: IconLibrary,
  more: IconMore,
  about: IconAbout,
  students: IconStudents,
  events: IconEvents,
  contact: IconContact,
  portal: IconPortal,
  research: IconResearch,
  news: IconNews,
  gallery: IconGallery,
  "past-questions": IconPastQuestions,
};

export function NavIcon({
  name,
  className,
}: {
  name: NavIconName;
  className?: string;
}) {
  const Component = NAV_ICONS[name] ?? IconMore;
  return <Component className={className} />;
}
