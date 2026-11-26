import type { Metadata } from "next";
import { CmsTextPage } from "@/components/CmsTextPage";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Согласие на обработку персональных данных" };

export default function ConsentPage() {
  return <CmsTextPage slug="consent" showFaq={false} />;
}
