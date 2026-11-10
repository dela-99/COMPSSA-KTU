import type { Metadata } from "next";
import { SectionPlaceholder, makeMetadata } from "@/components/layout/section-placeholder";
import { NewsletterSignup } from "@/components/public";

export const metadata: Metadata = makeMetadata(
  "Students",
  "Resources, projects, clubs, and opportunities for students.",
);

export default function StudentsPage() {
  return (
    <SectionPlaceholder
      eyebrow="Students"
      title="Resources, projects, clubs, opportunities."
      description="The Students section brings together the resources, projects, clubs and postings relevant to current students."
    >
      <ul className="space-y-2">
        <li>· Resources</li>
        <li>· Projects</li>
        <li>· Clubs</li>
        <li>· Opportunities</li>
      </ul>
      <div className="mt-10">
        <NewsletterSignup />
      </div>
    </SectionPlaceholder>
  );
}
