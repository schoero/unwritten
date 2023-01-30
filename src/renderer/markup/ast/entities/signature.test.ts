import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler/enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderSignatureForDocumentation, renderSignatureForTableOfContents } from "./signature.js";

import type { SignatureEntity } from "unwritten:compiler/type-definitions/entities.js";
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

    const renderedSignatureTitle = Object.keys(renderedSignatureForDocumentation)[0]!;
    const renderedSignatureContent = renderedSignatureForDocumentation[renderedSignatureTitle]!;

    const [
      tags,
      position,
      parametersAndReturnType,
      description,
      remarks,
      example
    ] = renderedSignatureContent;

    it("should have matching table of contents entry", () => {
      expect(renderedSignatureForTableOfContents).to.equal("testSignature()");
    });

    it("should have a matching documentation title", () => {
      expect(renderedSignatureTitle).to.equal("testSignature()");
    });

    it("should have a position", () => {
      expect(position).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      expect(tags).to.not.equal(undefined);
    });

    it("should have a matching return type", () => {
      expect(parametersAndReturnType[0][0]).to.match(/Returns: void/);
      expect(parametersAndReturnType[0][0]).to.match(/Return type description$/);
    });

    it("should have a matching description", () => {
      expect(description).to.equal("Signature description");
    });

    it("should have matching remarks", () => {
      expect(remarks).to.equal("Signature remarks");
    });

    it("should have a matching example", () => {
      expect(example).to.equal("Signature example");
    });

  }

});
