import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { JSDocTagNames } from "unwritten:interpreter/enums/jsdoc";
import { convertExamplesForDocumentation } from "unwritten:renderer:markup/ast-converter/shared/example";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";


scope("MarkupRenderer", JSDocTagNames.Example, () => {

  {

    const testFileContent = ts`
      /**
       * @example Line 1
       * Line 2
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    assert(typeAliasEntity.example);

    const convertedExample = convertExamplesForDocumentation(
      ctx,
      typeAliasEntity.example
    );

    assert(convertedExample);

    const {
      children,
      title
    } = convertedExample;

    it("should have a matching title", () => {
      expect(title).toBe("Example");
    });

    it("should have a matching description", () => {
      expect(children).toHaveLength(1);
      expect(children[0].children[0]).toBe("Line 1\nLine 2");
    });

  }

  {

    const testFileContent = ts`
      /**
       * @example Line 1
       * Line 2
       * @example Line 3
       * Line 4
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const ctx = createRenderContext();

    assert(typeAliasEntity.example);

    const convertedExample = convertExamplesForDocumentation(
      ctx,
      typeAliasEntity.example
    );

    assert(convertedExample);

    const {
      children,
      title
    } = convertedExample;

    it("should have a matching title", () => {
      expect(title).toBe("Examples");
    });

    it("should have a matching description", () => {
      expect(children).toHaveLength(2);
      expect(children[0].children[0]).toBe("Line 1\nLine 2");
      expect(children[1].children[0]).toBe("Line 3\nLine 4");
    });

  }

});
