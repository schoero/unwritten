import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc.js";
import { convertJSDocNodes } from "unwritten:renderer/markup/ast-converter/shared/jsdoc.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", JSDocKind.Text, () => {

  {

    const testFileContent = ts`
      /**
       * Line 1
       * Line 2
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    it("should contain a jsdoc text in the description", () => {
      assert(typeAliasEntity.description);
      assert(typeAliasEntity.description.length === 1);
      expect(typeAliasEntity.description[0].kind).toBe(JSDocKind.Text);
    });

    it("should render to the correct text", () => {
      const [convertedText] = convertJSDocNodes(ctx, typeAliasEntity.description!);
      expect(convertedText).toBe("Line 1\nLine 2");
    });

  }

});
