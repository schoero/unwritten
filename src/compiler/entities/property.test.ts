import { expect, it } from "vitest";

import { createTypeAliasBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind, TypeLiteral } from "quickdoks:types:types.js";


scope("Compiler", Kind.Property, () => {

  {

    const testFileContent = ts`
      export type TypeAlias = {
        prop: string;
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse a property", () => {
      expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(Kind.TypeLiteral);
      expect((exportedTypeAlias.type as TypeLiteral).properties).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      export type TypeAlias = {
        /** 
         * Property description 
         * @example Property example
         */
        prop: string;
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching name", () => {
      expect((exportedTypeAlias.type as TypeLiteral).properties[0]!.name).to.equal("prop");
    });

    it("should have a matching description", () => {
      expect((exportedTypeAlias.type as TypeLiteral).properties[0]!.description).to.equal("Property description");
    });

    it("should have a matching example", () => {
      expect((exportedTypeAlias.type as TypeLiteral).properties[0]!.example).to.equal("Property example");
    });

    it("should have a matching type", () => {
      expect((exportedTypeAlias.type as TypeLiteral).properties[0]!.type.kind).to.equal(Kind.String);
    });

  }

});
