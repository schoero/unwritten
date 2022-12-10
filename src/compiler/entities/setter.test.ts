import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind } from "quickdoks:types:types.js";

import { createClassBySymbol } from "./class.js";


scope("Compiler", Kind.Setter, () => {

  {

    const testFileContent = ts`
      export class Class { 
        set setter(value: string) {}
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should be able to parse a setter", () => {
      expect(exportedClass.kind).to.equal(Kind.Class);
      expect(exportedClass.setters).to.not.equal(undefined);
      expect(exportedClass.setters).to.have.lengthOf(1);
    });

    it("should have a matching kind", () => {
      expect(exportedClass.setters![0]!.kind).to.equal(Kind.Setter);
    });

    it("should have a matching name", () => {
      expect(exportedClass.setters![0]!.name).to.equal("setter");
    });

    it("should have one signature", () => {
      expect(exportedClass.setters![0]!.signatures).to.have.lengthOf(1);
    });

  }

});
