import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertTypeReferenceTypeInline } from "unwritten:renderer:markup/ast-converter/types/index";
import { isAnchorNode, isConditionalNode } from "unwritten:renderer/markup/typeguards/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";

import type { TypeReferenceType } from "unwritten:interpreter:type-definitions/types";


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
