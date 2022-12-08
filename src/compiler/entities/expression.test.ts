import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Kind } from "../../types/types.js";
import { createClassBySymbol } from "./class.js";


scope("Compiler", Kind.Expression, () => {

  // {

  //   const testFileContent = ts`
  //     class Base {
  //       fromBase = true
  //     }

  //     function getBase() {
  //         return Base
  //     }

  //     export class Class extends getBase() {
  //       fromClass = true
  //     }
  //   `;

  //   const { exportedSymbols, ctx } = compile(testFileContent);

  //   const symbol = exportedSymbols.find(s => s.name === "Class")!;
  //   const exportedClass = createClassBySymbol(ctx, symbol);

  //   it("should be able to parse expressions", () => {
  //     expect(exportedClass.heritage).to.not.equal(undefined);
  //     expect(exportedClass.heritage).to.have.lengthOf(1);
  //     expect(exportedClass.heritage![0]!.kind).to.equal(Kind.Expression);
  //   });

  // }

  {

    const testFileContent = ts`
      class Base<T> {
        public fromBase: T | undefined;
      }
      
      function getBase() {
        return Base;
      }
      
      export class Class extends getBase()<boolean> {
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassBySymbol(ctx, symbol);

    it("should be able to parse expressions", () => {
      expect(exportedClass.heritage).to.not.equal(undefined);
      expect(exportedClass.heritage).to.have.lengthOf(1);
      expect(exportedClass.heritage![0]!.kind).to.equal(Kind.Expression);
    });

  }

});
