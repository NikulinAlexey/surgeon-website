import Link from "next/link";

export default function Ui() {
  const pages = [
    {
      title: "Типографика",
      link: "typography",
    },
  ];
  return (
    <main className="layout__main">
      <div className="ui-kit container">
        <ul>
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
