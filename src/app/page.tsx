"use client";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import News from "@/components/News";
import Reviews from "@/components/Reviews";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="layout__grid">
      <Header />
      <main className="layout__main">
        <Hero />
        <Reviews />
        <News />
      </main>
      <Footer />
    </div>
  );
}
