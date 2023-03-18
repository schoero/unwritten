import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
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
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";

import type { VariableEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", EntityKind.Variable, () => {

  {

    // #region Variable with all JSDoc tags

    const variableEntity: Testable<VariableEntity> = {
      beta: undefined,
      description: "Variable description",
      example: "Variable example",
      kind: EntityKind.Variable,
      modifiers: [],
      name: "numberVariable",
      position: {
        column: 17,
        file: "/file.ts",
        line: 9
      },
      remarks: "Variable remarks",
      type: {
        kind: TypeKind.NumberLiteral,
        name: "number",
        value: 7
      }
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedVariableForTableOfContents = convertVariableEntityForTableOfContents(ctx, variableEntity as VariableEntity);
    const convertedVariableForDocumentation = convertVariableEntityForDocumentation(ctx, variableEntity as VariableEntity);

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
