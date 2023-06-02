import { expect, it } from "vitest";

import { createClassEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Method, () => {

  {

    const testFileContent = ts`
      export class Class { 
        /** Method description 
         * @example Method example
         */
        method() {}
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to parse a method", () => {
      expect(exportedClass.kind).to.equal(EntityKind.Class);
      expect(exportedClass.methods).to.not.equal(undefined);
      expect(exportedClass.methods).to.have.lengthOf(1);
    });

    it("should have a matching kind", () => {
      expect(exportedClass.methods[0]!.kind).to.equal(EntityKind.Method);
    });

    it("should have a matching name", () => {
      expect(exportedClass.methods[0]!.name).to.equal("method");
    });

    it("should have one signature", () => {
      expect(exportedClass.methods[0]!.signatures).to.have.lengthOf(1);
    });

    it("should have a matching description", () => {
      expect(exportedClass.methods[0]!.signatures[0].description).to.equal("Method description");
    });

    it("should have a matching example", () => {
      expect(exportedClass.methods[0]!.signatures[0].example).to.equal("Method example");
    });

  }

});
