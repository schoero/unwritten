import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertClassType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isTypeReferenceType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { ClassType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Class, () => {

  {

    const testFileContent = ts`
      class Class {
      }
      export type Type = InstanceType<typeof Class>;
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);

    assert(isTypeReferenceType(typeAliasEntity.type));

    const type = typeAliasEntity.type.type;
    const ctx = createRenderContext();

    const convertedType = convertClassType(ctx, type as ClassType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("class");
    });

  }

});
