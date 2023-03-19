import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderTypeAliasEntity } from "unwritten:renderer:typescript/ast/entities/type-alias.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { splitJSDocAndDeclaration } from "unwritten:tests:utils/jsdoc.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { TypeAliasEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.TypeAlias, () => {

  {

    // #region TypeAlias with type parameters

    // #region Source

    // /**
    //  * Type alias description
    //  *
    //  * @remarks Type alias remarks
    //  * @example Type alias example
    //  * @template A - Type parameter description
    //  */
    // export type TypeAlias<A extends number = 7> = A;

    // #endregion

    const typeAliasEntity: Testable<TypeAliasEntity> = {
      description: "Type alias description",
      example: "Type alias example",
      id: 4460,
      kind: EntityKind.TypeAlias,
      name: "TypeAlias",
      position: {
        column: 0,
        file: "/file.ts",
        line: 8
      },
      remarks: "Type alias remarks",
      type: {
        id: 4742,
        kind: TypeKind.TypeReference,
        name: "A",
        symbolId: 4458,
        type: {
          constraint: {
            id: 17,
            kind: TypeKind.Number,
            name: "number"
          },
          id: 2861,
          kind: TypeKind.TypeParameter,
          name: "A"
        },
        typeArguments: undefined
      },
      typeParameters: [
        {
          constraint: {
            id: 17,
            kind: TypeKind.Number,
            name: "number"
          },
          description: "- Type parameter description",
          id: 4458,
          initializer: {
            id: 2190,
            kind: TypeKind.NumberLiteral,
            name: "number",
            value: 7
          },
          kind: EntityKind.TypeParameter,
          name: "A",
          position: {
            column: 22,
            file: "/file.ts",
            line: 8
          }
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedTypeAlias = renderTypeAliasEntity(ctx, typeAliasEntity as TypeAliasEntity);
    const renderedLines = renderedTypeAlias.split(renderNewLine(ctx));

    const [[renderedJSDocLines], [renderedTypeAliasLines]] = splitJSDocAndDeclaration(renderedLines);

    it("should render type alias correctly", () => {
      expect(renderedTypeAliasLines[0]).to.equal("type TypeAlias<A extends number = 7> = A;");
    });

    it("should have matching JSDoc", () => {
      expect(renderedJSDocLines).to.have.lengthOf(8);
    });

  }

});
