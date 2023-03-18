import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderClassType } from "unwritten:renderer:ts/ast/types/class.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ClassType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", TypeKind.Class, () => {

  {

    // #region Type

    const type: Testable<ClassType> = {
      callSignatures: [],
      constructSignatures: [],
      getters: [],
      id: 2861,
      isThis: false,
      kind: TypeKind.Class,
      methods: [],
      name: "Class",
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

    const renderedType = renderClassType(ctx, type as ClassType);

    it("should be able to render class types", () => {
      expect(renderedType).to.equal("Class");
    });

  }

});
