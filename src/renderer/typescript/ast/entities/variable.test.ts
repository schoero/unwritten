import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderVariableEntity } from "unwritten:renderer/typescript/ast/entities/variable.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { VariableEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.Variable, () => {

  {

    // #region Variable with all JSDoc tags

    const variableEntity: Testable<VariableEntity> = {
      beta: undefined,
      description: "Variable description",
      example: "Variable example",
      kind: EntityKind.Variable,
      modifiers: [],
      name: "numberVariable",
      position: {
        column: 17,
        file: "/file.ts",
        line: 9
      },
      remarks: "Variable remarks",
      type: {
        kind: TypeKind.NumberLiteral,
        name: "number",
        value: 7
      }
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedVariable = renderVariableEntity(ctx, variableEntity as VariableEntity);

    it("should have a matching example", () => {
      expect(renderedVariable).to.equal("const numberVariable: 7;");
    });

  }

});
