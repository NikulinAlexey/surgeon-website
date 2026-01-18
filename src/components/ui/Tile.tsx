import Link from "next/link";

interface TileProps {
  title: string;
  description: string;
  href?: string;
}

export default function Tile({ title, description, href }: TileProps) {
  if (href) {
    return (
      <Link href={href} className={"tile"}>
        <span className="tile__container">
          <p className="tile__title text text--md text--bold">{title}</p>
          <p className="tile__description text text--xs text--regular">
            {description}
          </p>
        </span>
      </Link>
    );
  } else {
    <span className={"tile"}>
      <span className="tile__container">
        <p className="tile__title text text--md text--bold">{title}</p>
        <p className="tile__description text text--xs text--regular">
          {description}
        </p>
      </span>
    </span>;
  }
}
