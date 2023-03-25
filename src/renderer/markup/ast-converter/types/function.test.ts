import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { convertFunctionType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Function, () => {

  {

    // #region Normal function type

    const type: Testable<FunctionType> = {
      kind: TypeKind.Function,
      signatures: [
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 1,
            file: "/file.ts",
            line: 1
          },
          returnType: {
            description: undefined,
            kind: TypeKind.Boolean,
            name: "boolean"
          },
          typeParameters: undefined
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertFunctionType(ctx, type as FunctionType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render the function inline", () => {
      expect(renderedType).to.equal("() => boolean");
    });

  }

  {

    // #region Normal function type

    const type: Testable<FunctionType> = {
      kind: TypeKind.Function,
      signatures: [
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [
            {
              description: undefined,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 28,
                file: "/file.ts",
                line: 1
              },
              rest: false,
              type: {
                kind: TypeKind.String,
                name: "string"
              }
            },
            {
              description: undefined,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "b",
              optional: false,
              position: {
                column: 39,
                file: "/file.ts",
                line: 1
              },
              rest: false,
              type: {
                kind: TypeKind.Number,
                name: "number"
              }
            }
          ],
          position: {
            column: 27,
            file: "/file.ts",
            line: 1
          },
          returnType: {
            description: undefined,
            kind: TypeKind.Boolean,
            name: "boolean"
          },
          typeParameters: undefined
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertFunctionType(ctx, type as FunctionType);
    const renderedType = renderNode(ctx, convertedType);

    it("should render function parameters correctly", () => {
      expect(renderedType).to.equal("(a: string, b: number) => boolean");
    });

  }

});
