import { expect, it } from "vitest";

import { createModuleEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { isParagraphNode, isTitleNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import {
  convertModuleEntityForDocumentation,
  convertModuleEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


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

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Module")!;
    const moduleEntity = createModuleEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const renderedModuleForTableOfContents = convertModuleEntityForTableOfContents(ctx, moduleEntity);
    const renderedModuleForDocumentation = convertModuleEntityForDocumentation(ctx, moduleEntity);

    const titleNode = renderedModuleForDocumentation.children[0];

    const [
      position,
      tags,
      description,
      remarks,
      example,
      ...children
    ] = titleNode.children;

    it("should have a matching title", () => {
      expect(renderedModuleForTableOfContents.title).toBe("Module");
      expect(titleNode.title).toBe("Module");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      expect(description.children[0].children[0]).toBe("Module description");
    });

    it("should have a matching remarks", () => {
      assert(isTitleNode(remarks));
      expect(remarks.children[0].children[0]).toBe("Module remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      expect(example.children[0].children[0]).toBe("Module example");
    });

    it("should have a matching tags", () => {
      assert(isParagraphNode(tags));
      expect(tags.children).toContain("deprecated");
      expect(tags.children).toContain("beta");
    });

    it("should have a position", () => {
      expect(position).to.not.equal(undefined);
    });

    it("should have no children", () => {
      expect(children).toHaveLength(0);
    });

  }

  {

    const testFileContent = ts`
      export module Module {
        export function test(){}
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Module")!;
    const moduleEntity = createModuleEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const renderedModuleForTableOfContents = convertModuleEntityForTableOfContents(ctx, moduleEntity);
    const renderedModuleForDocumentation = convertModuleEntityForDocumentation(ctx, moduleEntity);

    const titleNode = renderedModuleForDocumentation.children[0];

    const [
      position,
      tags,
      description,
      remarks,
      example,
      ...children
    ] = titleNode.children;

    it("should have a matching title", () => {
      expect(renderedModuleForTableOfContents.title).toBe("Module");
      expect(titleNode.title).toBe("Module");
    });

    it("should have on child", () => {
      expect(children).toHaveLength(1);
    });

  }

});
