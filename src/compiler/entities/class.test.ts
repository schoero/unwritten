import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Modifiers, Kind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createClassBySymbol } from "./class.js";


scope("Compiler", Kind.Class, () => {

  {

    const testFileContent = ts`
      export class Class { }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

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

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

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

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should support the abstract modifier", () => {
      expect(exportedClass.modifiers).to.include(Modifiers.Abstract);
    });

  }

  {

    const testFileContent = ts`
      class Base { }
      export class Class extends Base { }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should support inheritance", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage!.name).to.equal("Base");
    });

  }

  {

    const testFileContent = ts`
      export abstract class Class<T>  { }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should support generics", () => {
      expect(exportedClass.typeParameters).to.not.equal(undefined);
      expect(exportedClass.typeParameters!.length).to.equal(1);
    });

  }

});
