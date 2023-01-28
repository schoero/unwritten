import { describe, expect, it } from "vitest";

import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { renderVariableForDocumentation } from "quickdoks:renderer/markup/ast/entities/variable.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import type { VariableEntity } from "quickdoks:compiler:type-definitions/entities.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


scope("Renderer", "Config", () => {

  describe("typeEncapsulation", async () => {

    const variableEntity: Testable<VariableEntity> = {
      kind: EntityKind.Variable,
      name: "stringType",
      type: {
        kind: TypeKind.String,
        name: "string"
      }
    };

    const ctx = createRenderContext();

    ctx.config.externalTypes = {};

    {

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

      it("should use the default encapsulation", () => {
        expect(type).to.equal("Type: string");
      });

    }

    {

      ctx.config.renderConfig.markdown.typeEncapsulation = ["`", "`"];

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

      it("should be possible to change the encapsulation", () => {
        expect(type).to.equal("Type: `string`");
      });

    }

  });

});
