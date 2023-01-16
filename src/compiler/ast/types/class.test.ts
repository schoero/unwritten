import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { ClassType, TypeReferenceType } from "quickdoks:compiler/type-definitions/types.js";


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
      expect((exportedClassType.type as TypeReferenceType).type!.kind).to.equal(TypeKind.ClassType);
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
      expect((exportedClassType.type as TypeReferenceType).type!.kind).to.equal(TypeKind.ClassType);
      expect(((exportedClassType.type as TypeReferenceType).type! as ClassType).properties).to.have.lengthOf(1);
    });

  }

});
