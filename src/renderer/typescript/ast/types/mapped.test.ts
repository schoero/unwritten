import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderMappedType } from "unwritten:renderer/typescript/ast/types/mapped.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { MappedType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Interface, () => {

  {

    // #region Simple mapped type

    // #region Source

    // export type MappedTypeLiteral = {
    //   readonly [K in "A" | "B"]?: K;
    // };

    // #endregion

    const type: Testable<MappedType> = {
      id: 4461,
      kind: TypeKind.Mapped,
      members: [
        {
          id: 4742,
          keyType: {
            id: 2861,
            kind: TypeKind.StringLiteral,
            name: "string",
            value: "A"
          },
          kind: EntityKind.MappedTypeMember,
          valueType: {
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
          }
        },
        {
          id: 4743,
          keyType: {
            id: 2863,
            kind: TypeKind.StringLiteral,
            name: "string",
            value: "B"
          },
          kind: EntityKind.MappedTypeMember,
          valueType: {
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
          }
        }
      ],
      optional: true,
      position: {
        column: 32,
        file: "/file.ts",
        line: 1
      },
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
      }
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderMappedType(ctx, type as MappedType);
    const renderedLines = renderedType.split(renderNewLine(ctx));

    it("should have a matching header", () => {
      expect(renderedLines[0]).to.equal("{");
    });

    it("should support the readonly modifier", () => {
      expect(renderedLines[1]).to.include("readonly");
    });

    it("should support the optional modifier", () => {
      expect(renderedLines[1]).to.include("?:");
    });

    it("should support the type parameter", () => {
      expect(renderedLines[1]).to.include("K in");
    });

  }

});
