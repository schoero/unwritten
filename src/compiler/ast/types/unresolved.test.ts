import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:compiler:entities";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", TypeKind.Unresolved, () => {

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
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should export a type alias, which is a type reference to another type alias", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedReferenceTypeAlias.type.type).to.not.equal(undefined);
      expect(exportedReferenceTypeAlias.type.type!.kind).to.equal(TypeKind.Unresolved);
    });

  }

});
