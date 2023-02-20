import { assert, expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import {
  isLinkNode,
  isListNode,
  isParagraphNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

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

    const renderedSignatureForTableOfContents = convertSignatureForTableOfContents(ctx, signatureEntity as SignatureEntity);
    const renderedSignatureForDocumentation = convertSignatureForDocumentation(ctx, signatureEntity as SignatureEntity);

    assert(isLinkNode(renderedSignatureForTableOfContents), "Rendered signature for table of contents is not a link");
    assert(isTitleNode(renderedSignatureForDocumentation), "Rendered signature for documentation is not a container");

    const [
      position,
      tags,
      parametersAndReturnType,
      description,
      remarks,
      example
    ] = convertedSignatureForDocumentation.children;

    it("should have matching table of contents entry", () => {
      expect(isLinkNode(renderedSignatureForTableOfContents)).to.equal(true);
      expect(renderedSignatureForTableOfContents.children).to.equal("testSignature()");
    });

    it("should have a matching documentation title", () => {
      expect(isTitleNode(renderedSignatureForDocumentation)).to.equal(true);
      expect(renderedSignatureForDocumentation.title).to.equal("testSignature()");
    });

    it("should have a position", () => {
      expect(isSmallNode(position)).to.equal(true);
      expect(position.children).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      expect(isSmallNode(tags)).to.equal(true);
      expect(tags).to.not.equal(undefined);
    });

    it("should have a matching return type", () => {
      expect(isListNode(parametersAndReturnType)).to.equal(true);
      expect(parametersAndReturnType.children).to.have.lengthOf(1);
      expect(parametersAndReturnType.children[0]).to.match(/Returns: void/);
      expect(parametersAndReturnType.children[0]).to.match(/Return type description$/);
    });

    it("should have a matching description", () => {
      expect(isParagraphNode(description)).to.equal(true);
      expect(description.children).to.equal("Signature description");
    });

    it("should have matching remarks", () => {
      expect(isParagraphNode(description)).to.equal(true);
      expect(remarks.children).to.equal("Signature remarks");
    });

    it("should have a matching example", () => {
      expect(isParagraphNode(description)).to.equal(true);
      expect(example.children).to.equal("Signature example");
    });

  }

});
