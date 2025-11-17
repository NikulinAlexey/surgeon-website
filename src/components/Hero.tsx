import Link from "next/link";
import Button from "./ui/Button";
import ButtonLink from "./ui/ButtonLink";

export default function Hero({
  title = "Архангельский региональный урологический центр.",
  description = "Первый урологический центр Поморья.",
}) {
  return (
    <section className="hero section decorated-bg">
      <div className="hero__container container">
        <div className="hero__body">
          <h1 className="hero__title">{title}</h1>
          <p className="hero__description">{description}</p>

          <ul className="grid grid--buttons">
            <li className="grid__item">
              <ButtonLink href="/auth" text="button" className="button" />
            </li>
            <li className="grid__item">
              <ButtonLink
                href="/auth"
                text="button--size-sm"
                className="button button--size-sm"
              />
            </li>
            <li className="grid__item">
              <ButtonLink
                href="/auth"
                className="button button--size-md"
                text="button--size-md"
              />
            </li>
            <li className="grid__item">
              <ButtonLink
                href="/auth"
                text="button--size-lg"
                className="button button--size-lg"
              />
            </li>
            <li className="grid__item">
              <Button className="button" text="button" />
            </li>
            <li className="grid__item">
              <Button
                className="button button--size-sm"
                text="button-size-sm"
              />
            </li>
            <li className="grid__item">
              <Button
                className="button button--size-md"
                text="button-size-md"
              />
            </li>
            <li className="grid__item">
              <Button
                className="button button--size-lg"
                text="button-size-lg"
              />
            </li>
            <li className="grid__item">
              <Button
                className="button button--theme-primary"
                text="button button--theme-primary"
              />
            </li>
            <li className="grid__item">
              <Button
                className="button button--size-sm button--theme-secondary"
                text="button-size-sm button--theme-secondary"
              />
            </li>
            <li className="grid__item">
              <Button
                className="button button--size-md button--theme-outline"
                text="button-size-md button--theme-outline"
              />
            </li>
            <li className="grid__item">
              <Button
                className="button button--size-lg button--theme-ghost"
                text="button-size-lg button--theme-ghost"
              />
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
