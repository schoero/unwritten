import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Kind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createInterfaceBySymbol } from "./interface.js";


scope("Compiler", Kind.Interface, () => {

  {

    const testFileContent = ts`
      export interface Interface {};
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, symbol);

    it("should be able to parse an interface", () => {
      expect(exportedInterface.kind).to.equal(Kind.Interface);
    });

  }

  {

    const testFileContent = ts`
      export interface Interface {
        (): void;
        new (): void;
        method(a: string): void;
        prop: string;
        funcProp: () => void;
        get getter(): string;
        set setter(value: string): void;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, symbol);

    it("should be able to handle construct signatures", () => {
      expect(exportedInterface.constructSignatures.length).to.equal(1);
    });

    it("should be able to handle call signatures", () => {
      expect(exportedInterface.callSignatures.length).to.equal(1);
    });

    it("should be able to handle properties", () => {
      expect(exportedInterface.properties.length).to.equal(2);
    });

    it("should be able to handle methods", () => {
      expect(exportedInterface.methodSignatures.length).to.equal(1);
    });

    it("should differentiate between methods and function properties", () => {
      expect(exportedInterface.methodSignatures.find(m => m.name === "method")).to.not.equal(undefined);
      expect(exportedInterface.properties.find(p => p.name === "funcProp")).to.not.equal(undefined);
    });

    it("should be able to handle getters", () => {
      expect(exportedInterface.getterSignatures.length).to.equal(1);
    });

    it("should be able to handle setters", () => {
      expect(exportedInterface.setterSignatures.length).to.equal(1);
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

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedInterface.kind).to.equal(Kind.Interface);
    });

    it("should have a matching name", () => {
      expect(exportedInterface.name).to.equal("Interface");
    });

    it("should have a matching id", () => {
      expect(exportedInterface.id).to.equal(getIdBySymbol(ctx, symbol));
    });

    it("should have the correct amount of members", () => {
      expect(exportedInterface.properties.length).to.equal(2);
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

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, symbol);

    it("should merge multiple interfaces with the same name", () => {
      expect(exportedInterface.properties.length).to.equal(2);
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

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const exportedInterfaceBSymbol = exportedSymbols.find(s => s.name === "InterfaceB")!;
    const exportedInterfaceCSymbol = exportedSymbols.find(s => s.name === "InterfaceC")!;
    const exportedInterfaceB = createInterfaceBySymbol(ctx, exportedInterfaceBSymbol);
    const exportedInterfaceC = createInterfaceBySymbol(ctx, exportedInterfaceCSymbol);

    it("should be able to handle extended interfaces", () => {
      expect(exportedInterfaceB.properties).to.have.lengthOf(2);
      expect(exportedInterfaceC.properties).to.have.lengthOf(3);
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

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const exportedInterfaceCSymbol = exportedSymbols.find(s => s.name === "InterfaceC")!;
    const exportedInterfaceC = createInterfaceBySymbol(ctx, exportedInterfaceCSymbol);

    it("should be able to handle extended interfaces", () => {
      expect(exportedInterfaceC.properties).to.have.lengthOf(3);
    });

  }

  {

    const testFileContent = ts`
      export interface GenericInterface<T> {
        b: T;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const exportedInterfaceSymbol = exportedSymbols.find(s => s.name === "GenericInterface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, exportedInterfaceSymbol);

    it("should support generics in interfaces", () => {
      expect(exportedInterface.typeParameters).to.not.equal(undefined);
      expect(exportedInterface.typeParameters).to.have.lengthOf(1);
      expect(exportedInterface.properties).to.have.lengthOf(1);
      expect(exportedInterface.properties[0]!.type.kind).to.equal(Kind.TypeParameter);
    });

  }

});
