import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import {
  convertTypeAliasEntityForDocumentation,
  convertTypeAliasEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import {
  isLinkNode,
  isParagraphNode,
  isSmallNode,
  isTitleNode
} from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";
import { assert } from "unwritten:utils/general.js";


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

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedTypeAliasForTableOfContents = convertTypeAliasEntityForTableOfContents(ctx, typeAliasEntity);
    const convertedTypeAliasForDocumentation = convertTypeAliasEntityForDocumentation(ctx, typeAliasEntity);

    assert(isLinkNode(convertedTypeAliasForTableOfContents), "Rendered typeAlias for table of contents is not a link");
    assert(isTitleNode(convertedTypeAliasForDocumentation), "Rendered typeAlias for documentation is not a container");

    const [
      position,
      tags,
      typeParameters,
      type,
      description,
      example,
      remarks
    ] = convertedTypeAliasForDocumentation.children;

    it("should have matching table of contents entry", () => {
      assert(isLinkNode(convertedTypeAliasForTableOfContents));
      expect(renderNode(ctx, convertedTypeAliasForTableOfContents.children)).to.equal("TypeAlias<A>");
    });

    it("should have a matching documentation signature", () => {
      assert(isTitleNode(convertedTypeAliasForDocumentation));
      expect(renderNode(ctx, convertedTypeAliasForDocumentation.title)).to.equal("TypeAlias<A>");
    });

    it("should have a position", () => {
      assert(isSmallNode(position));
      expect(position.children).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      assert(isSmallNode(tags));
      const renderedTags = renderNode(ctx, tags.children);
      expect(renderedTags).to.equal("beta");
    });

    it("should have a matching type parameters", () => {
      assert(isTitleNode(typeParameters));
      const renderedTypeParameters = renderNode(ctx, typeParameters.children[0].children);
      expect(renderedTypeParameters).to.match(/A$/);
      expect(renderedTypeParameters).to.match(/Type parameter description$/);
    });

    it("should have a matching type", () => {
      assert(isTitleNode(type));
      const renderedType = renderNode(ctx, type.children[0].children);
      expect(renderedType).to.match(/Type: .*A.*$/);
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      const renderedDescription = renderNode(ctx, description.children[0]);
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
