/* eslint-disable @typescript-eslint/naming-convention */
import { expect, it } from "vitest";

import { createVariableEntity } from "unwritten:interpreter/ast/entities/index.js";
import { interpret } from "unwritten:interpreter/ast/index.js";
import { convertVariableEntityForDocumentation } from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { isAnchorNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
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

    const ctx = createRenderContext();

    ctx.renderer.initializeExportRegistry(ctx, sourceFileEntities);

    const variableSymbol = exportedSymbols.find(e => e.name === "test")!;
    const variableEntity = createVariableEntity(compilerContext, variableSymbol);
    const convertedVariableEntity = convertVariableEntityForDocumentation(ctx, variableEntity);

    it("should render the circular type as a type reference", () => {
      assert(Array.isArray(convertedCircularType));
      assert(isAnchorNode(convertedCircularType[0]));
      expect(convertedCircularType[0].name).toBe("InterfaceA");
    });

  }

});
