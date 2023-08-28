import { expect, it } from "vitest";

import { createVariableEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import {
  convertVariableEntityForDocumentation,
  convertVariableEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import {
  isAnchorNode,
  isPaddedNode,
  isParagraphNode,
  isSectionNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", EntityKind.Variable, () => {

  {

    const testFileContent = ts`
      /**
       * Variable description
       * 
       * @remarks Variable remarks
       * @example Variable example
       * @beta
       */
      export const numberVariable = 7;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "numberVariable")!;
    const variableEntity = createVariableEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedVariableForTableOfContents = convertVariableEntityForTableOfContents(ctx, variableEntity);
    const convertedVariableForDocumentation = convertVariableEntityForDocumentation(ctx, variableEntity);

    it("should have matching table of contents entry", () => {
      expect(isAnchorNode(convertedVariableForTableOfContents)).toBe(true);
      expect(convertedVariableForTableOfContents.children[0]).toBe("numberVariable");
    });

    assert(isAnchorNode(convertedVariableForTableOfContents), "Rendered variable for table of contents is not a link");

    const titleNode = convertedVariableForDocumentation.children[0];

    it("should have a matching documentation title", () => {
      expect(isTitleNode(titleNode)).toBe(true);
      expect(titleNode.title).toBe("numberVariable");
    });

    assert(isSectionNode(convertedVariableForDocumentation), "Rendered variable for documentation is not a section");
    assert(isTitleNode(titleNode), "Rendered variable for documentation is not a title");

    const [
      tags,
      position,
      type,
      description,
      remarks,
      example
    ] = titleNode.children;

    it("should have a position", () => {
      assert(isPaddedNode(position));
      assert(isSmallNode(position.children[0]));
      expect(position.children[0].children).toBeDefined();
    });

    it("should have a jsdoc tag", () => {
      assert(isParagraphNode(tags));
      expect(tags.children).toContain("beta");
    });

    it("should have a matching type", () => {
      assert(isTitleNode(type));
      assert(isParagraphNode(type.children[0]));
      expect(type.children[0].children).toContain("7");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      assert(isParagraphNode(description.children[0]));
      expect(description.children[0].children[0]).toBe("Variable description");
    });

    it("should have matching remarks", () => {
      assert(isTitleNode(remarks));
      assert(isParagraphNode(remarks.children[0]));
      expect(remarks.children[0].children[0]).toBe("Variable remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      assert(isParagraphNode(example.children[0]));
      expect(example.children[0].children[0]).toBe("Variable example");
    });

  }

});
