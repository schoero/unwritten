import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { isAnchorNode, isConditionalNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { convertTypeReferenceTypeInline } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { TypeReferenceType } from "unwritten:interpreter/type-definitions/types.js";


scope("MarkupRenderer", TypeKind.TypeParameter, () => {

  {

    const testFileContent = ts`
      export type Type<T extends string> = T;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);

    const ctx = createRenderContext();
    const convertedTypeReferenceType = convertTypeReferenceTypeInline(ctx, typeAliasEntity.type as TypeReferenceType);

    it("should have the correct name", () => {
      assert(isConditionalNode(convertedTypeReferenceType));
      assert(isAnchorNode(convertedTypeReferenceType.trueChildren));
      expect(convertedTypeReferenceType.trueChildren.name).toBe("T");
    });

  }

});
