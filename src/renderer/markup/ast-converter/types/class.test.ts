import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertClassType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ClassType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Class, () => {

  {

    // #region Type

    const type: Testable<ClassType> = {
      callSignatures: [],
      constructSignatures: [],
      getters: [],
      id: 2861,
      isThis: false,
      kind: TypeKind.Class,
      methods: [],
      name: "Class",
      position: {
        column: 0,
        file: "/file.ts",
        line: 1
      },
      properties: [],
      setters: []
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertClassType(ctx, type as ClassType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("Class");
    });

  }

});
