import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { createClassEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Setter, () => {

  {

    const testFileContent = ts`
      export class Class {
        /**
         * Setter description
         * @example setter example
         */
        set setter(value: string) {}
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to parse a setter", () => {
      expect(exportedClass.kind).toBe(EntityKind.Class);
      expect(exportedClass.setters).toBeDefined();
      expect(exportedClass.setters).toHaveLength(1);
    });

    it("should have a matching kind", () => {
      expect(exportedClass.setters[0]!.kind).toBe(EntityKind.Setter);
    });

    it("should have a matching name", () => {
      expect(exportedClass.setters[0]!.name).toBe("setter");
    });

    it("should have one signature", () => {
      expect(exportedClass.setters[0]!.signatures).toHaveLength(1);
    });

    it("should have a matching description", () => {
      expect(exportedClass.setters[0]!.signatures[0]!.description).toBe("Setter description");
    });

    it("should have a matching example", () => {
      expect(exportedClass.setters[0]!.signatures[0]!.example).toStrictEqual([
        "setter example"
      ]);
    });

  }

});
