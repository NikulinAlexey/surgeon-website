import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";
import SvgIcon from "@/components/ui/SvgIcon";
import Link from "next/link";

export default function ConferencesPage() {
  const pastTranslationsList = [
    {
      link: "https://vkvideo.ru/video-73332929_456262202",
      title: "Поморские урологические чтения, осень 2025, день 1",
    },
    {
      link: "https://vkvideo.ru/video-73332929_456262202",
      title: "Поморские урологические чтения, осень 2025, день 2",
    },
    {
      link: "https://vkvideo.ru/video-73332929_456262202",
      title: "Поморские урологические чтения, весна 2024, день 1",
    },
    {
      link: "https://vkvideo.ru/video-73332929_456262202",
      title: "Поморские урологические чтения, весна 2025, день 2",
    },
  ];
  return (
    <>
      <Header />
      <main className="layout__main">
        <Section
          title="Поморские урологические чтения"
          id="pomorskiye-urologicheskie-chteniya"
        >
          <div className="cms">
            <div>
              Приглашаем Вас принять участие в Междисциплинарной
              научно-практической конференции с международным участием
              «Поморские урологические чтения. Глава 4»
            </div>
            <div>
              Конференция посвящена 80-летию образования урологического
              отделения на базе ГБУЗАО «Первая ГКБ им Е.Е.Волосевич».
            </div>

            <div>
              Будут рассматриваться актуальные вопросы диагностики и лечения в
              сфере урогинекологии, андрологии, нейроурологии,
              инфекционно-воспалительных заболеваний, мочекаменной болезни.
            </div>
            <div>
              Планируется участие ведущих спикеров из различных городов России
              (Москва, Санкт-Петербург, Екатеринбург, Астрахань, Волгоград,
              Новосибирск и др.).
            </div>
            <div>
              По вопросам участия в конференции обращайтесь:
              <ul>
                <li>
                  Савельев Максим Викторович:
                  <ul>
                    <li>
                      тел: <Link href="tel:+79115516655">+7 911 551 66 55</Link>
                    </li>
                    <li>
                      e-mail:{" "}
                      <Link href="mailto:savdoc@yandex.ru">
                        savdoc@yandex.ru
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  Бузинов Денис Романович:
                  <ul>
                    <li>
                      тел: <Link href="tel:+79062836622">+7 906 283 66 22</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="Программа" id="program">
          <div className="cms">
            <div>
              <h3>
                <SvgIcon name="paper-airplane" size="24" /> Место проведения:
              </h3>
              <p>
                Агентство регионального развития, Набережная Северной Двины 71.
              </p>
            </div>
            <div>
              <h3>
                <SvgIcon name="calendar" size="24" /> Даты проведения:
              </h3>
              <p>25-26 сентября</p>
            </div>
          </div>
          <div className="program">
            {/* список дней */}
            <ol className="program__list">
              {/* день из программы */}
              <li className="program__item">
                <div className="day">
                  <p className="day__title text text--lg">25 декабря, день 1</p>
                  <ol className="day__list grid grid--col text">
                    <li className="day__list-item grid grid--cols-primary">
                      <span className="day__time">8:00 - 9:00</span>
                      <span className="day__text">Регистрация участников</span>
                    </li>
                    <li className="day__list-item grid grid--cols-primary">
                      <span className="day__time">8:00 - 9:00</span>
                      <span className="day__text">Регистрация участников</span>
                    </li>
                    <li className="day__list-item grid grid--cols-primary">
                      <span className="day__time">8:00 - 9:00</span>
                      <span className="day__text">Регистрация участников</span>
                    </li>
                    <li className="day__list-item grid grid--cols-primary">
                      <span className="day__time">8:00 - 9:00</span>
                      <span className="day__text">Регистрация участников</span>
                    </li>
                    <li className="day__list-item grid grid--cols-primary">
                      <span className="day__time">8:00 - 9:00</span>
                      <span className="day__text">Регистрация участников</span>
                    </li>
                  </ol>
                </div>
              </li>
            </ol>
          </div>
        </Section>

        <Section title="Регистрация" id="registration">
          <div className="cms">
            <div>
              Регистрации на Поморские урологические чтения проходит следующим
              образовом:
              <div>
                Далеко-далеко за словесными горами в стране гласных и согласных
                живут, рыбные тексты. Языкового заманивший собрал, на берегу
                дорогу своих знаках пор своего инициал меня ведущими, курсивных
                родного, взобравшись гор возвращайся обеспечивает над подпоясал!
              </div>
            </div>
          </div>
        </Section>

        <Section title="Трансляция" id="translation">
          Онлайн трансляция Поморских урологических чтений.
          {/* <UniversalVideoEmbed videoUrl="https://vkvideo.ru/video-73332929_456262202" /> */}
        </Section>

        <Section
          title="Архив проведенных урологических чтений"
          id="translations"
        >
          <div className="cms">
            <ol>
              {pastTranslationsList.map((pastTransLation, index) => (
                <li key={index}>
                  <Link
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    href={pastTransLation.link || ""}
                  >
                    {pastTransLation.title}
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
