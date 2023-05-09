import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertIndexedAccessType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { IndexedAccessType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.IndexedAccess, () => {

  {

    const testFileContent = ts`
      type Type = { prop: string; };
      export type IndexedAccessType = Type["prop"];
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "IndexedAccessType")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertIndexedAccessType(ctx, type as IndexedAccessType);

    it("should render the resulting type", () => {
      expect(convertedType).to.equal("string");
    });

  }

});
