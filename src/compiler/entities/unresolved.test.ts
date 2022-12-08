import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:/utils/compile.js";
import { scope } from "quickdoks:tests:/utils/scope.js";
import { ts } from "quickdoks:tests:/utils/template.js";
import { Kind, TypeReference } from "quickdoks:types:types.js";

import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.Unresolved, () => {

  {

    const testFileContent = ts`
      export type Unresolved = Symbol;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent, undefined, {
      compilerConfig: {
        exclude: ["node_modules/**/*"]
      }
    });

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "Unresolved")!;
    const exportedReferenceTypeAlias = createTypeAliasBySymbol(ctx, exportedTypeAliasSymbol);

    it("should export a type alias, which is a type reference to another type alias", () => {
      expect(exportedReferenceTypeAlias.kind).toBe(Kind.TypeAlias);
      expect(exportedReferenceTypeAlias.type.kind).toBe(Kind.TypeReference);
      expect((exportedReferenceTypeAlias.type as TypeReference).type).to.not.equal(undefined);
      expect((exportedReferenceTypeAlias.type as TypeReference).type!.kind).to.equal(Kind.Unresolved);
    });

  }

});
