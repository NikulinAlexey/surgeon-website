// components/Header/Header.tsx
import { Header } from "@/components/header/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Swiper from "swiper";
import { SWIPER_CONFIGS } from "@/config/swiper-configs";
import Employees from "@/components/ui/Employees";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="layout__main">
        Страница амбулаторного отделения
        {/* ниже будет паттерн, для несколькоих страниц */}
        <Employees />
        <Section title="Информация для пациентов">
          <div>Как записаться</div>
          <div>Что нужно иметь при себе</div>
        </Section>
        <Section title="Услуги">
          <div>аккордеон или свайпер с услугами</div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
