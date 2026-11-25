import { describe, expect, it } from "vitest";
import { cleanHtml, cleanText } from "../../src/lib/sanitize";

describe("HTML sanitization", () => {
  it("removes executable and unsafe content", () => {
    const result = cleanHtml('<p>Текст</p><script>alert(1)</script><a href="javascript:alert(1)">ссылка</a><img src="x" onerror="alert(1)">');
    expect(result).toContain("<p>Текст</p>");
    expect(result).not.toContain("script");
    expect(result).not.toContain("javascript:");
    expect(result).not.toContain("onerror");
  });

  it("keeps supported editorial markup and secures external links", () => {
    const result = cleanHtml('<h2>Заголовок</h2><ul><li><strong>Пункт</strong></li></ul><a href="https://example.com">Сайт</a>');
    expect(result).toContain("<h2>Заголовок</h2>");
    expect(result).toContain("<strong>Пункт</strong>");
    expect(result).toContain('target="_blank"');
    expect(result).toContain('rel="noopener noreferrer"');
  });

  it("strips all markup from plain-text fields", () => {
    expect(cleanText("  <b>Заголовок</b><script>x</script>  ")).toBe("Заголовок");
  });
});
