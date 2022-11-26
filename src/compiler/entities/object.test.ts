import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Kind, ObjectType } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.Object, () => {

  {

    const testFileContent = ts`
      export type ObjectType = {
        (): boolean;
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "ObjectType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should export a type alias => type => function, as long as there are only call signatures", () => {
      expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(Kind.Function);
    });

  }

  {

    const testFileContent = ts`
      interface ObjectInterface {}
      export type ObjectType = {
        new (): ObjectInterface;
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "ObjectType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to handle construct signatures", () => {
      expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(Kind.Object);
      expect((exportedTypeAlias.type as ObjectType).constructSignatures.length).to.equal(1);
    });

  }

  {

    const testFileContent = ts`
      export type ObjectType = {
        (): boolean;
        prop: string;
        funcProp: () => void;
        method(): void;  
        get getter(): number;
        set setter(value: number);
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "ObjectType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should export a type alias => type => object, if there is something other than call signatures", () => {
      expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(Kind.Object);
    });

    it("should be able to handle call signatures", () => {
      expect((exportedTypeAlias.type as ObjectType).callSignatures.length).to.equal(1);
    });

    it("should be able to handle properties", () => {
      expect((exportedTypeAlias.type as ObjectType).properties.length).to.equal(2);
    });

    it("should be able to handle methods", () => {
      expect((exportedTypeAlias.type as ObjectType).methods.length).to.equal(1);
    });

    it("should differentiate between methods and function properties", () => {
      expect((exportedTypeAlias.type as ObjectType).methods.find(m => m.name === "method")).to.not.equal(undefined);
      expect((exportedTypeAlias.type as ObjectType).properties.find(p => p.name === "funcProp")).to.not.equal(undefined);
    });

    it("should be able to handle getters", () => {
      expect((exportedTypeAlias.type as ObjectType).getters.length).to.equal(1);
    });

    it("should be able to handle setters", () => {
      expect((exportedTypeAlias.type as ObjectType).setters.length).to.equal(1);
    });

  }

});
