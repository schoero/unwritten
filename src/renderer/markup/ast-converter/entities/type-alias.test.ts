import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import {
  convertTypeAliasEntityForDocumentation,
  convertTypeAliasEntityForTableOfContents
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

    assert(isAnchorNode(convertedTypeAliasForTableOfContents), "Rendered typeAlias for table of contents is not a link");
    assert(isTitleNode(convertedTypeAliasForDocumentation), "Rendered typeAlias for documentation is not a container");

    const [
      position,
      tags,
      typeParameters,
      type,
      description,
      remarks,
      example
    ] = convertedTypeAliasForDocumentation.children;

    it("should have matching table of contents entry", () => {
      assert(isAnchorNode(convertedTypeAliasForTableOfContents));
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
      assert(isParagraphNode(tags));
      expect(tags.children).to.include("beta");
    });

    it("should have a matching type parameters", () => {
      assert(isTitleNode(typeParameters));
      const renderedTypeParameters = renderNode(ctx, typeParameters.children);
      expect(renderedTypeParameters).to.match(/<A>/);
      expect(renderedTypeParameters).to.match(/Type parameter description/);
    });

    it("should have a matching type", () => {
      assert(isTitleNode(type));
      const renderedTypeParameters = renderNode(ctx, type.children);
      expect(renderedTypeParameters).to.match(/.*A.*$/);
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      assert(isParagraphNode(description.children[0]));
      expect(description.children[0].children[0]).to.equal("Type alias description");
    });

    it("should have matching remarks", () => {
      assert(isTitleNode(remarks));
      assert(isParagraphNode(remarks.children[0]));
      expect(remarks.children[0].children[0]).to.equal("Type alias remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      assert(isParagraphNode(example.children[0]));
      expect(example.children[0].children[0]).to.equal("Type alias example");
    });

  }

});
