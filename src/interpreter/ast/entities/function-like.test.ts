import { describe, expect, it } from "vitest";

import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Function, () => {

  describe("function symbol", () => {

    {

      const testFileContent = ts`
        export function functionSymbol(test: string): void {}
      `;

      const { ctx, exportedSymbols } = compile(testFileContent);

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
