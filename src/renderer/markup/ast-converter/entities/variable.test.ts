import { expect, it } from "vitest";

import { createVariableEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import {
  convertVariableEntityForDocumentation,
  convertVariableEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import {
  isLinkNode,
  isParagraphNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";
import { assert } from "unwritten:utils/general.js";


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

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "numberVariable")!;
    const variableEntity = createVariableEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedVariableForTableOfContents = convertVariableEntityForTableOfContents(ctx, variableEntity);
    const convertedVariableForDocumentation = convertVariableEntityForDocumentation(ctx, variableEntity);

    assert(isLinkNode(convertedVariableForTableOfContents), "Rendered variable for table of contents is not a link");
    assert(isTitleNode(convertedVariableForDocumentation), "Rendered variable for documentation is not a container");

    const [
      position,
      tags,
      type,
      description,
      example,
      remarks
    ] = convertedVariableForDocumentation.children;

    it("should have matching table of contents entry", () => {
      expect(isLinkNode(convertedVariableForTableOfContents)).to.equal(true);
      expect(convertedVariableForTableOfContents.children).to.equal("numberVariable");
    });

    it("should have a matching documentation title", () => {
      expect(isTitleNode(convertedVariableForDocumentation)).to.equal(true);
      expect(convertedVariableForDocumentation.title).to.equal("numberVariable");
    });

    it("should have a position", () => {
      expect(isSmallNode(position)).to.equal(true);
      expect(position.children).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      expect(isParagraphNode(tags)).to.equal(true);
      const renderedTags = renderNode(ctx, tags.children);
      expect(renderedTags).to.equal("beta");
    });

    it("should have a matching type", () => {
      expect(isParagraphNode(type)).to.equal(true);
      const renderedType = renderNode(ctx, type.children);
      expect(renderedType).to.match(/7$/);
    });

    it("should have a matching description", () => {
      expect(isParagraphNode(description)).to.equal(true);
      const renderedDescription = renderNode(ctx, description.children);
      expect(renderedDescription).to.equal("Variable description");
    });

    it("should have matching remarks", () => {
      expect(isParagraphNode(remarks)).to.equal(true);
      const renderedRemarks = renderNode(ctx, remarks.children);
      expect(renderedRemarks).to.equal("Variable remarks");
    });

    it("should have a matching example", () => {
      expect(isParagraphNode(example)).to.equal(true);
      const renderedExample = renderNode(ctx, example.children);
      expect(renderedExample).to.equal("Variable example");
    });

  }

});
