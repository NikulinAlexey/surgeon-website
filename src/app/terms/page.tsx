"use client";

import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";

export default function PrivacyPage() {
  
  return (
    <>
      <Header />
      <main className="layout__main">
        <Section
          title="Пользовательское соглашение"
          id="terms"
        >
          Пользовательское соглашение
        </Section>
      </main>
      <Footer />
    </>
  );
}
