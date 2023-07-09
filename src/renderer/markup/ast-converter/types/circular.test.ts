import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createInterfaceEntity } from "unwritten:interpreter:ast/entities/index.js";
import { convertCircularTypeInline } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { isAnchorNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isCircularType, isInterfaceType } from "unwritten:typeguards/types.js";
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

    const interfaceB = exportedInterfaceA.properties[0]!.type;
    assert(isInterfaceType(interfaceB));
    const circularType = interfaceB.properties[0]!.type;
    assert(isCircularType(circularType));

    const ctx = createRenderContext();
    const convertedCircularType = convertCircularTypeInline(ctx, circularType);

    it("should render the circular type as a type reference", () => {
      assert(Array.isArray(convertedCircularType));
      assert(isAnchorNode(convertedCircularType[0]));
      expect(convertedCircularType[0].name).toBe("InterfaceA");
    });

  }

});
