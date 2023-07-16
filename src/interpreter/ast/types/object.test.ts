import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createObjectLikeType } from "unwritten:interpreter:ast/types/index.js";
import { isObjectType } from "unwritten:interpreter:typeguards/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.Object, () => {

  {

    const testFileContent = ts`
      export type ObjectType = {
        [key: string]: string;
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ObjectType")!;
    const tsType = ctx.checker.getTypeAtLocation(symbol.declarations![0]!);

    assert(isObjectType(tsType), "tsType is not an object type");

    it("should be able to create object types", () => {
      expect(createObjectLikeType(ctx, tsType, TypeKind.TypeLiteral).kind).toBe(TypeKind.TypeLiteral);
      expect(createObjectLikeType(ctx, tsType, TypeKind.ObjectLiteral).kind).toBe(TypeKind.ObjectLiteral);
      expect(createObjectLikeType(ctx, tsType, TypeKind.Object).kind).toBe(TypeKind.Object);
      expect(createObjectLikeType(ctx, tsType, TypeKind.Interface).kind).toBe(TypeKind.Interface);
      expect(createObjectLikeType(ctx, tsType, TypeKind.Class).kind).toBe(TypeKind.Class);
    });

  }

  {

    const testFileContent = ts`
      type Test = string;
      export type TypeLiteral = {
        prop: string;
        ref: Test;
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should resolve types correctly in object types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeLiteral);
      expect(exportedTypeAlias.type.properties).toHaveLength(2);
      expect(exportedTypeAlias.type.properties[0].type.kind).toBe(TypeKind.String);
      expect(exportedTypeAlias.type.properties[1].type.kind).toBe(TypeKind.TypeReference);
    });

  }

});
