import Footer from "@/components/Footer";
import { Header } from "@/components/Header";

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

// Для SEO - генерация метаданных
export async function generateMetadata({ params }: NewsPageProps) {
  const { slug } = params;

  return {
    title: `Новость: ${slug}`,
    description: `Страница новости ${slug}`,
  };
}
