import { assert, expect, it } from "vitest";

import { createFunctionEntity, createVariableEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { filterImplicitSignatures } from "unwritten:renderer/utils/private-members.js";
import {
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { convertObjectTypeMultiline } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import {
  isAnchorNode,
  isInlineTitleNode,
  isPaddedNode,
  isParagraphNode,
  isSectionNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { ObjectLiteralType } from "unwritten:interpreter/type-definitions/types.js";


scope("MarkupRenderer", EntityKind.Signature, () => {

  {

    const testFileContent = ts`
      /**
       * Signature description
       * @example Signature example
       * @remarks Signature remarks
       * @returns Return type description
       * @throws Error description
       * @beta
       */
      export function testSignature(): void {

      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "testSignature")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const signatureEntity = filterImplicitSignatures(functionEntity.signatures)[0];
    const ctx = createRenderContext();

    const convertedSignatureForTableOfContents = convertSignatureEntityForTableOfContents(ctx, signatureEntity);
    const convertedSignatureForDocumentation = convertSignatureEntityForDocumentation(ctx, signatureEntity);

    it("should have a matching section type", () => {
      expect(isSectionNode(convertedSignatureForDocumentation)).toBe(true);
      expect(convertedSignatureForDocumentation.type).toBe(SECTION_TYPE[EntityKind.Signature]);
    });

    assert(isSectionNode(convertedSignatureForDocumentation), "Converted signature for documentation is not a section");

    const titleNode = convertedSignatureForDocumentation.children[0];

    it("should have matching table of contents entry", () => {
      expect(isAnchorNode(convertedSignatureForTableOfContents)).toBe(true);
      expect(renderNode(ctx, convertedSignatureForTableOfContents.children)).toBe("testSignature()");
    });

    assert(isAnchorNode(convertedSignatureForTableOfContents), "Converted signature for table of contents is not an anchor");

    it("should have a matching documentation title", () => {
      expect(isTitleNode(titleNode)).toBe(true);
      expect(renderNode(ctx, titleNode.title)).toBe("testSignature()");
    });

    assert(isTitleNode(titleNode), "Converted signature for documentation is not a title");

    const [
      tags,
      position,
      typeParameters,
      parameters,
      returnType,
      throws,
      description,
      remarks,
      example
    ] = titleNode.children;

    it("should have a position", () => {
      assert(isPaddedNode(position));
      assert(isSmallNode(position.children[0]));
      expect(position.children[0].children).toBeDefined();
    });

    it("should have a jsdoc tag", () => {
      assert(isParagraphNode(tags));
      const renderedTags = renderNode(ctx, tags);
      expect(renderedTags).toContain("beta");
    });

    it("should have a throw node", () => {
      expect(throws).toBeDefined();
    });

    it("should not have type parameters", () => {
      expect(typeParameters).toBe("");
    });

    it("should not have parameters", () => {
      expect(parameters).toBe("");
    });

    it("should have a matching return type", () => {
      assert(isTitleNode(returnType));
      assert(isParagraphNode(returnType.children[0]));
      expect(renderNode(ctx, returnType.children[0])).toContain("void");
      expect(renderNode(ctx, returnType.children[0])).toContain("Return type description");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      expect(renderNode(ctx, description.children[0].children[0])).toBe("Signature description");
    });

    it("should have matching remarks", () => {
      assert(isTitleNode(remarks));
      expect(renderNode(ctx, remarks.children[0].children[0])).toBe("Signature remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      expect(renderNode(ctx, example.children[0].children[0])).toBe("Signature example");
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

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "testSignature")!;
    const functionEntity = createFunctionEntity(compilerContext, symbol);
    const signatureEntity = filterImplicitSignatures(functionEntity.signatures)[0];
    const ctx = createRenderContext();

    const convertedSignatureForTableOfContents = convertSignatureEntityForTableOfContents(ctx, signatureEntity);
    const convertedSignatureForDocumentation = convertSignatureEntityForDocumentation(ctx, signatureEntity);

    assert(isSectionNode(convertedSignatureForDocumentation), "Converted signature for documentation is not a section");

    const titleNode = convertedSignatureForDocumentation.children[0];

    it("should have a matching documentation title", () => {
      expect(isTitleNode(titleNode)).toBe(true);
      expect(renderNode(ctx, titleNode.title)).toBe("testSignature<TypeParam>(param)");
    });

    assert(isTitleNode(titleNode), "Converted signature for documentation is not a title");

    it("should render type parameters in the table of contents entry", () => {
      expect(isAnchorNode(convertedSignatureForTableOfContents)).toBe(true);
      expect(renderNode(ctx, convertedSignatureForTableOfContents.children)).toBe("testSignature<TypeParam>(param)");
    });

    assert(isAnchorNode(convertedSignatureForTableOfContents), "Converted signature for table of contents is not an anchor");

    const [
      position,
      tags,
      parametersAndReturnType,
      description,
      remarks,
      example
    ] = titleNode.children;

  }

  {

    const testFileContent = ts`
      export const obj = {
        /**
         * Adds two numbers together
         * @param a The first number
         * @param b The second number
         * @returns The sum of the two numbers
         */
        add(a: number, b: number): number {
          return a + b;
        }
      };
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "obj")!;
    const variableEntity = createVariableEntity(compilerContext, symbol);
    const type = variableEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertObjectTypeMultiline(ctx, type as ObjectLiteralType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedType.children;

    it("should have one method", () => {
      expect(methods.children).toHaveLength(1);
    });

    it("should have a matching method signature", () => {
      const renderedSignature = renderNode(ctx, methods.children[0].children[0]);
      expect(renderedSignature).toContain("add(a, b)");
      expect(renderedSignature).toContain("Adds two numbers together");
    });

    it("should not have type parameters", () => {
      expect(methods.children[0].children[1]).toBe("");
    });

    it("should have matching parameters", () => {

      const parameterTitle = methods.children[0].children[2];

      assert(isInlineTitleNode(parameterTitle));

      const parameterList = parameterTitle.children[0];

      expect(parameterList.children).toHaveLength(2);

      const renderedParameterA = renderNode(ctx, parameterList.children[0]);
      const renderedParameterB = renderNode(ctx, parameterList.children[1]);

      expect(renderedParameterA).toContain("a");
      expect(renderedParameterA).toContain("number");
      expect(renderedParameterA).toContain("The first number");

      expect(renderedParameterB).toContain("b");
      expect(renderedParameterB).toContain("number");
      expect(renderedParameterB).toContain("The second number");
    });

    it("should have a matching return type", () => {
      const renderedReturnType = renderNode(ctx, methods.children[0].children[3]);
      expect(renderedReturnType).toContain("number");
      expect(renderedReturnType).toContain("The sum of the two numbers");
    });

  }

  {

    const testFileContent = ts`
      export const obj = {
        /**
         * @template T Type parameter description
         */
        test<T extends number>(param: T): T {
          return param
        }
      };
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "obj")!;
    const variableEntity = createVariableEntity(compilerContext, symbol);
    const type = variableEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertObjectTypeMultiline(ctx, type as ObjectLiteralType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedType.children;

    it("should represent the type parameter in the signature", () => {
      const renderedSignature = renderNode(ctx, methods.children[0].children[0]);
      expect(renderedSignature).toContain("test<T>(param)");
    });

    it("should have a matching type parameter", () => {
      const renderedTypeParameter = renderNode(ctx, methods.children[0].children[1]);

      const typeParameterTitle = methods.children[0].children[1];

      assert(isInlineTitleNode(typeParameterTitle));

      const typeParameterList = typeParameterTitle.children[0];

      expect(typeParameterList.children).toHaveLength(1);

      expect(renderedTypeParameter).toContain("T");
      expect(renderedTypeParameter).toContain("number");
      expect(renderedTypeParameter).toContain("Type parameter description");
    });

  }

});
