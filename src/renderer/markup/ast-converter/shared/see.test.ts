import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { JSDocTagNames } from "unwritten:interpreter/enums/jsdoc.js";
import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see.js";
import { isAnchorNode, isConditionalNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", JSDocTagNames.See, () => {

  {

    const testFileContent = ts`
      /**
       * @see Test Line 1
       * Line 2
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    assert(typeAliasEntity.see);

    const convertedSeeTag = convertSeeTagsForDocumentation(
      ctx,
      typeAliasEntity.see
    );

    assert(convertedSeeTag);

    const {
      children,
      title
    } = convertedSeeTag;


    it("should have a matching title", () => {
      expect(title).toBe("See also");
    });

    it("should have a matching link", () => {
      assert(Array.isArray(children[0].children[0]));
      assert(isConditionalNode(children[0].children[0][0]));
      assert(isAnchorNode(children[0].children[0][0].trueChildren));
      expect(children[0].children[0][0].trueChildren.name).toBe("Test");
    });

    it("should have a matching description", () => {
      assert(Array.isArray(children[0].children[0]));
      expect(children[0].children[0][1]).toBe("Line 1\nLine 2");
    });

  }

  {

    const testFileContent = ts`
      /**
       * @see Test Line 1
       * Line 2
       * @see Test Line 3
       * Line 4
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    assert(typeAliasEntity.see);

    const convertedSeeTag = convertSeeTagsForDocumentation(
      ctx,
      typeAliasEntity.see
    );

    assert(convertedSeeTag);

    const {
      children,
      title
    } = convertedSeeTag;

    it("should have a matching title", () => {
      expect(title).toBe("See also");
    });

    it("should have matching links", () => {
      assert(Array.isArray(children[0].children[0]));
      assert(isConditionalNode(children[0].children[0][0]));
      assert(isAnchorNode(children[0].children[0][0].trueChildren));
      expect(children[0].children[0][0].trueChildren.name).toBe("Test");

      assert(Array.isArray(children[0].children[1]));
      assert(isConditionalNode(children[0].children[1][0]));
      assert(isAnchorNode(children[0].children[1][0].trueChildren));
      expect(children[0].children[1][0].trueChildren.name).toBe("Test");
    });

    it("should have a matching description", () => {
      expect(children[0].children).toHaveLength(2);

      assert(Array.isArray(children[0].children[0]));
      expect(children[0].children[0][1]).toBe("Line 1\nLine 2");
      assert(Array.isArray(children[0].children[1]));
      expect(children[0].children[1][1]).toBe("Line 3\nLine 4");
    });

  }

});
