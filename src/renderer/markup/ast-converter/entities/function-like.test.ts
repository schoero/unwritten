import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import {
  convertFunctionLikeEntityForDocumentation,
  convertFunctionLikeEntityForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { FunctionEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", EntityKind.Function, () => {

  {

    // #region Entity

    const testFunction: Testable<FunctionEntity> = {
      kind: EntityKind.Function,
      name: "testFunction",
      signatures: [
        {
          beta: undefined,
          description: "Function description",
          example: "testFunction();",
          kind: EntityKind.Signature,
          name: "testFunction",
          parameters: [],
          position: {
            column: 4,
            file: "/file.ts",
            line: 9
          },
          remarks: "This is a remark",
          returnType: {
            description: "Returns nothing",
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: []
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedFunctionForTableOfContents = convertFunctionLikeEntityForTableOfContents(ctx, testFunction as FunctionEntity);
    const renderedFunctionForDocumentation = convertFunctionLikeEntityForDocumentation(ctx, testFunction as FunctionEntity);

    it("should have only one signature", () => {
      expect(renderedFunctionForTableOfContents.children).to.have.lengthOf(1);
      expect(renderedFunctionForDocumentation.children).to.have.lengthOf(1);
    });

  }

  {

    // #region Overloads

    const testFunction: Testable<FunctionEntity> = {
      kind: EntityKind.Function,
      name: "add",
      signatures: [
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "add",
          parameters: [
            {
              description: undefined,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 20,
                file: "/file.ts",
                line: 1
              },
              rest: false,
              type: {
                kind: TypeKind.Number,
                name: "number"
              }
            },
            {
              description: undefined,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "b",
              optional: false,
              position: {
                column: 31,
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
            column: 0,
            file: "/file.ts",
            line: 1
          },
          returnType: {
            description: undefined,
            kind: TypeKind.Number,
            name: "number"
          },
          typeParameters: undefined
        },
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "add",
          parameters: [
            {
              description: undefined,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 20,
                file: "/file.ts",
                line: 2
              },
              rest: false,
              type: {
                kind: TypeKind.Number,
                name: "number"
              }
            },
            {
              description: undefined,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "b",
              optional: false,
              position: {
                column: 31,
                file: "/file.ts",
                line: 2
              },
              rest: false,
              type: {
                kind: TypeKind.Number,
                name: "number"
              }
            },
            {
              description: undefined,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "c",
              optional: false,
              position: {
                column: 42,
                file: "/file.ts",
                line: 2
              },
              rest: false,
              type: {
                kind: TypeKind.Number,
                name: "number"
              }
            }
          ],
          position: {
            column: 0,
            file: "/file.ts",
            line: 2
          },
          returnType: {
            description: undefined,
            kind: TypeKind.Number,
            name: "number"
          },
          typeParameters: undefined
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedFunctionForTableOfContents = convertFunctionLikeEntityForTableOfContents(ctx, testFunction as FunctionEntity);
    const renderedFunctionForDocumentation = convertFunctionLikeEntityForDocumentation(ctx, testFunction as FunctionEntity);

    it("should have multiple signatures", () => {
      expect(renderedFunctionForTableOfContents.children).to.have.lengthOf(2);
      expect(renderedFunctionForDocumentation.children).to.have.lengthOf(2);
    });

  }

});
