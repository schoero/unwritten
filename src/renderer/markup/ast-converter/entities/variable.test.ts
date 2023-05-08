import { expect, it } from "vitest";

import { createVariableEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import {
  convertVariableEntityForDocumentation,
  convertVariableEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
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


scope("MarkupRenderer", EntityKind.Variable, () => {

  {

    const testFileContent = ts`
      /**
       * Variable description
       * 
       * @remarks Variable remarks
       * @example Variable example
       * @beta
       */
      export const numberVariable = 7;
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "numberVariable")!;
    const variableEntity = createVariableEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const convertedVariableForTableOfContents = convertVariableEntityForTableOfContents(ctx, variableEntity);
    const convertedVariableForDocumentation = convertVariableEntityForDocumentation(ctx, variableEntity);

    assert(isAnchorNode(convertedVariableForTableOfContents), "Rendered variable for table of contents is not a link");
    assert(isTitleNode(convertedVariableForDocumentation), "Rendered variable for documentation is not a container");

    const [
      position,
      tags,
      type,
      description,
      remarks,
      example
    ] = convertedVariableForDocumentation.children;

    it("should have matching table of contents entry", () => {
      expect(isAnchorNode(convertedVariableForTableOfContents)).to.equal(true);
      expect(convertedVariableForTableOfContents.children[0]).to.equal("numberVariable");
    });

    it("should have a matching documentation title", () => {
      expect(isTitleNode(convertedVariableForDocumentation)).to.equal(true);
      expect(convertedVariableForDocumentation.title).to.equal("numberVariable");
    });

    it("should have a position", () => {
      assert(isSmallNode(position));
      expect(position.children).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      assert(isParagraphNode(tags));
      expect(tags.children).to.include("beta");
    });

    it("should have a matching type", () => {
      assert(isTitleNode(type));
      assert(isParagraphNode(type.children[0]));
      expect(type.children[0].children).to.include("7");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      assert(isParagraphNode(description.children[0]));
      expect(description.children[0].children[0]).to.equal("Variable description");
    });

    it("should have matching remarks", () => {
      assert(isTitleNode(remarks));
      assert(isParagraphNode(remarks.children[0]));
      expect(remarks.children[0].children[0]).to.equal("Variable remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      assert(isParagraphNode(example.children[0]));
      expect(example.children[0].children[0]).to.equal("Variable example");
    });

  }

});
