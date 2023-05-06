import { expect, it } from "vitest";

import { createNamespaceEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { isParagraphNode, isTitleNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import {
  convertNamespaceEntityForDocumentation,
  convertNamespaceEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";
import { assert } from "unwritten:utils/general.js";


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

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Namespace")!;
    const namespaceEntity = createNamespaceEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const renderedNamespaceForTableOfContents = convertNamespaceEntityForTableOfContents(ctx, namespaceEntity);
    const renderedNamespaceForDocumentation = convertNamespaceEntityForDocumentation(ctx, namespaceEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      ...children
    ] = renderedNamespaceForDocumentation.children;

    it("should have a matching title", () => {
      expect(renderedNamespaceForTableOfContents.title).to.equal("Namespace");
      expect(renderedNamespaceForDocumentation.title).to.equal("Namespace");
    });

    it("should have a matching description", () => {
      assert(isTitleNode(description));
      expect(description.children[0].children[0]).to.equal("Namespace description");
    });

    it("should have a matching remarks", () => {
      assert(isTitleNode(remarks));
      expect(remarks.children[0].children[0]).to.equal("Namespace remarks");
    });

    it("should have a matching example", () => {
      assert(isTitleNode(example));
      expect(example.children[0].children[0]).to.equal("Namespace example");
    });

    it("should have a matching tags", () => {
      assert(isParagraphNode(tags));
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
      export namespace Namespace {
        export function test(){}
      }
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Namespace")!;
    const namespaceEntity = createNamespaceEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    const renderedNamespaceForTableOfContents = convertNamespaceEntityForTableOfContents(ctx, namespaceEntity);
    const renderedNamespaceForDocumentation = convertNamespaceEntityForDocumentation(ctx, namespaceEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      ...children
    ] = renderedNamespaceForDocumentation.children;

    it("should have a matching title", () => {
      expect(renderedNamespaceForTableOfContents.title).to.equal("Namespace");
      expect(renderedNamespaceForDocumentation.title).to.equal("Namespace");
    });

    it("should have on child", () => {
      expect(children.length).to.equal(1);
    });

  }

});
