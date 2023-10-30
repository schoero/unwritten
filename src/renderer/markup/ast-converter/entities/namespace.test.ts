import { expect, it } from "vitest";

import { createNamespaceEntity } from "unwritten:interpreter/ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { renderNode } from "unwritten:renderer/index";
import {
  convertNamespaceEntityForDocumentation,
  convertNamespaceEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { isAnchorNode, isParagraphNode, isTitleNode } from "unwritten:renderer:markup/typeguards/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("MarkupRenderer", EntityKind.Namespace, () => {

  {

    const testFileContent = ts`
      /**
       * Namespace description
       *
       * @remarks Namespace remarks
       * @example Namespace example
       * @deprecated
       * @beta
       */
      export namespace Namespace {

      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Namespace")!;
    const namespaceEntity = createNamespaceEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const renderedNamespaceForTableOfContents = convertNamespaceEntityForTableOfContents(ctx, namespaceEntity);
    const renderedNamespaceForDocumentation = convertNamespaceEntityForDocumentation(ctx, namespaceEntity);

    const titleNode = renderedNamespaceForDocumentation.children[0];

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
      assert(isAnchorNode(renderedNamespaceForTableOfContents[0]));
      expect(renderedNamespaceForTableOfContents[0].name).toBe("Namespace");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      expect(description.children[0].children[0]).toBe("Namespace description");
    });

    it("should have a matching remarks", () => {
      assert(isTitleNode(remarks));
      expect(remarks.children[0].children[0]).toBe("Namespace remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      expect(example.children[0].children[0]).toBe("Namespace example");
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
