import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isUnresolvedType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import { createFunctionEntity } from "./function.js";


scope("Interpreter", EntityKind.Function, () => {

  {

    const testFileContent = ts`
      /** 
       * Function description
       * @example Function example
       */
      export function functionSymbol(): boolean {
        return true;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedFunction.kind).toBe(EntityKind.Function);
    });

    it("should have a matching name", () => {
      expect(exportedFunction.name).toBe("functionSymbol");
    });

    it("should have a matching id", () => {
      expect(exportedFunction.symbolId).toBe(getSymbolId(ctx, symbol));
    });

    it("should have only one signature", () => {
      expect(exportedFunction.signatures).to.have.lengthOf(1);
    });

    it("should have a matching description", () => {
      expect(exportedFunction.signatures[0]!.description).toBe("Function description");
    });

    it("should have a matching example", () => {
      expect(exportedFunction.signatures[0]!.example).toBe("Function example");
    });

  }

  {

    const testFileContent = ts`
      export function functionSymbol(a: string);
      export function functionSymbol(a: string, b: string);
      export function functionSymbol(a: string, b?: string) {
        return true;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should support multiple signatures", () => {
      expect(exportedFunction.kind).toBe(EntityKind.Function);
    });
  }

  {

    const testFileContent = ts`
      export async function functionSymbol() {
        return true;
      }
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should be able to parse an async function", () => {
      expect(exportedFunction.kind).toBe(EntityKind.Function);
      expect(exportedFunction.signatures[0]?.modifiers).toContain("async");
      assert(isUnresolvedType(exportedFunction.signatures[0]?.returnType));
      expect(exportedFunction.signatures[0]?.returnType.typeArguments?.length).toBe(1);
      expect(exportedFunction.signatures[0]?.returnType.typeArguments?.[0].kind).toBe(TypeKind.Boolean);
    });

  }

});
