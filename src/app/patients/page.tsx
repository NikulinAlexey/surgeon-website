import {Header} from "@/components/Header";
import Footer from "@/components/Footer";

export default function Patients() {
  return (
    <div className="layout__grid">
      <Header />
      <main className="layout__main">
        <div className="container">ПАЦИЕНТАМ</div>
      </main>
      <Footer />
    </div>
  );
}
