import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createSourceFileBySymbol } from "./source-file.js";


scope("Compiler", TypeKind.SourceFile, () => {

  {

    const testFileContent = ts`
      export type SomeTypeAlias = string;
    `;

    const { fileSymbol, ctx } = compile(testFileContent.trim());
    const sourceFile = createSourceFileBySymbol(ctx, fileSymbol);

    it("should be able to parse a source file", () => {
      expect(sourceFile.kind).to.equal(TypeKind.SourceFile);
    });

  }

  {

    const testFileContent = ts`
      export type SomeTypeAlias = string;
    `;

    const { fileSymbol, ctx } = compile(testFileContent.trim());
    const sourceFile = createSourceFileBySymbol(ctx, fileSymbol);

    it("should have a matching kind", () => {
      expect(sourceFile.kind).to.equal(TypeKind.SourceFile);
    });

    it("should have a matching id", () => {
      expect(sourceFile.id).to.equal(getIdBySymbol(ctx, fileSymbol));
    });

    it("should have a matching name", () => {
      expect(sourceFile.name).to.equal(`"/file"`);
    });

    it("should have the right amount of types", () => {
      expect(sourceFile.exports.length).to.equal(1);
    });

  }

});
