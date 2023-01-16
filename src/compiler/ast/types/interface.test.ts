import { expect, it } from "vitest";

import { createInterfaceEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";


scope("Compiler", TypeKind.InterfaceType, () => {

  {

    const testFileContent = ts`
      export interface Interface {};
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceEntity(ctx, symbol);

    it("should be able to parse an interface", () => {
      expect(exportedInterface.kind).to.equal(TypeKind.InterfaceType);
    });

  }

  {

    const testFileContent = ts`
      export interface Interface {
        (): void;
        static staticProp: string;
        protected protectedProp: string; 
        new (): void;
        method(a: number): void;
        method(a: string): void;
        prop: string;
        funcProp: () => void;
        get getter(): string;
        set setter(value: string): void;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceEntity(ctx, symbol);

    it("should be able to handle construct signatures", () => {
      expect(exportedInterface.constructSignatures).to.have.lengthOf(1);
    });

    it("should be able to handle call signatures", () => {
      expect(exportedInterface.callSignatures).to.have.lengthOf(1);
    });

    it("should be able to handle properties", () => {
      expect(exportedInterface.properties).to.have.lengthOf(4);
    });

    it("should be able to handle static properties", () => {
      expect(exportedInterface.properties.filter(prop =>
        prop.modifiers.includes("static"))).to.have.lengthOf(1);
    });

    it("should be able to handle instance properties", () => {
      expect(exportedInterface.properties.filter(prop =>
        prop.modifiers.includes("protected"))).to.have.lengthOf(1);
    });

    it("should be able to handle overloaded methods", () => {
      expect(exportedInterface.methods).to.have.lengthOf(1);
      expect(exportedInterface.methods[0].signatures).to.have.lengthOf(2);
    });

    it("should differentiate between methods and function properties", () => {
      expect(exportedInterface.methods.find(m => m.name === "method")).to.not.equal(undefined);
      expect(exportedInterface.properties.find(p => p.name === "funcProp")).to.not.equal(undefined);
    });

    it("should be able to handle getters", () => {
      expect(exportedInterface.getters).to.have.lengthOf(1);
    });

    it("should be able to handle setters", () => {
      expect(exportedInterface.setters).to.have.lengthOf(1);
    });

  }

  {

    const testFileContent = ts`
      /** 
       * Interface description 
       * @example Interface example
       */
      export interface Interface {
        /**
         * Member description
         * @example Member example
         */
        a: string;
        b: number;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedInterface.kind).to.equal(TypeKind.Interface);
    });

    it("should have a matching name", () => {
      expect(exportedInterface.name).to.equal("Interface");
    });

    it("should have the correct amount of members", () => {
      expect(exportedInterface.properties).to.have.lengthOf(2);
    });

    it("should have a matching description", () => {
      expect(exportedInterface.description).to.equal("Interface description");
    });

    it("should have a matching example", () => {
      expect(exportedInterface.example).to.equal("Interface example");
    });

    it("should have a matching position", () => {
      expect(exportedInterface.position).to.deep.equal({
        column: 6,
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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, symbol);

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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedInterfaceBSymbol = exportedSymbols.find(s => s.name === "InterfaceB")!;
    const exportedInterfaceCSymbol = exportedSymbols.find(s => s.name === "InterfaceC")!;
    const exportedInterfaceB = createInterfaceBySymbol(ctx, exportedInterfaceBSymbol);
    const exportedInterfaceC = createInterfaceBySymbol(ctx, exportedInterfaceCSymbol);

    it("should be able to parse inheritance", () => {

      expect(exportedInterfaceB.properties).to.have.lengthOf(2);
      expect(exportedInterfaceB.properties[0]!.name).to.equal("b");
      expect(exportedInterfaceB.heritage).to.not.equal(undefined);
      expect(exportedInterfaceB.heritage).to.have.lengthOf(1);
      expect(exportedInterfaceB.heritage![0]!.kind).to.equal(TypeKind.Expression);
      expect(exportedInterfaceB.heritage![0]!.type.kind).to.equal(TypeKind.Interface);
      expect((exportedInterfaceB.heritage![0]!.type as Interface).properties).to.have.lengthOf(1);
      expect((exportedInterfaceB.heritage![0]!.type as Interface).properties[0]!.name).to.equal("a");

      expect(exportedInterfaceC.properties).to.have.lengthOf(3);
      expect(exportedInterfaceC.properties[0]!.name).to.equal("c");
      expect(exportedInterfaceC.heritage).to.not.equal(undefined);
      expect(exportedInterfaceC.heritage).to.have.lengthOf(1);
      expect(exportedInterfaceC.heritage![0]!.kind).to.equal(TypeKind.Expression);
      expect(exportedInterfaceC.heritage![0]!.type.kind).to.equal(TypeKind.Interface);
      expect((exportedInterfaceC.heritage![0]!.type as Interface).properties).to.have.lengthOf(2);
      expect((exportedInterfaceC.heritage![0]!.type as Interface).properties[0]!.name).to.equal("b");
      expect((exportedInterfaceC.heritage![0]!.type as Interface).properties[1]!.name).to.equal("a");

      expect((exportedInterfaceC.heritage![0]!.type as Interface).heritage).to.not.equal(undefined);
      expect((exportedInterfaceC.heritage![0]!.type as Interface).heritage).to.have.lengthOf(1);
      expect((exportedInterfaceC.heritage![0]!.type as Interface).heritage![0]!.kind).to.equal(TypeKind.Expression);
      expect((exportedInterfaceC.heritage![0]!.type as Interface).heritage![0]!.type.kind).to.equal(TypeKind.Interface);
      expect(((exportedInterfaceC.heritage![0]!.type as Interface).heritage![0]!.type as Interface).properties).to.have.lengthOf(1);
      expect(((exportedInterfaceC.heritage![0]!.type as Interface).heritage![0]!.type as Interface).properties[0]!.name).to.equal("a");

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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedInterfaceCSymbol = exportedSymbols.find(s => s.name === "InterfaceC")!;
    const exportedInterfaceC = createInterfaceBySymbol(ctx, exportedInterfaceCSymbol);

    it("should be able to handle multiple extended interfaces at the same time", () => {

      expect(exportedInterfaceC.properties).to.have.lengthOf(3);

      expect(exportedInterfaceC.heritage).to.not.equal(undefined);
      expect(exportedInterfaceC.heritage).to.have.lengthOf(2);

      expect(exportedInterfaceC.heritage![0]!.kind).to.equal(TypeKind.Expression);
      expect(exportedInterfaceC.heritage![0]!.type.kind).to.equal(TypeKind.Interface);
      expect((exportedInterfaceC.heritage![0]!.type as Interface).properties).to.have.lengthOf(1);
      expect((exportedInterfaceC.heritage![0]!.type as Interface).properties[0]!.name).to.equal("a");

      expect(exportedInterfaceC.heritage![1]!.kind).to.equal(TypeKind.Expression);
      expect(exportedInterfaceC.heritage![1]!.type.kind).to.equal(TypeKind.Interface);
      expect((exportedInterfaceC.heritage![1]!.type as Interface).properties).to.have.lengthOf(1);
      expect((exportedInterfaceC.heritage![1]!.type as Interface).properties[0]!.name).to.equal("b");

    });

  }

  {

    const testFileContent = ts`
      export interface GenericInterface<T> {
        b: T;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedInterfaceSymbol = exportedSymbols.find(s => s.name === "GenericInterface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, exportedInterfaceSymbol);

    it("should support generics in interfaces", () => {
      expect(exportedInterface.typeParameters).to.not.equal(undefined);
      expect(exportedInterface.typeParameters).to.have.lengthOf(1);
      expect(exportedInterface.properties).to.have.lengthOf(1);
      expect(exportedInterface.properties[0]!.type.kind).to.equal(TypeKind.TypeParameter);
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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedInterfaceSymbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, exportedInterfaceSymbol);

    it("should support type arguments", () => {

      expect(exportedInterface.heritage).to.not.equal(undefined);
      expect(exportedInterface.heritage).to.have.lengthOf(1);

      expect(exportedInterface.heritage![0]!.typeArguments).to.not.equal(undefined);
      expect(exportedInterface.heritage![0]!.typeArguments).to.have.lengthOf(1);
      expect(exportedInterface.heritage![0]!.typeArguments![0]!.type.kind).to.equal(TypeKind.StringLiteral);

      expect((exportedInterface.heritage![0]!.type as Interface).properties).to.have.lengthOf(1);
      expect((exportedInterface.heritage![0]!.type as Interface).properties[0]!.type.kind).to.equal(TypeKind.StringLiteral);

    });

  }

});