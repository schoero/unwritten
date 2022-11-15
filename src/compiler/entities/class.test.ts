import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { parse } from "../../parser/index.js";
import { isClassType } from "../../typeguards/types.js";
import { Instance, Modifiers, TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createClassBySymbol } from "./class.js";


scope("Compiler", TypeKind.Class, () => {
  {

    const testFileContent = ts`
      /**  Class description */
      export class Class {
        constructor() {
        }
      }
    `;

    const { fileSymbol, exportedSymbols, ctx } = compile(testFileContent.trim());
    const exportedTypes = parse(ctx, fileSymbol);
    const exportedClass = exportedTypes.find(isClassType)!;

    it("should have an exported class", () => {
      expect(exportedClass).not.to.equal(undefined);
    });

    it("should have a matching name", () => {
      expect(exportedClass.name).to.equal("Class");
    });

    it("should have a matching id", () => {
      expect(exportedClass.id).to.equal(getIdBySymbol(ctx, exportedSymbols[0]!));
    });

    it("should have a description", () => {
      expect(exportedClass.description).to.equal("Class description");
    });

    it("should have a matching constructor", () => {
      expect(exportedClass.ctor).not.to.equal(undefined);
      expect(exportedClass.ctor?.signatures).not.to.equal(undefined);
      expect(exportedClass.ctor?.signatures).to.have.lengthOf(1);
    });

    it("should return a reference to the class instance on the constructor", () => {
      expect(exportedClass.ctor!.signatures[0]!.returnType.kind).to.equal(TypeKind.Instance);
      expect((exportedClass.ctor!.signatures[0]!.returnType as Instance).id).to.equal(exportedClass.id);
      expect((exportedClass.ctor!.signatures[0]!.returnType as Instance).position).to.deep.equal(exportedClass.position);
    });

  }

  {
    const testFileContent = ts`
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
      expect(exportedClass.properties).to.not.equal(undefined);
      expect(exportedClass.properties).to.have.lengthOf(3);
      expect(exportedClass.properties![0]!.name).to.equal("publicProperty");
      expect(exportedClass.properties![0]!.kind).to.equal(TypeKind.Property);
      expect(exportedClass.properties![0]!.type.kind).to.equal(TypeKind.String);
      expect(exportedClass.properties![1]!.name).to.equal("staticProperty");
      expect(exportedClass.properties![1]!.kind).to.equal(TypeKind.Property);
      expect(exportedClass.properties![1]!.type.kind).to.equal(TypeKind.String);
      expect(exportedClass.properties![2]!.name).to.equal("privateProperty");
      expect(exportedClass.properties![2]!.kind).to.equal(TypeKind.Property);
      expect(exportedClass.properties![2]!.type.kind).to.equal(TypeKind.String);
    });

    it("should handle modifiers correctly", () => {
      expect(exportedClass.modifiers).to.contain(Modifiers.Abstract);
      expect(exportedClass.properties![0]!.modifiers).to.contain(Modifiers.Public);
      expect(exportedClass.properties![1]!.modifiers).to.contain(Modifiers.Static);
      expect(exportedClass.properties![2]!.modifiers).to.contain(Modifiers.Private);
    });

  }

  {
    const testFileContent = ts`
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
      expect(exportedClass.methods).to.not.equal(undefined);
      expect(exportedClass.methods).to.have.lengthOf(2);
    });

    it("should be able to handle method overloads", () => {
      expect(exportedClass.methods![0]!.signatures).to.have.lengthOf(2);
    });

    it("should be able to handle methods that return this", () => {
      expect(exportedClass.methods![1]!.signatures[0]!.returnType.kind).to.equal(TypeKind.This);
      expect(exportedClass.methods![1]!.signatures[0]!.returnType.id).to.equal(exportedClass.id);
    });

  }

  {
    const testFileContent = ts`
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
      expect(exportedClass.setters).to.not.equal(undefined);
      expect(exportedClass.setters).to.have.lengthOf(1);
      expect(exportedClass.setters![0]!.signatures).to.have.lengthOf(1);
      expect(exportedClass.setters![0]!.signatures[0]?.parameters).to.have.lengthOf(1);
      expect(exportedClass.setters![0]!.signatures[0]?.parameters[0]?.type.kind).to.equal(TypeKind.String);
      expect(exportedClass.getters).to.not.equal(undefined);
      expect(exportedClass.getters).to.have.lengthOf(1);
      expect(exportedClass.getters![0]!.signatures).to.have.lengthOf(1);
      expect(exportedClass.getters![0]!.signatures[0]?.returnType.kind).to.equal(TypeKind.String);
    });

  }

  {
    const testFileContent = ts`
      class Base {
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
      expect(exportedClass.properties).to.not.equal(undefined);
      expect(exportedClass.properties).to.have.lengthOf(2);
      expect(exportedClass.properties![0]!.name).to.equal("propertyA");
      expect(exportedClass.properties![1]!.name).to.equal("propertyB");
    });

  }

  {
    const testFileContent = ts`
      class Base {
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
      expect(exportedClass.properties).to.not.equal(undefined);
      expect(exportedClass.properties).to.have.lengthOf(1);
      expect(exportedClass.properties![0]!.name).to.equal("property");
    });

  }

});
