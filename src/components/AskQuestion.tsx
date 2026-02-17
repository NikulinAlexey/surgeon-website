"use client";

import Section from "./Section";
import { useState } from "react";
import Button from "./ui/Button";

export default function AskQuestion() {
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);
    try {
      // Имитация отправки
      console.log("Отправка вопроса:", questionText);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setQuestionText("");
      setShowQuestionForm(false);
      alert("Вопрос отправлен!");
    } catch (error) {
      console.error("Ошибка отправки:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Section id="ask-question" title="Задать вопрос">
      <p className="text text--lg text--regular">
        Задайте вопрос нашим специалистам и получите консультацию.
      </p>
      <form onSubmit={handleSubmitQuestion} className="form">
        <textarea
          id=""
          name=""
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Введите ваш вопрос..."
          className="specialists-page__textarea"
          rows={4}
          disabled={isSubmitting}
          required
        />
        <div className="">
          <Button
            variant="danger"
            onClick={() => {
              setShowQuestionForm(false);
              setQuestionText("");
            }}
            text="Отмена"
          />
          <Button
            variant="secondary"
            type="submit"
            disabled={isSubmitting || !questionText.trim()}
            text={isSubmitting ? "Отправка..." : "Отправить вопрос"}
          />
        </div>
      </form>
    </Section>
  );
}
