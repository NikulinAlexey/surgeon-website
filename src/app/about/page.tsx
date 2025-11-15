// components/Header/Header.tsx
"use client";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <div className="container">
          <div className="about-page">
            <section className="about-page__hero section">
              <div className="section__container container">
                <h1 className="about-page__title section__title">О нашей клинике урологии</h1>
                <p className="about-page__subtitle">
                  Современная урологическая клиника с многолетним опытом лечения заболеваний мочеполовой системы
                </p>
              </div>
            </section>

            <section className="about-page__about section">
              <div className="section__container container">
                <h2 className="section__title">О клинике</h2>
                <div className="about-page__content">
                  <div className="about-page__text">
                    <p>
                      Наша клиника урологии — это современное медицинское учреждение, специализирующееся на диагностике
                      и лечении заболеваний мочеполовой системы у мужчин и женщин. Мы предоставляем полный спектр
                      урологических услуг с использованием новейших технологий и оборудования.
                    </p>
                    <p>
                      Клиника была основана в 2010 году группой ведущих урологов с многолетним опытом работы.
                      За годы работы мы помогли тысячам пациентов восстановить здоровье и качество жизни.
                    </p>
                    <p>
                      Мы гордимся тем, что наша клиника соответствует самым высоким стандартам медицинской помощи
                      и использует только проверенные и эффективные методы лечения.
                    </p>
                  </div>
                  <div className="about-page__image">
                    <img src="/surgeon-website/images/clinic.jpg" alt="Клиника урологии" />
                  </div>
                </div>
              </div>
            </section>

            <section className="about-page__services section section--gray">
              <div className="section__container container">
                <h2 className="section__title">Наши услуги</h2>
                <div className="about-page__services-grid">
                  <div className="about-page__service-card">
                    <h3>Диагностика</h3>
                    <p>Современные методы диагностики урологических заболеваний</p>
                    <ul>
                      <li>УЗИ мочеполовой системы</li>
                      <li>Лабораторные исследования</li>
                      <li>Эндоскопические исследования</li>
                      <li>Биопсия простаты</li>
                    </ul>
                  </div>
                  <div className="about-page__service-card">
                    <h3>Лечение</h3>
                    <p>Эффективное лечение различных урологических заболеваний</p>
                    <ul>
                      <li>Консервативное лечение</li>
                      <li>Малоинвазивные операции</li>
                      <li>Лазерная терапия</li>
                      <li>Медикаментозное лечение</li>
                    </ul>
                  </div>
                  <div className="about-page__service-card">
                    <h3>Профилактика</h3>
                    <p>Профилактические мероприятия для поддержания здоровья</p>
                    <ul>
                      <li>Регулярные осмотры</li>
                      <li>Вакцинация</li>
                      <li>Консультации по здоровому образу жизни</li>
                      <li>Скрининг рака простаты</li>
                    </ul>
                  </div>
                  <div className="about-page__service-card">
                    <h3>Консультации</h3>
                    <p>Персонализированные консультации опытных специалистов</p>
                    <ul>
                      <li>Первичная консультация</li>
                      <li>Второе мнение</li>
                      <li>Онлайн-консультации</li>
                      <li>Консультации по результатам анализов</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="about-page__team section">
              <div className="section__container container">
                <h2 className="section__title">Наша команда</h2>
                <div className="about-page__team-grid">
                  <div className="about-page__doctor-card">
                    <div className="about-page__doctor-photo">
                      <img src="/surgeon-website/images/doctor1.jpg" alt="Врач 1" />
                    </div>
                    <h3>Иванов Иван Иванович</h3>
                    <p className="about-page__doctor-specialty">Главный уролог, кандидат медицинских наук</p>
                    <p className="about-page__doctor-experience">Опыт работы: 15 лет</p>
                  </div>
                  <div className="about-page__doctor-card">
                    <div className="about-page__doctor-photo">
                      <img src="/surgeon-website/images/doctor2.jpg" alt="Врач 2" />
                    </div>
                    <h3>Петров Петр Петрович</h3>
                    <p className="about-page__doctor-specialty">Уролог-андролог</p>
                    <p className="about-page__doctor-experience">Опыт работы: 10 лет</p>
                  </div>
                  <div className="about-page__doctor-card">
                    <div className="about-page__doctor-photo">
                      <img src="/surgeon-website/images/doctor3.jpg" alt="Врач 3" />
                    </div>
                    <h3>Сидорова Анна Михайловна</h3>
                    <p className="about-page__doctor-specialty">Уролог-гинеколог</p>
                    <p className="about-page__doctor-experience">Опыт работы: 12 лет</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="about-page__advantages section section--gray">
              <div className="section__container container">
                <h2 className="section__title">Почему выбирают нас</h2>
                <div className="about-page__advantages-grid">
                  <div className="about-page__advantage">
                    <div className="about-page__advantage-icon">🏥</div>
                    <h3>Современное оборудование</h3>
                    <p>Используем новейшую диагностическую и лечебную аппаратуру</p>
                  </div>
                  <div className="about-page__advantage">
                    <div className="about-page__advantage-icon">👨‍⚕️</div>
                    <h3>Опытные специалисты</h3>
                    <p>Наша команда состоит из высококвалифицированных врачей</p>
                  </div>
                  <div className="about-page__advantage">
                    <div className="about-page__advantage-icon">💊</div>
                    <h3>Индивидуальный подход</h3>
                    <p>Каждому пациенту уделяется максимум внимания</p>
                  </div>
                  <div className="about-page__advantage">
                    <div className="about-page__advantage-icon">🕒</div>
                    <h3>Удобное время работы</h3>
                    <p>Работаем без выходных с 8:00 до 20:00</p>
                  </div>
                  <div className="about-page__advantage">
                    <div className="about-page__advantage-icon">💰</div>
                    <h3>Доступные цены</h3>
                    <p>Предлагаем оптимальное соотношение цены и качества</p>
                  </div>
                  <div className="about-page__advantage">
                    <div className="about-page__advantage-icon">📞</div>
                    <h3>Круглосуточная поддержка</h3>
                    <p>Всегда готовы ответить на ваши вопросы</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="about-page__contact section">
              <div className="section__container container">
                <h2 className="section__title">Контакты</h2>
                <div className="about-page__contact-info">
                  <div className="about-page__contact-item">
                    <h3>Адрес</h3>
                    <p>г. Москва, ул. Ленина, д. 10</p>
                  </div>
                  <div className="about-page__contact-item">
                    <h3>Телефон</h3>
                    <p>+7 (495) 123-45-67</p>
                  </div>
                  <div className="about-page__contact-item">
                    <h3>Email</h3>
                    <p>info@urology-clinic.ru</p>
                  </div>
                  <div className="about-page__contact-item">
                    <h3>Время работы</h3>
                    <p>Пн-Пт: 8:00-20:00<br />Сб-Вс: 9:00-18:00</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
