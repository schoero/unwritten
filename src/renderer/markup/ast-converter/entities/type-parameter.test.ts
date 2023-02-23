import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import {
  convertTypeParameterEntitiesForSignature,
  convertTypeParameterEntityForDocumentation
} from "unwritten:renderer/markup/ast-converter/entities/type-parameter.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { TypeParameterEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", EntityKind.TypeParameter, () => {

  {

    // #region Simple typeParameter with constraint, initializer and description

    const typeParameterEntity: Testable<TypeParameterEntity> = {
      constraint: {
        kind: TypeKind.String,
        name: "string"
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

    const ctx = createRenderContext();

    const convertedParametersForSignature = convertTypeParameterEntitiesForSignature(ctx, [typeParameterEntity as TypeParameterEntity]);
    const convertedParameterForDocumentation = convertTypeParameterEntityForDocumentation(ctx, typeParameterEntity as TypeParameterEntity);

    const renderedParametersForSignature = renderNode(ctx, convertedParametersForSignature);
    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should have a matching name", () => {
      expect(renderedParametersForSignature).to.equal("TypeParameter");
      expect(renderedParameterForDocumentation).to.match(/TypeParameter .*$/);
    });

    it("should have a matching description", () => {
      expect(renderedParameterForDocumentation).to.match(/.* Type parameter description .*/);
    });

    it("should have a matching type", () => {
      expect(renderedParameterForDocumentation).to.match(/^.* string .*/);
    });

    it("should have a matching initializer", () => {
      expect(renderedParameterForDocumentation).to.match(/.* Default: 7$/);
    });

  }

});
