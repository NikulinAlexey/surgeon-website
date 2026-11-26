import type { Metadata } from "next";
import Link from "next/link";
import { OrganizationPage } from "@/components/OrganizationPage";
import { getPublicOrganization } from "@/lib/organization";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Медицинские услуги" };

export default async function ServicesPage() {
  const organization = await getPublicOrganization();
  return (
    <OrganizationPage title="Медицинские услуги" subtitle="Перечень услуг и условия их предоставления">
      <p className="legal-card__meta">Стоимость платных услуг опубликована на странице <Link href="/price">«Цены»</Link>.</p>
      {organization.services.length === 0 ? <div className="legal-notice"><p>Администратор ещё не опубликовал перечень медицинских услуг.</p></div> : (
        <div className="legal-card-list">{organization.services.map((service) => (
          <article className="legal-card" key={service.id}>
            <div className="legal-card__labels"><span className="legal-card__label">{service.isPaid ? "Платная услуга" : "Без оплаты"}</span>{service.duration && <span className="legal-card__label">{service.duration}</span>}</div>
            <h2>{service.title}</h2>
            {service.description && <p>{service.description}</p>}
            {service.isPaid && service.price && <p className="legal-card__price">{service.price}</p>}
          </article>
        ))}</div>
      )}
    </OrganizationPage>
  );
}
