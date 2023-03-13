import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler/enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderFunctionType } from "unwritten:renderer/typescript/ast/types/function.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { FunctionType } from "unwritten:compiler/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Function, () => {

  {

    // #region Type

    const type: Testable<FunctionType> = {
      id: 2611,
      kind: TypeKind.Function,
      signatures: [
        {
          description: undefined,
          id: 4456,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 2
          },
          returnType: {
            description: undefined,
            id: 15,
            kind: TypeKind.String,
            name: "string"
          },
          typeParameters: undefined
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderFunctionType(ctx, type as FunctionType);

    it("should be able to render function types", () => {
      expect(renderedType).to.equal("(): string");
    });

  }

});
