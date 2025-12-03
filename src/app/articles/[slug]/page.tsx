import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";

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

// Для статического экспорта - генерация параметров
export async function generateStaticParams() {
  // Здесь получаем все возможные slug статей
  // const articles = await getAllArticles();
  // return articles.map((item) => ({ slug: item.slug }));

  // Пока фиктивные данные
  return [
    { slug: 'article-1' },
    { slug: 'article-2' },
  ];
}

// Для SEO - генерация метаданных
export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = params;

  return {
    title: `Статья: ${slug}`,
    description: `Страница статьи ${slug}`,
  };
}
