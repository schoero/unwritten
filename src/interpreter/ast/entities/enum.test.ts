import { assert, expect, it } from "vitest";

import { createEnumEntity } from "unwritten:interpreter:ast/entities/index.js";
import { getSymbolId } from "unwritten:interpreter:ast/shared/id.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", EntityKind.Enum, () => {

  {

    const testFileContent = ts`
      export enum Enum {
        A,
        B
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Enum")!;
    const exportedTypeEnum = createEnumEntity(ctx, symbol);

    it("should be able to parse an intersection type", () => {
      expect(exportedTypeEnum.kind).toBe(EntityKind.Enum);
    });

  }

  {

    const testFileContent = ts`
      export enum Enum {};
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Enum")!;
    const exportedEnum = createEnumEntity(ctx, symbol);

    it("should be able to handle empty enums", () => {
      expect(exportedEnum.kind).toBe(EntityKind.Enum);
      expect(exportedEnum.members).toHaveLength(0);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Enum description
       * @example Enum example
       */
      export enum Enum {
        A,
        B
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Enum")!;
    const exportedEnum = createEnumEntity(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedEnum.kind).toBe(EntityKind.Enum);
    });

    it("should have a matching name", () => {
      expect(exportedEnum.name).toBe("Enum");
    });

    it("should have a matching id", () => {
      expect(exportedEnum.symbolId).toBe(getSymbolId(ctx, symbol));
    });

    it("should have a matching description", () => {
      expect(exportedEnum.description).toBe("Enum description");
    });

    it("should have a matching example", () => {
      expect(exportedEnum.example).toBe("Enum example");
    });

    it("should have a matching position", () => {
      expect(exportedEnum.position).to.deep.equal({
        column: 0,
        file: "/file.ts",
        line: 5
      });
    });

    it("should have the right amount of members", () => {
      expect(exportedEnum.members).toHaveLength(2);
    });

    it("should have a matching member types with values", () => {
      expect(exportedEnum.members[0]!.name).toBe("A");
      assert(exportedEnum.members[0]!.type.kind === TypeKind.NumberLiteral);
      expect(exportedEnum.members[0]!.type.value).toBe(0);
      expect(exportedEnum.members[1]!.name).toBe("B");
      assert(exportedEnum.members[1]!.type.kind === TypeKind.NumberLiteral);
      expect(exportedEnum.members[1]!.type.value).toBe(1);
    });

  }

  {

    const testFileContent = ts`
      export enum Enum {
        A
      };
      export enum Enum {
        B=1
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Enum")!;
    const exportedEnum = createEnumEntity(ctx, symbol);

    it("should be able to merge multiple enums with the same name", () => {
      expect(exportedEnum.members).toHaveLength(2);
      expect(exportedEnum.members[0]!.name).toBe("A");
      assert(exportedEnum.members[0]!.type.kind === TypeKind.NumberLiteral);
      expect(exportedEnum.members[0]!.type.value).toBe(0);
      expect(exportedEnum.members[1]!.name).toBe("B");
      assert(exportedEnum.members[1]!.type.kind === TypeKind.NumberLiteral);
      expect(exportedEnum.members[1]!.type.value).toBe(1);
    });

  }

});
