import { describe, expect, it } from "vitest";

import { renderVariableForDocumentation } from "quickdoks:renderer:markup/entities/variable.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { Variable } from "quickdoks:type-definitions/types.d.js";
import { Real, Testable } from "quickdoks:type-definitions/utils.d.js";


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
