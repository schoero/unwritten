import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Interface, TypeKind, TypeReference } from "../../types/types.js";
import { createInterfaceBySymbol } from "./interface.js";


scope("Compiler", TypeKind.Link, () => {

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

    it("should create links if the targeted symbol is exported", () => {
      expect(exportedInterfaceA.members.length).to.equal(1);
      expect(exportedInterfaceA.members[0]!.type.kind).to.equal(TypeKind.TypeReference);
      expect((exportedInterfaceA.members[0]!.type as TypeReference).target).to.not.equal(undefined);
      expect((exportedInterfaceA.members[0]!.type as TypeReference).target!.kind).to.equal(TypeKind.Link);
      expect((exportedInterfaceA.members[0]!.type as TypeReference).target!.id).to.equal(exportedInterfaceB.id);
    });

    it("should not create links if the targeted symbol is not exported and not recursive", () => {
      expect(exportedInterfaceB.members.length).to.equal(1);
      expect(exportedInterfaceB.members[0]!.type.kind).to.equal(TypeKind.TypeReference);
      expect((exportedInterfaceB.members[0]!.type as TypeReference).target).to.not.equal(undefined);
      expect((exportedInterfaceB.members[0]!.type as TypeReference).target!.kind).to.equal(TypeKind.Interface);
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
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const exportedInterfaceASymbol = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const exportedInterfaceA = createInterfaceBySymbol(ctx, exportedInterfaceASymbol);

    it("should create links if the targeted symbol is not exported but is recursive", () => {

      expect(exportedInterfaceA.members.length).to.equal(1);
      expect(exportedInterfaceA.members[0]!.type.kind).to.equal(TypeKind.TypeReference);
      expect((exportedInterfaceA.members[0]!.type as TypeReference).target).to.not.equal(undefined);
      expect((exportedInterfaceA.members[0]!.type as TypeReference).target!.kind).to.equal(TypeKind.Interface);

      const interfaceB = (exportedInterfaceA.members[0]!.type as TypeReference).target! as Interface;

      expect(interfaceB.members.length).to.equal(1);
      expect(interfaceB.members[0]!.type.kind).to.equal(TypeKind.TypeReference);
      expect((interfaceB.members[0]!.type as TypeReference).target).to.not.equal(undefined);
      expect((interfaceB.members[0]!.type as TypeReference).target!.kind).to.equal(TypeKind.Interface);

      const interfaceC = (interfaceB.members[0]!.type as TypeReference).target! as Interface;

      expect(interfaceC.members.length).to.equal(1);
      expect(interfaceC.members[0]!.type.kind).to.equal(TypeKind.TypeReference);
      expect((interfaceC.members[0]!.type as TypeReference).target).to.not.equal(undefined);
      expect((interfaceC.members[0]!.type as TypeReference).target!.kind).to.equal(TypeKind.Link);

    });

  }

});
