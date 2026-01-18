import { Header } from "@/components/header/Header";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import Tile from "@/components/ui/Tile";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="layout__main">
        <Section title="О нас" id="about">
          <ul className="grid">
            <li className="grid__item">
              <Tile
                title="Амбулаторное отделение"
                href="/about/ambulatornoe-otdelenie"
                description="Страница абмулатрого отделения"
              />
            </li>
            <li className="grid__item">
              <Tile
                title="Дневной стационар"
                href="/about/dnevnoy-stacionar"
                description="Страница дневной стационара"
              />
            </li>
            <li className="grid__item">
              <Tile
                title="Урологическое отделение"
                href="/about/urologicheskoe-otdelenie"
                description="Страница урологического отделения"
              />
            </li>
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}
