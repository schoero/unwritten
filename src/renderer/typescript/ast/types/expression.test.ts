import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderExpressionType } from "unwritten:renderer/typescript/ast/types/expression.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ExpressionType } from "unwritten:interpreter/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Expression, () => {

  {

    // #region Type

    const type: Testable<ExpressionType> = {
      id: 4455,
      instanceType: {
        callSignatures: [],
        constructSignatures: [],
        getters: [],
        id: 2611,
        isThis: false,
        kind: TypeKind.Interface,
        methods: [],
        name: "Base",
        position: {
          column: 0,
          file: "/file.ts",
          line: 1
        },
        properties: [
          {
            description: undefined,
            id: 4053,
            kind: EntityKind.Property,
            modifiers: [],
            name: "prop",
            optional: false,
            position: {
              column: 2,
              file: "/file.ts",
              line: 2
            },
            type: {
              id: 15,
              kind: TypeKind.String,
              name: "string"
            }
          }
        ],
        setters: [],
        typeParameters: undefined
      },
      kind: TypeKind.Expression,
      name: "Base",
      staticType: {
        callSignatures: [],
        constructSignatures: [],
        getters: [],
        id: 2611,
        isThis: false,
        kind: TypeKind.Interface,
        methods: [],
        name: "Base",
        position: {
          column: 0,
          file: "/file.ts",
          line: 1
        },
        properties: [
          {
            description: undefined,
            id: 4053,
            kind: EntityKind.Property,
            modifiers: [],
            name: "prop",
            optional: false,
            position: {
              column: 2,
              file: "/file.ts",
              line: 2
            },
            type: {
              id: 15,
              kind: TypeKind.String,
              name: "string"
            }
          }
        ],
        setters: [],
        typeParameters: undefined
      },
      typeArguments: undefined
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderExpressionType(ctx, type as ExpressionType);

    it("should be able to render expression types", () => {
      expect(renderedType).to.equal("Base");
    });

  }

});
