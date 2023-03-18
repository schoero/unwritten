import { expect, it } from "vitest";

import { getIdBySymbol } from "unwritten:interpreter:ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";

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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedFunction.kind).to.equal(EntityKind.Function);
    });

    it("should have a matching name", () => {
      expect(exportedFunction.name).to.equal("functionSymbol");
    });

    it("should have a matching id", () => {
      expect(exportedFunction.id).to.equal(getIdBySymbol(ctx, symbol));
    });

    it("should have only one signature", () => {
      expect(exportedFunction.signatures).to.have.lengthOf(1);
    });

    it("should have a matching description", () => {
      expect(exportedFunction.signatures[0]!.description).to.equal("Function description");
    });

    it("should have a matching example", () => {
      expect(exportedFunction.signatures[0]!.example).to.equal("Function example");
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

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should support multiple signatures", () => {
      expect(exportedFunction.kind).to.equal(EntityKind.Function);
    });
  }

  {

    const testFileContent = ts`
      export async function functionSymbol(): boolean {
        return true;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
    const exportedFunction = createFunctionEntity(ctx, symbol);

    it("should be able to parse an async function", () => {
      expect(exportedFunction.kind).to.equal(EntityKind.Function);
    });

  }

});
