import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind, TypeReference } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", TypeKind.TypeReference, () => {

  {

    const testFileContent = ts`
      type A = string;
      export type Reference = A;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "Reference")!;
    const exportedReferenceTypeAlias = createTypeAliasBySymbol(ctx, exportedTypeAliasSymbol);

    it("should export a type alias, which is a type reference to another type alias", () => {
      expect(exportedReferenceTypeAlias.kind).toBe(TypeKind.TypeAlias);
      expect(exportedReferenceTypeAlias.type.kind).toBe(TypeKind.TypeReference);
      expect((exportedReferenceTypeAlias.type as TypeReference).target).to.not.equal(undefined);
      expect((exportedReferenceTypeAlias.type as TypeReference).target!.kind).to.equal(TypeKind.TypeAlias);
    });

  }

});
