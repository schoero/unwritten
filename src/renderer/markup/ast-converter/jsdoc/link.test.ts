import { describe, expect, it } from "vitest";

import { JSDocKind } from "unwritten:interpreter/enums/jsdoc.js";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { convertJSDocLink } from "unwritten:renderer/markup/ast-converter/jsdoc/index.js";
import { isAnchorNode, isConditionalNode, isLinkNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", JSDocKind.Link, () => {

  describe("link to a website without a label", () => {

    const testFileContent = ts`
      /**
       * before {@link https://unwritten.dev} after
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(compilerContext, symbol);

    const ctx = createRenderContext();

    it("should render links to urls correctly", () => {
      assert(exportedTypeAlias.description?.[1].kind === JSDocKind.Link);
      const convertedLink = convertJSDocLink(ctx, exportedTypeAlias.description[1]);
      assert(isLinkNode(convertedLink));
      expect(convertedLink.link).toBe("https://unwritten.dev");
      expect(convertedLink.children).toHaveLength(1);
      expect(convertedLink.children[0]).toBe("https://unwritten.dev");
    });

  });

  describe("link to a website with a label", () => {

    const testFileContent = ts`
      /**
       * before {@link https://unwritten.dev|unwritten} after
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(compilerContext, symbol);

    const ctx = createRenderContext();

    it("should render links to urls with a label correctly", () => {
      assert(exportedTypeAlias.description?.[1].kind === JSDocKind.Link);
      const convertedLink = convertJSDocLink(ctx, exportedTypeAlias.description[1]);
      assert(isLinkNode(convertedLink));
      expect(convertedLink.link).toBe("https://unwritten.dev");
      expect(convertedLink.children).toHaveLength(1);
      expect(convertedLink.children[0]).toBe("unwritten");
    });

  });

  describe("link to anther symbol", () => {

    const testFileContent = ts`
      /**
       * before {@link Test} after
       * before {@link Test|LinkToTest} after
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(compilerContext, symbol);

    assert(exportedTypeAlias.description);

    const ctx = createRenderContext();

    it("should render links to symbols correctly", () => {
      assert(exportedTypeAlias.description?.[1].kind === JSDocKind.Link);
      const convertedLink = convertJSDocLink(ctx, exportedTypeAlias.description[1]);
      assert(isConditionalNode(convertedLink));
      assert(isAnchorNode(convertedLink.trueChildren));
      expect(convertedLink.trueChildren.name).toBe("Test");
      expect(convertedLink.trueChildren.displayName).toBe("Test");
      expect(convertedLink.trueChildren.children).toHaveLength(1);
      expect(convertedLink.trueChildren.children[0]).toBe("Test");
    });

    it("should render named links to symbols correctly", () => {
      assert(exportedTypeAlias.description?.[3].kind === JSDocKind.Link);
      const convertedLink = convertJSDocLink(ctx, exportedTypeAlias.description[3]);
      assert(isConditionalNode(convertedLink));
      assert(isAnchorNode(convertedLink.trueChildren));
      expect(convertedLink.trueChildren.name).toBe("Test");
      expect(convertedLink.trueChildren.displayName).toBe("LinkToTest");
      expect(convertedLink.trueChildren.children).toHaveLength(1);
      expect(convertedLink.trueChildren.children[0]).toBe("Test");
    });

  });

});
