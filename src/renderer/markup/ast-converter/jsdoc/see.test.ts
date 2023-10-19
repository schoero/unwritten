import { describe, expect, it } from "vitest";

import { JSDocKind } from "unwritten:interpreter/enums/jsdoc.js";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { convertJSDocSeeTag } from "unwritten:renderer/markup/ast-converter/jsdoc/see.js";
import { isConditionalNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", JSDocKind.See, () => {

  describe("link to a symbol", () => {

    const testFileContent = ts`
      /**
       * before @see Test line 1
       * line 2
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(compilerContext, symbol);

    const ctx = createRenderContext();

    assert(exportedTypeAlias.see);

    const convertedSeeTag = convertJSDocSeeTag(ctx, exportedTypeAlias.see[0]);

    assert(Array.isArray(convertedSeeTag));

    it("should render the reference correctly", () => {
      expect(isConditionalNode(convertedSeeTag[0])).toBe(true);
    });

    it("should render the see tag description correctly", () => {
      expect(convertedSeeTag[2]).toBe("line 1\nline 2");
    });

    it("should throw away the text before the see tag", () => {
      expect(convertedSeeTag).toHaveLength(3);
    });

  });

});
