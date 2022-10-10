import { describe, expect, it } from "vitest";

import { getIdBySymbol } from "../../src/compiler/compositions/id.js";
import { createClassBySymbol } from "../../src/compiler/types/class.js";
import { Modifiers, TypeKind } from "../../src/types/types.js";
import { compile } from "../utils/compile.js";


describe("Compiler: Class", () => {
  {

    const testFileContent = `
      /**
       * A class.
       */
      export class Class {
        constructor() {
        }
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedClassSymbol = exportedSymbols.find(symbol => symbol.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, exportedClassSymbol);

    it("should have an exported class", () => {
      expect(exportedClass).not.to.be.undefined;
    });

    it("should have a matching name", () => {
      expect(exportedClass.name).to.equal("Class");
    });

    it("should have a matching id", () => {
      expect(exportedClass.id).to.equal(getIdBySymbol(ctx, exportedSymbols[0]!));
    });

    it("should have a description", () => {
      expect(exportedClass.description).to.equal("A class.");
    });

  }

  {
    const testFileContent = `
      export abstract class Class {
        public publicProperty: string;
        static staticProperty: string;
        private privateProperty: string;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedClassSymbol = exportedSymbols.find(symbol => symbol.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, exportedClassSymbol);

    it("should have matching properties", () => {
      expect(exportedClass.properties).to.have.lengthOf(3);
      expect(exportedClass.properties[0]!.name).to.equal("publicProperty");
      expect(exportedClass.properties[0]!.kind).to.equal(TypeKind.Property);
      expect(exportedClass.properties[0]!.type.kind).to.equal(TypeKind.String);
      expect(exportedClass.properties[1]!.name).to.equal("staticProperty");
      expect(exportedClass.properties[1]!.kind).to.equal(TypeKind.Property);
      expect(exportedClass.properties[1]!.type.kind).to.equal(TypeKind.String);
      expect(exportedClass.properties[2]!.name).to.equal("privateProperty");
      expect(exportedClass.properties[2]!.kind).to.equal(TypeKind.Property);
      expect(exportedClass.properties[2]!.type.kind).to.equal(TypeKind.String);
    });

    it("should handle modifiers correctly", () => {
      expect(exportedClass.modifiers).to.contain(Modifiers.Abstract);
      expect(exportedClass.properties[0]!.modifiers).to.contain(Modifiers.Public);
      expect(exportedClass.properties[1]!.modifiers).to.contain(Modifiers.Static);
      expect(exportedClass.properties[2]!.modifiers).to.contain(Modifiers.Private);
    });

  }

  {
    const testFileContent = `
      export class Class {

        public add(a: number, b: number): number;
        public add(a: number, b: number, c: number): number;
        public add(a: number, b: number, c?: number): number {
          return a + b + c ?? 0;
        }

        public getThis() {
          return this;
        }

      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedClassSymbol = exportedSymbols.find(symbol => symbol.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, exportedClassSymbol);

    it("should have 2 methods", () => {
      expect(exportedClass.methods).to.have.lengthOf(2);
    });

    it("should be able to handle method overloads", () => {
      expect(exportedClass.methods[0]!.signatures).to.have.lengthOf(2);
    });

    it("should be able to handle methods that return this", () => {
      expect(exportedClass.methods[1]!.signatures[0]!.returnType.kind).to.equal(TypeKind.This);
      expect(exportedClass.methods[1]!.signatures[0]!.returnType.id).to.equal(exportedClass.id);
    });

  }

  {
    const testFileContent = `
      export class Class {
        
        private _kind: string;

        public set kind(value: string) {
          this._kind = value;
        }

        public get kind(): string {
          return this._kind ?? "";
        }

      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedClassSymbol = exportedSymbols.find(symbol => symbol.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, exportedClassSymbol);

    it("should have a setter and a getter", () => {
      expect(exportedClass.setters).to.have.lengthOf(1);
      expect(exportedClass.setters[0]!.signatures).to.have.lengthOf(1);
      expect(exportedClass.setters[0]!.signatures[0]?.parameters).to.have.lengthOf(1);
      expect(exportedClass.setters[0]!.signatures[0]?.parameters[0]?.type.kind).to.equal(TypeKind.String);
      expect(exportedClass.getters).to.have.lengthOf(1);
      expect(exportedClass.getters[0]!.signatures).to.have.lengthOf(1);
      expect(exportedClass.getters[0]!.signatures[0]?.returnType.kind).to.equal(TypeKind.String);
    });

  }

  {
    const testFileContent = `
      class Base {
        constructor(){
        }

        public propertyA: string = "A";

      }

      export class Class extends Base {

        constructor(){
          super();
        }

        public propertyB: string = "B";

      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedClassSymbol = exportedSymbols.find(symbol => symbol.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, exportedClassSymbol);

    it("should merge different properties from inherited class", () => {
      expect(exportedClass.properties).to.have.lengthOf(2);
      expect(exportedClass.properties[0]!.name).to.equal("propertyA");
      expect(exportedClass.properties[1]!.name).to.equal("propertyB");
    });

  }

  {
    const testFileContent = `
      class Base {
        constructor() {
        }
      
        public readonly property: number = 1;
      
      }
      
      export class Class extends Base {
      
        constructor() {
          super();
        }
      
        public override readonly property: number = 2;
      
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedClassSymbol = exportedSymbols.find(symbol => symbol.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, exportedClassSymbol);

    it("should override identical properties from inherited class", () => {
      expect(exportedClass.properties).to.have.lengthOf(1);
      expect(exportedClass.properties[0]!.name).to.equal("property");
    });

  }

});