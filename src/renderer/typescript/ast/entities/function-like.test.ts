import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { renderFunctionLikeEntity } from "unwritten:renderer:typescript/ast/entities/function-like.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { splitJSDocAndDeclaration } from "unwritten:tests:utils/jsdoc.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { FunctionEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.Function, () => {

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

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);
    const renderConfig = getRenderConfig(ctx);

    const renderedFunction = renderFunctionLikeEntity(ctx, testFunction as FunctionEntity);
    const renderedLines = renderedFunction.split(renderNewLine(ctx));

    const [[renderedJSDocLines], [renderedSignatureLines]] = splitJSDocAndDeclaration(renderedLines);

    it("should have a matching JSDoc lines", () => {
      expect(renderedJSDocLines).to.have.lengthOf(9);
    });

    it("should have only one signature", () => {
      expect(renderedSignatureLines).to.have.lengthOf(1);
      expect(renderedSignatureLines[0]).to.equal("testFunction(): void;");
    });

  }

  {

    // #region Overloads

    // #region Source

    // /**
    //  * Function description
    //  *
    //  * @param a First number
    //  * @param b Second number
    //  * @returns The sum of the two numbers
    //  */
    // export function add(a: number, b: number): number;
    // /**
    //  * Function description
    //  *
    //  * @param a First number
    //  * @param b Second number
    //  * @param c Third number
    //  * @returns The sum of the three numbers
    //  */
    // export function add(a: number, b: number, c: number): number;
    // export function add(a: number, b: number, c?: number): number {
    //   return a + b + (c ?? 0);
    // }

    // #endregion

    const testFunction: Testable<FunctionEntity> = {
      id: 4467,
      kind: EntityKind.Function,
      name: "add",
      signatures: [
        {
          description: "Function description",
          id: 4741,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "add",
          parameters: [
            {
              description: "First number",
              id: 4458,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 20,
                file: "/file.ts",
                line: 8
              },
              rest: false,
              type: {
                id: 17,
                kind: TypeKind.Number,
                name: "number"
              }
            },
            {
              description: "Second number",
              id: 4459,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "b",
              optional: false,
              position: {
                column: 31,
                file: "/file.ts",
                line: 8
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
            column: 0,
            file: "/file.ts",
            line: 8
          },
          returnType: {
            description: "The sum of the two numbers",
            id: 17,
            kind: TypeKind.Number,
            name: "number"
          },
          typeParameters: undefined
        },
        {
          description: "Function description",
          id: 4742,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "add",
          parameters: [
            {
              description: "First number",
              id: 4463,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 20,
                file: "/file.ts",
                line: 17
              },
              rest: false,
              type: {
                id: 17,
                kind: TypeKind.Number,
                name: "number"
              }
            },
            {
              description: "Second number",
              id: 4464,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "b",
              optional: false,
              position: {
                column: 31,
                file: "/file.ts",
                line: 17
              },
              rest: false,
              type: {
                id: 17,
                kind: TypeKind.Number,
                name: "number"
              }
            },
            {
              description: "Third number",
              id: 4465,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "c",
              optional: false,
              position: {
                column: 42,
                file: "/file.ts",
                line: 17
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
            column: 0,
            file: "/file.ts",
            line: 17
          },
          returnType: {
            description: "The sum of the three numbers",
            id: 17,
            kind: TypeKind.Number,
            name: "number"
          },
          typeParameters: undefined
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedFunction = renderFunctionLikeEntity(ctx, testFunction as FunctionEntity);
    const renderedLines = renderedFunction.split(renderNewLine(ctx));

    const [renderedJSDocLines, renderedSignatureLines] = splitJSDocAndDeclaration(renderedLines);

    it("should have matching JSDoc lines", () => {
      expect(renderedJSDocLines[0]).to.have.lengthOf(7);
      expect(renderedJSDocLines[1]).to.have.lengthOf(8);
    });

    it("should have multiple signatures", () => {
      expect(renderedSignatureLines).to.have.lengthOf(2);
      expect(renderedSignatureLines[0][0]).to.equal("add(a: number, b: number): number;");
      expect(renderedSignatureLines[1][0]).to.equal("add(a: number, b: number, c: number): number;");
    });

  }

});
