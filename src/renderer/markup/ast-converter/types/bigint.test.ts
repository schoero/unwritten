import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertBigIntType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { BigIntType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.BigInt, () => {

  {

    // #region Type

    const type: Testable<BigIntType> = {
      kind: TypeKind.BigInt,
      name: "bigint"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = convertBigIntType(ctx, type as BigIntType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("bigint");
    });

  }

});
