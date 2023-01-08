import { expect, it } from "vitest";

import { createClassEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";


scope("Compiler", EntityKind.Getter, () => {

  {

    const testFileContent = ts`
      export class Class {
        /**
         * Constructor description
         * @example Constructor example
         */
        constructor() {}
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should have a constructor", () => {
      expect(exportedClass.ctor).to.not.equal(undefined);
    });

    it("should have only one signature", () => {
      expect(exportedClass.ctor!.signatures.length).to.equal(1);
    });

    it("should have a matching constructor description", () => {
      expect(exportedClass.ctor!.signatures[0]!.description).to.equal("Constructor description");
    });

    it("should have a matching constructor example", () => {
      expect(exportedClass.ctor!.signatures[0]!.example).to.equal("Constructor example");
    });

  }

  {

    const testFileContent = ts`
      export class Class {
        constructor(a: string);
        constructor(a: string, b:string);
        constructor(a: string, b?: string) {}
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should support multiple signatures", () => {
      expect(exportedClass.ctor!.signatures.length).to.equal(2);
    });

  }

});
