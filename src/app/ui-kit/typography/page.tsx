export default function UiKitTypography() {
  return (
    <main className="layout__main">
      <div className="ui-kit container">
        {/* <!-- Самый крупный текст (для акцентов, больших цифр) --> */}
        <div className="text text--xxl text--bold">Крупный акцентный текст</div>

        {/* <!-- Крупный текст (лиды, вводные абзацы) --> */}
        <div className="text text--xl text--regular">
          Вводный текст страницы или раздела
        </div>

        {/* <!-- Основной текст для чтения --> */}
        <div className="text text--lg text--regular">
          Основной текст параграфов для комфортного чтения
        </div>

        {/* <!-- Стандартный текст (по умолчанию) --> */}
        <div className="text text--md text--regular">
          Стандартный текст для большинства случаев
        </div>

        {/* <!-- Мелкий текст (подписи, доп. информация) --> */}
        <div className="text text--sm text--regular">
          Вспомогательная информация и подписи
        </div>

        {/* <!-- Самый мелкий текст (метки, микро-текст) --> */}
        <div className="text text--xs text--regular">
          Метки, микро-текст, юридическая информация
        </div>

        {/* <!-- Текст с разными весами --> */}
        <div className="text text--md text--light">
          Текст с легким начертанием
        </div>
        <div className="text text--md text--regular">
          Текст с обычным начертанием
        </div>
        <div className="text text--md text--semibold">
          Текст с полужирным начертанием
        </div>
        <div className="text text--md text--bold">
          Текст с жирным начертанием
        </div>

        {/* <!-- Текст с разными цветами --> */}
        <div className="text text--md text--regular text--muted">
          Приглушенный серый текст
        </div>
        <div className="text text--md text--regular text--primary">
          Текст основного цвета бренда
        </div>
        <div className="text text--md text--regular text--success">
          Текст успешного действия
        </div>
        <div className="text text--md text--regular text--error">
          Текст ошибки или предупреждения
        </div>
        <div className="text text--md text--regular text--white">
          Белый текст (для темного фона)
        </div>

        {/* <!-- Текст с разным выравниванием --> */}
        <div className="text text--md text--regular text--left">
          Текст выровненный по левому краю
        </div>
        <div className="text text--md text--regular text--center">
          Текст выровненный по центру
        </div>
        <div className="text text--md text--regular text--right">
          Текст выровненный по правому краю
        </div>

        {/* <!-- Текст с трансформацией --> */}
        <div className="text text--md text--regular text--uppercase">
          Текст в верхнем регистре
        </div>
        <div className="text text--md text--regular text--lowercase">
          ТЕКСТ В НИЖНЕМ РЕГИСТРЕ
        </div>
        <div className="text text--md text--regular text--capitalize">
          текст с заглавными буквами каждого слова
        </div>

        {/* <!-- Комбинации модификаторов --> */}
        <div className="text text--lg text--bold text--primary text--center">
          Крупный жирный текст основного цвета по центру
        </div>
        <div className="text text--sm text--semibold text--muted text--uppercase">
          Мелкий полужирный приглушенный текст в верхнем регистре
        </div>
        <div className="text text--xs text--regular text--error">
          Очень мелкий текст ошибки
        </div>

        {/* <!-- Текст с обрезкой --> */}
        <div className="text text--md text--regular text--truncate">
          Очень длинный текст который будет обрезан с многоточием в конце
        </div>

        {/* <!-- Практические примеры использования --> */}
        <div className="text text--xxl text--bold text--primary">56px</div>
        <div className="text text--xl text--semibold">34px</div>
        <div className="text text--lg text--regular">24px</div>
        <div className="text text--md text--regular">18px</div>
        <div className="text text--sm text--muted">16px</div>
        <div className="text text--xs text--muted">14px</div>
      </div>
    </main>
  );
}
