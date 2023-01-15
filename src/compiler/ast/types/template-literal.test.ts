import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import type { TemplateLiteralType, TypeReferenceType } from "quickdoks:compiler:type-definitions/types.d.js";


scope("Compiler", TypeKind.TemplateLiteral, () => {

  {

    const testFileContent = "" +
      "export type TemplateLiteralTypeAlias = `${number}px`";

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TemplateLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse a template literal type", () => {
      expect(exportedTypeAlias.kind).to.equal(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.TemplateLiteral);
    });

    it("should have an empty head", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).head).to.equal("");
    });

    it("should have one matching type", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).types).to.have.lengthOf(1);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[0]!.kind).to.equal(TypeKind.Number);
    });

    it("should have one matching span", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).spans).to.have.lengthOf(1);
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[0]!).to.equal("px");
    });

  }

  {

    const testFileContent = "" +
      "export type TemplateLiteralTypeAlias = `PREFIX-${number}-MIDDLE-${string}-SUFFIX`";

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TemplateLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching head", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).head).to.equal("PREFIX-");
    });

    it("should have two matching types", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).types).to.have.lengthOf(2);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[0]!.kind).to.equal(TypeKind.Number);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[1]!.kind).to.equal(TypeKind.String);
    });

    it("should have two matching spans", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).spans).to.have.lengthOf(2);
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[0]!).to.equal("-MIDDLE-");
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[1]!).to.equal("-SUFFIX");
    });

  }

  {

    const testFileContent = "" +
      "export type TemplateLiteralTypeAlias = `border-${'top' | 'bottom' | 'left' | 'right'}-${'width'}: ${number}px`";

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TemplateLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching head", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).head).to.equal("border-");
    });

    it("should have three matching types", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).types).to.have.lengthOf(3);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[0]!.kind).to.equal(TypeKind.UnionType);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[1]!.kind).to.equal(TypeKind.StringLiteral);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[2]!.kind).to.equal(TypeKind.Number);
    });

    it("should have three matching spans", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).spans).to.have.lengthOf(3);
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[0]!).to.equal("-");
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[1]!).to.equal(": ");
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[2]!).to.equal("px");
    });

  }

  {

    const testFileContent = "" +
      "type TemplateLiteralTypeAlias<Min extends number, Max extends number> = `${Min}...${Max}`;" +
      "export type Test = TemplateLiteralTypeAlias<10, 20>;";

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should result in a string literal", () => {
      expect((exportedTypeAlias.type as TypeReferenceType).type?.kind).to.equal(TypeKind.StringLiteral);
    });

  }

});
