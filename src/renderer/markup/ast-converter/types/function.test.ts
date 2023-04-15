import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { convertFunctionType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Function, () => {

  {

    // #region Normal function type

    // #region Source

    // export type FunctionType = () => boolean;

    // #endregion

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

    assert(Array.isArray(convertedType), "single signatures should not be wrapped in a list node");

    const [
      signature,
      position,
      tags,
      parametersAndReturnType,
      remarks,
      example
    ] = convertedType;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).to.equal("()");
    });

    it("should not have parameters", () => {
      expect(parametersAndReturnType.children.length).to.equal(1);
    });

    it("should render the return type correctly", () => {
      expect(parametersAndReturnType.children[0]).to.include("Returns:");
      expect(parametersAndReturnType.children[0]).to.include("boolean");
    });

  }

  {

    // #region Normal function type with parameters

    // #region Source

    // export type FunctionType = (a: string, b: number) => boolean;

    // #endregion

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

    assert(Array.isArray(convertedType), "single signatures should not be wrapped in a list node");

    const [
      signature,
      position,
      tags,
      parametersAndReturnType,
      remarks,
      example
    ] = convertedType;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).to.equal("(a, b)");
    });

    it("should have two matching parameters", () => {
      expect(parametersAndReturnType.children.length).to.equal(1 + 2);
      expect(parametersAndReturnType.children[0]).to.include("a");
      expect(parametersAndReturnType.children[0]).to.include("string");
      expect(parametersAndReturnType.children[1]).to.include("b");
      expect(parametersAndReturnType.children[1]).to.include("number");
    });

    it("should render the return type correctly", () => {
      expect(parametersAndReturnType.children[2]).to.include("Returns:");
      expect(parametersAndReturnType.children[2]).to.include("boolean");
    });

  }

  {

    // #region function type with overloaded signatures

    // #region Source

    // /**
    //  * Adds two numbers together.
    //  *
    //  * @param a The first number.
    //  * @param b The second number.
    //  * @returns The sum of the two numbers.
    //  */
    // (a: number, b: number): number;
    // /**
    //  * Adds 3 numbers together.
    //  *
    //  * @param a The first number.
    //  * @param b The second number.
    //  * @param c The third number.
    //  * @returns The sum of the 3 numbers.
    //  */
    // (a: number, b: number, c: number): number;

    // #endregion

    const type: Testable<FunctionType> = {
      id: 2861,
      kind: TypeKind.Function,
      signatures: [
        {
          description: "Adds two numbers together.",
          id: 4741,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [
            {
              description: "The first number.",
              id: 4458,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 3,
                file: "/file.ts",
                line: 9
              },
              rest: false,
              type: {
                id: 17,
                kind: TypeKind.Number,
                name: "number"
              }
            },
            {
              description: "The second number.",
              id: 4459,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "b",
              optional: false,
              position: {
                column: 14,
                file: "/file.ts",
                line: 9
              },
              rest: false,
              type: {
                id: 17,
                kind: TypeKind.Number,
                name: "number"
              }
            }
          ],
          position: {
            column: 2,
            file: "/file.ts",
            line: 9
          },
          returnType: {
            description: "The sum of the two numbers.",
            id: 17,
            kind: TypeKind.Number,
            name: "number"
          },
          typeParameters: undefined
        },
        {
          description: "Adds 3 numbers together.",
          id: 4742,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [
            {
              description: "The first number.",
              id: 4460,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 3,
                file: "/file.ts",
                line: 18
              },
              rest: false,
              type: {
                id: 17,
                kind: TypeKind.Number,
                name: "number"
              }
            },
            {
              description: "The second number.",
              id: 4461,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "b",
              optional: false,
              position: {
                column: 14,
                file: "/file.ts",
                line: 18
              },
              rest: false,
              type: {
                id: 17,
                kind: TypeKind.Number,
                name: "number"
              }
            },
            {
              description: "The third number.",
              id: 4462,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "c",
              optional: false,
              position: {
                column: 25,
                file: "/file.ts",
                line: 18
              },
              rest: false,
              type: {
                id: 17,
                kind: TypeKind.Number,
                name: "number"
              }
            }
          ],
          position: {
            column: 2,
            file: "/file.ts",
            line: 18
          },
          returnType: {
            description: "The sum of the 3 numbers.",
            id: 17,
            kind: TypeKind.Number,
            name: "number"
          },
          typeParameters: undefined
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertFunctionType(ctx, type as FunctionType);

    assert(!Array.isArray(convertedType), "multiple signatures should be wrapped in a list node");
    const [
      [
        signature,
        position,
        tags,
        parametersAndReturnType,
        remarks,
        example
      ], [
        signature2,
        position2,
        tags2,
        parametersAndReturnType2,
        remarks2,
        example2
      ]
    ] = convertedType.children as any;

    it("should render the function signature correctly", () => {
      expect(renderNode(ctx, signature)).to.equal("(a, b)");
      expect(renderNode(ctx, signature2)).to.equal("(a, b, c)");
    });

    it("should have matching parameters in each signature", () => {
      expect(parametersAndReturnType.children.length).to.equal(1 + 2);
      expect(parametersAndReturnType.children[0]).to.include("a");
      expect(parametersAndReturnType.children[0]).to.include("number");
      expect(parametersAndReturnType.children[1]).to.include("b");
      expect(parametersAndReturnType.children[1]).to.include("number");

      expect(parametersAndReturnType2.children.length).to.equal(1 + 3);
      expect(parametersAndReturnType2.children[0]).to.include("a");
      expect(parametersAndReturnType2.children[0]).to.include("number");
      expect(parametersAndReturnType2.children[1]).to.include("b");
      expect(parametersAndReturnType2.children[1]).to.include("number");
      expect(parametersAndReturnType2.children[2]).to.include("c");
      expect(parametersAndReturnType2.children[2]).to.include("number");
    });

    it("should render the return type correctly for each signature", () => {
      expect(parametersAndReturnType.children[2]).to.include("Returns:");
      expect(parametersAndReturnType.children[2]).to.include("number");

      expect(parametersAndReturnType2.children[3]).to.include("Returns:");
      expect(parametersAndReturnType2.children[3]).to.include("number");
    });

  }

});
