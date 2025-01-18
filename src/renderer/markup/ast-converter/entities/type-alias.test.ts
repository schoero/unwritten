import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import {
  convertTypeAliasEntityForDocumentation,
  convertTypeAliasEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { renderNode } from "unwritten:renderer:markup/html/index";
import {
  isAnchorNode,
  isParagraphNode,
  isSectionNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";


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

    const titleNode = convertedTypeAliasForDocumentation.title;

    it("should have a matching documentation signature", () => {
      assert(isTitleNode(titleNode));
      expect(renderNode(ctx, titleNode.title)).toBe("TypeAlias<A>");
    });

    assert(isSectionNode(convertedTypeAliasForDocumentation));
    assert(isTitleNode(titleNode));

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
      const renderedPosition = renderNode(ctx, position);
      expect(renderedPosition).toBeTruthy();
    });

    it("should have a jsdoc tag", () => {
      assert(isParagraphNode(tags));
      const renderedTags = renderNode(ctx, tags);
      expect(renderedTags).toContain("beta");
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
