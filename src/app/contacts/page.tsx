import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";
import Tile from "@/components/ui/Tile";
import Link from "next/link";

export default function ContactsPage() {
  const items = [
    { title: "Адрес", description: "г. Москва, ул. Ленина, д. 10" },
    {
      title: "Телефон",
      description: <Link href="tel:+74951234567">+7 (495) 123-45-67</Link>,
    },
    {
      title: "Email",
      description: (
        <Link href="mailto:+74951234567">info@urology-clinic.ru</Link>
      ),
    },
    {
      title: "Время работы",
      description: "Пн-Пт: 8:00-20:00",
    },
  ];
  return (
    <>
      <Header />
      <main className="layout__main">
        <Banner title="Контакты " />
        <Section id="contacts">
          <div className="contacts">
            <div className="contacts__container">
              <ul className="contacts__info grid grid--wrap">
                {items.map((item, index) => (
                  <li className="contacts__item grid__item" key={index}>
                    <Tile title={item.title} description={item.description} />
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
