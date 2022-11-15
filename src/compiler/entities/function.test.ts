import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { Function, TypeKind } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./alias.js";


scope("Compiler", TypeKind.Function, () => {

  {

    const testFileContent = `
      export type FunctionType = () => boolean;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "FunctionType")!;
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

  {

    const testFileContent = `
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
