import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Interpreter", TypeKind.TemplateLiteral, () => {

  {

    const testFileContent = "" +
      "export type TemplateLiteralTypeAlias = `${number}px`";

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TemplateLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse a template literal type", () => {
      expect(exportedTypeAlias.kind).toBe(EntityKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.TemplateLiteral);
    });

    it("should have an empty head", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.head).toBe("");
    });

    it("should have one matching type", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.types).toHaveLength(1);
      expect(exportedTypeAlias.type.types[0]!.kind).toBe(TypeKind.Number);
    });

    it("should have one matching span", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.spans).toHaveLength(1);
      expect(exportedTypeAlias.type.spans[0]!).toBe("px");
    });

  }

  {

    const testFileContent = "" +
      "export type TemplateLiteralTypeAlias = `PREFIX-${number}-MIDDLE-${string}-SUFFIX`";

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TemplateLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching head", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.head).toBe("PREFIX-");
    });

    it("should have two matching types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.types).toHaveLength(2);
      expect(exportedTypeAlias.type.types[0]!.kind).toBe(TypeKind.Number);
      expect(exportedTypeAlias.type.types[1]!.kind).toBe(TypeKind.String);
    });

    it("should have two matching spans", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.spans).toHaveLength(2);
      expect(exportedTypeAlias.type.spans[0]!).toBe("-MIDDLE-");
      expect(exportedTypeAlias.type.spans[1]!).toBe("-SUFFIX");
    });

  }

  {

    const testFileContent = "" +
      "export type TemplateLiteralTypeAlias = `border-${'top' | 'bottom' | 'left' | 'right'}-${'width'}: ${number}px`";

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TemplateLiteralTypeAlias")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should have a matching head", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.head).toBe("border-");
    });

    it("should have three matching types", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.types).toHaveLength(3);
      expect(exportedTypeAlias.type.types[0]!.kind).toBe(TypeKind.Union);
      expect(exportedTypeAlias.type.types[1]!.kind).toBe(TypeKind.StringLiteral);
      expect(exportedTypeAlias.type.types[2]!.kind).toBe(TypeKind.Number);
    });

    it("should have three matching spans", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TemplateLiteral);
      expect(exportedTypeAlias.type.spans).toHaveLength(3);
      expect(exportedTypeAlias.type.spans[0]!).toBe("-");
      expect(exportedTypeAlias.type.spans[1]!).toBe(": ");
      expect(exportedTypeAlias.type.spans[2]!).toBe("px");
    });

  }

  {

    const testFileContent = "" +
      "type TemplateLiteralTypeAlias<Min extends number, Max extends number> = `${Min}...${Max}`;" +
      "export type Test = TemplateLiteralTypeAlias<10, 20>;";

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Test")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should result in a string literal", () => {
      assert(exportedTypeAlias.type.kind === TypeKind.TypeReference);
      expect(exportedTypeAlias.type.type?.kind).toBe(TypeKind.StringLiteral);
    });

  }

});
