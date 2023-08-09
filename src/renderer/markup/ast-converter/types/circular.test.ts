import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createInterfaceEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isCircularType, isInterfaceType, isTypeReferenceType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


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

    assert(isTypeReferenceType(exportedInterfaceA.properties[0]!.type));
    const interfaceB = exportedInterfaceA.properties[0]!.type.type;
    assert(isInterfaceType(interfaceB!));

    assert(isTypeReferenceType(interfaceB.properties[0]!.type));
    const circularType = interfaceB.properties[0]!.type.type;

    it("should contain the circular type", () => {
      expect(isCircularType(circularType!)).toBe(true);
    });

    it.todo("should always render the circular entity as a type reference");

  }

});
