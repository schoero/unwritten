import { describe, expect, it } from "vitest";

import { getIdBySymbol } from "../../src/compiler/compositions/id.js";
import { parse } from "../../src/parser/index.js";
import { Class, EntityKind } from "../../src/types/types.js";
import { compile } from "../utils/compile.js";


describe("Compiler: Class", () => {

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

  const { fileSymbol, exportedSymbols } = compile(testFileContent.trim());
  const exportedClass = parse(fileSymbol)[0] as Class;

  it("should have an exported class", () => {
    expect(exportedClass).not.to.be.undefined;
  });

  it("should have a matching name", () => {
    expect(exportedClass.name).to.equal("Class");
  });

  it("should have a matching id", () => {
    expect(exportedClass.id).to.equal(getIdBySymbol(exportedSymbols[0]!));
  });

  it("should have a description", () => {
    expect(exportedClass.description).to.equal("A class.");
  });

  it("should have a constructor with 2 signatures", () => {
    expect(exportedClass.ctor?.signatures).to.have.lengthOf(2);
  });

  it("should have a constructor that returns an instance", () => {
    expect(exportedClass.ctor?.signatures[0]?.returnType.kind).to.equal(EntityKind.Instance);
  });

});