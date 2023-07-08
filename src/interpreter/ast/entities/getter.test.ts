import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { createClassEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Getter, () => {

  {

    const testFileContent = ts`
      export class Class {
        /**
         * Getter description
         * @example Getter example
         */
        get getter() { return "test"; }
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to parse a getter", () => {
      expect(exportedClass.kind).toBe(EntityKind.Class);
      expect(exportedClass.getters).toBeDefined();
      expect(exportedClass.getters).toHaveLength(1);
    });

    it("should have a matching kind", () => {
      expect(exportedClass.getters[0]!.kind).toBe(EntityKind.Getter);
    });

    it("should have a matching name", () => {
      expect(exportedClass.getters[0]!.name).toBe("getter");
    });

    it("should have one signature", () => {
      expect(exportedClass.getters[0]!.signatures).toHaveLength(1);
    });

    it("should have a matching description", () => {
      expect(exportedClass.getters[0]!.signatures[0]!.description).toBe("Getter description");
    });

    it("should have a matching example", () => {
      expect(exportedClass.getters[0]!.signatures[0]!.example).toBe("Getter example");
    });

  }

});
