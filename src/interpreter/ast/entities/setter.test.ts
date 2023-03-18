import { expect, it } from "vitest";

import { createClassEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", EntityKind.Setter, () => {

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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to parse a setter", () => {
      expect(exportedClass.kind).to.equal(EntityKind.Class);
      expect(exportedClass.setters).to.not.equal(undefined);
      expect(exportedClass.setters).to.have.lengthOf(1);
    });

    it("should have a matching kind", () => {
      expect(exportedClass.setters[0]!.kind).to.equal(EntityKind.Setter);
    });

    it("should have a matching name", () => {
      expect(exportedClass.setters[0]!.name).to.equal("setter");
    });

    it("should have one signature", () => {
      expect(exportedClass.setters[0]!.signatures).to.have.lengthOf(1);
    });

    it("should have a matching description", () => {
      expect(exportedClass.setters[0]!.signatures[0]!.description).to.equal("Setter description");
    });

    it("should have a matching example", () => {
      expect(exportedClass.setters[0]!.signatures[0]!.example).to.equal("setter example");
    });

  }

});
