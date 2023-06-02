import { expect, it } from "vitest";

import { createSourceFileEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.SourceFile, () => {

  {

    const testFileContent = ts`
      export type SomeTypeAlias = string;
    `;

    const { ctx, fileSymbol } = compile(testFileContent);
    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should be able to parse a source file", () => {
      expect(sourceFile.kind).toBe(EntityKind.SourceFile);
    });

  }

  {

    const testFileContent = ts`
      export type SomeTypeAlias = string;
    `;

    const { ctx, fileSymbol } = compile(testFileContent);
    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should have a matching kind", () => {
      expect(sourceFile.kind).toBe(EntityKind.SourceFile);
    });

    it("should have a matching id", () => {
      expect(sourceFile.symbolId).toBe(getSymbolId(ctx, fileSymbol));
    });

    it("should have a matching name", () => {
      expect(sourceFile.name).toBe("\"/file\"");
    });

    it("should have the right amount of types", () => {
      expect(sourceFile.exports).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      export const test = "test";
      export default test;
    `;

    const { ctx, fileSymbol } = compile(testFileContent);
    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should filter out default exports if they are exported as named exports", () => {
      expect(sourceFile.exports).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      const test = "test";
      export default test;
    `;

    const { ctx, fileSymbol } = compile(testFileContent);
    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should not filter out default exports if they aren't exported as named exports", () => {
      expect(sourceFile.exports).toHaveLength(1);
    });

  }

  {

    const testFileContent = ts`
      export default () => {};
    `;

    const { ctx, fileSymbol } = compile(testFileContent);
    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should not filter out default exports if they aren't exported as named exports", () => {
      expect(sourceFile.exports).toHaveLength(1);
    });

  }

});
