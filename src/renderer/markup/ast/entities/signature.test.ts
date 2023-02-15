import { assert, expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import {
  isContainerNode,
  isSmallNode,
  isLinkNode,
  isListNode,
  isParagraphNode,
  isPositionNode,
  isTitleNode
} from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderSignatureForDocumentation, renderSignatureForTableOfContents } from "./signature.js";

import type { SignatureEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", EntityKind.Signature, () => {

  {

    // #region Signature with all JSDoc tags

    const signatureEntity: Testable<SignatureEntity> = {
      beta: undefined,
      description: "Signature description",
      example: "Signature example",
      kind: EntityKind.Signature,
      name: "testSignature",
      parameters: [],
      position: {
        column: 4,
        file: "/file.ts",
        line: 9
      },
      remarks: "Signature remarks",
      returnType: {
        description: "Return type description",
        kind: TypeKind.Void,
        name: "void"
      },
      typeParameters: []
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedSignatureForTableOfContents = renderSignatureForTableOfContents(ctx, signatureEntity as SignatureEntity);
    const renderedSignatureForDocumentation = renderSignatureForDocumentation(ctx, signatureEntity as SignatureEntity);

    assert(isLinkNode(renderedSignatureForTableOfContents), "Rendered signature for table of contents is not a link");
    assert(isContainerNode(renderedSignatureForDocumentation), "Rendered signature for documentation is not a container");

    const [
      title,
      position,
      tags,
      parametersAndReturnType,
      description,
      remarks,
      example
    ] = renderedSignatureForDocumentation.content;

    it("should have matching table of contents entry", () => {
      expect(renderedSignatureForTableOfContents.content).to.equal("testSignature()");
    });

    it("should have a matching documentation title", () => {
      assert(isTitleNode(title), "Rendered signature title is not a title node");
      expect(title.content).to.equal("testSignature()");
    });

    it("should have a position", () => {
      assert(isPositionNode(position), "Rendered signature position is not a position ndoe");
      expect(position.content).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      assert(isSmallNode(tags), "Rendered signature tags is not a jsdoc tag node");
      expect(tags).to.not.equal(undefined);
    });

    it("should have a matching return type", () => {
      assert(isListNode(parametersAndReturnType), "Rendered signature parameters and return type is not a list node");
      expect(parametersAndReturnType.content).to.have.lengthOf(1);
      expect(parametersAndReturnType.content[0]).to.match(/Returns: void/);
      expect(parametersAndReturnType.content[0]).to.match(/Return type description$/);
    });

    it("should have a matching description", () => {
      assert(isParagraphNode(description), "Rendered signature description is not a paragraph node");
      expect(description.content).to.equal("Signature description");
    });

    it("should have matching remarks", () => {
      assert(isParagraphNode(remarks), "Rendered signature remarks is not a paragraph node");
      expect(remarks.content).to.equal("Signature remarks");
    });

    it("should have a matching example", () => {
      assert(isParagraphNode(example), "Rendered signature example is not a paragraph node");
      expect(example.content).to.equal("Signature example");
    });

  }

});
