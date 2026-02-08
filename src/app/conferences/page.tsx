import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";
import Link from "next/link";

export default function ConferencesPage() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <Section
          title="Поморские урологические чтения"
          id="pomorskiye-urologicheskie-chteniya"
        >
          <div className="cms">
            <p>
              Приглашаем Вас принять участие в Междисциплинарной
              научно-практической конференции с международным участием
              «Поморские урологические чтения. Глава 4»
            </p>
            <p>
              Конференция посвящена 80-летию образования урологического
              отделения на базе ГБУЗАО «Первая ГКБ им Е.Е.Волосевич».
            </p>

            <p>
              Будут рассматриваться актуальные вопросы диагностики и лечения в
              сфере урогинекологии, андрологии, нейроурологии,
              инфекционно-воспалительных заболеваний, мочекаменной болезни.
            </p>
            <p>
              Планируется участие ведущих спикеров из различных городов России
              (Москва, Санкт-Петербург, Екатеринбург, Астрахань, Волгоград,
              Новосибирск и др.).
            </p>
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
                  <p>
                    тел: <Link href="tel:+79062836622">+7 906 283 66 22</Link>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="Программа" id="program">
          <p className="text">
            Место проведения: Агентство регионального развития, Набережная
            Северной Двины 71
          </p>
        </Section>

        <Section title="Регистрация" id="registration">
          Контент регистрации на Поморские урологические чтения
        </Section>

        <Section title="Трансляция" id="translation">
          Контент трансляции Поморских урологических чтений. Возможно тут будет
          тег video
        </Section>

        <Section title="Трансляция" id="translation">
          Контент список прошедших урологических чтений. Список из ссылок на
          веб-ресуры по типу ВК видео, Рутуб
        </Section>
      </main>
      <Footer />
    </>
  );
}
