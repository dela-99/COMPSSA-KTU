/**
 * Navigation configuration.
 * Used by the public site header / desktop nav / mobile dock / footer.
 *
 * Keep this file the single source of truth — pages should reference these labels,
 * not hardcode titles.
 *
 * Architecture:
 *
 *   SiteHeader  → centred floating desktop navigation, no public admin link.
 *   Mobile dock → floating glass dock pinned to the bottom edge.
 *
 * Both navigations read the SAME destination set, so the information
 * architecture is identical across breakpoints — only the placement changes.
 */

export type NavIconName =
  | "home"
  | "academics"
  | "people"
  | "library"
  | "more"
  | "about"
  | "students"
  | "events"
  | "contact"
  | "portal"
  | "research"
  | "news"
  | "gallery"
  | "past-questions";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: NavIconName;
};

export type NavGroup = {
  label: string;
  href: string;
  description?: string;
  icon?: NavIconName;
  children?: NavLink[];
};

/**
 * Destinations that are not surfaced directly in the navigation bar.
 * Shared by the desktop "More" dropdown and the mobile dock's expanded panel
 * so the two can never drift apart.
 */
export const moreLinks: NavLink[] = [
  {
    label: "About",
    href: "/about",
    description: "History, mission, and structure.",
    icon: "about",
  },
  {
    label: "Students",
    href: "/students",
    description: "Resources, projects, clubs, opportunities.",
    icon: "students",
  },
  {
    label: "Events",
    href: "/events",
    description: "Departmental events.",
    icon: "events",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch.",
    icon: "contact",
  },
];

/**
 * Primary navigation — the destination set for BOTH the desktop glass bar and
 * the mobile bottom dock.
 */
export const primaryNavigation: NavGroup[] = [
  {
    label: "Home",
    href: "/",
    description: "Department home.",
    icon: "home",
  },
  {
    label: "Academics",
    href: "/academics",
    description: "Programmes, courses, and resources.",
    icon: "academics",
    children: [
      {
        label: "Programmes",
        href: "/academics/programmes",
        description: "Degrees offered by the department.",
        icon: "academics",
      },
      {
        label: "Courses",
        href: "/academics/courses",
        description: "Course catalogue by level.",
        icon: "academics",
      },
      {
        label: "Academic Resources",
        href: "/library",
        description: "Research, past questions, news, and gallery resources.",
        icon: "library",
      },
    ],
  },
  {
    label: "People",
    href: "/people",
    description: "HOD, lecturers, executives, alumni.",
    icon: "people",
    children: [
      {
        label: "HOD",
        href: "/people/hod",
        description: "Current head of department.",
        icon: "people",
      },
      {
        label: "Lecturers & Staff",
        href: "/people/staff",
        description: "Academic and administrative staff.",
        icon: "people",
      },
      {
        label: "Student Executives",
        href: "/people/executives",
        description: "Current and past student executives.",
        icon: "people",
      },
      {
        label: "Executive History",
        href: "/people/executives#executive-history",
        description: "Past student executive councils by academic year.",
        icon: "people",
      },
    ],
  },
  {
    label: "Library",
    href: "/library",
    description: "News, gallery, research, past questions.",
    icon: "library",
  },
  {
    label: "More",
    href: "#",
    description: "Additional destinations.",
    icon: "more",
    children: moreLinks,
  },
];

/**
 * Mobile dock — the same destinations as `primaryNavigation`, expressed for a
 * compact five-slot dock. The first four navigate directly; "More" opens the
 * expanded panel above the dock.
 */
export const dockNavigation: NavGroup[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Academics", href: "/academics", icon: "academics" },
  { label: "People", href: "/people", icon: "people" },
  { label: "Library", href: "/library", icon: "library" },
  { label: "More", href: "#", icon: "more", children: moreLinks },
];

/**
 * Library destinations — the four existing sections the Library landing page
 * presents. Routing only: the Library page enriches these with live counts
 * from the existing data layer. No new dataset is created.
 */
export const libraryDestinations: NavLink[] = [
  {
    label: "News",
    href: "/news",
    description:
      "Department announcements, updates, achievements, and activities from across the faculty.",
    icon: "news",
  },
  {
    label: "Gallery",
    href: "/gallery",
    description:
      "Photographs from departmental events, ceremonies, labs, and student life.",
    icon: "gallery",
  },
  {
    label: "Research",
    href: "/research",
    description:
      "Research areas, active projects, and publications from staff and postgraduate students.",
    icon: "research",
  },
  {
    label: "Past Questions",
    href: "/past-questions",
    description:
      "Searchable archive of past examination papers, filterable by course, level, and year.",
    icon: "past-questions",
  },
];

export const footerNavigation: NavGroup[] = [
  {
    label: "Department",
    href: "/about",
    children: [
      { label: "About", href: "/about" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Programmes", href: "/academics/programmes" },
      { label: "Courses", href: "/academics/courses" },
      { label: "Past Questions", href: "/past-questions" },
    ],
  },
  {
    label: "Community",
    href: "/people",
    children: [
      { label: "People", href: "/people" },
      { label: "News", href: "/news" },
      { label: "Events", href: "/events" },
    ],
  },
];

/**
 * Admin portal navigation — left-rail on /admin/*.
 * Stub for Phase 1; mirrors the planned admin section list.
 */
export const adminNavigation: NavLink[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "News", href: "/admin/news" },
  { label: "Events", href: "/admin/events" },
  { label: "Staff", href: "/admin/staff" },
  { label: "HODs", href: "/admin/hods" },
  { label: "Executive Terms", href: "/admin/executive-terms" },
  { label: "Executive Members", href: "/admin/executive-members" },
  { label: "Programmes", href: "/admin/programmes" },
  { label: "Courses", href: "/admin/courses" },
  { label: "Research", href: "/admin/research" },
  { label: "Past Questions", href: "/admin/past-questions" },
  { label: "Documents", href: "/admin/documents" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Feedback", href: "/admin/feedback" },
  { label: "Notifications", href: "/admin/notifications" },
  { label: "Users & Roles", href: "/admin/users" },
  { label: "Audit Logs", href: "/admin/audit-logs" },
  { label: "Settings", href: "/admin/settings" },
];
