"use client";
import News from "@/components/News";
import Reviews from "@/components/Reviews";
import Hero from "@/components/Hero";
import Articles from "@/components/Articles";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <Hero />
        <Articles />
        <News />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
