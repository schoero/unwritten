import { describe, expect, it } from "vitest";

import { createRenderContext } from "../../../../tests/utils/context.js";
import { createConfig } from "../../../config/index.js";
import { Kind, Variable } from "../../../types/types.js";
import { Real, Testable } from "../../../types/utils.js";
import { renderVariableForDocumentation } from "../entities/variable.js";


describe("Config", () => {

  describe("typeEncapsulation", () => {

    const testVariable: Testable<Variable> = {
      kind: Kind.Variable,
      name: "stringType",
      type: {
        kind: Kind.String,
        name: "string"
      }
    };

    const config = createConfig({
      externalTypes: {}
    });

    const ctx = createRenderContext(config);

    {

      const renderedVariableForDocumentation = renderVariableForDocumentation(ctx, <Real<Variable>>testVariable);

      const variableName = Object.keys(renderedVariableForDocumentation)[0]!;
      const variableContent = renderedVariableForDocumentation[variableName]!;

      it("should use the default encapsulation", () => {
        expect(variableContent[1]).to.equal("Type: &lt;string&gt;");
      });

    }

    {

      ctx.config.renderConfig.markdown.typeEncapsulation = false;

      const renderedVariableForDocumentation = renderVariableForDocumentation(ctx, <Real<Variable>>testVariable);

      const variableName = Object.keys(renderedVariableForDocumentation)[0]!;
      const variableContent = renderedVariableForDocumentation[variableName]!;

      it("should be possible to disable the encapsulation", () => {
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
