import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind } from "../../types/types.js";
import { createClassBySymbol } from "./class.js";


scope("Compiler", TypeKind.Setter, () => {

  {

    const testFileContent = ts`
      export class Class { 
        set setter() {}
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should be able to parse a setter", () => {
      expect(exportedClass.kind).to.equal(TypeKind.Class);
      expect(exportedClass.setters).to.not.equal(undefined);
      expect(exportedClass.setters).to.have.lengthOf(1);
    });

    it("should have a matching kind", () => {
      expect(exportedClass.setters![0]!.kind).to.equal(TypeKind.Setter);
    });

    it("should have a matching name", () => {
      expect(exportedClass.setters![0]!.name).to.equal("setter");
    });

    it("should have one signature", () => {
      expect(exportedClass.setters![0]!.signatures).to.have.lengthOf(1);
    });

  }

});
