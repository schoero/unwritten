import { describe, expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { startsWithEmptyLine } from "unwritten:renderer/markup/markdown/utils/empty-line.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";


scope("Renderer", "Render abstraction", () => {
  describe("empty-line", () => {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    it("should always detect empty lines", () => {
      expect(
        startsWithEmptyLine(
          ctx,
          md`
            
            Starts with empty line
          `
        )
      ).toBe(true);

      expect(
        startsWithEmptyLine(
          ctx,
          md`
              
            Starts with empty line
          `
        )
      ).toBe(true);

      expect(
        startsWithEmptyLine(
          ctx,
          md`
                   
            Starts with empty line
          `
        )
      ).toBe(true);

      expect(
        startsWithEmptyLine(
          ctx,
          md`
            
            
            Starts with empty line
          `
        )
      ).toBe(true);

      expect(
        startsWithEmptyLine(
          ctx,
          md`
            Does not start with empty line
          `
        )
      ).toBe(false);

    });

  });
});
