import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { LiteralType, Kind } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", "Literal", () => {

  {

    it("should be able to handle string literal types", () => {

      const testFileContent = ts`
        export type StringLiteralType = "Hello world";
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "StringLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      expect(exportedTypeAlias.type.kind).to.equal(Kind.StringLiteral);
      expect((exportedTypeAlias.type as LiteralType<Kind.StringLiteral>).value).to.equal("Hello world");

    });

  }

  {

    it("should be able to handle number literal types", () => {

      const testFileContent = ts`
        export type NumberLiteralType = 7;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "NumberLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      expect(exportedTypeAlias.type.kind).to.equal(Kind.NumberLiteral);
      expect((exportedTypeAlias.type as LiteralType<Kind.NumberLiteral>).value).to.equal(7);

    });

  }

  {

    it("should be able to handle bigInt literal types", () => {

      const testFileContent = ts`
        export type BigIntLiteralType = 7n;
        export type BigIntLiteralTypeNegative = -7n;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol1 = exportedSymbols.find(s => s.name === "BigIntLiteralType")!;
      const exportedTypeAlias1 = createTypeAliasBySymbol(ctx, symbol1);

      expect(exportedTypeAlias1.type.kind).to.equal(Kind.BigIntLiteral);
      expect((exportedTypeAlias1.type as LiteralType<Kind.BigIntLiteral>).value).to.equal(7n);

      const symbol2 = exportedSymbols.find(s => s.name === "BigIntLiteralTypeNegative")!;
      const exportedTypeAlias2 = createTypeAliasBySymbol(ctx, symbol2);

      expect(exportedTypeAlias2.type.kind).to.equal(Kind.BigIntLiteral);
      expect((exportedTypeAlias2.type as LiteralType<Kind.BigIntLiteral>).value).to.equal(-7n);

    });

  }

  {

    it("should be able to handle boolean literal types", () => {

      const testFileContent = ts`
        export type BooleanLiteralType = true;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "BooleanLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      expect(exportedTypeAlias.type.kind).to.equal(Kind.BooleanLiteral);
      expect((exportedTypeAlias.type as LiteralType<Kind.BooleanLiteral>).value).to.equal(true);

    });

  }

});
