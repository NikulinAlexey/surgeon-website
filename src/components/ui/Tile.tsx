interface TileProps {
  title: string;
  description: string;
}

export default function Tile({ title, description }: TileProps) {
  return (
    <div className={"tile"}>
      <div className="tile__container">
        <p className="tile__title text text--md text--bold">{title}</p>
        <p className="tile__description text text--xs text--regular">
          {description}
        </p>
      </div>
    </div>
  );
}
