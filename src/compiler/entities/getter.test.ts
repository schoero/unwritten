import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Kind } from "../../types/types.js";
import { createClassBySymbol } from "./class.js";


scope("Compiler", Kind.Getter, () => {

  {

    const testFileContent = ts`
      export class Class { 
        get getter() {}
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should be able to parse a getter", () => {
      expect(exportedClass.kind).to.equal(Kind.Class);
      expect(exportedClass.getters).to.not.equal(undefined);
      expect(exportedClass.getters).to.have.lengthOf(1);
    });

    it("should have a matching kind", () => {
      expect(exportedClass.getters![0]!.kind).to.equal(Kind.Getter);
    });

    it("should have a matching name", () => {
      expect(exportedClass.getters![0]!.name).to.equal("getter");
    });

    it("should have one signature", () => {
      expect(exportedClass.getters![0]!.signatures).to.have.lengthOf(1);
    });

  }

});
