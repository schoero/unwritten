import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { createSourceFileEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isExportAssignmentEntity } from "unwritten:typeguards/entities.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", "Export assignment", () => {

  {

    const testFileContent = ts`
      export default () => {};
    `;

    const { ctx, fileSymbol } = compile(testFileContent);
    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should be able to interpret esm export expressions", () => {
      expect(sourceFile.exports).toHaveLength(1);
      assert(isExportAssignmentEntity(sourceFile.exports[0]));
      expect(sourceFile.exports[0].type.kind).toBe(TypeKind.Function);
    });

  }

  {

    const testFileContent = ts`
      export default {
        test: "test"
      };
    `;

    const { ctx, fileSymbol } = compile(testFileContent);
    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should be able to interpret esm export expressions", () => {
      expect(sourceFile.exports).toHaveLength(1);
      assert(isExportAssignmentEntity(sourceFile.exports[0]));
      expect(sourceFile.exports[0].type.kind).toBe(TypeKind.ObjectLiteral);
    });

  }

});
