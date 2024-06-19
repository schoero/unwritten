import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type";
import { createInterfaceEntity } from "unwritten:interpreter:ast/entities/index";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { isCircularEntity } from "unwritten:typeguards/entities";
import { isCircularType, isInterfaceType, isTypeReferenceType } from "unwritten:typeguards/types";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("Renderer", TypeKind.Circular, () => {

  {

    const testFileContent = ts`
      export interface InterfaceA {
        b: InterfaceB;
      }
      interface InterfaceB {
        a: InterfaceA;
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const exportedInterfaceASymbol = exportedSymbols.find(s => s.name === "InterfaceA")!;
    const exportedInterfaceA = createInterfaceEntity(compilerContext, exportedInterfaceASymbol);

    assert(isTypeReferenceType(exportedInterfaceA.properties[0].type));
    const interfaceB = exportedInterfaceA.properties[0].type.type;
    assert(isInterfaceType(interfaceB!));

    it("should reference back to the original interface", () => {
      assert(isTypeReferenceType(interfaceB.properties[0].type));
      expect(isCircularEntity(interfaceB.properties[0].type.target!)).toBe(true);
      expect(interfaceB.properties[0].type.target?.symbolId).toBe(exportedInterfaceA.symbolId);
    });

    it("should contain the circular type", () => {
      assert(isTypeReferenceType(interfaceB.properties[0].type));
      expect(isCircularType(interfaceB.properties[0].type.type!)).toBe(true);
      expect(interfaceB.properties[0].type.type?.typeId).toBe(exportedInterfaceA.typeId);
    });

  }

});
