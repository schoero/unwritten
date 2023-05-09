import { assert, expect, it } from "vitest";

import { createFunctionEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import {
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import {
  isAnchorNode,
  isParagraphNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


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

    assert(isAnchorNode(convertedSignatureForTableOfContents), "Converted signature for table of contents is not an anchor");
    assert(isTitleNode(convertedSignatureForDocumentation), "Converted signature for documentation is not a container");

    const [
      position,
      tags,
      typeParameters,
      parameters,
      returnType,
      description,
      remarks,
      example
    ] = convertedSignatureForDocumentation.children;

    it("should have matching table of contents entry", () => {
      expect(isAnchorNode(convertedSignatureForTableOfContents)).to.equal(true);
      expect(renderNode(ctx, convertedSignatureForTableOfContents.children)).to.equal("testSignature()");
    });

    it("should have a matching documentation title", () => {
      expect(isTitleNode(convertedSignatureForDocumentation)).to.equal(true);
      expect(renderNode(ctx, convertedSignatureForDocumentation.title)).to.equal("testSignature()");
    });

    it("should have a position", () => {
      assert(isSmallNode(position));
      expect(position.children).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      assert(isParagraphNode(tags));
      expect(tags.children).to.include("beta");
    });

    it("should not have type parameters", () => {
      expect(typeParameters).to.equal("");
    });

    it("should not have parameters", () => {
      expect(parameters).to.equal("");
    });

    it("should have a matching return type", () => {
      assert(isTitleNode(returnType));
      const renderedReturnType = renderNode(ctx, returnType.children[0]);
      expect(renderedReturnType).to.match(/^void/);
      expect(renderedReturnType).to.match(/Return type description$/);
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      expect(renderNode(ctx, description.children[0].children[0])).to.equal("Signature description");
    });

    it("should have matching remarks", () => {
      assert(isTitleNode(remarks));
      expect(renderNode(ctx, remarks.children[0].children[0])).to.equal("Signature remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      expect(renderNode(ctx, example.children[0].children[0])).to.equal("Signature example");
    });

  }

  {

    const testFileContent = ts`
      /**
       * @template TypeParam Type parameter description
       * @param param Parameter description
       * @returns Return type description
       */
      export function testSignature<TypeParam extends string = "test">(param: TypeParam): TypeParam {
        return param;
      }
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "testSignature")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const signatureEntity = functionEntity.signatures[0];
    const ctx = createRenderContext();

    const convertedSignatureForTableOfContents = convertSignatureEntityForTableOfContents(ctx, signatureEntity);
    const convertedSignatureForDocumentation = convertSignatureEntityForDocumentation(ctx, signatureEntity);

    assert(isAnchorNode(convertedSignatureForTableOfContents), "Converted signature for table of contents is not an anchor");
    assert(isTitleNode(convertedSignatureForDocumentation), "Converted signature for documentation is not a container");

    const [
      position,
      tags,
      parametersAndReturnType,
      description,
      remarks,
      example
    ] = convertedSignatureForDocumentation.children;

    it("should render type parameters in the table of contents entry", () => {
      expect(isAnchorNode(convertedSignatureForTableOfContents)).to.equal(true);
      expect(renderNode(ctx, convertedSignatureForTableOfContents.children)).to.equal("testSignature<TypeParam>(param)");
    });

    it("should have a matching documentation title", () => {
      expect(isTitleNode(convertedSignatureForDocumentation)).to.equal(true);
      expect(renderNode(ctx, convertedSignatureForDocumentation.title)).to.equal("testSignature<TypeParam>(param)");
    });

  }

});
