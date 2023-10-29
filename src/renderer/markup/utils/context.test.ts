import { describe, expect, test } from "vitest";

import { withIndentation, withNesting } from "unwritten:renderer/markup/utils/context.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Renderer", "utils", () => {

  describe("context", () => {

    test("withIndentation", () => {
      const ctx = createRenderContext();

      expect(ctx.indentation).toBe(0);

      withIndentation(ctx, ctx => {
        expect(ctx.indentation).toBe(1);
        withIndentation(ctx, ctx => {
          expect(ctx.indentation).toBe(2);
        });
        expect(ctx.indentation).toBe(1);
      });

      expect(ctx.indentation).toBe(0);
    });

    test("withNesting", () => {
      const ctx = createRenderContext();

      expect(ctx.nesting).toBe(1);

      withNesting(ctx, ctx => {
        expect(ctx.nesting).toBe(2);
        withNesting(ctx, ctx => {
          expect(ctx.nesting).toBe(3);
        });
        expect(ctx.nesting).toBe(2);
      });

      expect(ctx.nesting).toBe(1);
    });

  });

});
