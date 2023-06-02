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
      expect(exportedTypeEnum.kind).to.equal(EntityKind.Enum);
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
      expect(exportedEnum.kind).to.equal(EntityKind.Enum);
      expect(exportedEnum.members.length).to.equal(0);
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
      expect(exportedEnum.kind).to.equal(EntityKind.Enum);
    });

    it("should have a matching name", () => {
      expect(exportedEnum.name).to.equal("Enum");
    });

    it("should have a matching id", () => {
      expect(exportedEnum.symbolId).to.equal(getSymbolId(ctx, symbol));
    });

    it("should have a matching description", () => {
      expect(exportedEnum.description).to.equal("Enum description");
    });

    it("should have a matching example", () => {
      expect(exportedEnum.example).to.equal("Enum example");
    });

    it("should have a matching position", () => {
      expect(exportedEnum.position).to.deep.equal({
        column: 0,
        file: "/file.ts",
        line: 5
      });
    });

    it("should have the right amount of members", () => {
      expect(exportedEnum.members).to.have.lengthOf(2);
    });

    it("should have a matching member types with values", () => {
      expect(exportedEnum.members[0]!.name).to.equal("A");
      assert(exportedEnum.members[0]!.type.kind === TypeKind.NumberLiteral);
      expect(exportedEnum.members[0]!.type.value).to.equal(0);
      expect(exportedEnum.members[1]!.name).to.equal("B");
      assert(exportedEnum.members[1]!.type.kind === TypeKind.NumberLiteral);
      expect(exportedEnum.members[1]!.type.value).to.equal(1);
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
      expect(exportedEnum.members.length).to.equal(2);
      expect(exportedEnum.members[0]!.name).to.equal("A");
      assert(exportedEnum.members[0]!.type.kind === TypeKind.NumberLiteral);
      expect(exportedEnum.members[0]!.type.value).to.equal(0);
      expect(exportedEnum.members[1]!.name).to.equal("B");
      assert(exportedEnum.members[1]!.type.kind === TypeKind.NumberLiteral);
      expect(exportedEnum.members[1]!.type.value).to.equal(1);
    });

  }

});
