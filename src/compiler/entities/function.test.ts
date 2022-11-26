import { describe, expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Function, Kind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createFunctionBySymbol } from "./function.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.Function, () => {

  describe("Function symbol", () => {

    {

      const testFileContent = ts`
        export function functionSymbol(): boolean {
          return true;
        }
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
      const exportedFunction = createFunctionBySymbol(ctx, symbol);

      it("should be able to parse a function", () => {
        expect(exportedFunction.kind).to.equal(Kind.Function);
      });

    }

    {

      const testFileContent = ts`
        export function functionSymbol(): boolean {
          return true;
        }
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
      const exportedFunction = createFunctionBySymbol(ctx, symbol);

      it("should have a matching kind", () => {
        expect(exportedFunction.kind).to.equal(Kind.Function);
      });

      it("should have a matching name", () => {
        expect(exportedFunction.name).to.equal("functionSymbol");
      });

      it("should have a matching id", () => {
        expect(exportedFunction.id).to.equal(getIdBySymbol(ctx, symbol));
      });

      it("should have one signature", () => {
        expect(exportedFunction.signatures).to.have.lengthOf(1);
      });

    }

  });

  describe("Function type", () => {

    {

      const testFileContent = ts`
        export type FunctionType = () => boolean;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "FunctionType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      it("should be able to parse a function type", () => {
        expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(Kind.Function);
      });

    }

    {

      const testFileContent = ts`
        export type FunctionType = () => boolean;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "FunctionType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      it("should have a matching kind", () => {
        expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(Kind.Function);
      });

      it("should have one signature", () => {
        expect((exportedTypeAlias.type as Function).signatures).to.have.lengthOf(1);
      });

    }

    {

      const testFileContent = ts`
        export type ObjectType = {
          (): boolean;
        };
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "ObjectType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      it("should export a type alias => type => function", () => {
        expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(Kind.Function);
      });

      const functionType = exportedTypeAlias.type as Function;

      it("should have its own id", () => {
        expect(exportedTypeAlias.id).to.not.equal(functionType.id);
      });

      it("should not have a name", () => {
        expect(functionType.name).to.equal(undefined);
      });

      it("should have one signature", () => {
        expect(functionType.signatures).to.have.lengthOf(1);
      });

      it("should have a return type which is a boolean", () => {
        expect(functionType.signatures[0]!.returnType.kind).to.equal(Kind.Boolean);
      });

    }

    {

      const testFileContent = ts`
        export async function functionSymbol(): boolean {
          return true;
        }
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
      const exportedFunction = createFunctionBySymbol(ctx, symbol);

      it("should be able to parse an async function", () => {
        expect(exportedFunction.kind).to.equal(Kind.Function);
      });

      it("should have the async modifier", () => {
        expect(exportedFunction.signatures[0]!.modifiers).to.include("async");
      });

    }

  });

});
