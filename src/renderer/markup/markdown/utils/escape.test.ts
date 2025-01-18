import { escapeMarkdown } from "unwritten:renderer/markup/markdown/utils/escape";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";
import { describe, expect, it } from "vitest";


scope("Renderer", "Render abstraction", () => {
  describe("escapeMarkdown", () => {

    it("should escape '[' and ']'", () => {
      const testString = md`
        [ and ] should be escaped
      `;
      expect(escapeMarkdown(testString)).toBe(md`
        \\[ and \\] should be escaped
      `);
    });

    it("should not escape links", () => {
      const testString = md`
        links should [not be escaped](https://example.com)
      `;
      expect(escapeMarkdown(testString)).toBe(testString);
    });

    it("should not escape checkboxes", () => {
      const testString = md`
        [ ] and [x] should not be escaped
      `;
      expect(escapeMarkdown(testString)).toBe(testString);
    });

    it("should not escape inline code blocks", () => {
      const testString = md`
        should escape [ and ] in normal text but \`should not escape [ and ] in code blocks\`
      `;
      expect(escapeMarkdown(testString)).toBe(md`
        should escape \\[ and \\] in normal text but \`should not escape [ and ] in code blocks\`
      `);
    });

    it("should not escape inside code fences", () => {
      const testString = md`
        outside [ and ] should be escaped
        \`\`\`
        inside anonymous code fences [ and ] should not be escaped
        \`\`\`
        outside [ and ] should be escaped
        \`\`\`ts
        inside named code fences [ and ] should not be escaped
        \`\`\`
        outside [ and ] should be escaped
      `;
      expect(escapeMarkdown(testString)).toBe(md`
        outside \\[ and \\] should be escaped
        \`\`\`
        inside anonymous code fences [ and ] should not be escaped
        \`\`\`
        outside \\[ and \\] should be escaped
        \`\`\`ts
        inside named code fences [ and ] should not be escaped
        \`\`\`
        outside \\[ and \\] should be escaped
      `);
    });

    it("should not be possible to double escape", () => {
      const testString = md`
        should escape [ and ] only once, even if escaped twice
      `;
      expect(escapeMarkdown(escapeMarkdown(testString))).toBe(md`
        should escape \\[ and \\] only once, even if escaped twice
      `);
    });

    it("should also work when no previous and trailing text is available", () => {
      const testString = md`
        \`\`\`ts
        inside named code fences [ and ] should not be escaped
        \`\`\`
      `;
      expect(escapeMarkdown(escapeMarkdown(testString))).toBe(md`
        \`\`\`ts
        inside named code fences [ and ] should not be escaped
        \`\`\`
      `);
    });

    it("should preserve indentation", () => {
      const testString = md`
        should preserve indentation
          before code fences
          \`\`\`ts
          inside code fences
          \`\`\`
          and after code fences
      `;
      expect(escapeMarkdown(testString)).toBe(md`
        should preserve indentation
          before code fences
          \`\`\`ts
          inside code fences
          \`\`\`
          and after code fences
      `);
    });

    it("should preserve empty lines", () => {
      const testString = md`
        should preserve empty lines

          before code fences

          \`\`\`ts
          inside code fences

          inside code fences
          \`\`\`

          and after code fences
      `;
      expect(escapeMarkdown(testString)).toBe(md`
        should preserve empty lines

          before code fences

          \`\`\`ts
          inside code fences

          inside code fences
          \`\`\`

          and after code fences
      `);
    });

  });
});
