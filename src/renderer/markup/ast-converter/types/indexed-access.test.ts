import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { IndexedAccessType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.IndexedAccess, () => {

  {

    const testFileContent = ts`
      type Prop = string;
      type Type = { prop: Prop; };
      export type IndexedAccessType = Type["prop"];
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "IndexedAccessType")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const { inlineType, multilineType } = convertType(ctx, type as IndexedAccessType);

    it("should render the resulting type", () => {
      expect(inlineType).toBe("string");
    });

  }

});
