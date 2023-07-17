import { expect, it } from "vitest";

import { createSourceFileEntity } from "unwritten:interpreter/ast/entities/index.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("JSONRenderer", "JSON", () => {

  {

    const testFileContent = ts`
      export function add(a: number, b: number): number {
        return a + b;
      }
    `;

    const { ctx, fileSymbols } = compile(testFileContent);

    const fileEntities = fileSymbols.map(fileSymbol => createSourceFileEntity(ctx, fileSymbol));

    it("should not export id's by default", () => {
      const ctx = createRenderContext(BuiltInRenderers.JSON);
      const renderedOutput = ctx.renderer.render(ctx, fileEntities);
      const json = JSON.parse(Object.values(renderedOutput)[0]).exports;
      expect(json[0].symbolId).toBeUndefined();
    });

    it("should be possible to enable ids", () => {
      const ctx = createRenderContext(BuiltInRenderers.JSON);
      ctx.config.renderConfig.json.includeIds = true;
      const renderedOutput = ctx.renderer.render(ctx, fileEntities);
      const json = JSON.parse(Object.values(renderedOutput)[0]).exports;
      expect(json[0].symbolId).toBeDefined();
    });

  }

});
