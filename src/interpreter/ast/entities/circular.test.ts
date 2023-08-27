import { assert, expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createInterfaceEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Circular, () => {

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

    it("should not create a circular entity if the target symbol is not circular", () => {
      expect(exportedInterfaceA.properties[0]!.type.kind).toBe(TypeKind.TypeReference);
    });

  }

  {

    const testFileContent = ts`
      export interface InterfaceA {
        b: InterfaceB;
      }
      interface InterfaceB {
        a: InterfaceA;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const exportedInterfaceASymbol = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const exportedInterfaceA = createInterfaceEntity(ctx, exportedInterfaceASymbol);

    it("should create a circular entity if the target symbol is circular", () => {
      assert(exportedInterfaceA.properties[0]!.type.kind === TypeKind.TypeReference);
      assert(exportedInterfaceA.properties[0]!.type.type!.kind === TypeKind.Interface);
      assert(exportedInterfaceA.properties[0]!.type.type.properties[0].type.kind === TypeKind.TypeReference);
      expect(exportedInterfaceA.properties[0]!.type.type.properties[0]!.type.type!.kind).toBe(TypeKind.Circular);
    });

  }

});
