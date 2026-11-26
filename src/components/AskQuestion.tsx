"use client";

import { useState } from "react";
import Section from "./Section";
import Button from "./ui/Button";

export default function AskQuestion({ email }: { email: string }) {
  const [questionText, setQuestionText] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!questionText.trim() || !email) return;
    const subject = encodeURIComponent("Вопрос специалистам с сайта");
    const body = encodeURIComponent(questionText.trim());
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="ask-question" title="Задать вопрос">
      <p className="text text--lg text--regular">
        Нажмите «Подготовить письмо»: вопрос откроется в вашей почтовой программе. Отправка выполняется через вашу почту.
      </p>
      <form onSubmit={handleSubmit} className="form">
        <label className="sr-only" htmlFor="specialist-question">Ваш вопрос</label>
        <textarea
          id="specialist-question"
          name="question"
          value={questionText}
          onChange={(event) => setQuestionText(event.target.value)}
          placeholder="Введите ваш вопрос..."
          className="specialists-page__textarea"
          rows={4}
          maxLength={5000}
          required
        />
        <div className="form-actions">
          <Button variant="outline" size="md" onClick={() => setQuestionText("")} text="Очистить" disabled={!questionText.trim()} />
          <Button
            variant="secondary"
            size="md"
            type="submit"
            disabled={!questionText.trim() || !email}
            text="Подготовить письмо"
          />
        </div>
      </form>
    </Section>
  );
}
