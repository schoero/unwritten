import { expect, it } from "vitest";

import { getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { compile } from "quickdoks:tests:/utils/compile.js";
import { scope } from "quickdoks:tests:/utils/scope.js";
import { ts } from "quickdoks:tests:/utils/template.js";
import { Kind, Modifiers } from "quickdoks:types:types.js";

import { createClassBySymbol } from "./class.js";


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
        constructor() {
        }
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
      class Base {
        methodFromBase() {}
      }
      export class Class extends Base {
        methodFromClass() {}
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should support inheritance", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.name).to.equal("Base");
    });

    it("should merge members with super class", () => {
      expect(exportedClass.methods).to.not.equal(undefined);
      expect(exportedClass.methods).to.have.lengthOf(2);
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

  {

    const testFileContent = ts`
      export class Base<T> { 
        prop: T;
      }
      export class Class extends Base<"Hello"> { }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should support type arguments", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.properties).to.have.lengthOf(1);
      expect(exportedClass.heritage!.properties![0]!.type).to.equal(Kind.StringLiteral);
    });

  }

});
