"use client";
import { useState } from "react";
import { cn } from "@/lib/clsx";
import SvgIcon from "./ui/SvgIcon";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

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

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <section className="faq section" id="faq">
      <div className="faq__container container">
        <div className="faq__top section__top">
          <h2 className="faq__title section__title">
            Часто задаваемые вопросы
          </h2>
        </div>
        <div className="faq__body">
          <ul className="faq__accordion">
            {faqData.map((item) => (
              <li
                key={item.id}
                className={cn("faq__item", { _active: openItems.has(item.id) })}
              >
                <button
                  className="faq__trigger btn"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={openItems.has(item.id)}
                >
                  <span className="faq__trigger-text">{item.question}</span>
                  <SvgIcon
                    className="faq__icon"
                    name="shevron"
                    size="16"
                    aria-hidden
                  />
                </button>
                {openItems.has(item.id) && (
                  <div className="faq__answer">{item.answer}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
