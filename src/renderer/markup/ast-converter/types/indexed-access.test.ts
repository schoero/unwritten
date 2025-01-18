import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertType } from "unwritten:renderer/markup/ast-converter/shared/type";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";

import type { IndexedAccessType } from "unwritten:interpreter:type-definitions/types";


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
