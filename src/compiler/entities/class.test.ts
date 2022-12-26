import { expect, it } from "vitest";

import { getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { createClassBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind, Modifiers } from "quickdoks:types:types.js";


scope("Compiler", Kind.Class, () => {

  {

    const testFileContent = ts`
      export class Class { }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should be able to parse a class", () => {
      expect(exportedClass.kind).to.equal(Kind.Class);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Class description 
       * @example Class example
       */
      export class Class {
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should have a matching name", () => {
      expect(exportedClass.name).to.equal("Class");
    });

    it("should have a matching id", () => {
      expect(exportedClass.id).to.equal(getIdBySymbol(ctx, exportedSymbols[0]!));
    });

    it("should have a matching description", () => {
      expect(exportedClass.description).to.equal("Class description");
    });

    it("should have a matching example", () => {
      expect(exportedClass.example).to.equal("Class example");
    });

  }

  {

    const testFileContent = ts`
      export class Class {
        constructor() {}
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should have a matching constructor", () => {
      expect(exportedClass.constructSignatures).to.not.equal(undefined);
      expect(exportedClass.constructSignatures).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      export abstract class Class { }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should support the abstract modifier", () => {
      expect(exportedClass.modifiers).to.include(Modifiers.Abstract);
    });

  }

  {

    const testFileContent = ts`
      export class Class {
        #privateField = true
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should support native private fields", () => {
      expect(exportedClass.properties).to.not.equal(undefined);
      expect(exportedClass.properties).to.have.lengthOf(1);
      expect(exportedClass.properties[0].modifiers).to.include(Modifiers.NativePrivate);
    });

  }

  {

    const testFileContent = ts`
      export class Class<T>  { }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should support type parameters", () => {
      expect(exportedClass.typeParameters).to.not.equal(undefined);
      expect(exportedClass.typeParameters!.length).to.equal(1);
    });

  }

});
