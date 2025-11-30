import Link from "next/link";

export default function Ui() {
  const pages = [
    {
      title: "Типографика",
      link: "typography",
    },
    {
      title: "Кнопки",
      link: "buttons",
    },
  ];
  return (
    <main className="layout__main">
      <div className="container">
        <ul className="ui-kit">
          {pages.map((page, index) => (
            <li key={index}>
              <Link href={`/ui-kit/${page.link}`}>{page.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
