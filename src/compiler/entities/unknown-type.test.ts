import { expect, it } from "vitest";

import { createTypeAliasBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind } from "quickdoks:types:types.js";


scope("Compiler", Kind.Unknown, () => {

  it("should be able to handle unknown types", () => {

    const testFileContent = ts`
      export type UnknownType = unknown;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "UnknownType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    expect(exportedTypeAlias.type.kind).to.equal(Kind.Unknown);

  });

});
