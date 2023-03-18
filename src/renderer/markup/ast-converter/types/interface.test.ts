import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertInterfaceType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { InterfaceType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Interface, () => {

  {

    // #region Type

    const type: Testable<InterfaceType> = {
      callSignatures: [],
      constructSignatures: [],
      getters: [],
      id: 2611,
      isThis: false,
      kind: TypeKind.Interface,
      methods: [],
      name: "Interface",
      position: {
        column: 0,
        file: "/file.ts",
        line: 1
      },
      properties: [],
      setters: [],
      typeParameters: undefined
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertInterfaceType(ctx, type as InterfaceType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the name of the type", () => {
      expect(renderedType).to.equal("Interface");
    });

  }

});
