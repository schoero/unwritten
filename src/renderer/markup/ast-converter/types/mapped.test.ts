import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertMappedType } from "unwritten:renderer/markup/ast-converter/types/mapped.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { MappedType } from "unwritten:interpreter:type-definitions/types.js";
import type { ASTNodes } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Mapped, () => {

  {

    // #region Simple mapped type

    // #region Source

    // export type MappedTypeLiteral = {
    //   readonly [K in "A" | "B"]?: K extends "A" ? "a" : "b";
    // };

    // #endregion

    const type: Testable<MappedType> = {
      id: 4745,
      kind: TypeKind.Mapped,
      optional: true,
      position: {
        column: 32,
        file: "/file.ts",
        line: 1
      },
      properties: [
        {
          id: 4461,
          kind: EntityKind.Property,
          name: "A",
          type: {
            id: 2869,
            kind: TypeKind.StringLiteral,
            name: "string",
            value: "a"
          }
        },
        {
          id: 4462,
          kind: EntityKind.Property,
          name: "B",
          type: {
            id: 2871,
            kind: TypeKind.StringLiteral,
            name: "string",
            value: "b"
          }
        }
      ],
      readonly: true,
      typeParameter: {
        constraint: {
          id: 2865,
          kind: TypeKind.Union,
          types: [
            {
              id: 2861,
              kind: TypeKind.StringLiteral,
              name: "string",
              value: "A"
            },
            {
              id: 2863,
              kind: TypeKind.StringLiteral,
              name: "string",
              value: "B"
            }
          ]
        },
        description: undefined,
        id: 4458,
        initializer: undefined,
        kind: EntityKind.TypeParameter,
        name: "K",
        position: {
          column: 12,
          file: "/file.ts",
          line: 2
        }
      },
      valueType: {
        checkType: {
          id: 4744,
          kind: TypeKind.TypeReference,
          name: "K",
          symbolId: 4458,
          type: {
            constraint: {
              id: 2865,
              kind: TypeKind.Union,
              types: [
                {
                  id: 2861,
                  kind: TypeKind.StringLiteral,
                  name: "string",
                  value: "A"
                },
                {
                  id: 2863,
                  kind: TypeKind.StringLiteral,
                  name: "string",
                  value: "B"
                }
              ]
            },
            id: 2866,
            kind: TypeKind.TypeParameter,
            name: "K"
          },
          typeArguments: undefined
        },
        extendsType: {
          id: 2861,
          kind: TypeKind.StringLiteral,
          name: "string",
          value: "A"
        },
        falseType: {
          id: 2871,
          kind: TypeKind.StringLiteral,
          name: "string",
          value: "b"
        },
        id: 4746,
        kind: TypeKind.Conditional,
        trueType: {
          id: 2869,
          kind: TypeKind.StringLiteral,
          name: "string",
          value: "a"
        }
      }
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedType = convertMappedType(ctx, type as MappedType);
    const properties = convertedType.children[0].children;

    it("should have two properties", () => {
      expect(properties.length).to.equal(2);
    });

    it("should support the readonly modifier", () => {
      expect(properties[0]).to.include("readonly");
      expect(properties[1]).to.include("readonly");
    });

    it("should support the optional modifier", () => {
      expect(properties[0]).to.include("optional");
      expect(properties[1]).to.include("optional");
    });

    it("should render the resolved types", () => {
      expect((properties[0] as ASTNodes[])[2]).to.include("a");
      expect((properties[1] as ASTNodes[])[2]).to.include("b");
    });

  }

});
