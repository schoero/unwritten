import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import {
  convertTypeAliasEntityForDocumentation,
  convertTypeAliasEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import {
  isAnchorNode,
  isPaddedNode,
  isParagraphNode,
  isSectionNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", EntityKind.TypeAlias, () => {

  {

    const testFileContent = ts`
       /**
       * Type alias description
       *
       * @remarks Type alias remarks
       * @example Type alias example
       * @template A - Type parameter description
       * @beta
       */
      export type TypeAlias<A extends number = 7> = A;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedTypeAliasForTableOfContents = convertTypeAliasEntityForTableOfContents(ctx, typeAliasEntity);
    const convertedTypeAliasForDocumentation = convertTypeAliasEntityForDocumentation(ctx, typeAliasEntity);

    it("should have matching table of contents entry", () => {
      assert(isAnchorNode(convertedTypeAliasForTableOfContents));
      expect(renderNode(ctx, convertedTypeAliasForTableOfContents.children)).toBe("TypeAlias<A>");
    });

    assert(isAnchorNode(convertedTypeAliasForTableOfContents), "Rendered typeAlias for table of contents is not a link");

    const titleNode = convertedTypeAliasForDocumentation.children[0];

    it("should have a matching documentation signature", () => {
      assert(isTitleNode(titleNode));
      expect(renderNode(ctx, titleNode.title)).toBe("TypeAlias<A>");
    });

    assert(isSectionNode(convertedTypeAliasForDocumentation), "Rendered typeAlias for documentation is not a section");
    assert(isTitleNode(titleNode), "Rendered typeAlias for documentation is not a title");

    const [
      tags,
      position,
      typeParameters,
      type,
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
      expect(tags.children).toContain("beta");
    });

    it("should have a matching type parameters", () => {
      assert(isTitleNode(typeParameters));
      const renderedTypeParameters = renderNode(ctx, typeParameters.children);
      expect(renderedTypeParameters).toMatch(/<A>/);
      expect(renderedTypeParameters).toMatch(/Type parameter description/);
    });

    it("should have a matching type", () => {
      assert(isTitleNode(type));
      const renderedTypeParameters = renderNode(ctx, type.children);
      expect(renderedTypeParameters).toMatch(/.*A.*$/);
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      assert(isParagraphNode(description.children[0]));
      expect(description.children[0].children[0]).toBe("Type alias description");
    });

    it("should have matching remarks", () => {
      assert(isTitleNode(remarks));
      assert(isParagraphNode(remarks.children[0]));
      expect(remarks.children[0].children[0]).toBe("Type alias remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      assert(isParagraphNode(example.children[0]));
      expect(example.children[0].children[0]).toBe("Type alias example");
    });

  }

});
