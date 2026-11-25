import { describe, expect, it } from "vitest";
import { createToken, hashToken, normalizeEmail, safeNextPath } from "../../src/lib/security";

describe("security helpers", () => {
  it("creates unique high-entropy tokens and stores only deterministic hashes", () => {
    const first = createToken();
    const second = createToken();
    expect(first).not.toBe(second);
    expect(first.length).toBeGreaterThanOrEqual(40);
    expect(hashToken(first)).toMatch(/^[a-f0-9]{64}$/);
    expect(hashToken(first)).toBe(hashToken(first));
    expect(hashToken(first)).not.toBe(hashToken(second));
  });

  it("normalizes email addresses", () => {
    expect(normalizeEmail("  User@Example.COM ")).toBe("user@example.com");
  });

  it.each(["/profile", "/admin/content?filter=draft", "/#news"])(
    "allows local redirect %s",
    (path) => expect(safeNextPath(path)).toBe(path),
  );

  it.each([null, "", "https://evil.example", "//evil.example", "/\\evil.example", "/profile\nLocation: evil"]) (
    "rejects unsafe redirect %s",
    (path) => expect(safeNextPath(path)).toBe("/profile"),
  );
});
