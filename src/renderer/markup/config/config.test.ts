import { describe, expect, it } from "vitest";

import { createRenderContext } from "../../../../tests/utils/context.js";
import { scope } from "../../../../tests/utils/scope.js";
import { Kind, Variable } from "../../../types/types.js";
import { Real, Testable } from "../../../types/utils.js";
import { renderVariableForDocumentation } from "../entities/variable.js";


scope("Renderer", "Config", () => {

  describe("typeEncapsulation", async () => {

    const testVariable: Testable<Variable> = {
      kind: Kind.Variable,
      name: "stringType",
      type: {
        kind: Kind.String,
        name: "string"
      }
    };

    const ctx = createRenderContext();

    ctx.config.externalTypes = {};

    {

      const renderedVariableForDocumentation = renderVariableForDocumentation(ctx, <Real<Variable>>testVariable);

      const variableName = Object.keys(renderedVariableForDocumentation)[0]!;
      const variableContent = renderedVariableForDocumentation[variableName]!;

      it("should use the default encapsulation", () => {
        expect(variableContent[1]).to.equal("Type: string");
      });

    }

    {

      ctx.config.renderConfig.markdown.typeEncapsulation = ["`", "`"];

      const renderedVariableForDocumentation = renderVariableForDocumentation(ctx, <Real<Variable>>testVariable);

      const variableName = Object.keys(renderedVariableForDocumentation)[0]!;
      const variableContent = renderedVariableForDocumentation[variableName]!;

      it("should be possible to change the encapsulation", () => {
        expect(variableContent[1]).to.equal("Type: `string`");
      });

    }

  });

});
