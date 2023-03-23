import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


// https://github.com/microsoft/TypeScript/pull/12589

export type MappedTypeLiteral = {
  readonly [K in "A" | "B"]?: K extends "B" ? "b" : "a";
};

scope("Interpreter", TypeKind.Mapped, () => {

  {

    const testFileContent = ts`
      export type MappedTypeLiteral = {
        readonly [K in "A" | "B"]?: K extends "B" ? "b" : "a";
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

    it("should the correct amount of members", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      expect(exportedTypeAlias.type.members.length).to.equal(2);
    });

    it("should have matching members", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);

      expect(exportedTypeAlias.type.members[0]!.kind).to.equal(EntityKind.MappedTypeMember);
      expect(exportedTypeAlias.type.members[1]!.kind).to.equal(EntityKind.MappedTypeMember);

      expect(exportedTypeAlias.type.members[0]!.keyType.kind).to.equal(TypeKind.StringLiteral);
      expect(exportedTypeAlias.type.members[1]!.keyType.kind).to.equal(TypeKind.StringLiteral);

      expect(exportedTypeAlias.type.members[0]!.keyType.value).to.equal("A");
      expect(exportedTypeAlias.type.members[1]!.keyType.value).to.equal("B");

      expect(exportedTypeAlias.type.members[0]!.valueType.kind).to.equal(TypeKind.TypeReference);
      expect(exportedTypeAlias.type.members[1]!.valueType.kind).to.equal(TypeKind.TypeReference);
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
        readonly [K in "A" | "B"]: K extends "A" ? number : string;
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
      expect(exportedTypeAlias.type.optional).to.equal(false);
    });

    it("should the correct amount of members", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);
      expect(exportedTypeAlias.type.members.length).to.equal(2);
    });

    it("should have matching members", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);

      expect(exportedTypeAlias.type.members[0]!.kind).to.equal(EntityKind.MappedTypeMember);
      expect(exportedTypeAlias.type.members[1]!.kind).to.equal(EntityKind.MappedTypeMember);

      expect(exportedTypeAlias.type.members[0]!.keyType.kind).to.equal(TypeKind.StringLiteral);
      expect(exportedTypeAlias.type.members[1]!.keyType.kind).to.equal(TypeKind.StringLiteral);

      expect(exportedTypeAlias.type.members[0]!.keyType.value).to.equal("A");
      expect(exportedTypeAlias.type.members[1]!.keyType.value).to.equal("B");

      expect(exportedTypeAlias.type.members[0]!.valueType.kind).to.equal(TypeKind.Conditional);
    });

    it("should have a correct type parameter", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.Mapped);

      expect(exportedTypeAlias.type.typeParameter.name).to.equal("K");
      expect(exportedTypeAlias.type.typeParameter.constraint).to.not.equal(undefined);
      assert(exportedTypeAlias.type.typeParameter.constraint!.kind === TypeKind.Union);
      expect(exportedTypeAlias.type.typeParameter.constraint.types).to.have.lengthOf(2);
    });

  }

});
