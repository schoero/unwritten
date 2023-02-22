import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:compiler:entities";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Compiler", TypeKind.ClassType, () => {

  {

    const testFileContent = ts`
      class Class {
      }
      export type ClassType = InstanceType<typeof Class>;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ClassType")!;
    const exportedClassType = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse a class type", () => {
      assert(exportedClassType.type.kind === TypeKind.TypeReference);
      expect(exportedClassType.type.type!.kind).to.equal(TypeKind.ClassType);
    });

  }

  {

    const testFileContent = ts`
      class Class {
        public property: string = "test";
      }
      export type ClassType = InstanceType<typeof Class>;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ClassType")!;
    const exportedClassType = createTypeAliasEntity(ctx, symbol);

    it("should have one property", () => {
      assert(exportedClassType.type.kind === TypeKind.TypeReference);
      assert(exportedClassType.type.type!.kind === TypeKind.ClassType);
      expect(exportedClassType.type.type.properties).to.have.lengthOf(1);
    });

  }

});
