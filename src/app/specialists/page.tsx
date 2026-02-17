"use client";
import Articles from "@/components/articles/Articles";

import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Library from "@/components/specialists/Library";
import AskQuestion from "@/components/AskQuestion";
import Conferences from "@/components/conferences/Conferences";
import Banner from "@/components/Banner";

export default function SpecialistPage() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <Banner
          title="Специалистам"
          // subtitle="Общая информация для специалистов"
        />
        <Articles />
        <Library />
        <Conferences />
        <AskQuestion />
      </main>
      <Footer />
    </>
  );
}
