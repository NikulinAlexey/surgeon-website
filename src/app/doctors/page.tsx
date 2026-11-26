import type { Metadata } from "next";
import { OrganizationPage } from "@/components/OrganizationPage";
import { getPublicOrganization } from "@/lib/organization";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Врачи и специалисты" };

export default async function DoctorsPage() {
  const organization = await getPublicOrganization();
  return (
    <OrganizationPage title="Врачи и специалисты" subtitle="Образование и квалификация медицинских работников">
      {organization.doctors.length === 0 ? <div className="legal-notice"><p>Администратор ещё не опубликовал сведения о медицинских работниках.</p></div> : (
        <div className="legal-card-list">{organization.doctors.map((doctor) => (
          <article className="legal-card" key={doctor.id}>
            <h2>{doctor.fullName}</h2>
            <p className="legal-card__meta">{doctor.position} · {doctor.specialization}</p>
            <h3>Образование</h3><p>{doctor.education}</p>
            <h3>Квалификация</h3><p>{doctor.qualification}</p>
          </article>
        ))}</div>
      )}
    </OrganizationPage>
  );
}
