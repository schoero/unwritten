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
        export function getterSymbol(test: string): void {}
        export function methodSymbol(test: string): void {}
        export function setterSymbol(test: string): void {}
      `;

      const { ctx, exportedSymbols } = compile(testFileContent);

      const functionSymbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
      const getterSymbol = exportedSymbols.find(s => s.name === "getterSymbol")!;
      const methodSymbol = exportedSymbols.find(s => s.name === "methodSymbol")!;
      const setterSymbol = exportedSymbols.find(s => s.name === "setterSymbol")!;

      it("should be able to create function like entities", () => {
        expect(createFunctionLikeEntity(ctx, functionSymbol, EntityKind.Function).kind).toBe(EntityKind.Function);
        expect(createFunctionLikeEntity(ctx, getterSymbol, EntityKind.Getter).kind).toBe(EntityKind.Getter);
        expect(createFunctionLikeEntity(ctx, methodSymbol, EntityKind.Method).kind).toBe(EntityKind.Method);
        expect(createFunctionLikeEntity(ctx, setterSymbol, EntityKind.Setter).kind).toBe(EntityKind.Setter);
      });

    }
  });
});
