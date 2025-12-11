import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";

export default function ConferencesPage() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <Banner
          title="Коференции"
          subtitle="Информация по конференциям"
          backgroundImage="/images/doctor.jpg"
        />
        <div className="container">Conferences</div>
      </main>
      <Footer />
    </>
  );
}
