import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderTypeAliasEntity } from "unwritten:renderer/typescript/ast/entities/type-alias.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { TypeAliasEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.TypeAlias, () => {

  {

    // #region TypeAlias with all JSDoc tags

    const typeAliasEntity: Testable<TypeAliasEntity> = {
      description: "Type alias description",
      example: "Type alias example",
      id: 4054,
      kind: EntityKind.TypeAlias,
      name: "TypeAlias",
      position: {
        column: 0,
        file: "/file.ts",
        line: 7
      },
      remarks: "Type alias remarks",
      type: {
        id: 4456,
        kind: TypeKind.TypeReference,
        name: "A",
        symbolId: 4052,
        type: {
          constraint: {
            id: 16,
            kind: TypeKind.Number,
            name: "number"
          },
          id: 2611,
          kind: TypeKind.TypeParameter,
          name: "A"
        },
        typeArguments: undefined
      },
      typeParameters: [
        {
          constraint: {
            id: 16,
            kind: TypeKind.Number,
            name: "number"
          },
          description: "Type parameter description",
          id: 4052,
          initializer: {
            id: 2126,
            kind: TypeKind.NumberLiteral,
            name: "number",
            value: 7
          },
          kind: EntityKind.TypeParameter,
          name: "A",
          position: {
            column: 22,
            file: "/file.ts",
            line: 7
          }
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedTypeAlias = renderTypeAliasEntity(ctx, typeAliasEntity as TypeAliasEntity);

    it("should render type alias correctly", () => {
      expect(renderedTypeAlias).to.equal("export type TypeAlias<A extends number = 7> = A;");
    });

  }

});
