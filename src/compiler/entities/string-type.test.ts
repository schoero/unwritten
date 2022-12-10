import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind } from "quickdoks:types:types.js";

import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.String, () => {

  it("should be able to handle string types", () => {

    const testFileContent = ts`
      export type StringType = string;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "StringType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    expect(exportedTypeAlias.type.kind).to.equal(Kind.String);

  });

});
