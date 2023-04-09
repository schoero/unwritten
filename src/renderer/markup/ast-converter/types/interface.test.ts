import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertInterfaceType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { InterfaceType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Interface, () => {

  {

    // #region Interface type with all possible members

    // #region Source

    // interface Interface {
    //   (): void;
    //   public static staticProp: string;
    //   protected protectedProp: string;
    //   new (): void;
    //   method(a: number): void;
    //   method(a: string): void;
    //   prop: string;
    //   funcProp: () => void;
    //   get getter(): string;
    //   set setter(value: string): void;
    // }
    // export type InterfaceType = Interface;

    // #endregion

    const type: Testable<InterfaceType> = {
      callSignatures: [
        {
          description: undefined,
          id: 4741,
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
            id: 25,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        }
      ],
      constructSignatures: [
        {
          description: undefined,
          id: 4742,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 5
          },
          returnType: {
            description: undefined,
            id: 25,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        }
      ],
      getters: [
        {
          id: 4466,
          kind: EntityKind.Getter,
          name: "getter",
          signatures: [
            {
              description: undefined,
              id: 4747,
              kind: EntityKind.Signature,
              modifiers: [],
              name: "getter",
              parameters: [],
              position: {
                column: 2,
                file: "/file.ts",
                line: 10
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
      id: 2861,
      isThis: false,
      kind: TypeKind.Interface,
      methods: [
        {
          id: 4471,
          kind: EntityKind.Method,
          name: "method",
          signatures: [
            {
              description: undefined,
              id: 4745,
              kind: EntityKind.Signature,
              modifiers: [],
              name: "method",
              parameters: [
                {
                  description: undefined,
                  id: 4461,
                  initializer: undefined,
                  kind: EntityKind.Parameter,
                  name: "a",
                  optional: false,
                  position: {
                    column: 9,
                    file: "/file.ts",
                    line: 6
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
                line: 6
              },
              returnType: {
                description: undefined,
                id: 25,
                kind: TypeKind.Void,
                name: "void"
              },
              typeParameters: undefined
            },
            {
              description: undefined,
              id: 4746,
              kind: EntityKind.Signature,
              modifiers: [],
              name: "method",
              parameters: [
                {
                  description: undefined,
                  id: 4462,
                  initializer: undefined,
                  kind: EntityKind.Parameter,
                  name: "a",
                  optional: false,
                  position: {
                    column: 9,
                    file: "/file.ts",
                    line: 7
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
                line: 7
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
      name: "Interface",
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
            "public",
            "static"
          ],
          name: "staticProp",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 3
          },
          type: {
            id: 16,
            kind: TypeKind.String,
            name: "string"
          }
        },
        {
          description: undefined,
          id: 4460,
          initializer: undefined,
          kind: EntityKind.Property,
          modifiers: [
            "protected"
          ],
          name: "protectedProp",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 4
          },
          type: {
            id: 16,
            kind: TypeKind.String,
            name: "string"
          }
        },
        {
          description: undefined,
          id: 4463,
          initializer: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "prop",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 8
          },
          type: {
            id: 16,
            kind: TypeKind.String,
            name: "string"
          }
        },
        {
          description: undefined,
          id: 4464,
          initializer: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "funcProp",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 9
          },
          type: {
            id: 2862,
            kind: TypeKind.Function,
            signatures: [
              {
                description: undefined,
                id: 4743,
                kind: EntityKind.Signature,
                modifiers: [],
                name: undefined,
                parameters: [],
                position: {
                  column: 12,
                  file: "/file.ts",
                  line: 9
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
        }
      ],
      setters: [
        {
          id: 4468,
          kind: EntityKind.Setter,
          name: "setter",
          signatures: [
            {
              description: undefined,
              id: 4748,
              kind: EntityKind.Signature,
              modifiers: [],
              name: "setter",
              parameters: [
                {
                  description: undefined,
                  id: 4467,
                  initializer: undefined,
                  kind: EntityKind.Parameter,
                  name: "value",
                  optional: false,
                  position: {
                    column: 13,
                    file: "/file.ts",
                    line: 11
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
                line: 11
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
      typeParameters: undefined
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertInterfaceType(ctx, type as InterfaceType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedType;

    it("should have one construct signature", () => {
      expect(constructSignatures.children).to.have.lengthOf(1);
    });

    it("should have one call signature", () => {
      expect(callSignatures.children).to.have.lengthOf(1);
    });

    it("should have 4 properties", () => {
      expect(properties.children).to.have.lengthOf(4);
    });

    it("should render modifiers correctly", () => {

      const modifiers = properties.children.map(prop => {
        return prop.children[1].children[1];
      });

      expect(modifiers[0]).to.include("static");
      expect(modifiers[1]).to.include("protected");

    });

    it("should have one method entity", () => {
      expect(methods.children).to.have.lengthOf(1);
    });

    it("should have one setter entity", () => {
      expect(setters.children).to.have.lengthOf(1);
    });

    it("should have one getter entity", () => {
      expect(getters.children).to.have.lengthOf(1);
    });

  }

});
