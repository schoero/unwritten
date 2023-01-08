import { expect, it } from "vitest";

import { createInterfaceEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { InterfaceType } from "quickdoks:compiler:type-definitions/types.d.js";


scope("Compiler", TypeKind.Circular, () => {

  {

    const testFileContent = ts`
      export interface InterfaceA {
        b: InterfaceB;
      }
      interface InterfaceB {
        prop: string;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const exportedInterfaceASymbol = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const exportedInterfaceA = createInterfaceEntity(ctx, exportedInterfaceASymbol);

    it("should not create a circular type if the targeted symbol is not exported and not circular", () => {
      expect(exportedInterfaceA.properties.length).to.equal(1);
      expect(exportedInterfaceA.properties[0]!.type.kind).to.equal(TypeKind.InterfaceType);
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
    const exportedInterfaceA = createInterfaceEntity(ctx, exportedInterfaceASymbol);

    it("should create a circular type if the targeted symbol circular, even if it is not exported", () => {

      expect(exportedInterfaceA.properties.length).to.equal(1);
      expect(exportedInterfaceA.properties[0]!.type.kind).to.equal(TypeKind.InterfaceType);

      const interfaceB = exportedInterfaceA.properties[0]!.type as InterfaceType;

      expect(interfaceB.properties.length).to.equal(1);
      expect(exportedInterfaceA.properties[0]!.type.kind).to.equal(TypeKind.InterfaceType);
      expect(interfaceB.properties[0]!.type.kind).to.equal(TypeKind.InterfaceType);

      const interfaceC = interfaceB.properties[0]!.type as InterfaceType;

      expect(interfaceC.properties.length).to.equal(1);
      expect(interfaceC.properties[0]!.type.kind).to.equal(TypeKind.Circular);

    });

  }

});
