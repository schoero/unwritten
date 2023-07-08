/* eslint-disable @typescript-eslint/naming-convention */
import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { createExportAssignmentEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isExportAssignmentEntity } from "unwritten:typeguards/entities.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", "Export assignment", () => {

  {

    const testFileContent = ts`
      /**
       * Export assignment description
       * @remarks Export assignment remarks
       * @example Export assignment example
       * @deprecated
       * @beta
       */
      export default () => {};
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);
    const exportAssignmentSymbol = exportedSymbols.find(s => s.name === "default")!;
    const exportAssignmentEntity = createExportAssignmentEntity(ctx, exportAssignmentSymbol);

    it("should be able to interpret esm export expressions", () => {
      expect(exportAssignmentEntity.type.kind).toBe(TypeKind.Function);
    });

    it("should have a matching description", () => {
      assert(isExportAssignmentEntity(exportAssignmentEntity));
      expect(exportAssignmentEntity.description).toBe("Export assignment description");
    });

    it("should have matching remarks", () => {
      assert(isExportAssignmentEntity(exportAssignmentEntity));
      expect(exportAssignmentEntity.remarks).toBe("Export assignment remarks");
    });

    it("should have a matching example", () => {
      assert(isExportAssignmentEntity(exportAssignmentEntity));
      expect(exportAssignmentEntity.example).toBe("Export assignment example");
    });

    it("should be have matching jsdoc tags", () => {
      assert(isExportAssignmentEntity(exportAssignmentEntity));
      expect(exportAssignmentEntity).toHaveProperty("deprecated");
      expect(exportAssignmentEntity).toHaveProperty("beta");
    });

  }

  {

    const testFileContent = ts`
      export default {
        test: "test"
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);
    const exportAssignmentSymbol = exportedSymbols.find(s => s.name === "default")!;
    const exportAssignmentEntity = createExportAssignmentEntity(ctx, exportAssignmentSymbol);

    it("should be able to interpret esm export expressions", () => {
      expect(exportAssignmentEntity.type.kind).toBe(TypeKind.ObjectLiteral);
    });

  }

  {

    const testFileContent = ts`
      export default "test" as const
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);
    const exportAssignmentSymbol = exportedSymbols.find(s => s.name === "default")!;
    const exportAssignmentEntity = createExportAssignmentEntity(ctx, exportAssignmentSymbol);

    it("should be able to interpret as const assertions", () => {
      expect(exportAssignmentEntity.type.kind).toBe(TypeKind.StringLiteral);
    });

  }

});
