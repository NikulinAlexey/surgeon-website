"use client";
import News from "@/components/News";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <Hero />
        <News />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
