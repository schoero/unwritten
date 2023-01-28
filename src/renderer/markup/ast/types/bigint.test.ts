import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler/enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderBigIntType } from "./bigint.js";

import type { BigIntType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", TypeKind.BigInt, () => {

  {

    // #region Type

    const type: Testable<BigIntType> = {
      kind: TypeKind.BigInt,
      name: "bigint"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = renderBigIntType(ctx, type as BigIntType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("bigint");
    });

  }

});
