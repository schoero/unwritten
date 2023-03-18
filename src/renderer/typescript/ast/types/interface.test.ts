import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderInterfaceType } from "unwritten:renderer:typescript/ast/types/interface.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { InterfaceType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Interface, () => {

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

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderInterfaceType(ctx, type as InterfaceType);

    it("should be able to render interface types", () => {
      expect(renderedType).to.equal("Interface");
    });

  }

});
