import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler/enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import {
  renderVariableForDocumentation,
  renderVariableForTableOfContents
} from "unwritten:renderer/markup/ast/entities/variable.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { VariableEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", EntityKind.Variable, () => {

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
        value: 7
      }
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedVariableForTableOfContents = renderVariableForTableOfContents(ctx, variableEntity as VariableEntity);
    const renderedVariableForDocumentation = renderVariableForDocumentation(ctx, variableEntity as VariableEntity);

    const renderedVariableTitle = Object.keys(renderedVariableForDocumentation)[0]!;
    const renderedVariableContent = renderedVariableForDocumentation[renderedVariableTitle]!;

    const [
      tags,
      position,
      type,
      description,
      remarks,
      example
    ] = renderedVariableContent;

    it("should have matching table of contents entry", () => {
      expect(renderedVariableForTableOfContents).to.equal("numberVariable");
    });

    it("should have a matching documentation title", () => {
      expect(renderedVariableTitle).to.equal("numberVariable");
    });

    it("should have a position", () => {
      expect(position).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      expect(tags).to.not.equal(undefined);
    });

    it("should have a matching type", () => {
      expect(type).to.match(/7$/);
    });

    it("should have a matching description", () => {
      expect(description).to.equal("Variable description");
    });

    it("should have matching remarks", () => {
      expect(remarks).to.equal("Variable remarks");
    });

    it("should have a matching example", () => {
      expect(example).to.equal("Variable example");
    });

  }

});
