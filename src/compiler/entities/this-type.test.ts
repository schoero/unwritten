import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind } from "quickdoks:types:types.js";

import { createClassBySymbol } from "./class.js";


scope("Compiler", Kind.ThisType, () => {

  {

    const testFileContent = ts`
      export class Class {
        getThis() {
          return this;
        }
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should be able to parse a this type", () => {
      expect(exportedClass.methods).not.to.equal(undefined);
      expect(exportedClass.methods!).to.have.lengthOf(1);
      expect(exportedClass.methods![0]!.signatures).to.have.lengthOf(1);
      expect(exportedClass.methods![0]!.signatures[0]!.returnType.kind).to.equal(Kind.ThisType);
    });

  }

});
