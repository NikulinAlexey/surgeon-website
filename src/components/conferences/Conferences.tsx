import Section from "../Section";
import ButtonLink from "../ui/ButtonLink";

export default function Conferences() {
  return (
    <Section id="conferences" title="Конференции">
      <p className="text text--lg text--regular">Информация о предстоящих конференциях и мероприятиях.</p>
      <ButtonLink variant="primary" href="/conferences" className="">
        Перейти на страницу конференций
      </ButtonLink>
    </Section>
  );
}