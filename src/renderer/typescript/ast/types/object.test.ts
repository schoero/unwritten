import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderObjectType } from "unwritten:renderer/typescript/ast/types/object.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ObjectType } from "unwritten:interpreter:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Object, () => {

  {

    // #region Type

    const type: Testable<ObjectType> = {
      callSignatures: [],
      constructSignatures: [],
      getters: [],
      id: 2861,
      isThis: false,
      kind: TypeKind.Object,
      methods: [],
      name: "TestObject",
      position: {
        column: 0,
        file: "/file.ts",
        line: 1
      },
      properties: [],
      setters: []
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedType = renderObjectType(ctx, type as ObjectType);

    it("should be able to render object types", () => {
      expect(renderedType).to.equal("TestObject");
    });

  }

});
