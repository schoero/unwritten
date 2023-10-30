import { describe, expect, it, test } from "vitest";

import {
  renderMemberContext,
  withIndentation,
  withMemberContext,
  withNesting
} from "unwritten:renderer/markup/utils/context";
import { getRenderConfig } from "unwritten:renderer/utils/config";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";


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

    test("withMemberContext", () => {
      const ctx = createRenderContext();

      expect(ctx.memberContext).toStrictEqual([]);

      withMemberContext(ctx, "outer", ctx => {
        expect(ctx.memberContext).toStrictEqual(["outer"]);
        withMemberContext(ctx, "inner", ctx => {
          expect(ctx.memberContext).toStrictEqual(["outer", "inner"]);
        });
        expect(ctx.memberContext).toStrictEqual(["outer"]);
      });

      expect(ctx.memberContext).toStrictEqual([]);
    });

    describe("renderMemberContext", () => {

      it("should render the parent name by default", () => {
        const ctx = createRenderContext();

        expect(renderMemberContext(ctx, "documentation", "name")).toBe("name");
        expect(
          renderMemberContext({
            ...ctx,
            memberContext: ["outer"]
          }, "documentation", "name")
        ).toBe("outer.name");
        expect(
          renderMemberContext({
            ...ctx,
            memberContext: ["outer", "inner"]
          }, "documentation", "name")
        ).toBe("outer.inner.name");

      });

      it("should be possible to disable the rendering of the parent name", () => {
        const ctx = createRenderContext();
        const renderConfig = getRenderConfig(ctx);
        renderConfig.renderParentNames = false;

        expect(renderMemberContext(ctx, "documentation", "name")).toBe("name");
        expect(
          renderMemberContext({
            ...ctx,
            memberContext: ["outer"]
          }, "documentation", "name")
        ).toBe("name");
        expect(
          renderMemberContext({
            ...ctx,
            memberContext: ["outer", "inner"]
          }, "documentation", "name")
        ).toBe("name");
      });

    });

  });

});
