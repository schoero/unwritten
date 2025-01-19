import { describe, expect, it } from "vitest";

import { createFunctionEntity } from "unwritten:interpreter:ast/entities/index";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";
import { convertJSDocType } from "unwritten:renderer/markup/ast-converter/jsdoc/index";
import { isAnchorNode, isConditionalNode } from "unwritten:renderer/markup/typeguards/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("MarkupRenderer", JSDocKind.Type, () => {

  describe("link to a type", () => {

    const testFileContent = ts`
      /**
       * @throws {RangeError}
       */
      export function test(): void {}
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "test")!;
    const exportedFunction = createFunctionEntity(compilerContext, symbol);

    const ctx = createRenderContext();

    assert(exportedFunction.signatures[0].throws?.[0].kind === JSDocKind.Throws);
    assert(exportedFunction.signatures[0].throws[0].type?.kind === JSDocKind.Type);

    const jsdocType = exportedFunction.signatures[0].throws[0].type;

    const convertedType = convertJSDocType(ctx, jsdocType);

    it("should render a link to a type", () => {
      assert(isConditionalNode(convertedType));
      assert(isAnchorNode(convertedType.trueChildren));

      expect(convertedType.trueChildren.name).toBe("RangeError");
    });

  });

});
