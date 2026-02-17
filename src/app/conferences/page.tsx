"use client";

import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";
import Button from "@/components/ui/Button";
import ButtonLink from "@/components/ui/ButtonLink";
import Field from "@/components/ui/Field";
import Modal from "@/components/ui/Modal";
import SvgIcon from "@/components/ui/SvgIcon";
import Link from "next/link";
import { useState } from "react";

interface FormData {
  email: string;
  name: string;
}

export default function ConferencesPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isRegistrationModalOpened, setIsRegistrationModalOpened] =
    useState(false);
  const [
    isRegistrationSuccessModalOpened,
    setIsRegistrationSuccessModalOpened,
  ] = useState(false);
  const [isRegistrationFailModalOpened, setIsRegistrationFailModalOpened] =
    useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email обязателен";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Некорректный email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Имитация запроса
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Здесь будет реальный запрос
      // const response = await authApi[authMode](formData);
      console.log("Форма успешно отправлена");
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    } finally {
      setIsLoading(false);
      setFormData({
        email: "",
        name: "",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const getSubmitButtonText = () => {
    if (isLoading) {
      return "Загрузка...";
    } else {
      return "Зарегистрироваться";
    }
  };

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
          <div className="grid grid--wrap-fit">
            <ButtonLink variant="primary" href="#" download>
              Скачать информационное письмо
            </ButtonLink>
            <Button
              variant="secondary"
              onClick={() => setIsRegistrationModalOpened(true)}
            >
              Регистрация на вебинар
            </Button>
          </div>
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
                <SvgIcon name="paper-airplane" size="20" /> Место проведения:
              </h3>
              <p>
                Агентство регионального развития, Набережная Северной Двины 71.
              </p>
            </div>
            <div>
              <h3>
                <SvgIcon name="calendar" size="20" /> Даты проведения:
              </h3>
              <p>25-26 сентября</p>
            </div>
          </div>
          <div className="program">
            {/* список дней */}
            <ol className="program__list grid grid--col">
              {/* день из программы */}
              <li className="program__item grid grid--col">
                <div className="grid grid--col">
                  <p className="text text--lg">25 декабря, день 1</p>
                  <ol className="grid grid--col grid--gap-sm text">
                    <li className="grid grid--cols-primary grid--gap-sm">
                      <span className="text text--bold">8:00 - 9:00</span>
                      <span className="text">Регистрация участников</span>
                    </li>
                    <li className="grid grid--cols-primary grid--gap-sm">
                      <span className="text text--bold">8:00 - 9:00</span>
                      <span className="text">Регистрация участников</span>
                    </li>
                    <li className="grid grid--cols-primary grid--gap-sm">
                      <span className="text text--bold">8:00 - 9:00</span>
                      <span className="text">Регистрация участников</span>
                    </li>
                    <li className="grid grid--cols-primary grid--gap-sm">
                      <span className="text text--bold">8:00 - 9:00</span>
                      <span className="text">Регистрация участников</span>
                    </li>
                    <li className="grid grid--cols-primary grid--gap-sm">
                      <span className="text text--bold">8:00 - 9:00</span>
                      <span className="text">Регистрация участников</span>
                    </li>
                  </ol>
                </div>
              </li>
              <li className="program__item grid grid--col">
                <div className="grid grid--col">
                  <p className="text text--lg">26 декабря, день 2</p>
                  <ol className="grid grid--col grid--gap-sm text">
                    <li className="grid grid--cols-primary grid--gap-sm">
                      <span className="text text--bold">8:00 - 9:00</span>
                      <span className="text">Регистрация участников</span>
                    </li>
                    <li className="grid grid--cols-primary grid--gap-sm">
                      <span className="text text--bold">8:00 - 9:00</span>
                      <span className="text">Регистрация участников</span>
                    </li>
                    <li className="grid grid--cols-primary grid--gap-sm">
                      <span className="text text--bold">8:00 - 9:00</span>
                      <span className="text">Регистрация участников</span>
                    </li>
                    <li className="grid grid--cols-primary grid--gap-sm">
                      <span className="text text--bold">8:00 - 9:00</span>
                      <span className="text">Регистрация участников</span>
                    </li>
                    <li className="grid grid--cols-primary grid--gap-sm">
                      <span className="text text--bold">8:00 - 9:00</span>
                      <span className="text">Регистрация участников</span>
                    </li>
                  </ol>
                </div>
              </li>
            </ol>
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

        <Modal
          id="registration"
          title="Регистрация на семинар"
          isOpen={isRegistrationModalOpened}
          onModalClose={() => setIsRegistrationModalOpened(false)}
        >
          <form className="form form--layout-gap-lg" onSubmit={handleSubmit}>
            <div className="form__container">
              <div className="form__layout">
                <fieldset className="form__fieldset">
                  <Field
                    label="Email"
                    type="email"
                    id="email"
                    name="email"
                    variant="primary"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="your@email.com"
                    disabled={isLoading}
                    onReset={() =>
                      setFormData((prev) => ({ ...prev, email: "" }))
                    }
                  />
                  <Field
                    label="Имя"
                    type="text"
                    id="name"
                    name="name"
                    variant="primary"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    placeholder="Введите имя"
                    disabled={isLoading}
                    onReset={() =>
                      setFormData((prev) => ({
                        ...prev,
                        name: "",
                      }))
                    }
                  />
                </fieldset>
                <div className="auth__actions">
                  <Button
                    size="lg"
                    wide
                    type="submit"
                    variant="secondary"
                    className="auth__action"
                    disabled={isLoading}
                  >
                    {getSubmitButtonText()}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Modal>
        <Modal
          id="registration-fail"
          title="Ошибка при регистрации на семинар"
          isOpen={isRegistrationFailModalOpened}
          onModalClose={() => setIsRegistrationFailModalOpened(false)}
        >
          При регистрации на семинар произошла ошибка
        </Modal>
        <Modal
          id="registration-success"
          title="Вы успешно зарегистрировались на семинар"
          isOpen={isRegistrationSuccessModalOpened}
          onModalClose={() => setIsRegistrationSuccessModalOpened(false)}
        >
          Успешная регистрация на семинар
        </Modal>
      </main>
      <Footer />
    </>
  );
}
