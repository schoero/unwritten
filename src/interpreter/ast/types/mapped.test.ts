import { assert, expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
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
      assert(exportedTypeAlias.type.type.kind === TypeKind.TypeLiteral);
      expect(exportedTypeAlias.type.type.properties).toHaveLength(2);
    });

    it("should have matching properties", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      assert(exportedTypeAlias.type.type.kind === TypeKind.TypeLiteral);
      expect(exportedTypeAlias.type.type.properties[0]!.type.kind).toBe(TypeKind.String);
      expect(exportedTypeAlias.type.type.properties[0]!.name).toBe("A");
      expect(exportedTypeAlias.type.type.properties[1]!.type.kind).toBe(TypeKind.String);
      expect(exportedTypeAlias.type.type.properties[1]!.name).toBe("B");
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
      export type MappedTypeLiteral<T extends string> = {
        [K in T]: K extends "B" ? "b" : "a";
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "MappedTypeLiteral")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse mapped types", () => {
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.Mapped);
    });

    it("should not have properties if the type parameter is not known", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      assert(exportedTypeAlias.type.type.kind === TypeKind.TypeLiteral);
      expect(exportedTypeAlias.type.type.properties).toHaveLength(0);
    });

    it("should have a correct type parameter", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);

      expect(exportedTypeAlias.type.typeParameter.name).toBe("K");
      expect(exportedTypeAlias.type.typeParameter.constraint).toBeDefined();
      assert(exportedTypeAlias.type.typeParameter.constraint!.kind === TypeKind.TypeReference);

      expect(exportedTypeAlias.type.typeParameter.constraint.name).toBe("T");

      assert(exportedTypeAlias.type.typeParameter.constraint.target?.kind === EntityKind.TypeParameter);
      expect(exportedTypeAlias.type.typeParameter.constraint.target.constraint?.kind).toBe(TypeKind.String);

      assert(exportedTypeAlias.type.typeParameter.constraint.type?.kind === TypeKind.TypeParameter);
      expect(exportedTypeAlias.type.typeParameter.constraint.type.constraint?.kind).toBe(TypeKind.String);
    });

    it("should have a correct valueType", () => {

      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      assert(exportedTypeAlias.type.valueType?.kind === TypeKind.Conditional);
      assert(exportedTypeAlias.type.valueType.checkType.kind === TypeKind.TypeReference);

      expect(exportedTypeAlias.type.valueType.checkType.target?.kind).toBe(EntityKind.TypeParameter);
      expect(exportedTypeAlias.type.valueType.checkType.type?.kind).toBe(TypeKind.TypeParameter);
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
      type Test = "string"
      export type MappedTypeLiteral = {
        [K in "A" | "B"]: Test;
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "MappedTypeLiteral")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should return the declared type if available", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      assert(exportedTypeAlias.type.valueType?.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.type.valueType.name).toBe("Test");
    });

  }

});
