import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import News from "@/components/News";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <div className="layout__grid">
      <Header />
      <main className="layout__main">
        <Reviews />
        <News />
      </main>
      <Footer />
    </div>
  );
}
