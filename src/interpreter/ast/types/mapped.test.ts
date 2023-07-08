import { assert, expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createFunctionEntity, createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


// https://github.com/microsoft/TypeScript/pull/12589

scope("Interpreter", TypeKind.Mapped, () => {

  {

    const testFileContent = ts`
      export type MappedTypeLiteral = {
        readonly [K in "A" | "B"]?: string;
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "MappedTypeLiteral")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse mapped types", () => {
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.Mapped);
    });

    it("should be have matching modifiers", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      expect(exportedTypeAlias.type.readonly).toBe(true);
      expect(exportedTypeAlias.type.optional).toBe(true);
    });

    it("should the correct amount of properties", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      expect(exportedTypeAlias.type.properties).toHaveLength(2);
    });

    it("should have matching properties", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      expect(exportedTypeAlias.type.properties[0]!.type.kind).toBe(TypeKind.String);
      expect(exportedTypeAlias.type.properties[1]!.type.kind).toBe(TypeKind.String);
    });

    it("should have a correct type parameter", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);

      expect(exportedTypeAlias.type.typeParameter.name).toBe("K");
      expect(exportedTypeAlias.type.typeParameter.constraint).toBeDefined();
      assert(exportedTypeAlias.type.typeParameter.constraint!.kind === TypeKind.Union);
      expect(exportedTypeAlias.type.typeParameter.constraint.types).toHaveLength(2);
    });

  }

  {

    const testFileContent = ts`
      export type MappedTypeLiteral = {
        [K in "A" | "B"]: K extends "B" ? "b" : "a";
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "MappedTypeLiteral")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse mapped types", () => {
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.Mapped);
    });

    it("should the correct amount of properties", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      expect(exportedTypeAlias.type.properties).toHaveLength(2);
    });

    it("should have matching properties", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);

      assert(exportedTypeAlias.type.properties[0]!.type.kind === TypeKind.StringLiteral);
      assert(exportedTypeAlias.type.properties[1]!.type.kind === TypeKind.StringLiteral);

      expect(exportedTypeAlias.type.properties[0]!.name).toBe("A");
      expect(exportedTypeAlias.type.properties[0]!.type.value).toBe("a");

      expect(exportedTypeAlias.type.properties[1]!.name).toBe("B");
      expect(exportedTypeAlias.type.properties[1]!.type.value).toBe("b");

    });

    it("should have a correct type parameter", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);

      expect(exportedTypeAlias.type.typeParameter.name).toBe("K");
      expect(exportedTypeAlias.type.typeParameter.constraint).toBeDefined();
      assert(exportedTypeAlias.type.typeParameter.constraint!.kind === TypeKind.Union);
      expect(exportedTypeAlias.type.typeParameter.constraint.types).toHaveLength(2);
    });

    it("should have a correct valueType", () => {

      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      assert(exportedTypeAlias.type.valueType?.kind === TypeKind.Conditional);
      assert(exportedTypeAlias.type.valueType.checkType.kind === TypeKind.TypeReference);

      expect(exportedTypeAlias.type.valueType.checkType.symbolId).toBe(exportedTypeAlias.type.typeParameter.symbolId);
      expect(exportedTypeAlias.type.valueType.checkType.name).toBe("K");

      assert(exportedTypeAlias.type.valueType.extendsType.kind === TypeKind.StringLiteral);
      expect(exportedTypeAlias.type.valueType.extendsType.value).toBe("B");

      assert(exportedTypeAlias.type.valueType.trueType.kind === TypeKind.StringLiteral);
      expect(exportedTypeAlias.type.valueType.trueType.value).toBe("b");

      assert(exportedTypeAlias.type.valueType.falseType.kind === TypeKind.StringLiteral);
      expect(exportedTypeAlias.type.valueType.falseType.value).toBe("a");

    });

  }

  {

    const testFileContent = ts`
      export function fn(): {
        readonly [K in "A" | "B"]?: K extends "A" ? "a" : "b";
      } {
        return {
          A: "a",
          B: "b"
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "fn")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should return a type literal and not a mapped type", () => {
      expect(exportedFunction.signatures[0].returnType.kind).toBe(TypeKind.TypeLiteral);
    });

  }

});
