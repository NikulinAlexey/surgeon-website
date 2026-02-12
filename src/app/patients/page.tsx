import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";

export default function PatientsPage() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <Banner
          title="Пациентам"
          subtitle="Общая информация для пациентов"
          backgroundImage="/images/doctor.jpg"
        />
        <div className="section__container">Patients</div>
      </main>
      <Footer />
    </>
  );
}
