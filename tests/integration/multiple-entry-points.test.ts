/* eslint-disable @typescript-eslint/naming-convention */
import { writeFileSync } from "node:fs";

import { expect, it } from "vitest";

import { interpret } from "unwritten:interpreter/ast/index.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Integration", "multiple entry points", () => {

  {

    const typesModule = ts`
      export interface Test {
        a: string;
      }
    `;

    const indexModule = ts`
      import { Test } from "./types";
      export const test: Test = {
        a: "test"
      }
    `;

    const { ctx: compilerContext, exportedSymbols, fileSymbols } = compile({
      "/index.ts": indexModule,
      "/types.ts": typesModule
    });

    const sourceFileEntities = interpret(compilerContext, fileSymbols);

    const ctx = createRenderContext(BuiltInRenderers.Markdown);
    const rendered = ctx.renderer.render(ctx, sourceFileEntities);

    Object.entries(rendered).forEach(([fileName, content]) => {
      writeFileSync(fileName.replace(".ts", ".md"), content);
    });

    it("should render the circular type as a type reference", () => {
      expect(rendered).toBeDefined();
    });

  }

});
