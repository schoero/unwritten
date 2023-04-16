import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
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
      typeName,
      members
    ] = convertedType;

    const [
      constructSignature,
      callSignature,
      staticProp,
      protectedProp,
      prop,
      funcProp,
      method,
      methodOverload,
      setter,
      getter
    ] = members.children;

    it("should have the right amount of members", () => {
      expect(members.children.length).to.equal(10);
    });

    it("should have a matching type name", () => {
      expect(typeName).to.equal("object");
    });

    it("should have a matching construct signature", () => {
      expect(renderNode(ctx, constructSignature[0])).to.equal("new ()");
    });

    it("should have a matching call signature", () => {
      expect(renderNode(ctx, callSignature[0])).to.equal("()");
    });

    it("should have a matching static property", () => {
      expect(renderNode(ctx, staticProp[0])).to.equal("staticProp");
    });

    it("should have a matching protected property", () => {
      expect(renderNode(ctx, protectedProp[0])).to.equal("protectedProp");
    });

    it("should have a matching property", () => {
      expect(renderNode(ctx, prop[0])).to.equal("prop");
    });

    it("should have a matching function property", () => {
      expect(renderNode(ctx, funcProp[0])).to.equal("funcProp");
    });

    it("should have a matching method", () => {
      expect(renderNode(ctx, method[0])).to.equal("method(a)");
    });

    it("should have a matching method overload", () => {
      expect(renderNode(ctx, methodOverload[0])).to.equal("method(a)");
    });

    it("should have a matching setter", () => {
      expect(renderNode(ctx, setter[0])).to.equal("setter(value)");
    });

    it("should have a matching getter", () => {
      expect(renderNode(ctx, getter[0])).to.equal("getter()");
    });

  }

});
