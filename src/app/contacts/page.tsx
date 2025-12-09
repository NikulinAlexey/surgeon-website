import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";

export default function ContactsPage() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <Section title="Контакты">
          <div className="contacts">
            <div className="contacts__info">
              <div className="contacts__item">
                  <h3 className="contacts__item-title">Адрес</h3>
                  <p className="contacts__item-text">г. Москва, ул. Ленина, д. 10</p>
                </div>
                <div className="contacts__item">
                  <h3 className="contacts__item-title">Телефон</h3>
                  <p className="contacts__item-text">+7 (495) 123-45-67</p>
                </div>
                <div className="contacts__item">
                  <h3 className="contacts__item-title">Email</h3>
                  <p className="contacts__item-text">info@urology-clinic.ru</p>
                </div>
                <div className="contacts__item">
                  <h3 className="contacts__item-title">Время работы</h3>
                  <p className="contacts__item-text">Пн-Пт: 8:00-20:00<br />Сб-Вс: 9:00-18:00</p>
                </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
