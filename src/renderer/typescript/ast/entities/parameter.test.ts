import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import {
  renderParameterEntities,
  renderParameterEntity
} from "unwritten:renderer/typescript/ast/entities/parameter.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ParameterEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.Parameter, () => {

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

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);
    const renderedParameter = renderParameterEntity(ctx, parameterEntity as ParameterEntity);

    it("should have a matching type", () => {
      expect(renderedParameter).to.equal("parameter: number");
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

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);
    const renderedParameters = renderParameterEntities(ctx, parameterEntities as ParameterEntity[]);

    it("should join multiple parameters with a `,`", () => {
      expect(renderedParameters).to.equal("a: number, b: number");
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

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedParameters = renderParameterEntities(ctx, parameterEntities as ParameterEntity[]);

    it("should encapsulate optional parameters in `[]`", () => {
      expect(renderedParameters).to.equal("a: number, b?: number");
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

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedParameters = renderParameterEntities(ctx, parameterEntities as ParameterEntity[]);

    it("should encapsulate optional parameters in `[]`", () => {
      expect(renderedParameters).to.equal("a: number, ...b: number[]");
    });

  }

  {

    // #region Default value

    const parameterEntity: Testable<ParameterEntity> = {
      description: undefined,
      initializer: {
        kind: TypeKind.NumberLiteral,
        name: "number",
        value: 7
      },
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
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedParameter = renderParameterEntity(ctx, parameterEntity as ParameterEntity);

    it("Should render default values", () => {
      expect(renderedParameter).to.equal("a: number = 7");
    });

  }

});
