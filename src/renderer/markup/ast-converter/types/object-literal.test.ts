import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertObjectLiteralType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ObjectLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.ObjectLiteral, () => {

  {

    // #region object literal type with all possible properties

    // #region Source

    // export const objectLiteral = {
    //   prop: "hello",
    //   funcProp: () => { },
    //   method() {},
    //   get getter() { return "hello"; },
    //   set setter(value: string) { }
    // };

    // #endregion

    const type: Testable<ObjectLiteralType> = {
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
              id: 4745,
              kind: EntityKind.Signature,
              modifiers: [],
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
      id: 2866,
      isThis: false,
      kind: TypeKind.ObjectLiteral,
      methods: [
        {
          id: 4465,
          kind: EntityKind.Method,
          name: "method",
          signatures: [
            {
              description: undefined,
              id: 4743,
              kind: EntityKind.Signature,
              modifiers: [],
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
      name: "__object",
      position: {
        column: 29,
        file: "/file.ts",
        line: 1
      },
      properties: [
        {
          description: undefined,
          id: 4466,
          initializer: {
            id: 2861,
            kind: TypeKind.StringLiteral,
            name: "string",
            value: "hello"
          },
          kind: EntityKind.Property,
          modifiers: [],
          name: "prop",
          optional: undefined,
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
        },
        {
          description: undefined,
          id: 4467,
          initializer: {
            id: 2863,
            kind: TypeKind.Function,
            signatures: [
              {
                description: undefined,
                id: 4742,
                kind: EntityKind.Signature,
                modifiers: [],
                name: "funcProp",
                parameters: [],
                position: {
                  column: 12,
                  file: "/file.ts",
                  line: 3
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
          },
          kind: EntityKind.Property,
          modifiers: [],
          name: "funcProp",
          optional: undefined,
          position: {
            column: 2,
            file: "/file.ts",
            line: 3
          },
          type: {
            id: 2863,
            kind: TypeKind.Function,
            signatures: [
              {
                description: undefined,
                id: 4742,
                kind: EntityKind.Signature,
                modifiers: [],
                name: "funcProp",
                parameters: [],
                position: {
                  column: 12,
                  file: "/file.ts",
                  line: 3
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
          id: 4463,
          kind: EntityKind.Setter,
          name: "setter",
          signatures: [
            {
              description: undefined,
              id: 4746,
              kind: EntityKind.Signature,
              modifiers: [],
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
                    column: 13,
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

    const convertedType = convertObjectLiteralType(ctx, type as ObjectLiteralType);

    const [
      typeName,
      members
    ] = convertedType;

    const [
      prop,
      funcProp,
      method,
      setters,
      getter
    ] = members.children;

    it("should have a matching type name", () => {
      expect(typeName).to.equal("object");
    });

    it("should have the right amount of members", () => {
      expect(members.children).to.have.lengthOf(5);
    });

    it("should have a matching property", () => {
      expect(renderNode(ctx, prop[0])).to.equal("prop");
    });

    it("should have a matching function property", () => {
      expect(renderNode(ctx, funcProp[0])).to.equal("funcProp");
    });

    it("should have a matching method", () => {
      expect(renderNode(ctx, method[0])).to.equal("method()");
    });

    it("should have a matching setter", () => {
      expect(renderNode(ctx, setters[0])).to.equal("setter(value)");
    });

    it("should have a matching getter", () => {
      expect(renderNode(ctx, getter[0])).to.equal("getter()");
    });

  }

});
