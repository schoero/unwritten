import { expect, it } from "vitest";

import { createClassEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getIdBySymbol } from "unwritten:interpreter:ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Interpreter", EntityKind.Class, () => {

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
      export class Class {
        constructor() {}
        public property: number = 1;
        public method() {}
        public get getter(): string { return ""; }
        public set setter(value: string) {}
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should should have a constructor", () => {
      expect(exportedClass.ctor).to.not.equal(undefined);
    });

    it("should should have a property", () => {
      expect(exportedClass.properties).to.not.equal(undefined);
      expect(exportedClass.properties.length).to.equal(1);
    });

    it("should should have a method", () => {
      expect(exportedClass.methods).to.not.equal(undefined);
      expect(exportedClass.methods.length).to.equal(1);
    });

    it("should should have a getter", () => {
      expect(exportedClass.getters).to.not.equal(undefined);
      expect(exportedClass.getters.length).to.equal(1);
    });

    it("should should have a setter", () => {
      expect(exportedClass.setters).to.not.equal(undefined);
      expect(exportedClass.setters.length).to.equal(1);
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
