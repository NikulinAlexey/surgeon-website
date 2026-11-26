import type { Metadata } from "next";
import { CmsTextPage } from "@/components/CmsTextPage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Доступность сайта" };

export default function AccessibilityPage() {
  return <CmsTextPage slug="accessibility" showFaq={false} />;
}
