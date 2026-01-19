"use client";
import { useState } from "react";
import { cn } from "@/lib/clsx";
import SvgIcon from "./ui/SvgIcon";
import Section from "./Section";

import { FAQItem } from "@/types/components/faqItem";

interface FAQProps {
  faqData: FAQItem[];
  title?: string;
  id: string;
}
export default function FAQ({ faqData, title, id }: FAQProps) {
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
    <Section id={id} title={title}>
      <div className="faq">
        <div className="faq__body">
          <ul className="faq__accordion">
            {faqData.map((item: FAQItem) => (
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
    </Section>
  );
}
