import { UserDetail } from "@/components/admin/UserDetail";
export default async function AdminUserPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <UserDetail id={id} />; }
