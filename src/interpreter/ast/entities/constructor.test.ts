import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity.js";
import { createClassEntity } from "unwritten:interpreter:ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isCircularType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Getter, () => {

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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should have a constructor", () => {
      expect(exportedClass.ctor).toBeDefined();
    });

    it("should have only one signature", () => {
      expect(exportedClass.ctor!.signatures).toHaveLength(1);
    });

    it("should have a matching constructor description", () => {
      expect(exportedClass.ctor!.signatures[0]!.description).toBe("Constructor description");
    });

    it("should have a matching constructor example", () => {
      expect(exportedClass.ctor!.signatures[0]!.example).toBe("Constructor example");
    });

    it("should return the instance type of the class", () => {
      assert(isCircularType(exportedClass.ctor!.signatures[0]!.returnType));
      expect(exportedClass.ctor!.signatures[0]!.returnType.typeId).toBe(exportedClass.typeId);
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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should support multiple signatures", () => {
      expect(exportedClass.ctor!.signatures).toHaveLength(2);
    });

  }

});
