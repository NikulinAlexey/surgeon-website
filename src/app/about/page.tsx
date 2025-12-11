// components/Header/Header.tsx
"use client";
import { Header } from "@/components/header/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import Section from "@/components/Section";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <Banner
          title="О нашей клинике урологии"
          subtitle="Современная урологическая клиника с многолетним опытом лечения заболеваний мочеполовой системы"
          backgroundImage="/images/doctor.jpg"
        />

        <Section id="about" title="О клинике">
          <div className="about">
            <p className="about__text text text--lg text--regular">
              Наша клиника урологии — это современное медицинское учреждение,
              специализирующееся на диагностике и лечении заболеваний
              мочеполовой системы у мужчин и женщин. Мы предоставляем полный
              спектр урологических услуг с использованием новейших технологий и
              оборудования.
            </p>
            <p className="about__text text text--lg text--regular">
              Клиника была основана в 2010 году группой ведущих урологов с
              многолетним опытом работы. За годы работы мы помогли тысячам
              пациентов восстановить здоровье и качество жизни.
            </p>
            <p className="about__text text text--lg text--regular">
              Мы гордимся тем, что наша клиника соответствует самым высоким
              стандартам медицинской помощи и использует только проверенные и
              эффективные методы лечения.
            </p>
          </div>
          <div className="about__picture">
            <Image
              width="400"
              height="400"
              className="about__image"
              alt="Клиника урологии"
              src="/surgeon-website/images/doctor.jpg"
            />
          </div>
        </Section>

        <Section id="services" title="Наши услуги">
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
        </Section>

        <Section id="team" title="Наша команда">
          <div className="about-page__doctor-card">
            <div className="about-page__doctor-photo">
              <Image
                width="400"
                height="400"
                className="about__image"
                alt="Клиника урологии"
                src="/surgeon-website/images/doctor.jpg"
              />
            </div>
            <h3>Иванов Иван Иванович</h3>
            <p className="about-page__doctor-specialty">
              Главный уролог, кандидат медицинских наук
            </p>
            <p className="about-page__doctor-experience">Опыт работы: 15 лет</p>
          </div>
          <div className="about-page__doctor-card">
            <div className="about-page__doctor-photo">
              <Image
                width="400"
                height="400"
                className="about__image"
                alt="Клиника урологии"
                src="/surgeon-website/images/doctor.jpg"
              />
            </div>
            <h3>Петров Петр Петрович</h3>
            <p className="about-page__doctor-specialty">Уролог-андролог</p>
            <p className="about-page__doctor-experience">Опыт работы: 10 лет</p>
          </div>
          <div className="about-page__doctor-card">
            <div className="about-page__doctor-photo">
              <Image
                width="400"
                height="400"
                className="about__image"
                alt="Клиника урологии"
                src="/surgeon-website/images/doctor.jpg"
              />
            </div>
            <h3>Сидорова Анна Михайловна</h3>
            <p className="about-page__doctor-specialty">Уролог-гинеколог</p>
            <p className="about-page__doctor-experience">Опыт работы: 12 лет</p>
          </div>
        </Section>

        <Section id="why" title="Почему выбирают нас">
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
        </Section>
      </main>
      <Footer />
    </>
  );
}
