import { createClassEntity } from "unwritten:interpreter:ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { isJSDocText } from "unwritten:typeguards/jsdoc";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";
import { expect, it } from "vitest";


scope("Interpreter", EntityKind.Method, () => {

  {

    const testFileContent = ts`
      export class Class { 
        /** Method description 
         * @example Method example
         */
        method() {}
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const exportedClass = createClassEntity(ctx, symbol);

    it("should be able to parse a method", () => {
      expect(exportedClass.kind).toBe(EntityKind.Class);
      expect(exportedClass.methods).toBeDefined();
      expect(exportedClass.methods).toHaveLength(1);
    });

    it("should have a matching kind", () => {
      expect(exportedClass.methods[0].kind).toBe(EntityKind.Method);
    });

    it("should have a matching name", () => {
      expect(exportedClass.methods[0].name).toBe("method");
    });

    it("should have one signature", () => {
      expect(exportedClass.methods[0].signatures).toHaveLength(1);
    });


    it("should have a matching description", () => {
      expect(exportedClass.methods[0].signatures[0].description).toHaveLength(1);
      assert(isJSDocText(exportedClass.methods[0].signatures[0].description![0]));
      expect(exportedClass.methods[0].signatures[0].description![0].text).toBe("Method description");
    });

    it("should have a matching example", () => {
      expect(exportedClass.methods[0].signatures[0].example).toHaveLength(1);
      assert(isJSDocText(exportedClass.methods[0].signatures[0].example![0].content[0]));
      expect(exportedClass.methods[0].signatures[0].example![0].content[0].text).toBe("Method example");
    });

  }

});
