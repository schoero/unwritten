import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import {
  convertTypeAliasEntityForDocumentation,
  convertTypeAliasEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import {
  isLinkNode,
  isListNode,
  isParagraphNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";

import type { TypeAliasEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", EntityKind.TypeAlias, () => {

  {

    // #region TypeAlias with all JSDoc tags

    // #region Source

    // /**
    //  * Type alias description
    //  *
    //  * @remarks Type alias remarks
    //  * @example Type alias example
    //  * @template A - Type parameter description
    //  */
    // export type TypeAlias<A extends number = 7> = A;

    // #endregion

    const typeAliasEntity: Testable<TypeAliasEntity> = {
      description: "Type alias description",
      example: "Type alias example",
      id: 4460,
      kind: EntityKind.TypeAlias,
      name: "TypeAlias",
      position: {
        column: 0,
        file: "/file.ts",
        line: 8
      },
      remarks: "Type alias remarks",
      type: {
        id: 4742,
        kind: TypeKind.TypeReference,
        name: "A",
        symbolId: 4458,
        type: {
          constraint: {
            id: 17,
            kind: TypeKind.Number,
            name: "number"
          },
          id: 2861,
          kind: TypeKind.TypeParameter,
          name: "A"
        },
        typeArguments: undefined
      },
      typeParameters: [
        {
          constraint: {
            id: 17,
            kind: TypeKind.Number,
            name: "number"
          },
          description: "- Type parameter description",
          id: 4458,
          initializer: {
            id: 2190,
            kind: TypeKind.NumberLiteral,
            name: "number",
            value: 7
          },
          kind: EntityKind.TypeParameter,
          name: "A",
          position: {
            column: 22,
            file: "/file.ts",
            line: 8
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
      expect(renderNode(ctx, convertedTypeAliasForTableOfContents.children)).to.equal("TypeAlias<A>");
    });

    it("should have a matching documentation signature", () => {
      expect(isTitleNode(convertedTypeAliasForDocumentation)).to.equal(true);
      expect(renderNode(ctx, convertedTypeAliasForDocumentation.title)).to.equal("TypeAlias<A>");
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
