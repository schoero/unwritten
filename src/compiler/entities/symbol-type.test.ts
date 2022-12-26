import { expect, it } from "vitest";

import { createTypeAliasBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import { Kind } from "quickdoks:type-definitions/types.d.js";


scope("Compiler", Kind.Symbol, () => {

  it("should be able to handle symbol types", () => {

    const testFileContent = ts`
      export type SymbolType = symbol;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "SymbolType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    expect(exportedTypeAlias.type.kind).to.equal(Kind.Symbol);

  });

});
