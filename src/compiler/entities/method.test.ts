import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind } from "../../types/types.js";
import { createClassBySymbol } from "./class.js";


scope("Compiler", TypeKind.Method, () => {

  {

    const testFileContent = ts`
      export class Class { 
        method() {}
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should be able to parse a method", () => {
      expect(exportedClass.kind).to.equal(TypeKind.Class);
      expect(exportedClass.methods).to.not.equal(undefined);
      expect(exportedClass.methods).to.have.lengthOf(1);
    });

    it("should have a matching kind", () => {
      expect(exportedClass.methods![0]!.kind).to.equal(TypeKind.Method);
    });

    it("should have a matching name", () => {
      expect(exportedClass.methods![0]!.name).to.equal("method");
    });

    it("should have one signature", () => {
      expect(exportedClass.methods![0]!.signatures).to.have.lengthOf(1);
    });

  }

});
