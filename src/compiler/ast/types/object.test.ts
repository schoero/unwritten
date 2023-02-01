import { ts } from "unwritten:tests:utils/template.js";
import { describe, expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { isObjectType } from "unwritten:compiler:typeguards/types.js";
import { createObjectLikeType } from "unwritten:compiler:types";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";


scope("Compiler", EntityKind.Function, () => {

  describe("Function symbol", () => {

    {

      const testFileContent = ts`
        export type objectType = {
          [key: string]: string;
        };
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "objectType")!;
      const tsType = ctx.checker.getTypeAtLocation(symbol.declarations![0]!);

      assert(isObjectType(tsType), "tsType is not an object type");

      it("should be able to create object types", () => {
        expect(createObjectLikeType(ctx, tsType, TypeKind.TypeLiteral).kind).to.equal(TypeKind.TypeLiteral);
        expect(createObjectLikeType(ctx, tsType, TypeKind.ObjectLiteral).kind).to.equal(TypeKind.ObjectLiteral);
        expect(createObjectLikeType(ctx, tsType, TypeKind.Object).kind).to.equal(TypeKind.Object);
        expect(createObjectLikeType(ctx, tsType, TypeKind.Interface).kind).to.equal(TypeKind.Interface);
        expect(createObjectLikeType(ctx, tsType, TypeKind.ClassType).kind).to.equal(TypeKind.ClassType);
      });

    }
  });
});
