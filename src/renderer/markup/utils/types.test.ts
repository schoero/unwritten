import { afterEach, describe, expect, it, vitest } from "vitest";

import { createInterfaceEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import { removeUndefinedTypeFromOptionalUnionType } from "./types.js";


scope("Renderer", "Render abstraction", () => {

  describe("removeUndefinedTypeFromOptionalUnionType", () => {

    afterEach(() => {
      vitest.resetModules();
    });

    {

      it("should collapse to the actual type if only 2 types are available", () => {

        const testFileContent = ts`
          export interface Test {
            prop?: string;
          }
        `;

        const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

        const symbol = exportedSymbols.find(s => s.name === "Test")!;
        const interfaceEntity = createInterfaceEntity(compilerContext, symbol);

        const renderContext = createRenderContext();
        const typeWithoutOptionalBasedUndefined = removeUndefinedTypeFromOptionalUnionType(renderContext, interfaceEntity.properties[0].type);

        expect(typeWithoutOptionalBasedUndefined.kind).toBe(TypeKind.String);

      });

      it("should filter out the `undefined` type when two or more types are defined", () => {

        const testFileContent = ts`
          export interface Test {
            prop?: string | number;
          }
        `;

        const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

        const symbol = exportedSymbols.find(s => s.name === "Test")!;
        const interfaceEntity = createInterfaceEntity(compilerContext, symbol);

        const renderContext = createRenderContext();
        const typeWithoutOptionalBasedUndefined = removeUndefinedTypeFromOptionalUnionType(renderContext, interfaceEntity.properties[0].type);

        assert(typeWithoutOptionalBasedUndefined.kind === TypeKind.Union);

        expect(typeWithoutOptionalBasedUndefined.types).toHaveLength(2);
        expect(typeWithoutOptionalBasedUndefined.types[0].kind).toBe(TypeKind.String);
        expect(typeWithoutOptionalBasedUndefined.types[1].kind).toBe(TypeKind.Number);

      });

      it("should be possible to disable the `undefined` type removal of optional types", () => {

        const testFileContent = ts`
          export interface Test {
            prop?: string;
          }
        `;

        const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

        const symbol = exportedSymbols.find(s => s.name === "Test")!;
        const interfaceEntity = createInterfaceEntity(compilerContext, symbol);

        const renderContext = createRenderContext();
        renderContext.config.renderConfig.html.renderUndefinedInOptionalTypes = true;

        const typeWithoutOptionalBasedUndefined = removeUndefinedTypeFromOptionalUnionType(renderContext, interfaceEntity.properties[0].type);

        assert(typeWithoutOptionalBasedUndefined.kind === TypeKind.Union);

        expect(typeWithoutOptionalBasedUndefined.types).toHaveLength(3);
        expect(typeWithoutOptionalBasedUndefined.types[0].kind).toBe(TypeKind.String);
        expect(typeWithoutOptionalBasedUndefined.types[1].kind).toBe(TypeKind.Number);
        expect(typeWithoutOptionalBasedUndefined.types[2].kind).toBe(TypeKind.Undefined);

      });

    }

  });

});
