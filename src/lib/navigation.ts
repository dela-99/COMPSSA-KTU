/**
 * Navigation configuration.
 * Used by the public site header / mobile nav / footer.
 *
 * Keep this file the single source of truth — pages should reference these labels,
 * not hardcode titles.
 */

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavGroup = {
  label: string;
  href: string;
  description?: string;
  children?: NavLink[];
};

export const primaryNavigation: NavGroup[] = [
  {
    label: "About",
    href: "/about",
    description: "History, mission, and structure.",
  },
  {
    label: "Academics",
    href: "/academics",
    description: "Programmes, courses, and resources.",
  },
  {
    label: "People",
    href: "/people",
    description: "HOD, lecturers, executives, alumni.",
    children: [
      { label: "HOD", href: "/people/hod", description: "Current head of department." },
      { label: "Lecturers & Staff", href: "/people/staff", description: "Academic and administrative staff." },
      { label: "Executives", href: "/people/executives", description: "Current and past student executives." },
    ],
  },
  {
    label: "Students",
    href: "/students",
    description: "Resources, projects, clubs, opportunities.",
  },
  {
    label: "Library",
    href: "/library",
    description: "News, gallery, research, past questions.",
  },
  {
    label: "Events",
    href: "/events",
    description: "Departmental events.",
  },
  {
    label: "More",
    href: "#",
    description: "Additional links.",
    children: [
      { label: "Research", href: "/research", description: "Research areas, projects, publications." },
      { label: "News", href: "/news", description: "News and announcements." },
      { label: "Gallery", href: "/gallery", description: "Photo gallery." },
      { label: "Past Questions", href: "/past-questions", description: "Searchable past question papers." },
      { label: "Contact", href: "/contact", description: "Get in touch." },
    ],
  },
];

export const footerNavigation: NavGroup[] = [
  {
    label: "Department",
    href: "/about",
    children: [
      { label: "About", href: "/about" },
      { label: "History", href: "/about/history" },
      { label: "Mission & Vision", href: "/about/mission" },
      { label: "HOD History", href: "/about/hod-history" },
    ],
  },
  {
    label: "Academic",
    href: "/academics",
    children: [
      { label: "Programmes", href: "/academics/programmes" },
      { label: "Courses", href: "/academics/courses" },
      { label: "Past Questions", href: "/past-questions" },
      { label: "Academic Resources", href: "/academics/resources" },
    ],
  },
  {
    label: "Community",
    href: "/people",
    children: [
      { label: "People", href: "/people" },
      { label: "Alumni", href: "/alumni" },
      { label: "News", href: "/news" },
      { label: "Events", href: "/events" },
      { label: "Feedback", href: "/feedback" },
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