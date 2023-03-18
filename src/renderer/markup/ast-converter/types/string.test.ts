import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertStringType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { StringType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.String, () => {

  {

    // #region Type

    const type: Testable<StringType> = {
      kind: TypeKind.String,
      name: "string"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedType = convertStringType(ctx, type as StringType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("string");
    });

  }

});
