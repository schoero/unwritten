import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Interface, Kind, TypeReference } from "../../types/types.js";
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

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const exportedInterfaceASymbol = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const exportedInterfaceBSymbol = exportedSymbols.find(s => s.name === "InterfaceB")!;
    const exportedInterfaceA = createInterfaceBySymbol(ctx, exportedInterfaceASymbol);
    const exportedInterfaceB = createInterfaceBySymbol(ctx, exportedInterfaceBSymbol);

    it("should not create a circular type if the targeted symbol is exported", () => {
      expect(exportedInterfaceA.members.length).to.equal(1);
      expect(exportedInterfaceA.members[0]!.type.kind).to.equal(Kind.TypeReference);
      expect((exportedInterfaceA.members[0]!.type as TypeReference).type).to.not.equal(undefined);
      expect((exportedInterfaceA.members[0]!.type as TypeReference).type!.kind).to.equal(Kind.Interface);
      expect((exportedInterfaceA.members[0]!.type as TypeReference).type!.id).to.equal(exportedInterfaceB.id);
    });

    it("should not create a circular type if the targeted symbol is not exported and not circular", () => {
      expect(exportedInterfaceB.members.length).to.equal(1);
      expect(exportedInterfaceB.members[0]!.type.kind).to.equal(Kind.TypeReference);
      expect((exportedInterfaceB.members[0]!.type as TypeReference).type).to.not.equal(undefined);
      expect((exportedInterfaceB.members[0]!.type as TypeReference).type!.kind).to.equal(Kind.Interface);
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

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const exportedInterfaceASymbol = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const exportedInterfaceA = createInterfaceBySymbol(ctx, exportedInterfaceASymbol);

    it("should create a circular type if the targeted symbol circular, even if it is not exported", () => {

      expect(exportedInterfaceA.members.length).to.equal(1);
      expect(exportedInterfaceA.members[0]!.type.kind).to.equal(Kind.TypeReference);
      expect((exportedInterfaceA.members[0]!.type as TypeReference).type).to.not.equal(undefined);
      expect((exportedInterfaceA.members[0]!.type as TypeReference).type!.kind).to.equal(Kind.Interface);

      const interfaceB = (exportedInterfaceA.members[0]!.type as TypeReference).type! as Interface;

      expect(interfaceB.members.length).to.equal(1);
      expect(interfaceB.members[0]!.type.kind).to.equal(Kind.TypeReference);
      expect((interfaceB.members[0]!.type as TypeReference).type).to.not.equal(undefined);
      expect((interfaceB.members[0]!.type as TypeReference).type!.kind).to.equal(Kind.Interface);

      const interfaceC = (interfaceB.members[0]!.type as TypeReference).type! as Interface;

      expect(interfaceC.members.length).to.equal(1);
      expect(interfaceC.members[0]!.type.kind).to.equal(Kind.TypeReference);
      expect((interfaceC.members[0]!.type as TypeReference).type).to.not.equal(undefined);
      expect((interfaceC.members[0]!.type as TypeReference).type!.kind).to.equal(Kind.Circular);

    });

  }

});
