/**
 * Centralized site configuration.
 * Single source of truth for department identity, contact details, and nav structure.
 */

export type SocialLink = {
  label: string;
  href: string;
  icon: "tiktok" | "linkedin" | "whatsapp";
};

export const siteConfig = {
  name: "Department of Computer Science",
  shortName: "COMPSSA KTU",
  institution: "Koforidua Technical University",
  tagline: "An academic department of computing.",
  description:
    "The official digital home of the Department of Computer Science — programmes, people, research, and student resources.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "cs-department@example.edu",
  phone: "+000 000 0000",
  address: ["Department of Computer Science", "Faculty of Science", "University Campus"],
  founded: "Est. 19xx",
  socialLinks: [
    { label: "TikTok", href: "https://tiktok.com/@compssa", icon: "tiktok" },
    { label: "LinkedIn", href: "https://linkedin.com/company/compssa", icon: "linkedin" },
  ] as SocialLink[],
  // Replace these null values when the verified developer identity is supplied.
  developerAttribution: { name: null as string | null, logoSrc: null as string | null },
} as const;

export type SiteConfig = typeof siteConfig;
