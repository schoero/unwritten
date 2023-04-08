import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertTypeLiteralType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { TypeLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.TypeLiteral, () => {

  {

    // #region Simple type literal

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

    it("should have two properties", () => {
      expect(properties.children).to.have.lengthOf(2);
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
