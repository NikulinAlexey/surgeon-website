import Footer from "@/components/Footer";
import { Header } from "@/components/header/Header";

interface NewsPageProps {
  params: {
    slug: string;
  };
}

export default function NewsPage({ params }: NewsPageProps) {
  const { slug } = params;

  // Здесь получаем данные новости по slug
  // const newsItem = await getNewsBySlug(slug);
  return (
    <>
      <Header />
      <main className="layout__main">
        <div className="container">
          <h1>Новость: {slug}</h1>
          {/* Отображаем контент новости */}
        </div>
      </main>
      <Footer />
    </>
  );
}

// Для статического экспорта - генерация параметров
export async function generateStaticParams() {
  // Здесь получаем все возможные slug новостей
  // const news = await getAllNews();
  // return news.map((item) => ({ slug: item.slug }));

  // Пока фиктивные данные
  return [
    { slug: 'news-1' },
    { slug: 'news-2' },
  ];
}

// Для SEO - генерация метаданных
export async function generateMetadata({ params }: NewsPageProps) {
  const { slug } = params;

  return {
    title: `Новость: ${slug}`,
    description: `Страница новости ${slug}`,
  };
}
