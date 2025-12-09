import Button from "@/components/ui/Button";
import SvgIcon from "@/components/ui/SvgIcon";

export default function UiKitButtons() {
  return (
    <main className="layout__main">
      <div className="ui-kit container">
        <span className="text text--lg text--bold">Размеры</span>
        <Button size="sm" text="Small Size" />
        <Button size="md" text="Medium Size" />
        <Button size="lg" text="Large Size" />
        <hr />
        <span className="text text--lg text--bold">Темы</span>
        <Button variant="primary" text="Primary Theme" />
        <Button variant="secondary" text="Secondary Theme" />
        <Button variant="danger" text="Danger Theme" />
        <Button variant="outline" text="Outline Theme" />
        <Button variant="outline-inverted" text="Outline Inverted" />
        <Button variant="ghost" text="Ghost Theme" />
        <hr />
        <span className="text text--lg text--bold">Эффекты</span>
        <Button variant="primary" lifted text="Lifted Primary" />
        <Button variant="secondary" lifted text="Lifted Secondary" />
        <Button variant="danger" lifted text="Lifted Danger" />
        <Button variant="outline" lifted text="Lifted Outline" />
        <hr />
        <span className="text text--lg text--bold">Формы</span>
        <Button variant="primary" shape="circle">
          <SvgIcon name="info-circle" size="22" />
        </Button>
        <Button variant="secondary" shape="circle" size="lg">
          <SvgIcon name="info-circle" size="22" />
        </Button>
        <Button variant="ghost" shape="circle">
          <SvgIcon name="info-circle" size="22" />
        </Button>
        <hr />
        <span className="text text--lg text--bold">Комбинации</span>
        <Button
          variant="outline"
          size="sm"
          lifted
          text="Small Outline Lifted"
        />
        <Button
          variant="primary"
          size="lg"
          lifted
          text="Large Primary Lifted"
        />
        <Button variant="secondary" size="md" shape="circle" lifted>
          <SvgIcon name="info-circle" size="22" />
        </Button>
        <hr />
        <span className="text text--lg text--bold">Состояния</span>
        <Button variant="primary" disabled text="Disabled Primary" />
        <Button variant="secondary" disabled text="Disabled Secondary" />
        <Button variant="danger" disabled text="Disabled Danger" />
        <Button variant="outline" disabled text="Disabled Outline" />
        <hr />
        <span className="text text--lg text--bold">Типы кнопок</span>
        <Button type="button" variant="primary" text="Type Button" />
        <Button type="submit" variant="secondary" text="Type Submit" />
        <Button type="reset" variant="outline" text="Type Reset" />С иконками
        через children
        <Button variant="primary">
          <SvgIcon name="info-circle" size="14" />
          <span className="button__text">With Icon</span>
        </Button>
        <Button variant="secondary" lifted>
          <span className="button__text">Icon Right</span>
          <SvgIcon name="info-circle" size="14" />
        </Button>
        <hr />
        <span className="text text--lg text--bold">
          Круглые кнопки с иконками
        </span>
        <Button variant="primary" shape="circle">
          <SvgIcon name="info-circle" size="22" />
        </Button>
        <Button variant="secondary" shape="circle" lifted>
          <SvgIcon name="info-circle" size="22" />
        </Button>
        <hr />
        <span className="text text--lg text--bold">Сложные комбинации</span>
        <Button variant="primary" size="lg" lifted shape="circle">
          <SvgIcon name="reload" size="20" />
        </Button>
        <Button variant="outline-inverted" size="md" lifted disabled>
          <span className="button__text">Disabled Lifted Outline Inverted</span>
        </Button>
        <hr />
        <span className="text text--lg text--bold">
          Только иконка без текста
        </span>
        <Button variant="ghost" shape="circle">
          <SvgIcon name="edit" size="22" />
        </Button>
      </div>
    </main>
  );
}
