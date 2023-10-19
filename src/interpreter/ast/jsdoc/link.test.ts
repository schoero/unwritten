import { describe, expect, it } from "vitest";

import { JSDocKind } from "unwritten:interpreter/enums/jsdoc.js";
import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", JSDocKind.Link, () => {

  describe("link to a website without a label", () => {

    const testFileContent = ts`
      /**
       * before {@link https://unwritten.dev} after
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should handle text before correctly", () => {
      assert(exportedTypeAlias.description?.[0].kind === JSDocKind.Text);
      expect(exportedTypeAlias.description[0].text).toBe("before ");
    });

    it("should link to the website correctly", () => {
      assert(exportedTypeAlias.description?.[1].kind === JSDocKind.Link);
      expect(exportedTypeAlias.description[1].link).toBe("https://unwritten.dev");
      expect(exportedTypeAlias.description[1].text).toBeUndefined();
    });

    it("should handle text after correctly", () => {
      assert(exportedTypeAlias.description?.[2].kind === JSDocKind.Text);
      expect(exportedTypeAlias.description[2].text).toBe(" after");
    });

  });

  describe("link to a website with a label", () => {

    const testFileContent = ts`
      /**
       * before {@link https://unwritten.dev|unwritten} after
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should handle text before correctly", () => {
      assert(exportedTypeAlias.description?.[0].kind === JSDocKind.Text);
      expect(exportedTypeAlias.description[0].text).toBe("before ");
    });

    it("should link to the website correctly", () => {
      assert(exportedTypeAlias.description?.[1].kind === JSDocKind.Link);
      expect(exportedTypeAlias.description[1].link).toBe("https://unwritten.dev");
      expect(exportedTypeAlias.description[1].text).toBe("unwritten");
    });

    it("should handle text after correctly", () => {
      assert(exportedTypeAlias.description?.[2].kind === JSDocKind.Text);
      expect(exportedTypeAlias.description[2].text).toBe(" after");
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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    assert(exportedTypeAlias.description);

    it("should handle text before correctly", () => {
      assert(exportedTypeAlias.description?.[0].kind === JSDocKind.Text);
      expect(exportedTypeAlias.description[0].text).toBe("before ");
    });

    it("should create a typeReference to the linked symbol", () => {
      assert(exportedTypeAlias.description?.[1].kind === JSDocKind.Link);
      assert(exportedTypeAlias.description[1].reference);
      expect(exportedTypeAlias.description[1].reference.target?.symbolId).toEqual(exportedTypeAlias.symbolId);
      expect(exportedTypeAlias.description[1].text).toBeUndefined();
    });

    it("should handle text after correctly", () => {
      assert(exportedTypeAlias.description?.[2].kind === JSDocKind.Text);
      expect(exportedTypeAlias.description[2].text).toBe(" after\nbefore ");
      assert(exportedTypeAlias.description[4].kind === JSDocKind.Text);
      expect(exportedTypeAlias.description[4].text).toBe(" after");
    });

    it("should be possible to add a custom link label", () => {
      assert(exportedTypeAlias.description?.[3].kind === JSDocKind.Link);
      assert(exportedTypeAlias.description[3].reference);
      expect(exportedTypeAlias.description[3].reference.target?.symbolId).toEqual(exportedTypeAlias.symbolId);
      expect(exportedTypeAlias.description[3].text).toBe("LinkToTest");
    });

  });

});
