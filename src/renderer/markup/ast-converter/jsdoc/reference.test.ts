import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { JSDocKind } from "unwritten:interpreter/enums/jsdoc.js";
import { convertJSDocReference } from "unwritten:renderer/markup/ast-converter/jsdoc/reference.js";
import { isAnchorNode, isConditionalNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", JSDocKind.Reference, () => {

  {

    const testFileContent = ts`
      /**
       * {@link Test}
       * @see Test
       */
      export type Test = true;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);

    assert(typeAliasEntity.description);

    const ctx = createRenderContext();

    it("should render references in a link correctly", () => {

      assert(typeAliasEntity.description?.[1].kind === JSDocKind.Link);
      assert(typeAliasEntity.description[1].reference);

      const convertedReference = convertJSDocReference(ctx, typeAliasEntity.description[1].reference);
      assert(isConditionalNode(convertedReference));
      expect(isAnchorNode(convertedReference.trueChildren)).toBe(true);
      expect(convertedReference.falseChildren).toBe("Test");

    });

    it("should render references in a see tag correctly", () => {

      assert(typeAliasEntity.see?.[0].kind === JSDocKind.See);
      assert(typeAliasEntity.see[0].reference);

      const convertedReference = convertJSDocReference(ctx, typeAliasEntity.see[0].reference);
      assert(isConditionalNode(convertedReference));
      expect(isAnchorNode(convertedReference.trueChildren)).toBe(true);
      expect(convertedReference.falseChildren).toBe("Test");

    });

  }

});
