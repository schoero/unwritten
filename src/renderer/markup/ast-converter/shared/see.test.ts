import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { JSDocTagNames } from "unwritten:interpreter/enums/jsdoc";
import { convertSeeTagsForDocumentation } from "unwritten:renderer/markup/ast-converter/shared/see";
import { isAnchorNode, isConditionalNode } from "unwritten:renderer/markup/typeguards/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";


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
      expect(children[0].children[0][2]).toBe("Line 1\nLine 2");
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
      expect(children[0].children[0][2]).toBe("Line 1\nLine 2");
      assert(Array.isArray(children[0].children[1]));
      expect(children[0].children[1][2]).toBe("Line 3\nLine 4");
    });

  }

});
