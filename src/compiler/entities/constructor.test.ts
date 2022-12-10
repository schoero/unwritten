import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind } from "quickdoks:types:types.js";

import { createClassBySymbol } from "./class.js";


scope("Compiler", Kind.Class, () => {

  {

    const testFileContent = ts`
      export class Class {
        constructor() {
        }
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

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
