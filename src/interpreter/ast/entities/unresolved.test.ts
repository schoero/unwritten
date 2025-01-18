import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";
import { assert, expect, it } from "vitest";


scope("Interpreter", TypeKind.Unresolved, () => {

  {

    const testFileContent = ts`
      export type Unresolved = Symbol;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent, undefined, {
      interpreterConfig: {
        exclude: ["node_modules/**/*"]
      }
    });

    const exportedTypeAliasSymbol = exportedSymbols.find(s => s.name === "Unresolved")!;
    const exportedReferenceTypeAlias = createTypeAliasEntity(ctx, exportedTypeAliasSymbol);

    it("should create an unresolved type reference target if excluded specifically", () => {
      assert(exportedReferenceTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedReferenceTypeAlias.type.type!.kind).toBe(TypeKind.Unresolved);
    });

  }

});
