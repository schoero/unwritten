import { expect, it } from "vitest";

import { createTypeAliasBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { Kind, TemplateLiteralType } from "quickdoks:types:types.js";


scope("Compiler", Kind.TemplateLiteral, () => {

  {

    const testFileContent = "export type TemplateLiteralTypeAlias = `${number}px`";

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TemplateLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse a template literal type", () => {
      expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(Kind.TemplateLiteral);
    });

    it("should have an empty head", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).head).to.equal("");
    });

    it("should have one matching type", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).types).to.have.lengthOf(1);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[0]!.kind).to.equal(Kind.Number);
    });

    it("should have one matching span", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).spans).to.have.lengthOf(1);
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[0]!).to.equal("px");
    });

  }

  {

    const testFileContent = "export type TemplateLiteralTypeAlias = `PREFIX-${number}-MIDDLE-${string}-SUFFIX`";

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TemplateLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching head", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).head).to.equal("PREFIX-");
    });

    it("should have two matching types", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).types).to.have.lengthOf(2);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[0]!.kind).to.equal(Kind.Number);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[1]!.kind).to.equal(Kind.String);
    });

    it("should have two matching spans", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).spans).to.have.lengthOf(2);
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[0]!).to.equal("-MIDDLE-");
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[1]!).to.equal("-SUFFIX");
    });

  }

  {

    const testFileContent = "export type TemplateLiteralTypeAlias = `border-${'top' | 'bottom' | 'left' | 'right'}-${'width'}: ${number}px`";

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TemplateLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching head", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).head).to.equal("border-");
    });

    it("should have three matching types", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).types).to.have.lengthOf(3);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[0]!.kind).to.equal(Kind.UnionType);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[1]!.kind).to.equal(Kind.StringLiteral);
      expect((exportedTypeAlias.type as TemplateLiteralType).types[2]!.kind).to.equal(Kind.Number);
    });

    it("should have three matching spans", () => {
      expect((exportedTypeAlias.type as TemplateLiteralType).spans).to.have.lengthOf(3);
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[0]!).to.equal("-");
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[1]!).to.equal(": ");
      expect((exportedTypeAlias.type as TemplateLiteralType).spans[2]!).to.equal("px");
    });

  }

});
