import { Header } from "@/components/header/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import Employees from "@/components/ui/Employees";
import { FAQItem } from "@/types/components/faqItem";

export default function UrologicheskoeOtdeleniePage() {
  const faqData: FAQItem[] = [
    {
      id: "1",
      question: "Амбулаторная помощь по направлениям",
      answer:
        "Вы можете записаться на прием по телефону или через наш сайт. Мы работаем с понедельника по пятницу с 9:00 до 18:00.",
    },
    {
      id: "2",
      question: "Прием ведут профессора, кандидаты и доктора медицинских наук",
      answer:
        "Наша клиника предлагает широкий спектр медицинских услуг: консультации специалистов, диагностику, лечение и профилактику заболеваний.",
    },
    {
      id: "3",
      question: "Диагностика",
      answer:
        "Стоимость услуг зависит от вида медицинской помощи. Подробную информацию можно получить по телефону или на сайте в разделе 'Цены'.",
    },
    {
      id: "4",
      question: "Стационарная помощь по направлениям",
      answer:
        "В зависимости от вида обследования или консультации, может потребоваться предварительная подготовка. Наш администратор сообщит вам об этом при записи.",
    },
    {
      id: "5",
      question: "Мы проводим все виды операций",
      answer:
        "В выходные дни клиника работает по предварительной записи. Пожалуйста, уточните график по телефону.",
    },
  ];
  return (
    <>
      <Header />
      <main className="layout__main">
        <div className="section container">
          <h1 className="text text--xxl">Страница урологического отделения</h1>
        </div>

        {/* ниже будет паттерн, для несколькоих страниц */}
        <Employees />
        <Section id="make-appointment" title="Как записаться на прием">
          <div className="grid grid--col">
            <div className="text">
              Обращаем Ваше внимание, что изменился формат записи на плановую
              консультацию к специалистам в:
              <ul className="list list--ul">
                <li>Консультативно-диагностический центр (КДЦ)</li>
                <li>
                  Поликлиническое отделение Московского городского
                  офтальмологического центра (п/о МГОЦ)
                </li>
                <li>
                  Консультативно-диагностическое отделение Московского
                  урологического центра (МУЦ)
                </li>
              </ul>
            </div>
            <p className="text">
              Запись осуществляется только через Единый контакт-центр (ЕКЦ)
            </p>
            <p className="text">
              Телефон:{" "}
              <Link className="text" href="tel:+74994900303">
                +7 (499) 490-03-03
              </Link>{" "}
              или{" "}
              <Link className="text" href="tel:+78006003141">
                +7 (800) 600-31-41
              </Link>
            </p>
            <div className="text">
              <div>В Едином контакт-центре (ЕКЦ) Вы сможете:</div>
              <ul className="list list--ul">
                <li>Записаться на прием в КДЦ, КДО МУЦ, п/о МГОЦ</li>
                <li>Узнать об оказании платных услуг</li>
              </ul>
            </div>
            <div className="text">
              ЕКЦ для записи на консультацию работает:
              <ul className="list list--ul">
                <li>C 8:00 до 20:00 - в будни</li>
                <li>C 9:00 до 16:00 - в выходные</li>
              </ul>
            </div>{" "}
            <div className="text">
              О платных медицинских услугах и по всем вопросам, не касающимся
              записи на прием, контакт-центр ММНКЦ им. С.П. Боткина работает:
              <ul className="list list--ul">
                <li>С 08.00 до 20.00 - в будни</li>
                <li>С 08.00 до 18.00 - в выходные</li>
              </ul>
            </div>
            <p className="text">
              В случае если Ваш близкий человек госпитализирован в городской
              стационар, в Едином контакт-центре Вы сможете узнать о состоянии
              его здоровья.
            </p>{" "}
            <p className="text">
              Важно! Запись к врачам на консультацию по ОМС через сайт или в
              регистратуре более не доступна.
            </p>
          </div>
        </Section>
        <Section
          id="you-need-to-have-width-you"
          title="Что нужно иметь при себе"
        >
          Тут инфо о том, что нужно иметь при себе
        </Section>
        <FAQ id="faq-services" title="Услуги" faqData={faqData} />
      </main>
      <Footer />
    </>
  );
}
