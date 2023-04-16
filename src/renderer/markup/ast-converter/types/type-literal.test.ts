import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertTypeLiteralType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { TypeLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.TypeLiteral, () => {

  {

    // #region type literal with all possible members

    // #region Source

    // export type TypeLiteral = {
    //   new (): {};
    //   (): boolean;
    //   prop: string;
    //   funcProp: () => void;
    //   method(): void;
    //   get getter(): string;
    //   set setter(value: string);
    // };

    // #endregion

    const type: Testable<TypeLiteralType> = {
      callSignatures: [
        {
          description: undefined,
          id: 4744,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 3
          },
          returnType: {
            description: undefined,
            id: 23,
            kind: TypeKind.Boolean,
            name: "boolean"
          },
          typeParameters: undefined
        }
      ],
      constructSignatures: [
        {
          description: undefined,
          id: 4745,
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
            callSignatures: [],
            constructSignatures: [],
            description: undefined,
            getters: [],
            id: 39,
            isThis: false,
            kind: TypeKind.TypeLiteral,
            methods: [],
            name: "__type",
            position: undefined,
            properties: [],
            setters: []
          },
          typeParameters: undefined
        }
      ],
      getters: [
        {
          id: 4462,
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
                line: 7
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
      id: 2862,
      isThis: false,
      kind: TypeKind.TypeLiteral,
      methods: [
        {
          id: 4468,
          kind: EntityKind.Method,
          name: "method",
          signatures: [
            {
              description: undefined,
              id: 4746,
              kind: EntityKind.Signature,
              modifiers: [],
              name: "method",
              parameters: [],
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
      ],
      name: "__type",
      position: {
        column: 26,
        file: "/file.ts",
        line: 1
      },
      properties: [
        {
          description: undefined,
          id: 4459,
          initializer: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "prop",
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
          id: 4460,
          initializer: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "funcProp",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 5
          },
          type: {
            id: 2861,
            kind: TypeKind.Function,
            signatures: [
              {
                description: undefined,
                id: 4742,
                kind: EntityKind.Signature,
                modifiers: [],
                name: undefined,
                parameters: [],
                position: {
                  column: 12,
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
            ]
          }
        }
      ],
      setters: [
        {
          id: 4464,
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
                  id: 4463,
                  initializer: undefined,
                  kind: EntityKind.Parameter,
                  name: "value",
                  optional: false,
                  position: {
                    column: 13,
                    file: "/file.ts",
                    line: 8
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
                line: 8
              },
              returnType: {
                description: undefined,
                id: 1,
                kind: TypeKind.Any,
                name: "any"
              },
              typeParameters: undefined
            }
          ]
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertTypeLiteralType(ctx, type as TypeLiteralType);

    const [
      typeName,
      members
    ] = convertedType;

    const [
      constructSignature,
      callSignature,
      prop,
      funcProp,
      method,
      setters,
      getter
    ] = members.children;

    it("should have the right amount of members", () => {
      expect(members.children).toHaveLength(7);
    });

    it("should have a matching type name", () => {
      expect(typeName).toEqual("object");
    });

    it("should have a matching construct signature", () => {
      expect(renderNode(ctx, constructSignature[0])).toEqual("new ()");
    });

    it("should have a matching call signature", () => {
      expect(renderNode(ctx, callSignature[0])).toEqual("()");
    });

    it("should have a matching property", () => {
      expect(renderNode(ctx, prop[0])).toEqual("prop");
    });

    it("should have a matching function property", () => {
      expect(renderNode(ctx, funcProp[0])).toEqual("funcProp");
    });

    it("should have a matching method", () => {
      expect(renderNode(ctx, method[0])).toEqual("method()");
    });

    it("should have a matching setter", () => {
      expect(renderNode(ctx, setters[0])).toEqual("setter(value)");
    });

    it("should have a matching getter", () => {
      expect(renderNode(ctx, getter[0])).toEqual("getter()");
    });

  }

});
