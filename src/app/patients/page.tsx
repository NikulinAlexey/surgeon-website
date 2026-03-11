import Banner from "@/components/Banner";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";
import SvgIcon from "@/components/ui/SvgIcon";
import { FAQItem } from "@/types/components/faqItem";

export default function PatientsPage() {
  const faqData: FAQItem[] = [
    {
      id: "1",
      question: "Как записаться на прием?",
      answer:
        "Вы можете записаться на прием по телефону или через наш сайт. Мы работаем с понедельника по пятницу с 9:00 до 18:00.",
    },
    {
      id: "2",
      question: "Какие услуги предоставляет клиника?",
      answer:
        "Наша клиника предлагает широкий спектр медицинских услуг: консультации специалистов, диагностику, лечение и профилактику заболеваний.",
    },
    {
      id: "3",
      question: "Какова стоимость услуг?",
      answer:
        "Стоимость услуг зависит от вида медицинской помощи. Подробную информацию можно получить по телефону или на сайте в разделе 'Цены'.",
    },
    {
      id: "4",
      question: "Нужно ли предварительно готовиться к приему?",
      answer:
        "В зависимости от вида обследования или консультации, может потребоваться предварительная подготовка. Наш администратор сообщит вам об этом при записи.",
    },
    {
      id: "5",
      question: "Работает ли клиника в выходные?",
      answer:
        "В выходные дни клиника работает по предварительной записи. Пожалуйста, уточните график по телефону.",
    },
  ];
  return (
    <>
      <Header />
      <main className="layout__main">
        <Banner
          title="Пациентам"
          // subtitle="Общая информация для пациентов"
        />
        <FAQ faqData={faqData} id="for-patients" />
      </main>
      <Footer />
    </>
  );
}
