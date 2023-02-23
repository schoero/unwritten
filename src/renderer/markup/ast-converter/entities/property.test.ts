import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import {
  convertPropertyEntityForDocumentation,
  convertPropertyEntityForSignature
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { isParagraphNode, isSmallNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { PropertyEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", EntityKind.Property, () => {

  {

    // #region Normal property

    const propertyEntity: Testable<PropertyEntity> = {
      description: "Property description",
      example: "Property example",
      kind: EntityKind.Property,
      modifiers: [],
      name: "Property",
      optional: true,
      position: {
        column: 2,
        file: "/file.ts",
        line: 7
      },
      remarks: "Property remarks",
      type: {
        kind: TypeKind.String,
        name: "string"
      }
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedPropertyForSignature = convertPropertyEntityForSignature(ctx, propertyEntity as PropertyEntity);
    const convertedPropertyForDocumentation = convertPropertyEntityForDocumentation(ctx, propertyEntity as PropertyEntity);

    const [
      position,
      tags,
      type,
      description,
      remarks,
      example
    ] = convertedPropertyForDocumentation.children;

    it("should have a matching name", () => {
      expect(convertedPropertyForSignature.children).to.equal("Property");
      expect(convertedPropertyForDocumentation.title).to.equal("Property");
    });

    it("should have a matching type", () => {
      expect(isParagraphNode(type)).to.equal(true);
      const renderedType = renderNode(ctx, type.children);
      expect(renderedType).to.equal("string");
    });

    it("should have a position", () => {
      expect(isSmallNode(position)).to.equal(true);
      expect(position.children).to.not.equal(undefined);
    });

    it("should have an optional tag", () => {
      expect(isParagraphNode(tags)).to.equal(true);
      const renderedTags = renderNode(ctx, tags.children);
      expect(renderedTags).to.equal("optional");
    });

    it("should have a matching description", () => {
      expect(isParagraphNode(description)).to.equal(true);
      const renderedDescription = renderNode(ctx, description.children);
      expect(renderedDescription).to.equal("Property description");
    });

    it("should have a matching remarks", () => {
      expect(isParagraphNode(remarks)).to.equal(true);
      const renderedRemarks = renderNode(ctx, remarks.children);
      expect(renderedRemarks).to.equal("Property remarks");
    });

    it("should have a matching example", () => {
      expect(isParagraphNode(example)).to.equal(true);
      const renderedExample = renderNode(ctx, example.children);
      expect(renderedExample).to.equal("Property example");
    });

  }

});
