import { expect, it } from "vitest";

import { createModuleEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { isSmallNode, isTitleNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import {
  convertModuleEntityForDocumentation,
  convertModuleEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";
import { assert } from "unwritten:utils/general.js";


scope("MarkupRenderer", EntityKind.Module, () => {

  {

    const testFileContent = ts`
      /**
       * Module description
       *
       * @remarks Module remarks
       * @example Module example
       * @deprecated
       * @beta
       */
      export module Module {

      }
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Module")!;
    const moduleEntity = createModuleEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const renderedModuleForTableOfContents = convertModuleEntityForTableOfContents(ctx, moduleEntity);
    const renderedModuleForDocumentation = convertModuleEntityForDocumentation(ctx, moduleEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      ...children
    ] = renderedModuleForDocumentation.children;

    it("should have a matching title", () => {
      expect(renderedModuleForTableOfContents.title).to.equal("Module");
      expect(renderedModuleForDocumentation.title).to.equal("Module");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      expect(description.children[0].children[0]).to.equal("Module description");
    });

    it("should have a matching remarks", () => {
      assert(isTitleNode(remarks));
      expect(remarks.children[0].children[0]).to.equal("Module remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      expect(example.children[0].children[0]).to.equal("Module example");
    });

    it("should have a matching tags", () => {
      assert(isSmallNode(tags));
      expect(tags.children).to.include("deprecated");
      expect(tags.children).to.include("beta");
    });

    it("should have a position", () => {
      expect(position).to.not.equal(undefined);
    });

    it("should have no children", () => {
      expect(children.length).to.equal(0);
    });

  }

  {

    const testFileContent = ts`
      export module Module {
        export function test(){}
      }
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Module")!;
    const moduleEntity = createModuleEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const renderedModuleForTableOfContents = convertModuleEntityForTableOfContents(ctx, moduleEntity);
    const renderedModuleForDocumentation = convertModuleEntityForDocumentation(ctx, moduleEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      ...children
    ] = renderedModuleForDocumentation.children;

    it("should have a matching title", () => {
      expect(renderedModuleForTableOfContents.title).to.equal("Module");
      expect(renderedModuleForDocumentation.title).to.equal("Module");
    });

    it("should have on child", () => {
      expect(children.length).to.equal(1);
    });

  }

});
