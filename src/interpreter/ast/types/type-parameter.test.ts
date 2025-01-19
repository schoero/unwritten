import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


scope("Interpreter", TypeKind.TypeParameter, () => {

  {

    const testFileContent = ts`
      export type GenericTypeAlias<T> = T;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "GenericTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse type parameter types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.typeParameters).toHaveLength(1);
      expect(exportedTypeAlias.type.type).toBeDefined();
      assert(exportedTypeAlias.type.type!.kind === TypeKind.TypeParameter);
      expect(exportedTypeAlias.type.type.name).toBe("T");
    });

  }

});
