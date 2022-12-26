import { expect, it } from "vitest";

import { createTypeAliasBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import { Kind, LiteralType } from "quickdoks:type-definitions/types.d.js";


scope("Compiler", Kind.StringLiteral, () => {

  {

    it("should be able to parse string literal types", () => {

      const testFileContent = ts`
        export type StringLiteralType = "Hello world";
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "StringLiteralType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      expect(exportedTypeAlias.type.kind).to.equal(Kind.StringLiteral);
      expect((exportedTypeAlias.type as LiteralType<Kind.StringLiteral>).value).to.equal("Hello world");

    });

  }

});
