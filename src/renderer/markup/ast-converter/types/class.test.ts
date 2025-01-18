import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertClassTypeInline } from "unwritten:renderer:markup/ast-converter/types/index";
import { renderNode } from "unwritten:renderer:markup/html/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { isTypeReferenceType } from "unwritten:typeguards/types";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";

import type { ClassType } from "unwritten:interpreter:type-definitions/types";


scope("MarkupRenderer", TypeKind.Class, () => {

  {

    const testFileContent = ts`
      class Class {
      }
      export type Type = InstanceType<typeof Class>;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);

    assert(isTypeReferenceType(typeAliasEntity.type));

    const type = typeAliasEntity.type.type;
    const ctx = createRenderContext();

    const convertedType = convertClassTypeInline(ctx, type as ClassType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the name of the class", () => {
      expect(renderedType).toBe("Class");
    });

  }

});
