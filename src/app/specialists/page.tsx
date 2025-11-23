import Articles from "@/components/Articles";

import Footer from "@/components/Footer";
import { Header } from "@/components/Header";
import Library from "@/components/Library";
import AskQuestion from "@/components/AskQuestion";
import Conferences from "@/components/Conferences";

export default function SpecialistPage() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <Articles />
        <Library />
        <Conferences />
        <AskQuestion />
      </main>
      <Footer />
    </>
  );
}
