import { assert, expect, it } from "vitest";

import { createFunctionEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import {
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import {
  isLinkNode,
  isListNode,
  isParagraphNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("MarkupRenderer", EntityKind.Signature, () => {

  {

    const testFileContent = ts`
      /**
       * Signature description
       * @example Signature example
       * @remarks Signature remarks
       * @returns Return type description
       * @beta
       */
      export function testSignature(): void;
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "testSignature")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const signatureEntity = functionEntity.signatures[0];
    const ctx = createRenderContext();

    const convertedSignatureForTableOfContents = convertSignatureEntityForTableOfContents(ctx, signatureEntity);
    const convertedSignatureForDocumentation = convertSignatureEntityForDocumentation(ctx, signatureEntity);

    assert(isLinkNode(convertedSignatureForTableOfContents), "Converted signature for table of contents is not a link");
    assert(isTitleNode(convertedSignatureForDocumentation), "Converted signature for documentation is not a container");

    const [
      position,
      tags,
      parametersAndReturnType,
      description,
      remarks,
      example
    ] = convertedSignatureForDocumentation.children;

    it("should have matching table of contents entry", () => {
      expect(isLinkNode(convertedSignatureForTableOfContents)).to.equal(true);
      expect(renderNode(ctx, convertedSignatureForTableOfContents.children)).to.equal("testSignature()");
    });

    it("should have a matching documentation title", () => {
      expect(isTitleNode(convertedSignatureForDocumentation)).to.equal(true);
      expect(renderNode(ctx, convertedSignatureForDocumentation.title)).to.equal("testSignature()");
    });

    it("should have a position", () => {
      expect(isSmallNode(position)).to.equal(true);
      expect(position.children).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      expect(isParagraphNode(tags)).to.equal(true);
      expect(renderNode(ctx, tags.children)).to.equal("beta");
    });

    it("should have a matching return type", () => {
      expect(isListNode(parametersAndReturnType)).to.equal(true);
      const renderedParametersAndReturnType = renderNode(ctx, parametersAndReturnType.children[0]);
      expect(renderedParametersAndReturnType).to.match(/^Returns: void/);
      expect(renderedParametersAndReturnType).to.match(/Return type description$/);
    });

    it("should have a matching description", () => {
      expect(isParagraphNode(description)).to.equal(true);
      expect(renderNode(ctx, description.children)).to.equal("Signature description");
    });

    it("should have matching remarks", () => {
      expect(isParagraphNode(description)).to.equal(true);
      expect(renderNode(ctx, remarks.children)).to.equal("Signature remarks");
    });

    it("should have a matching example", () => {
      expect(isParagraphNode(description)).to.equal(true);
      expect(renderNode(ctx, example.children)).to.equal("Signature example");
    });

  }

});
