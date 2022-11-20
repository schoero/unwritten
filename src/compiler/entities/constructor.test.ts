import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { parse } from "../../parser/index.js";
import { isClassType } from "../../typeguards/types.js";
import { Instance, TypeKind } from "../../types/types.js";


scope("Compiler", TypeKind.Class, () => {

  {

    const testFileContent = ts`
      export class Class {
        constructor() {
        }
      }
    `;

    const { fileSymbol, ctx } = compile(testFileContent.trim());
    const exportedTypes = parse(ctx, fileSymbol);
    const exportedClass = exportedTypes.find(isClassType)!;

    it("should have an exported class", () => {
      expect(exportedClass).not.to.equal(undefined);
    });

    it("should have a matching constructor", () => {
      expect(exportedClass.ctor).not.to.equal(undefined);
      expect(exportedClass.ctor?.signatures).not.to.equal(undefined);
      expect(exportedClass.ctor?.signatures).to.have.lengthOf(1);
    });

    it("should return a reference to the class instance on the constructor", () => {
      expect(exportedClass.ctor!.signatures[0]!.returnType.kind).to.equal(TypeKind.Instance);
      expect((exportedClass.ctor!.signatures[0]!.returnType as Instance).id).to.equal(exportedClass.id);
      expect((exportedClass.ctor!.signatures[0]!.returnType as Instance).position).to.deep.equal(exportedClass.position);
    });

  }

});
