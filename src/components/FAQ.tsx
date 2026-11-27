"use client";

import { useState } from "react";
import SvgIcon from "./ui/SvgIcon";
import Section from "./Section";
import { FAQItem } from "@/types/components/faqItem";
import { cn } from "@/lib/clsx";

interface FAQProps {
  faqData: FAQItem[];
  title?: string;
  id: string;
}

export default function FAQ({ faqData, title, id }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    setOpenItems((current) => {
      const next = new Set(current);
      if (next.has(itemId)) next.delete(itemId);
      else next.add(itemId);
      return next;
    });
  };

  return (
    <Section id={id} title={title}>
      <div className="faq">
        <div className="faq__body">
          <ul className="faq__accordion">
            {faqData.map((item: FAQItem) => {
              const isOpen = openItems.has(item.id);
              const answerId = `${id}-${item.id}-answer`;
              return (
                <li key={item.id} className={cn("faq__item", { _active: isOpen })}>
                  <button
                    type="button"
                    className="faq__trigger"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="faq__trigger-text">{item.question}</span>
                    <SvgIcon className="faq__icon" name="shevron" size="16" aria-hidden />
                  </button>
                  <div
                    id={answerId}
                    className="faq__answer-wrapper"
                    role="region"
                    aria-label={`Ответ: ${item.question}`}
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                  >
                    <div className="faq__answer">{item.answer}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
