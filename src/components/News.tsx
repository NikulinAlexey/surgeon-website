import NewsCard from "./NewsCard";
import SvgIcon from "./ui/SvgIcon";
import Button from "./ui/Button";

const newsCards = [
  {
    title: "Сэр Александр Флеминг",
    description:
      "британский микробиолог, первооткрыватель лизоцима и пенициллина — исторически первого антибиотика.",
    img: "/images/fleming.jpg",
    id: "qweasdasdasdasdasd",
    link: "example.com",
    date: "18.04.1997",
  },
  {
    title: "Сэр Александр Флеминг",
    description:
      "британский микробиолог, первооткрыватель лизоцима и пенициллина — исторически первого антибиотика.",
    img: "/images/fleming.jpg",
    id: "qweasdasdasdasd132",
    link: "example.com",
    date: "18.04.1997",
  },
  {
    title: "Сэр Александр Флеминг",
    description:
      "британский микробиолог, первооткрыватель лизоцима и пенициллина — исторически первого антибиотика.",
    img: "/images/fleming.jpg",
    id: "qweasdas3dedasdasd",
    link: "example.com",
    date: "18.04.1997",
  },
];

export default function News() {
  return (
    <section className="news section" id="news">
      <div className="news__container container">
        <div className="news__top section__top">
          <h2 className="news__title section__title text-gradient">Новости</h2>
          <div className="news__options section__options">
            <ul className="news__controlls section__controlls">
              <li className="news__control-item">
                <Button className="news__control-button button button--circle button--theme-light-outline button--lift">
                  <SvgIcon name="shevron" size="24" aria-hidden />
                </Button>
              </li>
              <li className="news__control-item">
                <Button className="news__control-button button button--circle button--theme-light-outline button--lift">
                  <SvgIcon name="shevron" size="24" aria-hidden />
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="news__body">
          <ul className="news__list">
            {newsCards.map(({ id, ...props }) => (
              <li className="news__item" key={id}>
                <NewsCard {...props} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
