import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler/enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderTypeParameterForDocumentation, renderTypeParametersForSignature } from "./type-parameter.js";

import type { TypeParameterEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", EntityKind.TypeParameter, () => {

  {

    // #region Type parameter with description

    const typeParameterEntity: Testable<TypeParameterEntity> = {
      description: "Type parameter description",
      kind: EntityKind.TypeParameter,
      name: "T"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedParametersForSignature = renderTypeParametersForSignature(ctx, [typeParameterEntity as TypeParameterEntity]);
    const renderedParameterForDocumentation = renderTypeParameterForDocumentation(ctx, typeParameterEntity as TypeParameterEntity);

    it("should have a matching name", () => {
      expect(renderedParametersForSignature).to.equal("T");
      expect(renderedParameterForDocumentation).to.match(/&lt;T&gt;.*$/);
    });

    it("should have a matching description", () => {
      expect(renderedParameterForDocumentation).to.match(/^.*Type parameter description$/);
    });

  }

  {

    // #region Multiple type parameters

    const typeParameterEntities: Testable<TypeParameterEntity>[] = [
      {
        kind: EntityKind.TypeParameter,
        name: "T"
      },
      {
        kind: EntityKind.TypeParameter,
        name: "S"
      }
    ];

    // #endregion

    const ctx = createRenderContext();

    const renderedParametersForSignature = renderTypeParametersForSignature(ctx, typeParameterEntities as TypeParameterEntity[]);

    it("should join multiple parameters with a `,`", () => {
      expect(renderedParametersForSignature).to.equal("T, S");
    });

  }

  {

    // #region Type parameter with constraint

    const typeParameterEntity: Testable<TypeParameterEntity> = {
      constraint: {
        kind: TypeKind.String,
        name: "string"
      },
      kind: EntityKind.TypeParameter,
      name: "T",
      position: {
        column: 26,
        file: "/file.ts",
        line: 4
      }
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedParametersForSignature = renderTypeParametersForSignature(ctx, [typeParameterEntity as TypeParameterEntity]);
    const renderedParameterForDocumentation = renderTypeParameterForDocumentation(ctx, typeParameterEntity as TypeParameterEntity);

    it("should not render the type in the signature", () => {
      expect(renderedParametersForSignature).to.equal("T");
    });

    it("should render the constraint inline as a type", () => {
      expect(renderedParameterForDocumentation).to.match(/^.*: string$/);
    });

  }

});
