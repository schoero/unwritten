import { assert, expect, it } from "vitest";

import { createInterfaceEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Interface, () => {

  {

    const testFileContent = ts`
      export interface Interface {};
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceEntity(ctx, symbol);

    it("should be able to parse an interface", () => {
      expect(exportedInterface.kind).toBe(EntityKind.Interface);
    });

  }

  {

    const testFileContent = ts`
      export interface Interface {
        (): void;
        new (): void;
        method(a: number): void;
        method(a: string): void;
        prop: string;
        funcProp: () => void;
        get getter(): string;
        set setter(value: string);
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceEntity(ctx, symbol);

    it("should be able to handle construct signatures", () => {
      expect(exportedInterface.constructSignatures).to.have.lengthOf(1);
    });

    it("should be able to handle call signatures", () => {
      expect(exportedInterface.callSignatures).to.have.lengthOf(1);
    });

    it("should be able to handle properties", () => {
      expect(exportedInterface.properties).to.have.lengthOf(2);
    });

    it("should be able to handle overloaded methods", () => {
      expect(exportedInterface.methodSignatures).to.have.lengthOf(2);
    });

    it("should differentiate between methods and function properties", () => {
      expect(exportedInterface.methodSignatures.find(m => m.name === "method")).toBeDefined();
      expect(exportedInterface.properties.find(p => p.name === "funcProp")).toBeDefined();
    });

    it("should be able to handle getters", () => {
      expect(exportedInterface.getterSignatures).to.have.lengthOf(1);
    });

    it("should be able to handle setters", () => {
      expect(exportedInterface.setterSignatures).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      /** 
       * Interface description 
       * @example Interface example
       */
      export interface Interface {
        a: string;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedInterface.kind).toBe(EntityKind.Interface);
    });

    it("should have a matching name", () => {
      expect(exportedInterface.name).toBe("Interface");
    });

    it("should have the correct amount of members", () => {
      expect(exportedInterface.properties).to.have.lengthOf(1);
    });

    it("should have a matching description", () => {
      expect(exportedInterface.description).toBe("Interface description");
    });

    it("should have a matching example", () => {
      expect(exportedInterface.example).toBe("Interface example");
    });

    it("should have a matching position", () => {
      expect(exportedInterface.position).to.deep.equal({
        column: 0,
        file: "/file.ts",
        line: 5
      });
    });

  }

  {

    const testFileContent = ts`
      export interface Interface {
        a: string;
      }
      export interface Interface {
        b: number;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceEntity(ctx, symbol);

    it("should merge multiple interfaces with the same name", () => {
      expect(exportedInterface.properties).to.have.lengthOf(2);
    });

  }

  {

    const testFileContent = ts`
      interface InterfaceA {
        a: string;
      }
      export interface InterfaceB extends InterfaceA {
        b: string;
      }
      export interface InterfaceC extends InterfaceB {
        c: string;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedInterfaceBSymbol = exportedSymbols.find(s => s.name === "InterfaceB")!;
    const exportedInterfaceCSymbol = exportedSymbols.find(s => s.name === "InterfaceC")!;
    const exportedInterfaceB = createInterfaceEntity(ctx, exportedInterfaceBSymbol);
    const exportedInterfaceC = createInterfaceEntity(ctx, exportedInterfaceCSymbol);

    it("should be able to parse inheritance", () => {

      expect(exportedInterfaceB.properties).to.have.lengthOf(1);
      expect(exportedInterfaceB.properties[0]!.name).toBe("b");
      expect(exportedInterfaceB.heritage).toBeDefined();
      expect(exportedInterfaceB.heritage).to.have.lengthOf(1);

      assert(exportedInterfaceB.heritage![0]!.instanceType.kind === TypeKind.Interface);
      expect(exportedInterfaceB.heritage![0]!.instanceType.properties).to.have.lengthOf(1);
      expect(exportedInterfaceB.heritage![0]!.instanceType.properties[0]!.name).toBe("a");

      expect(exportedInterfaceC.properties).to.have.lengthOf(1);
      expect(exportedInterfaceC.properties[0]!.name).toBe("c");
      expect(exportedInterfaceC.heritage).toBeDefined();
      expect(exportedInterfaceC.heritage).to.have.lengthOf(1);

      assert(exportedInterfaceC.heritage![0]!.instanceType.kind === TypeKind.Interface);
      expect(exportedInterfaceC.heritage![0]!.instanceType.properties).to.have.lengthOf(2);
      expect(exportedInterfaceC.heritage![0]!.instanceType.properties[1]!.name).toBe("a");
      expect(exportedInterfaceC.heritage![0]!.instanceType.properties[0]!.name).toBe("b");

    });

  }

  {

    const testFileContent = ts`
      interface InterfaceA {
        a: string;
      }
      interface InterfaceB {
        b: string;
      }
      export interface InterfaceC extends InterfaceA, InterfaceB {
        c: string;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedInterfaceCSymbol = exportedSymbols.find(s => s.name === "InterfaceC")!;
    const exportedInterfaceC = createInterfaceEntity(ctx, exportedInterfaceCSymbol);

    it("should be able to handle multiple extended interfaces at the same time", () => {

      expect(exportedInterfaceC.properties).to.have.lengthOf(1);

      expect(exportedInterfaceC.heritage).toBeDefined();
      expect(exportedInterfaceC.heritage).to.have.lengthOf(2);

      assert(exportedInterfaceC.heritage![0]!.instanceType.kind === TypeKind.Interface);
      expect(exportedInterfaceC.heritage![0]!.instanceType.properties).to.have.lengthOf(1);
      expect(exportedInterfaceC.heritage![0]!.instanceType.properties[0]!.name).toBe("a");

      assert(exportedInterfaceC.heritage![1]!.instanceType.kind === TypeKind.Interface);
      expect(exportedInterfaceC.heritage![1]!.instanceType.properties).to.have.lengthOf(1);
      expect(exportedInterfaceC.heritage![1]!.instanceType.properties[0]!.name).toBe("b");

    });

  }

  {

    const testFileContent = ts`
      export interface GenericInterface<T> {
        a: T;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedInterfaceSymbol = exportedSymbols.find(s => s.name === "GenericInterface")!;
    const exportedInterface = createInterfaceEntity(ctx, exportedInterfaceSymbol);

    it("should support generics in interfaces", () => {
      expect(exportedInterface.typeParameters).toBeDefined();
      expect(exportedInterface.typeParameters).to.have.lengthOf(1);
      expect(exportedInterface.properties).to.have.lengthOf(1);
      expect(exportedInterface.properties[0]!.type.kind).toBe(TypeKind.TypeParameter);
    });

  }

  {

    const testFileContent = ts`
      export interface GenericInterface<T extends string> {
        a: T;
      }
      export interface GenericInterface<T extends string> {
        b: T;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedInterfaceSymbol = exportedSymbols.find(s => s.name === "GenericInterface")!;
    const exportedInterface = createInterfaceEntity(ctx, exportedInterfaceSymbol);

    it("should not have duplicate typeParameters on merged interfaces", () => {
      expect(exportedInterface.typeParameters).toBeDefined();
      expect(exportedInterface.typeParameters).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      interface Base<T extends string> {
        prop: T;
      }
      export interface Interface extends Base<"hello"> {

      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedInterfaceSymbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceEntity(ctx, exportedInterfaceSymbol);

    it("should support type arguments", () => {

      expect(exportedInterface.heritage).toBeDefined();
      expect(exportedInterface.heritage).to.have.lengthOf(1);

      expect(exportedInterface.heritage![0]!.typeArguments).toBeDefined();
      expect(exportedInterface.heritage![0]!.typeArguments).to.have.lengthOf(1);
      expect(exportedInterface.heritage![0]!.typeArguments![0]!.kind).toBe(TypeKind.StringLiteral);

      assert(exportedInterface.heritage![0]!.instanceType.kind === TypeKind.Object);
      expect(exportedInterface.heritage![0]!.instanceType.properties).to.have.lengthOf(1);
      expect(exportedInterface.heritage![0]!.instanceType.properties[0]!.type.kind).toBe(TypeKind.StringLiteral);

    });

  }

});
