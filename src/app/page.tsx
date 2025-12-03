"use client";
import News from "@/components/news/News";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <Hero />

        {/* секции страницы */}
        <News />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
