import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


scope("MarkupRenderer", TypeKind.Class, () => {

  {

    const testFileContent = ts`
      /**
       * @see Type Line 1
       * Line 2
       */
      export type Type = string;
    `;

    const { ctx: compilerContext, exportedSymbols, fileSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const classEntity = createTypeAliasEntity(compilerContext, symbol);

    const ctx = createRenderContext();

    it("should not render implicit constructors", () => {
      expect(classEntity).toBeDefined();
    });

  }

});
