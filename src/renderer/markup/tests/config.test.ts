import { expect } from "chai";
import { describe, it } from "vitest";

import { createConfig } from "../../../config/index.js";
import { TypeKind, Variable } from "../../../types/types.js";
import { Real, Testable } from "../../../types/utils.js";
import { renderVariableForDocumentation } from "../shared/variable.js";
import { createRenderContext } from "./utils/context.js";


describe("Config", () => {

  describe("typeEncapsulation", () => {

    const testVariable: Testable<Variable> = {
      kind: TypeKind.Variable,
      name: "stringType",
      type: {
        kind: TypeKind.String,
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

      it("should use the default encapsulation", function() {
        expect(variableContent[1]).to.equal("Type: &lt;string&gt;");
      });
    }
    {
      ctx.config.renderConfig.markdown.typeEncapsulation = false;

      const renderedVariableForDocumentation = renderVariableForDocumentation(ctx, <Real<Variable>>testVariable);

      const variableName = Object.keys(renderedVariableForDocumentation)[0]!;
      const variableContent = renderedVariableForDocumentation[variableName]!;

      it("should be possible to disable the encapsulation", function() {
        expect(variableContent[1]).to.equal("Type: string");
      });
    }
    {
      ctx.config.renderConfig.markdown.typeEncapsulation = ["`", "`"];

      const renderedVariableForDocumentation = renderVariableForDocumentation(ctx, <Real<Variable>>testVariable);

      const variableName = Object.keys(renderedVariableForDocumentation)[0]!;
      const variableContent = renderedVariableForDocumentation[variableName]!;

      it("should be possible to change the encapsulation", function() {
        expect(variableContent[1]).to.equal("Type: `string`");
      });
    }

  });

});