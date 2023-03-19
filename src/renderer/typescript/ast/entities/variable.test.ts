import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderVariableEntity } from "unwritten:renderer:typescript/ast/entities/variable.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { splitJSDocAndDeclaration } from "unwritten:tests:utils/jsdoc.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { VariableEntity } from "unwritten:interpreter:type-definitions/entities.js";
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
    const renderedLines = renderedVariable.split(renderNewLine(ctx));

    const [[renderedJSDocLines], [renderedVariableLines]] = splitJSDocAndDeclaration(renderedLines);

    it("should have a matching variable declaration", () => {
      expect(renderedVariableLines[0]).to.equal("const numberVariable: 7;");
    });

    it("should have a matching JSDoc lines", () => {
      expect(renderedJSDocLines).to.have.lengthOf(8);
    });

  }

});
