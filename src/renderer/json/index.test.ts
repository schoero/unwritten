import { expect, it } from "vitest";

import { createSourceFileEntity } from "unwritten:interpreter/ast/entities/index";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


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
