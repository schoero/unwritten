import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import {
  convertVariableForDocumentation,
  convertVariableForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import {
  isLinkNode,
  isParagraphNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";

import type { VariableEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", EntityKind.Variable, () => {

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

    const convertedVariableForTableOfContents = convertVariableForTableOfContents(ctx, variableEntity as VariableEntity);
    const convertedVariableForDocumentation = convertVariableForDocumentation(ctx, variableEntity as VariableEntity);

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
      expect(tags.children).to.not.equal(undefined);
    });

    it("should have a matching type", () => {
      expect(isParagraphNode(type)).to.equal(true);
      expect(type.children).to.match(/7$/);
    });

    it("should have a matching description", () => {
      expect(isParagraphNode(description)).to.equal(true);
      expect(description.children).to.equal("Variable description");
    });

    it("should have matching remarks", () => {
      expect(isParagraphNode(remarks)).to.equal(true);
      expect(remarks.children).to.equal("Variable remarks");
    });

    it("should have a matching example", () => {
      expect(isParagraphNode(example)).to.equal(true);
      expect(example.children).to.equal("Variable example");
    });

  }

});
