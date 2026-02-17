import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";
import Section from "@/components/Section";
import Link from "next/link";

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;

  // Здесь получаем данные новости по slug
  // const newsItem = await getNewsBySlug(slug);
  return (
    <>
      <Header />
      <main className="layout__main">
        <Section title={slug} id={`${{ slug }}-id`}>
          <div className="cms">
            <div>
              Приглашаем Вас принять участие в Междисциплинарной
              научно-практической конференции с международным участием
              «Поморские урологические чтения. Глава 4»
            </div>
            <div>
              Конференция посвящена 80-летию образования урологического
              отделения на базе ГБУЗАО «Первая ГКБ им Е.Е.Волосевич».
            </div>

            <div>
              Будут рассматриваться актуальные вопросы диагностики и лечения в
              сфере урогинекологии, андрологии, нейроурологии,
              инфекционно-воспалительных заболеваний, мочекаменной болезни.
            </div>
            <div>
              Планируется участие ведущих спикеров из различных городов России
              (Москва, Санкт-Петербург, Екатеринбург, Астрахань, Волгоград,
              Новосибирск и др.).
            </div>
            <div>
              По вопросам участия в конференции обращайтесь:
              <ul>
                <li>
                  Савельев Максим Викторович:
                  <ul>
                    <li>
                      тел: <Link href="tel:+79115516655">+7 911 551 66 55</Link>
                    </li>
                    <li>
                      e-mail:{" "}
                      <Link href="mailto:savdoc@yandex.ru">
                        savdoc@yandex.ru
                      </Link>
                    </li>
                  </ul>
                </li>
                <li>
                  Бузинов Денис Романович:
                  <ul>
                    <li>
                      тел: <Link href="tel:+79062836622">+7 906 283 66 22</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

// Для статического экспорта - генерация параметров
export async function generateStaticParams() {
  // Здесь получаем все возможные slug статей
  // const articles = await getAllArticles();
  // return articles.map((item) => ({ slug: item.slug }));

  // Пока фиктивные данные
  return [{ slug: "article-1" }, { slug: "article-2" }];
}

// Для SEO - генерация метаданных
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = params;

  return {
    title: `Статья: ${slug}`,
    description: `Страница статьи ${slug}`,
  };
}
