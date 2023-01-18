import { assert } from "node:console";

import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { TypeLiteralType } from "quickdoks:compiler/type-definitions/types.js";


scope("Compiler", TypeKind.TypeLiteral, () => {

  {

    const testFileContent = ts`
      export type TypeLiteral = {
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse type literals", () => {
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.TypeLiteral);
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
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    assert(exportedTypeAlias.type.kind === TypeKind.TypeLiteral);

    const typeLiteral = exportedTypeAlias.type as TypeLiteralType;


    it("should be able to handle construct signatures", () => {
      expect(typeLiteral.constructSignatures.length).to.equal(1);
    });

    it("should be able to handle call signatures", () => {
      expect(typeLiteral.callSignatures.length).to.equal(1);
    });

    it("should be able to handle properties", () => {
      expect(typeLiteral.properties.length).to.equal(2);
    });

    it("should be able to handle methods", () => {
      expect(typeLiteral.methods.length).to.equal(1);
    });

    it("should differentiate between methods and function properties", () => {
      expect(typeLiteral.methods.find(m => m.name === "method")).to.not.equal(undefined);
      expect(typeLiteral.properties.find(p => p.name === "funcProp")).to.not.equal(undefined);
    });

    it("should be able to handle getters", () => {
      expect(typeLiteral.getters.length).to.equal(1);
    });

    it("should be able to handle setters", () => {
      expect(typeLiteral.setters.length).to.equal(1);
    });

  }

});
