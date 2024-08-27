import { assert, expect, it } from "vitest";

import { createInterfaceEntity } from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


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

    it("should not create a circular type if the target type is not circular", () => {
      assert(exportedInterfaceA.properties[0].type.kind === TypeKind.TypeReference);
      expect(exportedInterfaceA.properties[0].type.type?.kind).toBe(TypeKind.Interface);
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

    it("should create a circular type for if the target type is circular", () => {
      assert(exportedInterfaceA.properties[0].type.kind === TypeKind.TypeReference);
      assert(exportedInterfaceA.properties[0].type.type!.kind === TypeKind.Interface);
      assert(exportedInterfaceA.properties[0].type.type.properties[0].type.kind === TypeKind.TypeReference);
      expect(exportedInterfaceA.properties[0].type.type.properties[0].type.type!.kind).toBe(TypeKind.Circular);
    });

  }

});
