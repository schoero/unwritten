import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Interface, TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createInterfaceBySymbol } from "./interface.js";


scope("Compiler", TypeKind.Interface, () => {
  {
    const testFileContent = ts`
      /** Interface description */
      export interface Interface {
        /** Member description */
        a: string;
        /** @example 7 */
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

    it("should have a matching type", () => {
      expect((exportedInterface as Interface).members.length).to.equal(2);
    });

    it("should have matching members", () => {
      expect((exportedInterface as Interface).members[0]!.name).to.equal("a");
      expect((exportedInterface as Interface).members[0]!.type.kind).to.equal(TypeKind.String);
      expect((exportedInterface as Interface).members[0]!.position).to.deep.equal({ column: 8, file: "/file.ts", line: 4 });
      expect((exportedInterface as Interface).members[0]!.description).to.equal("Member description");
      expect((exportedInterface as Interface).members[1]!.name).to.equal("b");
      expect((exportedInterface as Interface).members[1]!.example).to.equal("7");
      expect((exportedInterface as Interface).members[1]!.type.kind).to.equal(TypeKind.Number);
      expect((exportedInterface as Interface).members[1]!.position).to.deep.equal({ column: 8, file: "/file.ts", line: 6 });
    });

    it("should have a matching description", () => {
      expect(exportedInterface.description).to.equal("Interface description");
    });

    it("should have a matching position", () => {
      expect(exportedInterface.position).to.deep.equal({
        column: 6,
        file: "/file.ts",
        line: 2
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
      expect((exportedInterface as Interface).members.length).to.equal(2);
      expect((exportedInterface as Interface).members[0]!.name).to.equal("a");
      expect((exportedInterface as Interface).members[0]!.type.kind).to.equal(TypeKind.String);
      expect((exportedInterface as Interface).members[1]!.name).to.equal("b");
      expect((exportedInterface as Interface).members[1]!.type.kind).to.equal(TypeKind.Number);
    });

  }

  {

    const testFileContent = ts`
      export interface InterfaceA {
        b: InterfaceB;
      }
      export interface InterfaceB {
        a: InterfaceA;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const exportedInterfaceASymbol = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const exportedInterfaceBSymbol = exportedSymbols.find(s => s.name === "InterfaceB")!;
    const exportedInterfaceA = createInterfaceBySymbol(ctx, exportedInterfaceASymbol);
    const exportedInterfaceB = createInterfaceBySymbol(ctx, exportedInterfaceBSymbol);

    it("should be able to handle recursive interfaces", () => {
      expect(exportedInterfaceA.members.length).to.equal(1);
      expect(exportedInterfaceB.members.length).to.equal(1);
      expect(exportedInterfaceA.members[0]!.name).to.equal("b");
      expect(exportedInterfaceB.members[0]!.name).to.equal("a");
      expect(exportedInterfaceA.members[0]!.type.kind).to.equal(TypeKind.Reference);
      expect(exportedInterfaceB.members[0]!.type.kind).to.equal(TypeKind.Reference);
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
      expect((exportedInterfaceB as Interface).members).to.have.lengthOf(2);
      expect((exportedInterfaceB as Interface).members[0]!.name).to.equal("a");
      expect((exportedInterfaceB as Interface).members[1]!.name).to.equal("b");
      expect((exportedInterfaceC as Interface).members).to.have.lengthOf(3);
      expect((exportedInterfaceC as Interface).members[0]!.name).to.equal("a");
      expect((exportedInterfaceC as Interface).members[1]!.name).to.equal("b");
      expect((exportedInterfaceC as Interface).members[2]!.name).to.equal("c");
    });

  }

});
