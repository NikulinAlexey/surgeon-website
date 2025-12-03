import Articles from "@/components/articles/Articles";

import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Library from "@/components/specialists/Library";
import AskQuestion from "@/components/AskQuestion";
import Conferences from "@/components/conferences/Conferences";

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
