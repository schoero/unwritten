import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler/enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderParameterForDocumentation, renderParametersForSignature } from "./parameter.js";

import type { ParameterEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", EntityKind.Parameter, () => {

  {

    // #region Normal parameter

    const parameterEntity: Testable<ParameterEntity> = {
      description: undefined,
      initializer: undefined,
      kind: EntityKind.Parameter,
      name: "parameter",
      optional: false,
      position: {
        column: 20,
        file: "/file.ts",
        line: 1
      },
      rest: false,
      type: {
        kind: TypeKind.Number,
        name: "number"
      }
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedParametersForSignature = renderParametersForSignature(ctx, [parameterEntity as ParameterEntity]);
    const renderedParameterForDocumentation = renderParameterForDocumentation(ctx, parameterEntity as ParameterEntity);

    it("should have a matching name", () => {
      expect(renderedParametersForSignature).to.equal("parameter");
      expect(renderedParameterForDocumentation).to.match(/parameter: .*$/);
    });

    it("should have a matching type", () => {
      expect(renderedParameterForDocumentation).to.match(/^.*: number$/);
    });

  }

  {

    // #region Multiple parameters

    const parameterEntities: Testable<ParameterEntity>[] = [
      {
        description: undefined,
        initializer: undefined,
        kind: EntityKind.Parameter,
        name: "a",
        optional: false,
        position: {
          column: 20,
          file: "/file.ts",
          line: 1
        },
        rest: false,
        type: {
          kind: TypeKind.Number,
          name: "number"
        }
      },
      {
        description: undefined,
        initializer: undefined,
        kind: EntityKind.Parameter,
        name: "b",
        optional: false,
        position: {
          column: 31,
          file: "/file.ts",
          line: 1
        },
        rest: false,
        type: {
          kind: TypeKind.Number,
          name: "number"
        }
      }
    ];

    // #endregion

    const ctx = createRenderContext();

    const renderedParametersForSignature = renderParametersForSignature(ctx, parameterEntities as ParameterEntity[]);

    it("should join multiple parameters with a `,`", () => {
      expect(renderedParametersForSignature).to.equal("a, b");
    });

  }

  {

    // #region Optional parameter

    const parameterEntities: Testable<ParameterEntity>[] = [
      {
        description: undefined,
        initializer: undefined,
        kind: EntityKind.Parameter,
        name: "a",
        optional: false,
        position: {
          column: 20,
          file: "/file.ts",
          line: 1
        },
        rest: false,
        type: {
          kind: TypeKind.Number,
          name: "number"
        }
      },
      {
        description: undefined,
        initializer: undefined,
        kind: EntityKind.Parameter,
        name: "b",
        optional: true,
        position: {
          column: 31,
          file: "/file.ts",
          line: 1
        },
        rest: false,
        type: {
          kind: TypeKind.Number,
          name: "number"
        }
      }
    ];

    // #endregion

    const ctx = createRenderContext();

    const renderedParametersForSignature = renderParametersForSignature(ctx, parameterEntities as ParameterEntity[]);
    const renderedParameterForDocumentation = renderParameterForDocumentation(ctx, parameterEntities[1] as ParameterEntity);

    it("should encapsulate optional parameters in `[]`", () => {
      expect(renderedParametersForSignature).to.equal("a[, b]");
    });

    it("should render an `optional` tag", () => {
      expect(renderedParameterForDocumentation).to.match(/^.*optional.*$/);
    });

  }

  {

    // #region Rest parameter

    const parameterEntities: Testable<ParameterEntity>[] = [
      {
        description: undefined,
        initializer: undefined,
        kind: EntityKind.Parameter,
        name: "a",
        optional: false,
        position: {
          column: 20,
          file: "/file.ts",
          line: 1
        },
        rest: false,
        type: {
          kind: TypeKind.Number,
          name: "number"
        }
      },
      {
        description: undefined,
        initializer: undefined,
        kind: EntityKind.Parameter,
        name: "b",
        optional: false,
        position: {
          column: 31,
          file: "/file.ts",
          line: 1
        },
        rest: true,
        type: {
          kind: TypeKind.Array,
          type: {
            kind: TypeKind.Number,
            name: "number"
          }
        }
      }
    ];

    // #endregion

    const ctx = createRenderContext();

    const renderedParametersForSignature = renderParametersForSignature(ctx, parameterEntities as ParameterEntity[]);
    const renderedParameterForDocumentation = renderParameterForDocumentation(ctx, parameterEntities[1] as ParameterEntity);

    it("should encapsulate optional parameters in `[]`", () => {
      expect(renderedParametersForSignature).to.equal("a, ...b");
    });

    it("should render an `rest` tag", () => {
      expect(renderedParameterForDocumentation).to.match(/^.*rest.*$/);
    });

  }

});
