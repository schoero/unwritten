import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { isObjectType } from "unwritten:interpreter/typeguards/types.js";
import { createObjectLikeType } from "unwritten:interpreter/ast/types/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";
import { assert } from "unwritten:utils/general.js";


scope("Compiler", TypeKind.Object, () => {

  {

    const testFileContent = ts`
      export type ObjectType = {
        [key: string]: string;
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "ObjectType")!;
    const tsType = ctx.checker.getTypeAtLocation(symbol.declarations![0]!);

    assert(isObjectType(tsType), "tsType is not an object type");

    it("should be able to create object types", () => {
      expect(createObjectLikeType(ctx, tsType, TypeKind.TypeLiteral).kind).to.equal(TypeKind.TypeLiteral);
      expect(createObjectLikeType(ctx, tsType, TypeKind.ObjectLiteral).kind).to.equal(TypeKind.ObjectLiteral);
      expect(createObjectLikeType(ctx, tsType, TypeKind.Object).kind).to.equal(TypeKind.Object);
      expect(createObjectLikeType(ctx, tsType, TypeKind.Interface).kind).to.equal(TypeKind.Interface);
      expect(createObjectLikeType(ctx, tsType, TypeKind.Class).kind).to.equal(TypeKind.Class);
    });

  }

});
