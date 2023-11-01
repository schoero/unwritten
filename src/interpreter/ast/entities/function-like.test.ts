import { describe, expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity";
import { createFunctionLikeEntity } from "unwritten:interpreter:ast/entities/index";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


scope("Interpreter", EntityKind.Function, () => {

  describe("function symbol", () => {

    {

      const testFileContent = ts`
        export function functionSymbol(test: string): void {}
      `;

      const { ctx, exportedSymbols } = compile(testFileContent);

      const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;

      it("should be able to create function like entities", () => {
        expect(createFunctionLikeEntity(ctx, symbol, EntityKind.Function).kind).toBe(EntityKind.Function);
        expect(createFunctionLikeEntity(ctx, symbol, EntityKind.Getter).kind).toBe(EntityKind.Getter);
        expect(createFunctionLikeEntity(ctx, symbol, EntityKind.Method).kind).toBe(EntityKind.Method);
        expect(createFunctionLikeEntity(ctx, symbol, EntityKind.Setter).kind).toBe(EntityKind.Setter);
      });

    }
  });
});
