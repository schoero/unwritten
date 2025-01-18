import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";
import { describe, expect, it } from "vitest";


scope("Interpreter", JSDocKind.Generic, () => {

  describe("generic jsdoc block tags", () => {

    const testFileContent = ts`
      /**
       * before @alpha line 1
       * line 2
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should handle text before correctly", () => {
      expect(exportedTypeAlias.description).toHaveLength(1);
      assert(exportedTypeAlias.description?.[0].kind === JSDocKind.Text);
      expect(exportedTypeAlias.description[0].text).toBe("before");
    });

    it("should have multiple lines of content", () => {
      expect(exportedTypeAlias.alpha).toHaveLength(1);
      assert(exportedTypeAlias.alpha?.[0]?.kind === JSDocKind.Generic);
      expect(exportedTypeAlias.alpha[0].tag).toBe("alpha");
      expect(exportedTypeAlias.alpha[0].content).toHaveLength(1);
      assert(exportedTypeAlias.alpha[0].content[0].kind === JSDocKind.Text);
      expect(exportedTypeAlias.alpha[0].content[0].text).toBe("line 1\nline 2");
    });

  });

  describe("example jsdoc tags with markdown", () => {

    const testFileContent = ts`
      /**
       * @example example 1
       * \`\`\`ts
       * export type Test = true;
       * \`\`\`
       * @example example 2
       * \`\`\`ts
       * export type Test = true;
       * \`\`\`
       */
      export type Test = true;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should support multiple examples with markdown", () => {
      expect(exportedTypeAlias.example).toHaveLength(2);
      assert(exportedTypeAlias.example?.[0].content[0].kind === JSDocKind.Text);
      expect(exportedTypeAlias.example[0].content[0].text).toContain("example 1");
      expect(exportedTypeAlias.example[0].content[0].text).toContain("export type Test = true;");

      assert(exportedTypeAlias.example[1].content[0].kind === JSDocKind.Text);
      expect(exportedTypeAlias.example[1].content[0].text).toContain("example 2");
      expect(exportedTypeAlias.example[1].content[0].text).toContain("export type Test = true;");
    });

  });

});
