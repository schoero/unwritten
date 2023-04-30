import { expect, it } from "vitest";

import { createSourceFileEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Interpreter", EntityKind.SourceFile, () => {

  {

    const testFileContent = ts`
      export type SomeTypeAlias = string;
    `;

    const { fileSymbol, ctx } = compile(testFileContent);
    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should be able to parse a source file", () => {
      expect(sourceFile.kind).to.equal(EntityKind.SourceFile);
    });

  }

  {

    const testFileContent = ts`
      export type SomeTypeAlias = string;
    `;

    const { fileSymbol, ctx } = compile(testFileContent);
    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should have a matching kind", () => {
      expect(sourceFile.kind).to.equal(EntityKind.SourceFile);
    });

    it("should have a matching id", () => {
      expect(sourceFile.symbolId).to.equal(getSymbolId(ctx, fileSymbol));
    });

    it("should have a matching name", () => {
      expect(sourceFile.name).to.equal("\"/file\"");
    });

    it("should have the right amount of types", () => {
      expect(sourceFile.exports.length).to.equal(1);
    });

  }

});