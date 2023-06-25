import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertTypeReferenceTypeInline } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { isAnchorNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { TypeReferenceType } from "unwritten:interpreter/type-definitions/types.js";


scope("MarkupRenderer", TypeKind.TypeReference, () => {

  {

    const testFileContent = ts`
      type StringType = string;
      export type Type = StringType;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const typeSymbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, typeSymbol);

    const ctx = createRenderContext();
    ctx.renderer.initializeExportRegistry(ctx, [typeAliasEntity]);
    const convertedTypeReferenceType = convertTypeReferenceTypeInline(ctx, typeAliasEntity.type as TypeReferenceType);

    it("should render the referenced type, if the target symbol is not exported", () => {
      expect(convertedTypeReferenceType).toBe("string");
    });

  }

  {

    const testFileContent = ts`
      export type StringType = string;
      export type Type = StringType;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const stringTypeSymbol = exportedSymbols.find(s => s.name === "StringType")!;
    const typeSymbol = exportedSymbols.find(s => s.name === "Type")!;
    const stringTypeAliasEntity = createTypeAliasEntity(compilerContext, stringTypeSymbol);
    const typeAliasEntity = createTypeAliasEntity(compilerContext, typeSymbol);

    const ctx = createRenderContext();
    ctx.renderer.initializeExportRegistry(ctx, [stringTypeAliasEntity, typeAliasEntity]);
    const convertedTypeReferenceType = convertTypeReferenceTypeInline(ctx, typeAliasEntity.type as TypeReferenceType);

    it("should have the correct name", () => {
      assert(Array.isArray(convertedTypeReferenceType));
      assert(isAnchorNode(convertedTypeReferenceType[0]));
      expect(convertedTypeReferenceType[0].name).toBe("StringType");
    });

    it("should link to the actual type", () => {
      const stringTypeSymbol = exportedSymbols.find(s => s.name === "StringType")!;
      const stringTypeAliasEntity = createTypeAliasEntity(compilerContext, stringTypeSymbol);
      assert(Array.isArray(convertedTypeReferenceType));
      assert(isAnchorNode(convertedTypeReferenceType[0]));
      expect(convertedTypeReferenceType[0].id).toBe(stringTypeAliasEntity.symbolId);
    });

    it("should not have type arguments", () => {
      expect(convertedTypeReferenceType).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      export type Type = Array<string>;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);

    const ctx = createRenderContext();
    const convertedTypeReferenceType = convertTypeReferenceTypeInline(ctx, typeAliasEntity.type as TypeReferenceType);

    it("should have the correct name", () => {
      assert(Array.isArray(convertedTypeReferenceType));
      assert(isAnchorNode(convertedTypeReferenceType[0]));
      expect(convertedTypeReferenceType[0].name).toBe("Array");
    });

    it("should have one type argument", () => {
      assert(Array.isArray(convertedTypeReferenceType));
      expect(convertedTypeReferenceType).toHaveLength(2 + 1);
    });

  }

});
