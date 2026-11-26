import { db } from "./db";

const defaultOrganization = {
  fullName: "ГБУЗ Архангельской области «Первая ГКБ им. Е. Е. Волосевич»",
  shortName: "Архангельский региональный урологический центр",
};

export function getOrganizationInfo() {
  return db.organizationInfo.upsert({
    where: { id: 1 },
    create: { ...defaultOrganization },
    update: {},
  });
}

export async function getPublicOrganization() {
  const organization = await db.organizationInfo.findFirst({
    where: { id: 1 },
    include: {
      doctors: { where: { isPublished: true }, orderBy: [{ sortOrder: "asc" }, { fullName: "asc" }] },
      services: { where: { isPublished: true }, orderBy: [{ sortOrder: "asc" }, { title: "asc" }] },
    },
  });
  if (organization) return organization;
  return { ...(await getOrganizationInfo()), doctors: [], services: [] };
}

export function getOrganizationChecklist(info: {
  fullName: string;
  legalAddress: string;
  actualAddress: string;
  licenseNumber: string;
  licenseIssuedBy: string;
  licenseIssueDate: string;
  licenseValidUntil: string;
  licenseActivities: string;
  appointmentInfo: string;
}) {
  return [
    { key: "fullName", label: "Полное наименование организации", complete: Boolean(info.fullName.trim()) },
    { key: "addresses", label: "Юридический и фактический адреса", complete: Boolean(info.legalAddress.trim() && info.actualAddress.trim()) },
    { key: "licenseNumber", label: "Номер лицензии", complete: Boolean(info.licenseNumber.trim()) },
    { key: "licenseIssuedBy", label: "Орган, выдавший лицензию", complete: Boolean(info.licenseIssuedBy.trim()) },
    { key: "licenseDates", label: "Дата выдачи и срок действия", complete: Boolean(info.licenseIssueDate.trim() && info.licenseValidUntil.trim()) },
    { key: "licenseActivities", label: "Разрешённые виды деятельности", complete: Boolean(info.licenseActivities.trim()) },
    { key: "appointmentInfo", label: "Порядок записи на приём", complete: Boolean(info.appointmentInfo.trim()) },
  ];
}
