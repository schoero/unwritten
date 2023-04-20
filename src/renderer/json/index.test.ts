import { expect, it } from "vitest";

import { createFunctionEntity } from "unwritten:interpreter/ast/entities/index.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("JSONRenderer", "JSON", () => {

  {

    const testFileContent = ts`
      export function add(a: number, b: number): number {
        return a + b;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "add")!;
    const functionEntity = createFunctionEntity(ctx, symbol);

    it("should not export id's by default", () => {
      const ctx = createRenderContext(BuiltInRenderers.JSON);
      const renderedOutput = ctx.renderer.render(ctx, [functionEntity]);
      const json = JSON.parse(renderedOutput);
      expect(json[0].symbolId).to.equal(undefined);
    });

    it("should be possible to enable ids", () => {
      const ctx = createRenderContext(BuiltInRenderers.JSON);
      ctx.config.renderConfig.json.includeIds = true;
      const renderedOutput = ctx.renderer.render(ctx, [functionEntity]);
      const json = JSON.parse(renderedOutput);
      expect(json[0].symbolId).to.not.equal(undefined);
    });

  }

});
