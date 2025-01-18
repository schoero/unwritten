import { createExportAssignmentEntity } from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { isExportAssignmentEntity } from "unwritten:typeguards/entities";
import { isJSDocText } from "unwritten:typeguards/jsdoc";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";


scope("Interpreter", "Export assignment", () => {

  {

    const testFileContent = ts`
      /**
       * Export assignment description
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
      expect(exportAssignmentEntity.description).toHaveLength(1);
      assert(isJSDocText(exportAssignmentEntity.description![0]));
      expect(exportAssignmentEntity.description![0].text).toBe("Export assignment description");
    });

    it("should have a matching example", () => {
      expect(exportAssignmentEntity.example).toHaveLength(1);
      assert(isJSDocText(exportAssignmentEntity.example![0].content[0]));
      expect(exportAssignmentEntity.example![0].content[0].text).toBe("Export assignment example");
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
