import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderTypeParameterEntity } from "unwritten:renderer/typescript/ast/entities/type-parameter.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { TypeParameterEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.TypeParameter, () => {

  {

    // #region Simple typeParameter with constraint, initializer and description

    const typeParameterEntity: Testable<TypeParameterEntity> = {
      constraint: {
        kind: TypeKind.Number,
        name: "number"
      },
      description: "Type parameter description",
      initializer: {
        kind: TypeKind.NumberLiteral,
        name: "number",
        value: 7
      },
      kind: EntityKind.TypeParameter,
      name: "TypeParameter",
      position: {
        column: 1,
        file: "/file.ts",
        line: 1
      }
    };


    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedTypeParameter = renderTypeParameterEntity(ctx, typeParameterEntity as TypeParameterEntity);

    it("should be able to render a type parameter correctly", () => {
      expect(renderedTypeParameter).to.equal("TypeParameter extends number = 7");
    });

  }

});
