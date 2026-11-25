import { PageEditor } from "@/components/admin/PageEditor";

export default async function EditCmsPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <PageEditor slug={slug.join("/")} />;
}
