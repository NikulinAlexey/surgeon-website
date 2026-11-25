import type { Metadata } from "next";
import { CmsTextPage } from "@/components/CmsTextPage";
import { getCmsPage } from "@/lib/pages";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("patients");
  return { title: page?.seoTitle || "Пациентам", description: page?.seoDescription || undefined };
}

export default function PatientsPage() {
  return <CmsTextPage slug="patients" />;
}
