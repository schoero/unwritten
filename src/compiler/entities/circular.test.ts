import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:/utils/compile.js";
import { scope } from "quickdoks:tests:/utils/scope.js";
import { ts } from "quickdoks:tests:/utils/template.js";
import { Interface, Kind } from "quickdoks:types:types.js";

import { createInterfaceBySymbol } from "./interface.js";


scope("Compiler", Kind.Circular, () => {

  {

    const testFileContent = ts`
      export interface InterfaceA {
        b: InterfaceB;
      }
      export interface InterfaceB {
        c: InterfaceC;
      }
      interface InterfaceC {
        d: string
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedInterfaceASymbol = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const exportedInterfaceBSymbol = exportedSymbols.find(s => s.name === "InterfaceB")!;
    const exportedInterfaceA = createInterfaceBySymbol(ctx, exportedInterfaceASymbol);
    const exportedInterfaceB = createInterfaceBySymbol(ctx, exportedInterfaceBSymbol);

    it("should not create a circular type if the targeted symbol is exported", () => {
      expect(exportedInterfaceA.properties.length).to.equal(1);
      expect(exportedInterfaceA.properties[0]!.type.kind).to.equal(Kind.Interface);
      expect(exportedInterfaceA.properties[0]!.type.id).to.equal(exportedInterfaceB.id);
    });

    it("should not create a circular type if the targeted symbol is not exported and not circular", () => {
      expect(exportedInterfaceB.properties.length).to.equal(1);
      expect(exportedInterfaceB.properties[0]!.type.kind).to.equal(Kind.Interface);
    });

  }

  {

    const testFileContent = ts`
      export interface InterfaceA {
        b: InterfaceB;
      }
      interface InterfaceB {
        c: InterfaceC;
      }
      interface InterfaceC {
        b: InterfaceB
      }i
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedInterfaceASymbol = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const exportedInterfaceA = createInterfaceBySymbol(ctx, exportedInterfaceASymbol);

    it("should create a circular type if the targeted symbol circular, even if it is not exported", () => {

      expect(exportedInterfaceA.properties.length).to.equal(1);
      expect(exportedInterfaceA.properties[0]!.type.kind).to.equal(Kind.Interface);

      const interfaceB = exportedInterfaceA.properties[0]!.type as Interface;

      expect(interfaceB.properties.length).to.equal(1);
      expect(exportedInterfaceA.properties[0]!.type.kind).to.equal(Kind.Interface);
      expect(interfaceB.properties[0]!.type.kind).to.equal(Kind.Interface);

      const interfaceC = interfaceB.properties[0]!.type as Interface;

      expect(interfaceC.properties.length).to.equal(1);
      expect(interfaceC.properties[0]!.type.kind).to.equal(Kind.Circular);

    });

  }

});
