import { assert, expect, it } from "vitest";

import { createInterfaceEntity } from "unwritten:interpreter:ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.Circular, () => {

  {

    const testFileContent = ts`
      export interface InterfaceA {
        b: InterfaceB;
      }
      interface InterfaceB {
        prop: string;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedInterfaceASymbol = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const exportedInterfaceA = createInterfaceEntity(ctx, exportedInterfaceASymbol);

    it("should not create a circular type if the targeted symbol is not exported and not circular", () => {
      expect(exportedInterfaceA.properties.length).to.equal(1);
      expect(exportedInterfaceA.properties[0]!.type.kind).to.equal(TypeKind.Interface);
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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedInterfaceASymbol = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const exportedInterfaceA = createInterfaceEntity(ctx, exportedInterfaceASymbol);

    it("should create a circular type if the targeted symbol circular, even if it is not exported", () => {

      expect(exportedInterfaceA.properties.length).to.equal(1);
      assert(exportedInterfaceA.properties[0]!.type.kind === TypeKind.Interface);

      const interfaceB = exportedInterfaceA.properties[0]!.type;

      expect(interfaceB.properties.length).to.equal(1);
      expect(exportedInterfaceA.properties[0]!.type.kind).to.equal(TypeKind.Interface);
      assert(interfaceB.properties[0]!.type.kind === TypeKind.Interface);

      const interfaceC = interfaceB.properties[0]!.type;

      expect(interfaceC.properties.length).to.equal(1);
      expect(interfaceC.properties[0]!.type.kind).to.equal(TypeKind.Circular);

    });

  }

});
