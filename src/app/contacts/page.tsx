import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";
import Tile from "@/components/ui/Tile";

export default function ContactsPage() {
  const items = [
    { title: "Адрес", description: "г. Москва, ул. Ленина, д. 10" },
    { title: "Телефон", description: "+7 (495) 123-45-67" },
    { title: "Email", description: "info@urology-clinic.ru" },
    {
      title: "Время работы",
      description: "Пн-Пт: 8:00-20:00",
    },
  ];
  return (
    <>
      <Header />
      <main className="layout__main">
        <Section title="Контакты">
          <div className="contacts">
            <div className="contacts__container">
              <ul className="contacts__info grid grid--wrap">
                {items.map((tile, index) => (
                  <li className="contacts__item grid__item" key={index}>
                    <Tile title={tile.title} description={tile.description} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
