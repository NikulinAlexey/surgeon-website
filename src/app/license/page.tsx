import type { Metadata } from "next";
import { OrganizationPage } from "@/components/OrganizationPage";
import { getPublicOrganization } from "@/lib/organization";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Сведения о лицензии" };

export default async function LicensePage() {
  const organization = await getPublicOrganization();
  const fields = [
    ["Полное наименование", organization.fullName],
    ["Юридический адрес", organization.legalAddress],
    ["Фактический адрес", organization.actualAddress],
    ["Номер лицензии", organization.licenseNumber],
    ["Орган, выдавший лицензию", organization.licenseIssuedBy],
    ["Дата выдачи", organization.licenseIssueDate],
    ["Срок действия", organization.licenseValidUntil],
  ];
  const hasLicense = organization.licenseNumber && organization.licenseIssuedBy && organization.licenseActivities;

  return (
    <OrganizationPage title="Сведения о лицензии" subtitle="Официальная информация о медицинской деятельности организации">
      {!hasLicense && <div className="legal-notice"><p>Администратор ещё не внёс полные лицензионные сведения. Информация будет опубликована после проверки организацией.</p></div>}
      <section className="legal-section">
        <h2>Медицинская организация</h2>
        <dl className="legal-definition-list">{fields.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value || "Не указано"}</dd></div>)}</dl>
      </section>
      <section className="legal-section"><h2>Виды медицинской деятельности</h2><p>{organization.licenseActivities || "Сведения не внесены администратором."}</p></section>
      <section className="legal-section"><h2>Порядок записи на приём</h2><p>{organization.appointmentInfo || "Сведения не внесены администратором."}</p></section>
      {organization.stateGuaranteeInfo && <section className="legal-section"><h2>Программа государственных гарантий</h2><p>{organization.stateGuaranteeInfo}</p></section>}
      {organization.insuranceInfo && <section className="legal-section"><h2>Страховая деятельность</h2><p>{organization.insuranceInfo}</p></section>}
    </OrganizationPage>
  );
}
