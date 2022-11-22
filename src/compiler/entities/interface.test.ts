import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind, TypeReference } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createInterfaceBySymbol } from "./interface.js";


scope("Compiler", TypeKind.Interface, () => {

  {

    const testFileContent = ts`
      export interface Interface {
        a: string;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, symbol);

    it("should be able to parse an interface", () => {
      expect(exportedInterface.kind).to.equal(TypeKind.Interface);
    });

  }

  {

    const testFileContent = ts`
      export interface Interface {};
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedInterface = createInterfaceBySymbol(ctx, symbol);

    it("should be able to handle empty interfaces", () => {
      expect(exportedInterface.kind).to.equal(TypeKind.Interface);
      expect(exportedInterface.members.length).to.equal(0);
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
      expect(exportedInterface.kind).to.equal(TypeKind.Interface);
    });

    it("should have a matching name", () => {
      expect(exportedInterface.name).to.equal("Interface");
    });

    it("should have a matching id", () => {
      expect(exportedInterface.id).to.equal(getIdBySymbol(ctx, symbol));
    });

    it("should have the correct amount of members", () => {
      expect(exportedInterface.members.length).to.equal(2);
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
      expect(exportedInterface.members.length).to.equal(2);
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
      expect(exportedInterfaceB.members).to.have.lengthOf(2);
      expect(exportedInterfaceC.members).to.have.lengthOf(3);
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
      expect(exportedInterface.members).to.have.lengthOf(1);
      expect(exportedInterface.members[0]!.type.kind).to.equal(TypeKind.TypeReference);
      expect((exportedInterface.members[0]!.type as TypeReference).target).to.not.equal(undefined);
      expect((exportedInterface.members[0]!.type as TypeReference).target!.kind).to.equal(TypeKind.TypeParameter);
    });

  }

});
