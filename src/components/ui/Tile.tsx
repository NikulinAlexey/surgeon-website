import Link from "next/link";
import { ReactNode } from "react";

interface TileProps {
  title: string;
  description: string | ReactNode;
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
    return (
      <span className={"tile"}>
        <span className="tile__container">
          <p className="tile__title text text--md text--bold">{title}</p>
          <p className="tile__description text text--xs text--regular">
            {description}
          </p>
        </span>
      </span>
    );
  }
}
