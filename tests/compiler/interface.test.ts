
import { describe, expect, it } from "vitest";
import { createInterfaceBySymbol } from "../../src/compiler/types/interface.js";

import { EntityKind, Interface } from "../../src/types/types.js";
import { compile } from "../utils/compile.js";


describe("Compiler: Interface", function() {
  {
    const testFileContent = `
      /** Interface description */
      export interface Interface {
        /** Member description */
        a: string;
        /** @example 7 */
        b: number;
      }
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedVariable = createInterfaceBySymbol(symbol);

    it("should have a matching kind", function() {
      expect(exportedVariable.kind).to.equal(EntityKind.Interface);
    });

    it("should have a matching name", function() {
      expect(exportedVariable.name).to.equal("Interface");
    });

    it("should have a matching type", function() {
      expect((exportedVariable as Interface).members.length).to.equal(2);
    });

    it("should have matching members", function() {
      expect((exportedVariable as Interface).members[0]!.name).to.equal("a");
      expect((exportedVariable as Interface).members[0]!.type.kind).to.equal(EntityKind.String);
      expect((exportedVariable as Interface).members[0]!.position).to.deep.equal({ file: "/file.ts", line: 4, column: 8 });
      expect((exportedVariable as Interface).members[0]!.description).to.equal("Member description");
      expect((exportedVariable as Interface).members[1]!.name).to.equal("b");
      expect((exportedVariable as Interface).members[1]!.example).to.equal("7");
      expect((exportedVariable as Interface).members[1]!.type.kind).to.equal(EntityKind.Number);
      expect((exportedVariable as Interface).members[1]!.position).to.deep.equal({ file: "/file.ts", line: 6, column: 8 });
    });

    it("should have a matching description", function() {
      expect(exportedVariable.description).to.equal("Interface description");
    });

    it("should have a matching position", function() {
      expect(exportedVariable.position).to.deep.equal({
        file: "/file.ts",
        line: 2,
        column: 6
      });
    });

  }

  {

    const testFileContent = `
      export interface Interface {
        a: string;
      }
      export interface Interface {
        b: number;
      }
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Interface")!;
    const exportedVariable = createInterfaceBySymbol(symbol);

    it("should merge multiple interfaces with the same name", function() {
      expect((exportedVariable as Interface).members.length).to.equal(2);
      expect((exportedVariable as Interface).members[0]!.name).to.equal("a");
      expect((exportedVariable as Interface).members[0]!.type.kind).to.equal(EntityKind.String);
      expect((exportedVariable as Interface).members[1]!.name).to.equal("b");
      expect((exportedVariable as Interface).members[1]!.type.kind).to.equal(EntityKind.Number);
    });

  }

  {

    const testFileContent = `
      export interface InterfaceA {
        b: InterfaceB;
      }
      export interface InterfaceB {
        a: InterfaceA;
      }
    `;

    const { exportedSymbols } = compile(testFileContent.trim());

    const symbolA = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const symbolB = exportedSymbols.find(s => s.name === "InterfaceB")!;
    const exportedInterfaceA = createInterfaceBySymbol(symbolA);
    const exportedInterfaceB = createInterfaceBySymbol(symbolB);

    it("should be able to handle recursive interfaces", function() {
      expect((exportedInterfaceA as Interface).members.length).to.equal(1);
      expect((exportedInterfaceB as Interface).members.length).to.equal(1);
      expect((exportedInterfaceA as Interface).members[0]!.name).to.equal("b");
      expect((exportedInterfaceB as Interface).members[0]!.name).to.equal("a");
      expect((exportedInterfaceA as Interface).members[0]!.type.kind).to.equal(EntityKind.Reference);
      expect((exportedInterfaceB as Interface).members[0]!.type.kind).to.equal(EntityKind.Reference);
    });

  }


});