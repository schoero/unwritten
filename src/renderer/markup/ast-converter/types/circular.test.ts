import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createInterfaceEntity } from "unwritten:interpreter:ast/entities/index.js";
import { isAnchorNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isCircularEntity, isInterfaceEntity } from "unwritten:typeguards/entities.js";
import { isTypeReferenceType } from "unwritten:typeguards/types.js";
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
    const interfaceB = exportedInterfaceA.properties[0]!.type.target;
    assert(isInterfaceEntity(interfaceB!));

    assert(isTypeReferenceType(interfaceB.properties[0]!.type));
    const circularEntity = interfaceB.properties[0]!.type.target;

    it("should contain the circular entity", () => {
      expect(isCircularEntity(circularEntity!)).toBe(true);
    });

    assert(isCircularEntity(circularEntity!));

    const ctx = createRenderContext();
    const convertedCircularType = convertCircularTypeEntity(ctx, circularEntity);

    it("should not render the circular type", () => {
      assert(Array.isArray(convertedCircularType));
      assert(isAnchorNode(convertedCircularType[0]));
      expect(convertedCircularType[0].name).toBe("InterfaceA");
    });

  }

});
