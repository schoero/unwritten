import { describe, expect, it } from "vitest";

import { getIdBySymbol } from "../../src/compiler/compositions/id.js";
import { parse } from "../../src/parser/index.js";
import { Class, EntityKind, Modifiers } from "../../src/types/types.js";
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

      public publicProperty: string;
      static staticProperty: string;
      private privateProperty: string;

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
      
      public getThis() {
        return this;
      }

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

  it("should be able to handle constructor overloads", () => {
    expect(exportedClass.ctor?.signatures).to.have.lengthOf(2);
  });

  it("should have a constructor that returns an instance", () => {
    expect(exportedClass.ctor?.signatures[0]?.returnType.kind).to.equal(EntityKind.Instance);
    expect(exportedClass.ctor?.signatures[0]?.returnType.id).to.equal(exportedClass.id);
    expect(exportedClass.ctor?.signatures[1]?.returnType.kind).to.equal(EntityKind.Instance);
    expect(exportedClass.ctor?.signatures[1]?.returnType.id).to.equal(exportedClass.id);
  });

  it("should have 2 methods", () => {
    expect(exportedClass.methods).to.have.lengthOf(2);
  });

  it("should be able to handle method overloads", () => {
    expect(exportedClass.methods[0]!.signatures).to.have.lengthOf(2);
  });

  it("should be able to handle methods that return this", () => {
    expect(exportedClass.methods[1]!.signatures[0]!.returnType.kind).to.equal(EntityKind.This);
    expect(exportedClass.methods[1]!.signatures[0]!.returnType.id).to.equal(exportedClass.id);
  });

  it("should have a setter and a getter", () => {
    expect(exportedClass.setters).to.have.lengthOf(1);
    expect(exportedClass.setters[0]!.signatures).to.have.lengthOf(1);
    expect(exportedClass.setters[0]!.signatures[0]?.parameters).to.have.lengthOf(1);
    expect(exportedClass.setters[0]!.signatures[0]?.parameters[0]?.type.kind).to.equal(EntityKind.String);
    expect(exportedClass.getters).to.have.lengthOf(1);
    expect(exportedClass.getters[0]!.signatures).to.have.lengthOf(1);
    expect(exportedClass.getters[0]!.signatures[0]?.returnType.kind).to.equal(EntityKind.String);
  });

  it("should have matching properties", () => {
    expect(exportedClass.properties).to.have.lengthOf(4);
    expect(exportedClass.properties[0]!.name).to.equal("publicProperty");
    expect(exportedClass.properties[0]!.kind).to.equal(EntityKind.Property);
    expect(exportedClass.properties[0]!.type.kind).to.equal(EntityKind.String);
    expect(exportedClass.properties[0]!.modifiers).to.contain(Modifiers.Public);
    expect(exportedClass.properties[1]!.name).to.equal("staticProperty");
    expect(exportedClass.properties[1]!.kind).to.equal(EntityKind.Property);
    expect(exportedClass.properties[1]!.type.kind).to.equal(EntityKind.String);
    expect(exportedClass.properties[1]!.modifiers).to.contain(Modifiers.Static);
    expect(exportedClass.properties[2]!.name).to.equal("privateProperty");
    expect(exportedClass.properties[2]!.kind).to.equal(EntityKind.Property);
    expect(exportedClass.properties[2]!.type.kind).to.equal(EntityKind.String);
    expect(exportedClass.properties[2]!.modifiers).to.contain(Modifiers.Private);
  });

});