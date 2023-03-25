import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


// https://github.com/microsoft/TypeScript/pull/12589

scope("Interpreter", TypeKind.Mapped, () => {

  {

    const testFileContent = ts`
      export type MappedTypeLiteral = {
        readonly [K in "A" | "B"]?: string;
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "MappedTypeLiteral")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse mapped types", () => {
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Mapped);
    });

    it("should be have matching modifiers", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      expect(exportedTypeAlias.type.readonly).to.equal(true);
      expect(exportedTypeAlias.type.optional).to.equal(true);
    });

    it("should the correct amount of properties", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      expect(exportedTypeAlias.type.properties.length).to.equal(2);
    });

    it("should have matching properties", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      expect(exportedTypeAlias.type.properties[0]!.type.kind).to.equal(TypeKind.String);
      expect(exportedTypeAlias.type.properties[1]!.type.kind).to.equal(TypeKind.String);
    });

    it("should have a correct type parameter", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);

      expect(exportedTypeAlias.type.typeParameter.name).to.equal("K");
      expect(exportedTypeAlias.type.typeParameter.constraint).to.not.equal(undefined);
      assert(exportedTypeAlias.type.typeParameter.constraint!.kind === TypeKind.Union);
      expect(exportedTypeAlias.type.typeParameter.constraint.types).to.have.lengthOf(2);
    });

  }

  {

    const testFileContent = ts`
      export type MappedTypeLiteral = {
        [K in "A" | "B"]: K extends "B" ? "b" : "a";
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "MappedTypeLiteral")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse mapped types", () => {
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Mapped);
    });

    it("should the correct amount of properties", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      expect(exportedTypeAlias.type.properties.length).to.equal(2);
    });

    it("should have matching properties", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);

      assert(exportedTypeAlias.type.properties[0]!.type.kind === TypeKind.StringLiteral);
      assert(exportedTypeAlias.type.properties[1]!.type.kind === TypeKind.StringLiteral);

      expect(exportedTypeAlias.type.properties[0]!.name).to.equal("A");
      expect(exportedTypeAlias.type.properties[0]!.type.value).to.equal("a");

      expect(exportedTypeAlias.type.properties[1]!.name).to.equal("B");
      expect(exportedTypeAlias.type.properties[1]!.type.value).to.equal("b");

    });

    it("should have a correct type parameter", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);

      expect(exportedTypeAlias.type.typeParameter.name).to.equal("K");
      expect(exportedTypeAlias.type.typeParameter.constraint).to.not.equal(undefined);
      assert(exportedTypeAlias.type.typeParameter.constraint!.kind === TypeKind.Union);
      expect(exportedTypeAlias.type.typeParameter.constraint.types).to.have.lengthOf(2);
    });

    it("should have a correct valueType", () => {

      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      assert(exportedTypeAlias.type.valueType?.kind === TypeKind.Conditional);
      assert(exportedTypeAlias.type.valueType.checkType.kind === TypeKind.TypeReference);

      expect(exportedTypeAlias.type.valueType.checkType.symbolId).to.equal(exportedTypeAlias.type.typeParameter.id);
      expect(exportedTypeAlias.type.valueType.checkType.name).to.equal("K");

      assert(exportedTypeAlias.type.valueType.extendsType.kind === TypeKind.StringLiteral);
      expect(exportedTypeAlias.type.valueType.extendsType.value).to.equal("B");

      assert(exportedTypeAlias.type.valueType.trueType.kind === TypeKind.StringLiteral);
      expect(exportedTypeAlias.type.valueType.trueType.value).to.equal("b");

      assert(exportedTypeAlias.type.valueType.falseType.kind === TypeKind.StringLiteral);
      expect(exportedTypeAlias.type.valueType.falseType.value).to.equal("a");

    });

  }

});
