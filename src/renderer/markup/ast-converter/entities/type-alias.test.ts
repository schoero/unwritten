import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import {
  convertTypeAliasEntityForDocumentation,
  convertTypeAliasEntityForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import {
  isLinkNode,
  isListNode,
  isParagraphNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";

import type { TypeAliasEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", EntityKind.TypeAlias, () => {

  {

    // #region TypeAlias with all JSDoc tags

    const typeAliasEntity: Testable<TypeAliasEntity> = {
      description: "Type alias description",
      example: "Type alias example",
      id: 4054,
      kind: EntityKind.TypeAlias,
      name: "TypeAlias",
      position: {
        column: 0,
        file: "/file.ts",
        line: 7
      },
      remarks: "Type alias remarks",
      type: {
        id: 4456,
        kind: TypeKind.TypeReference,
        name: "A",
        symbolId: 4052,
        type: {
          constraint: {
            id: 16,
            kind: TypeKind.Number,
            name: "number"
          },
          id: 2611,
          kind: TypeKind.TypeParameter,
          name: "A"
        },
        typeArguments: undefined
      },
      typeParameters: [
        {
          constraint: {
            id: 16,
            kind: TypeKind.Number,
            name: "number"
          },
          description: "Type parameter description",
          id: 4052,
          initializer: {
            id: 2126,
            kind: TypeKind.NumberLiteral,
            name: "number",
            value: 7
          },
          kind: EntityKind.TypeParameter,
          name: "A",
          position: {
            column: 22,
            file: "/file.ts",
            line: 7
          }
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedTypeAliasForTableOfContents = convertTypeAliasEntityForTableOfContents(ctx, typeAliasEntity as TypeAliasEntity);
    const convertedTypeAliasForDocumentation = convertTypeAliasEntityForDocumentation(ctx, typeAliasEntity as TypeAliasEntity);

    assert(isLinkNode(convertedTypeAliasForTableOfContents), "Rendered typeAlias for table of contents is not a link");
    assert(isTitleNode(convertedTypeAliasForDocumentation), "Rendered typeAlias for documentation is not a container");

    const [
      position,
      tags,
      type,
      description,
      example,
      remarks
    ] = convertedTypeAliasForDocumentation.children;

    it("should have matching table of contents entry", () => {
      expect(isLinkNode(convertedTypeAliasForTableOfContents)).to.equal(true);
      expect(convertedTypeAliasForTableOfContents.children).to.equal("TypeAlias");
    });

    it("should have a matching documentation title", () => {
      expect(isTitleNode(convertedTypeAliasForDocumentation)).to.equal(true);
      expect(convertedTypeAliasForDocumentation.title).to.equal("TypeAlias");
    });

    it("should have a position", () => {
      expect(isSmallNode(position)).to.equal(true);
      expect(position.children).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      expect(isParagraphNode(tags)).to.equal(true);
      const renderedTags = renderNode(ctx, tags.children);
      expect(renderedTags).to.equal("");
    });

    it("should have a matching type", () => {
      expect(isListNode(type)).to.equal(true);
      const renderedType = renderNode(ctx, type.children);
      expect(renderedType).to.match(/Type: .*A.*$/);
    });

    it("should have a matching description", () => {
      expect(isParagraphNode(description)).to.equal(true);
      const renderedDescription = renderNode(ctx, description.children);
      expect(renderedDescription).to.equal("Type alias description");
    });

    it("should have matching remarks", () => {
      expect(isParagraphNode(remarks)).to.equal(true);
      const renderedRemarks = renderNode(ctx, remarks.children);
      expect(renderedRemarks).to.equal("Type alias remarks");
    });

    it("should have a matching example", () => {
      expect(isParagraphNode(example)).to.equal(true);
      const renderedExample = renderNode(ctx, example.children);
      expect(renderedExample).to.equal("Type alias example");
    });

  }

});
