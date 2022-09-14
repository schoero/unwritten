import { describe, expect, it } from "vitest";

import { createClassBySymbol } from "../../src/compiler/types/class.js";
import { compile } from "../utils/compile.js";


describe("Compiler: Class", function() {

  const testFileContent = `
    class Base {
      constructor(){
      }
    }

    /**
     * A class.
     */
    export class Class extends Base {

      public name: string;
      private _kind: string | undefined;

      constructor(name: string);
      constructor(name: string, kind: string);
      constructor(name: string, kind?: string) {
        super();
        this.name = name;
        this._kind = kind;
      }

      public add(a: number, b: number): number;
      public add(a: number, b: number, c: number): number;
      public add(a: number, b: number, c?: number): number {
        return a + b + c ?? 0;
      }
      
      // public test() {
      //   return this;
      // }

      public set kind(value: string) {
        this._kind = value;
      }

      public get kind(): string {
        return this._kind ?? "";
      }

    }
  `;

  const { exportedSymbols } = compile(testFileContent.trim());

  const symbol = exportedSymbols.find(s => s.name === "Class")!;
  const exportedClass = createClassBySymbol(symbol);

  it("should have an exported class", function() {
    expect(exportedClass).not.to.be.undefined;
  });

  it("should have a name", function() {
    expect(exportedClass.name).to.equal("Class");
  });

  it("should have a description", function() {
    expect(exportedClass.description).to.equal("A class.");
  });

  it("should have a constructor with 2 signatures", function() {
    expect(exportedClass.ctor?.signatures).to.have.lengthOf(2);
  });

});