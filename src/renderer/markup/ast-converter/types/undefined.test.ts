import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertUndefinedType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { UndefinedType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Undefined, () => {

  {

    // #region Type

    const type: Testable<UndefinedType> = {
      kind: TypeKind.Undefined,
      name: "undefined"
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertUndefinedType(ctx, type as UndefinedType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("undefined");
    });

  }

});
