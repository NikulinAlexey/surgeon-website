import Footer from "@/components/Footer";
import { Header } from "@/components/Header";

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
        <div className="container">
          
          <h1>Статья: {slug}</h1>
          {/* Отображаем контент статьи */}
        </div>
      </main>
      <Footer />
    </>
  );
}

// Для SEO - генерация метаданных
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = params;

  return {
    title: `Статья: ${slug}`,
    description: `Страница статьи ${slug}`,
  };
}
