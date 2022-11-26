import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Kind } from "../../types/types.js";
import { createClassBySymbol } from "./class.js";


scope("Compiler", Kind.Class, () => {

  {

    const testFileContent = ts`
      export class Class {
        constructor() {
        }
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should be able to parse a constructor", () => {
      expect(exportedClass.ctor).not.to.equal(undefined);
      expect(exportedClass.ctor!.kind).equal(Kind.Constructor);
    });

    it("should have one signature", () => {
      expect(exportedClass.ctor!.signatures).not.to.equal(undefined);
      expect(exportedClass.ctor!.signatures).to.have.lengthOf(1);
    });

  }

});
