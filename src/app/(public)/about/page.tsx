import type { Metadata } from "next";
import { SectionPlaceholder, makeMetadata } from "@/components/layout/section-placeholder";

export const metadata: Metadata = makeMetadata(
  "About",
  "History, mission and vision, and the structure of the Department of Computer Science.",
);

export default function AboutPage() {
  return (
    <SectionPlaceholder
      eyebrow="About"
      title="History, mission, and structure."
      description="The About section is the institutional narrative of the department — its history, mission and vision, and how the department is organised. This page is being prepared for Phase 2."
    >
      <ul className="space-y-2">
        <li>· History</li>
        <li>· Mission and Vision</li>
        <li>· Department Structure</li>
        <li>· HOD History</li>
      </ul>
    </SectionPlaceholder>
  );
}
