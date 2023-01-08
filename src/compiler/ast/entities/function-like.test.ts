import { describe, expect, it } from "vitest";

import { createFunctionLikeEntity } from "quickdoks:compiler:entities";
import { EntityKind } from "quickdoks:compiler:enums/entities.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";


scope("Compiler", EntityKind.Function, () => {

  describe("Function symbol", () => {

    {

      const testFileContent = ts`
        export function functionSymbol(test: string): void {}
      `;

      const { exportedSymbols, ctx } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;

      it("should be able to create function like entities", () => {
        expect(createFunctionLikeEntity(ctx, symbol, EntityKind.Function).kind).to.equal(EntityKind.Function);
        expect(createFunctionLikeEntity(ctx, symbol, EntityKind.Getter).kind).to.equal(EntityKind.Getter);
        expect(createFunctionLikeEntity(ctx, symbol, EntityKind.Method).kind).to.equal(EntityKind.Method);
        expect(createFunctionLikeEntity(ctx, symbol, EntityKind.Setter).kind).to.equal(EntityKind.Setter);
      });

    }
  });
});
