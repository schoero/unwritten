import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertUnknownType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { UnknownType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Unknown, () => {

  {

    // #region Type

    const type: Testable<UnknownType> = {
      kind: TypeKind.Unknown,
      name: "unknown"
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertUnknownType(ctx, type as UnknownType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("unknown");
    });

  }

});
