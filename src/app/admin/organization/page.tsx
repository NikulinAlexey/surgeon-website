import { OrganizationAdmin } from "@/components/admin/OrganizationAdmin";
import { getOrganizationChecklist, getOrganizationInfo } from "@/lib/organization";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";
export const metadata = { title: "Организация" };

export default async function AdminOrganizationPage() {
  const [info, doctors, services] = await Promise.all([
    getOrganizationInfo(),
    db.doctor.findMany({ orderBy: [{ sortOrder: "asc" }, { fullName: "asc" }] }),
    db.medicalService.findMany({ orderBy: [{ sortOrder: "asc" }, { title: "asc" }] }),
  ]);
  return <OrganizationAdmin initialInfo={info} initialDoctors={doctors} initialServices={services} initialChecklist={getOrganizationChecklist(info)} />;
}
