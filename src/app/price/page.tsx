import type { Metadata } from "next";
import { OrganizationPage } from "@/components/OrganizationPage";
import { getPublicOrganization } from "@/lib/organization";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Цены на медицинские услуги" };

export default async function PricePage() {
  const organization = await getPublicOrganization();
  const services = organization.services.filter((service) => service.isPaid);
  return (
    <OrganizationPage title="Цены на медицинские услуги" subtitle="Актуальная стоимость платных услуг">
      {services.length === 0 ? <div className="legal-summary"><strong>Платные услуги не опубликованы</strong><p>Если медицинская помощь оказывается без оплаты, актуальные условия уточняйте у администратора. Информация о порядке обращения доступна в разделе лицензии.</p></div> : (
        <div className="legal-card-list">{services.map((service) => (
          <article className="legal-card" key={service.id}>
            <h2>{service.title}</h2>
            {service.description && <p>{service.description}</p>}
            {service.duration && <p className="legal-card__meta">Длительность: {service.duration}</p>}
            <p className="legal-card__price">{service.price || "Стоимость не указана"}</p>
          </article>
        ))}</div>
      )}
    </OrganizationPage>
  );
}
