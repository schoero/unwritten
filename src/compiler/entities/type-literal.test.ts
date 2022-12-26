import { expect, it } from "vitest";

import { createTypeAliasBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import { Kind, TypeLiteral } from "quickdoks:type-definitions/types.d.js";


scope("Compiler", Kind.TypeLiteral, () => {

  {

    const testFileContent = ts`
      export type TypeLiteral = {
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse type literals", () => {
      expect(exportedTypeAlias.type.kind).to.equal(Kind.TypeLiteral);
    });

  }

  {

    const testFileContent = ts`
      export type TypeLiteral = {
        new (): {};
        (): boolean;
        prop: string;
        funcProp: () => void;
        method(): void;  
        get getter(): string;
        set setter(value: string);
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to handle construct signatures", () => {
      expect((exportedTypeAlias.type as TypeLiteral).constructSignatures.length).to.equal(1);
    });

    it("should be able to handle call signatures", () => {
      expect((exportedTypeAlias.type as TypeLiteral).callSignatures.length).to.equal(1);
    });

    it("should be able to handle properties", () => {
      expect((exportedTypeAlias.type as TypeLiteral).properties.length).to.equal(2);
    });

    it("should be able to handle methods", () => {
      expect((exportedTypeAlias.type as TypeLiteral).methods.length).to.equal(1);
    });

    it("should differentiate between methods and function properties", () => {
      expect((exportedTypeAlias.type as TypeLiteral).methods.find(m => m.name === "method")).to.not.equal(undefined);
      expect((exportedTypeAlias.type as TypeLiteral).properties.find(p => p.name === "funcProp")).to.not.equal(undefined);
    });

    it("should be able to handle getters", () => {
      expect((exportedTypeAlias.type as TypeLiteral).getters.length).to.equal(1);
    });

    it("should be able to handle setters", () => {
      expect((exportedTypeAlias.type as TypeLiteral).setters.length).to.equal(1);
    });

  }

});
