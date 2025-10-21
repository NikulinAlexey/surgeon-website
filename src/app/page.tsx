"use client";
import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import News from "@/components/News";
import Reviews from "@/components/Reviews";
import Hero from "@/components/Hero";
import Articles from "@/components/Articles";
  
export default function Home() {
  return (
    <div className="layout__grid">
      <Header />
      <main className="layout__main">
        <Hero />
        <Articles />
        <News />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
