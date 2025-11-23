import Link from "next/link";
import Section from "./Section";

export default function Conferences() {
  return (
    <Section id="conferences" title="Конференции">
      <p className="text text--lg text--regular">Информация о предстоящих конференциях и мероприятиях.</p>
      <Link href="/conferences" className="">
        Перейти к конференциям
      </Link>
    </Section>
  );
}
