import { VerificationDetail } from "@/components/admin/VerificationDetail";
export default async function AdminVerificationPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <VerificationDetail id={id} />; }
