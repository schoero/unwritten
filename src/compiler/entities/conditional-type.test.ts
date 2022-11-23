import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", TypeKind.ConditionalType, () => {

  {

    const testFileContent = ts`
      export type ConditionalTypeAlias<T extends "number" | "string" = "number"> = T extends "string" ? string : number;
      export type ConditionalTypeImplementation = ConditionalTypeAlias<"string">;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const conditionalTypeAliasSymbol = exportedSymbols.find(s => s.name === "ConditionalTypeAlias")!;
    const conditionalTypeAlias = createTypeAliasBySymbol(ctx, conditionalTypeAliasSymbol);

    const conditionalTypeImplementationSymbol = exportedSymbols.find(s => s.name === "ConditionalTypeImplementation")!;
    const conditionalTypeImplementation = createTypeAliasBySymbol(ctx, conditionalTypeImplementationSymbol);

    it("should be able to parse conditional types", () => {
      expect(conditionalTypeAlias.type.kind).to.equal(TypeKind.ConditionalType);
    });

    it("should be able to resolve conditional types", () => {
      expect(conditionalTypeImplementation.type.kind).to.equal(TypeKind.String);
    });

  }

});
