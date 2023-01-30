import { expect, it } from "vitest";

import { createClassEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { getIdBySymbol } from "unwritten:compiler:mixins/id.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", EntityKind.Class, () => {

  {

    const testFileContent = ts`
      export class Class {}
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to parse a class", () => {
      expect(exportedClass.kind).to.equal(EntityKind.Class);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Class description
       * @example Class example
       */
      export class Class {}
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

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
      export abstract class Class {}
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should support the abstract modifier", () => {
      expect(exportedClass.modifiers).to.include("abstract");
    });

  }

  {

    const testFileContent = ts`
      export class Class<T> {}
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should support type parameters", () => {
      expect(exportedClass.typeParameters).to.not.equal(undefined);
      expect(exportedClass.typeParameters!.length).to.equal(1);
    });

  }

});
