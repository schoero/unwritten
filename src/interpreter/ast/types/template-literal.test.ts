import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Interpreter", TypeKind.TemplateLiteral, () => {

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
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.head).to.equal("");
    });

    it("should have one matching type", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.types).to.have.lengthOf(1);
      expect(exportedTypeAlias.type.types[0]!.kind).to.equal(TypeKind.Number);
    });

    it("should have one matching span", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.spans).to.have.lengthOf(1);
      expect(exportedTypeAlias.type.spans[0]!).to.equal("px");
    });

  }

  {

    const testFileContent = "" +
      "export type TemplateLiteralTypeAlias = `PREFIX-${number}-MIDDLE-${string}-SUFFIX`";

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TemplateLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching head", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.head).to.equal("PREFIX-");
    });

    it("should have two matching types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.types).to.have.lengthOf(2);
      expect(exportedTypeAlias.type.types[0]!.kind).to.equal(TypeKind.Number);
      expect(exportedTypeAlias.type.types[1]!.kind).to.equal(TypeKind.String);
    });

    it("should have two matching spans", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.spans).to.have.lengthOf(2);
      expect(exportedTypeAlias.type.spans[0]!).to.equal("-MIDDLE-");
      expect(exportedTypeAlias.type.spans[1]!).to.equal("-SUFFIX");
    });

  }

  {

    const testFileContent = "" +
      "export type TemplateLiteralTypeAlias = `border-${'top' | 'bottom' | 'left' | 'right'}-${'width'}: ${number}px`";

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TemplateLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching head", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.head).to.equal("border-");
    });

    it("should have three matching types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.types).to.have.lengthOf(3);
      expect(exportedTypeAlias.type.types[0]!.kind).to.equal(TypeKind.Union);
      expect(exportedTypeAlias.type.types[1]!.kind).to.equal(TypeKind.StringLiteral);
      expect(exportedTypeAlias.type.types[2]!.kind).to.equal(TypeKind.Number);
    });

    it("should have three matching spans", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.spans).to.have.lengthOf(3);
      expect(exportedTypeAlias.type.spans[0]!).to.equal("-");
      expect(exportedTypeAlias.type.spans[1]!).to.equal(": ");
      expect(exportedTypeAlias.type.spans[2]!).to.equal("px");
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
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.type.type?.kind).to.equal(TypeKind.StringLiteral);
    });

  }

});
