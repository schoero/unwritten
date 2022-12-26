import { expect, it } from "vitest";

import { getIdBySymbol } from "quickdoks:compiler:compositions/id.js";
import { createSourceFileBySymbol } from "quickdoks:compiler:entities";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";
import { Kind } from "quickdoks:types:types.js";


scope("Compiler", Kind.SourceFile, () => {

  {

    const testFileContent = ts`
      export type SomeTypeAlias = string;
    `;

    const { fileSymbol, ctx } = compile(testFileContent);
    const sourceFile = createSourceFileBySymbol(ctx, fileSymbol);

    it("should be able to parse a source file", () => {
      expect(sourceFile.kind).to.equal(Kind.SourceFile);
    });

  }

  {

    const testFileContent = ts`
      export type SomeTypeAlias = string;
    `;

    const { fileSymbol, ctx } = compile(testFileContent);
    const sourceFile = createSourceFileBySymbol(ctx, fileSymbol);

    it("should have a matching kind", () => {
      expect(sourceFile.kind).to.equal(Kind.SourceFile);
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
