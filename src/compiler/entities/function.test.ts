import { describe, expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Function, TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createTypeAliasBySymbol } from "./alias.js";
import { createFunction } from "./function.js";


scope("Compiler", TypeKind.Function, () => {

  describe("Function symbol", () => {

    {

      const testFileContent = ts`
        export function functionSymbol(): boolean {
          return true;
        }
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
      const exportedFunction = createFunction(ctx, symbol);

      it("should be able to parse an intersection type", () => {
        expect(exportedFunction.kind).to.equal(TypeKind.Function);
      });

    }

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

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "functionSymbol")!;
      const exportedFunction = createFunction(ctx, symbol);

      it("should have a matching kind", () => {
        expect(exportedFunction.kind).to.equal(TypeKind.Function);
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

      it("should have a matching description", () => {
        expect(exportedFunction.signatures[0]!.description).to.equal("Function description");
      });

      it("should have a matching example", () => {
        expect(exportedFunction.signatures[0]!.example).to.equal("Function example");
      });

      it("should have a matching position", () => {
        expect(exportedFunction.signatures[0]!.position).to.deep.equal({
          column: 8,
          file: "/file.ts",
          line: 5
        });
      });

      it("should have a return type which is a boolean", () => {
        expect(exportedFunction.signatures[0]!.returnType.kind).to.equal(TypeKind.Boolean);
      });

    }

    {

      const testFileContent = ts`
        export function add(a: number, b: number): number;
        export function add(a: number, b: number, c: number): number;
        export function add(a: number, b: number, c?: number): number {
          return a + b + (c ?? 0);
        }
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "add")!;
      const exportedFunction = createFunction(ctx, symbol);

      it("should be able to handle overloads", () => {
        expect(exportedFunction.signatures).to.have.lengthOf(2);
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

      it("should be able to parse an intersection type", () => {
        expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Function);
      });

    }

    {

      const testFileContent = ts`
        /**
         * Function type description
         * @example Function type example
         */
        export type FunctionType = () => boolean;
      `;

      const { exportedSymbols, ctx } = compile(testFileContent.trim());

      const symbol = exportedSymbols.find(s => s.name === "FunctionType")!;
      const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

      it("should have a matching kind", () => {
        expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Function);
      });

      it("should have a matching name", () => {
        expect(exportedTypeAlias.name).to.equal("FunctionType");
      });

      it("should have a matching id", () => {
        expect(exportedTypeAlias.id).to.equal(getIdBySymbol(ctx, symbol));
      });

      it("should have a matching description", () => {
        expect(exportedTypeAlias.description).to.equal("Function type description");
      });

      it("should have a matching example", () => {
        expect(exportedTypeAlias.example).to.equal("Function type example");
      });

      it("should have a matching position", () => {
        expect(exportedTypeAlias.position).to.deep.equal({
          column: 8,
          file: "/file.ts",
          line: 5
        });
      });

      it("should have one signature", () => {
        expect((exportedTypeAlias.type as Function).signatures).to.have.lengthOf(1);
      });

      it("should have a return type which is a boolean", () => {
        expect((exportedTypeAlias.type as Function).signatures[0]!.returnType.kind).to.equal(TypeKind.Boolean);
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
        expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
        expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Function);
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
        expect(functionType.signatures[0]!.returnType.kind).to.equal(TypeKind.Boolean);
      });

    }

  });

});
