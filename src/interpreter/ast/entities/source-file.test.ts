/* eslint-disable @typescript-eslint/naming-convention */
import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { createSourceFileEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isNamespaceEntity, isVariableEntity } from "unwritten:typeguards/entities.js";
import { assert } from "unwritten:utils/general.js";
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
      expect(sourceFile.name).toBe("\"/index\"");
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

    it("should not filter out standalone default exports", () => {
      expect(sourceFile.exports).toHaveLength(1);
    });

  }

  {

    const otherFileContent = ts`
      export const test = "test" as const;
      export const test2 = "test2" as const;
    `;

    const yetAnotherFileContent = ts`
      export const test = "test" as const;
      export const test3 = "test3" as const;
    `;

    const testFileContent = ts`
      export * from "./other";
      export * from "./yet-another";
    `;

    const { ctx, fileSymbol } = compile({
      "/index.ts": testFileContent,
      "/other.ts": otherFileContent,
      "/yet-another.ts": yetAnotherFileContent
    });

    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should be able export directly from other files", () => {
      expect(sourceFile.exports).toHaveLength(3);
    });

    it("should keep the first symbol for directly exported symbols with identical names", () => {
      const export1 = sourceFile.exports[0];
      assert(isVariableEntity(export1));
      expect(export1.name).toBe("test");
      expect(export1.position?.file).toBe("/other.ts");
    });

  }

  {

    const otherFileContent = ts`
      export const test = "test" as const;
      export const test2 = "test2" as const;
    `;

    const testFileContent = ts`
      export * as other from "./other";
    `;

    const { ctx, fileSymbol } = compile({
      "/index.ts": testFileContent,
      "/other.ts": otherFileContent
    });

    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should be able to export other files as namespaces", () => {

      expect(sourceFile.exports).toHaveLength(1);

      const namespaceEntity = sourceFile.exports[0];
      assert(isNamespaceEntity(namespaceEntity));
      expect(namespaceEntity.name).toBe("other");

      expect(namespaceEntity.exports).toHaveLength(2);

    });

  }

  {

    const testFileContent = ts`
      const test = "test" as const
      export {
        test
      }
    `;

    const { ctx, fileSymbol } = compile(testFileContent);
    const sourceFile = createSourceFileEntity(ctx, fileSymbol);

    it("should resolve export specifiers directly", () => {
      expect(sourceFile.exports).toHaveLength(1);
      assert(isVariableEntity(sourceFile.exports[0]));
      expect(sourceFile.exports[0].type.kind).toBe(TypeKind.StringLiteral);
    });

  }
});
