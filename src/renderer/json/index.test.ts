import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler/enums/entities.js";
import { TypeKind } from "unwritten:compiler/enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { FunctionEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("JSONRenderer", "JSON", () => {

  {

    // #region simple function

    const functionEntity: Testable<FunctionEntity> = {
      id: 4055,
      kind: EntityKind.Function,
      name: "add",
      signatures: [
        {
          description: undefined,
          id: 4455,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "add",
          parameters: [
            {
              description: undefined,
              id: 4052,
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
                id: 16,
                kind: TypeKind.Number,
                name: "number"
              }
            },
            {
              description: undefined,
              id: 4053,
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
                id: 16,
                kind: TypeKind.Number,
                name: "number"
              }
            }
          ],
          position: {
            column: 0,
            file: "/file.ts",
            line: 1
          },
          returnType: {
            description: undefined,
            id: 16,
            kind: TypeKind.Number,
            name: "number"
          },
          typeParameters: undefined
        }
      ]
    };

    // #endregion

    it("should not export id's by default", () => {
      const ctx = createRenderContext(BuiltInRenderers.JSON);
      const renderedOutput = ctx.renderer.render(ctx, [functionEntity as FunctionEntity]);
      const json = JSON.parse(renderedOutput);
      expect(json[0].id).to.equal(undefined);
    });

    it("should be possible to enable ids", () => {
      const ctx = createRenderContext(BuiltInRenderers.JSON);
      ctx.config.renderConfig.json.includeIds = true;
      const renderedOutput = ctx.renderer.render(ctx, [functionEntity as FunctionEntity]);
      const json = JSON.parse(renderedOutput);
      expect(json[0].id).to.not.equal(undefined);
    });

  }

});
