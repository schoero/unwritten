import { describe, expect, it } from "vitest";

import { escapeMarkdown } from "unwritten:renderer/markup/markdown/utils/escape.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";


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

  });
});
