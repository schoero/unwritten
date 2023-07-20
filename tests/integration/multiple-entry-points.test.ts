/* eslint-disable @typescript-eslint/naming-convention */
import { expect, it } from "vitest";

import { interpret } from "unwritten:interpreter/ast/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { writeFileSync } from "unwritten:platform/file-system/node.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isVariableEntity } from "unwritten:typeguards/entities.js";
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

    const { ctx: compilerContext, fileSymbols } = compile({
      "/index.ts": indexModule,
      "/types.ts": typesModule
    });

    const sourceFileEntities = interpret(compilerContext, fileSymbols);

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const interpretedIndexFile = sourceFileEntities.find(entity => entity.name === "index.ts");
    const interpretedTypesFile = sourceFileEntities.find(entity => entity.name === "types.ts");

    const interpretedVariableEntity = interpretedIndexFile?.exports.find(isVariableEntity);
    const interpretedInterfaceEntity = interpretedTypesFile?.exports.find(entity => entity.name === "Test");

    it("should create a type reference to the symbol in the other file", () => {
      assert(interpretedVariableEntity);
      assert(interpretedVariableEntity.type.kind === TypeKind.TypeReference);
      expect(interpretedVariableEntity.type.symbolId).toBe(interpretedInterfaceEntity?.symbolId);
      assert(interpretedVariableEntity.type.target?.kind === EntityKind.Interface);
      expect(interpretedVariableEntity.type.target.position?.file).toBe(interpretedTypesFile?.path);
    });

    const rendered = ctx.renderer.render(ctx, sourceFileEntities);

    Object.entries(rendered).forEach(([fileName, content]) => {
      writeFileSync(fileName.replace(".ts", ".md"), content);
    });

  }

});
