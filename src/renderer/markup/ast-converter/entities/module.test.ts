import { expect, it } from "vitest";

import { createModuleEntity } from "unwritten:interpreter/ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { renderNode } from "unwritten:renderer/index";
import {
  convertModuleEntityForDocumentation,
  convertModuleEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { isAnchorNode, isParagraphNode, isTitleNode } from "unwritten:renderer:markup/typeguards/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


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
      tags,
      position,
      description,
      remarks,
      example,
      see,
      ...children
    ] = titleNode.children;

    it("should have a matching title", () => {
      assert(isAnchorNode(renderedModuleForTableOfContents[0]));
      expect(renderedModuleForTableOfContents[0].name).toBe("Module");
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
      const renderedTags = renderNode(ctx, tags);
      expect(renderedTags).toContain("deprecated");
      expect(renderedTags).toContain("beta");
    });

    it("should have a position", () => {
      const renderedPosition = renderNode(ctx, position);
      expect(renderedPosition).toBeTruthy();
    });

    it("should have no children", () => {
      expect(children).toHaveLength(0);
    });

  }

});
