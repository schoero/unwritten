import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { createClassEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isJSDocText } from "unwritten:typeguards/jsdoc.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Class, () => {

  {

    const testFileContent = ts`
      export class Class {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to interpret a class", () => {
      expect(exportedClass.kind).toBe(EntityKind.Class);
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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should have a constructor", () => {
      expect(exportedClass.ctor).toBeDefined();
    });

    it("should have a property", () => {
      expect(exportedClass.properties).toBeDefined();
      expect(exportedClass.properties).toHaveLength(1);
    });

    it("should have a method", () => {
      expect(exportedClass.methods).toBeDefined();
      expect(exportedClass.methods).toHaveLength(1);
    });

    it("should have a getter", () => {
      expect(exportedClass.getters).toBeDefined();
      expect(exportedClass.getters).toHaveLength(1);
    });

    it("should have a setter", () => {
      expect(exportedClass.setters).toBeDefined();
      expect(exportedClass.setters).toHaveLength(1);
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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should have a matching name", () => {
      expect(exportedClass.name).toBe("Class");
    });

    it("should have a matching id", () => {
      expect(exportedClass.symbolId).toBe(getSymbolId(ctx, exportedSymbols[0]!));
    });

    it("should have a matching description", () => {
      expect(exportedClass.description).toHaveLength(1);
      assert(isJSDocText(exportedClass.description![0]));
      expect(exportedClass.description![0].text).toBe("Class description");
    });

    it("should have a matching example", () => {
      expect(exportedClass.example).toHaveLength(1);
      assert(isJSDocText(exportedClass.example![0].content[0]));
      expect(exportedClass.example![0].content[0].text).toBe("Class example");
    });

  }

  {

    const testFileContent = ts`
      export abstract class Class {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should support the abstract modifier", () => {
      expect(exportedClass.modifiers).toContain("abstract");
    });

  }

  {

    const testFileContent = ts`
      export class Class<T> {}
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should support type parameters", () => {
      expect(exportedClass.typeParameters).toBeDefined();
      expect(exportedClass.typeParameters!).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      export class Class {
        /**
         * Event description
         * @eventProperty
         */
        event;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should have an event", () => {
      expect(exportedClass.events).toBeDefined();
      expect(exportedClass.events).toHaveLength(1);
      expect(exportedClass.events[0].name).toBe("event");

      assert(isJSDocText(exportedClass.events[0].description![0]));
      expect(exportedClass.events[0].description![0].text).toBe("Event description");

      expect(exportedClass.properties).toHaveLength(0);
    });

  }

});
