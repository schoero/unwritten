import { expect, it } from "vitest";

import { createClassEntity } from "unwritten:compiler:entities";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", EntityKind.Getter, () => {

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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to parse a getter", () => {
      expect(exportedClass.kind).to.equal(EntityKind.Class);
      expect(exportedClass.getters).to.not.equal(undefined);
      expect(exportedClass.getters).to.have.lengthOf(1);
    });

    it("should have a matching kind", () => {
      expect(exportedClass.getters[0]!.kind).to.equal(EntityKind.Getter);
    });

    it("should have a matching name", () => {
      expect(exportedClass.getters[0]!.name).to.equal("getter");
    });

    it("should have one signature", () => {
      expect(exportedClass.getters[0]!.signatures).to.have.lengthOf(1);
    });

    it("should have a matching description", () => {
      expect(exportedClass.getters[0]!.signatures[0]!.description).to.equal("Getter description");
    });

    it("should have a matching example", () => {
      expect(exportedClass.getters[0]!.signatures[0]!.example).to.equal("Getter example");
    });

  }

});
