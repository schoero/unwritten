import { expect, it } from "vitest";

import { createExportAssignmentEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { renderNode } from "unwritten:renderer/index.js";
import {
  convertExportAssignmentEntityForDocumentation,
  convertExportAssignmentEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import {
  isAnchorNode,
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
       * Export assignment description
       * 
       * @remarks Export assignment remarks
       * @example Export assignment example
       * @beta
       */
      export default {
        /**
         * Property description
         */
        test: 7
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "default")!;
    const exportAssignmentEntity = createExportAssignmentEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedVariableForTableOfContents = convertExportAssignmentEntityForTableOfContents(ctx, exportAssignmentEntity);
    const convertedVariableForDocumentation = convertExportAssignmentEntityForDocumentation(ctx, exportAssignmentEntity);

    it("should have matching table of contents entry", () => {
      expect(isAnchorNode(convertedVariableForTableOfContents)).toBe(true);
      expect(convertedVariableForTableOfContents.children[0]).toBe("default");
    });

    assert(isAnchorNode(convertedVariableForTableOfContents), "Rendered variable for table of contents is not a link");

    const titleNode = convertedVariableForDocumentation.children[0];

    it("should have a matching documentation title", () => {
      expect(isTitleNode(titleNode)).toBe(true);
      expect(titleNode.title).toBe("default");
    });

    assert(isSectionNode(convertedVariableForDocumentation), "Rendered export assignment for documentation is not a section");
    assert(isTitleNode(titleNode), "Rendered export assignment for documentation is not a title");

    const [
      position,
      tags,
      description,
      remarks,
      example,
      type
    ] = titleNode.children;

    it("should have a position", () => {
      assert(isSmallNode(position));
      expect(position.children).toBeDefined();
    });

    it("should have a jsdoc tag", () => {
      assert(isParagraphNode(tags));
      expect(tags.children).toContain("beta");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      assert(isParagraphNode(description.children[0]));
      expect(description.children[0].children[0]).toBe("Export assignment description");
    });

    it("should have matching remarks", () => {
      assert(isTitleNode(remarks));
      assert(isParagraphNode(remarks.children[0]));
      expect(remarks.children[0].children[0]).toBe("Export assignment remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      assert(isParagraphNode(example.children[0]));
      expect(example.children[0].children[0]).toBe("Export assignment example");
    });

    it("should have a matching type", () => {

      assert(isTitleNode(type));
      assert(isParagraphNode(type.children[0]));

      const renderedType = renderNode(ctx, type.children[0]);
      expect(renderedType).toContain("test");
      expect(renderedType).toContain("number");

    });

  }

});
