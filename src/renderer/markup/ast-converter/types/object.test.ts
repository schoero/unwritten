import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertObjectType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ObjectType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Interface, () => {

  {

    // #region Extended classes will have the Object type kind

    // #region Source

    // class BaseClass {
    //   public instanceProperty: string | undefined;
    //   public static staticProperty: string | undefined;
    //   public method(): void {}
    //   public get getter(): string { return ""; }
    //   public set setter(value: string): void {}
    // }
    // export class Class extends BaseClass {
    // }

    // #endregion

    const type: Testable<ObjectType> = {
      callSignatures: [],
      constructSignatures: [],
      getters: [
        {
          id: 4461,
          kind: EntityKind.Getter,
          name: "getter",
          signatures: [
            {
              description: undefined,
              id: 4743,
              kind: EntityKind.Signature,
              modifiers: [
                "public"
              ],
              name: "getter",
              parameters: [],
              position: {
                column: 2,
                file: "/file.ts",
                line: 5
              },
              returnType: {
                description: undefined,
                id: 16,
                kind: TypeKind.String,
                name: "string"
              },
              typeParameters: undefined
            }
          ]
        }
      ],
      id: 2870,
      isThis: false,
      kind: TypeKind.Object,
      methods: [
        {
          id: 4466,
          kind: EntityKind.Method,
          name: "method",
          signatures: [
            {
              description: undefined,
              id: 4747,
              kind: EntityKind.Signature,
              modifiers: [
                "public"
              ],
              name: "method",
              parameters: [],
              position: {
                column: 2,
                file: "/file.ts",
                line: 4
              },
              returnType: {
                description: undefined,
                id: 25,
                kind: TypeKind.Void,
                name: "void"
              },
              typeParameters: undefined
            }
          ]
        }
      ],
      name: "BaseClass",
      position: {
        column: 0,
        file: "/file.ts",
        line: 1
      },
      properties: [
        {
          description: undefined,
          id: 4459,
          initializer: undefined,
          kind: EntityKind.Property,
          modifiers: [
            "public"
          ],
          name: "instanceProperty",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 2
          },
          type: {
            id: 16,
            kind: TypeKind.String,
            name: "string"
          }
        }
      ],
      setters: [
        {
          id: 4463,
          kind: EntityKind.Setter,
          name: "setter",
          signatures: [
            {
              description: undefined,
              id: 4748,
              kind: EntityKind.Signature,
              modifiers: [
                "public"
              ],
              name: "setter",
              parameters: [
                {
                  description: undefined,
                  id: 4462,
                  initializer: undefined,
                  kind: EntityKind.Parameter,
                  name: "value",
                  optional: false,
                  position: {
                    column: 20,
                    file: "/file.ts",
                    line: 6
                  },
                  rest: false,
                  type: {
                    id: 16,
                    kind: TypeKind.String,
                    name: "string"
                  }
                }
              ],
              position: {
                column: 2,
                file: "/file.ts",
                line: 6
              },
              returnType: {
                description: undefined,
                id: 25,
                kind: TypeKind.Void,
                name: "void"
              },
              typeParameters: undefined
            }
          ]
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertObjectType(ctx, type as ObjectType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedType.children;

    it("should have no construct signature", () => {
      expect(constructSignatures).to.have.lengthOf(0);
    });

    it("should have no call signature", () => {
      expect(callSignatures).to.have.lengthOf(0);
    });

    it("should have 4 properties", () => {
      expect(properties).to.have.lengthOf(1);
    });

    it("should have one method entity", () => {
      expect(methods).to.have.lengthOf(1);
    });

    it("should have one setter entity", () => {
      expect(setters).to.have.lengthOf(1);
    });

    it("should have one getter entity", () => {
      expect(getters).to.have.lengthOf(1);
    });

  }

});
