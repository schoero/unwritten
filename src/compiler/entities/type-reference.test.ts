import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind, TypeReference } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", TypeKind.TypeReference, () => {

  {

    const testFileContent = ts`
      export type A = string;
      export type Reference = A;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "Reference")!;
    const exportedReferenceTypeAlias = createTypeAliasBySymbol(ctx, exportedTypeAliasSymbol);

    it("should be able to parse a type reference", () => {
      expect(exportedReferenceTypeAlias.kind).toBe(TypeKind.TypeAlias);
      expect(exportedReferenceTypeAlias.type.kind).toBe(TypeKind.TypeReference);
    });

    it("should have a matching name", () => {
      expect((exportedReferenceTypeAlias.type as TypeReference).name).to.equal("A");
    });

    it("should have a matching type", () => {
      expect((exportedReferenceTypeAlias.type as TypeReference).type).to.not.equal(undefined);
      expect((exportedReferenceTypeAlias.type as TypeReference).type!.kind).to.equal(TypeKind.String);
    });

  }

});
