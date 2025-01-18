import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";
import { assert, expect, it } from "vitest";


// https://github.com/microsoft/TypeScript/pull/21316

scope("Interpreter", TypeKind.Conditional, () => {

  {

    const testFileContent = ts`
      export type ConditionalTypeAlias<T extends "string" | "number"> = T extends "string" ? string : number;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const conditionalTypeAliasSymbol = exportedSymbols.find(s => s.name === "ConditionalTypeAlias")!;
    const conditionalTypeAlias = createTypeAliasEntity(ctx, conditionalTypeAliasSymbol);

    it("should be able to parse conditional types", () => {
      expect(conditionalTypeAlias.type.kind).toBe(TypeKind.Conditional);
    });

    it("should have a matching checkType", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.Conditional);
      assert(conditionalTypeAlias.type.checkType.kind === TypeKind.TypeReference);
      expect(conditionalTypeAlias.type.checkType.type).toBeDefined();
      assert(conditionalTypeAlias.type.checkType.type!.kind === TypeKind.TypeParameter);
      expect(conditionalTypeAlias.type.checkType.type.constraint).toBeDefined();
      expect(conditionalTypeAlias.type.checkType.type.constraint!.kind).toBe(TypeKind.Union);
    });

    it("should have a matching extendsType", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.Conditional);
      expect(conditionalTypeAlias.type.extendsType.kind).toBe(TypeKind.StringLiteral);
    });

    it("should have a matching trueType", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.Conditional);
      expect(conditionalTypeAlias.type.trueType.kind).toBe(TypeKind.String);
    });

    it("should have a matching falseType", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.Conditional);
      expect(conditionalTypeAlias.type.falseType.kind).toBe(TypeKind.Number);
    });

  }

  {

    const testFileContent = ts`
      type ConditionalTypeAlias<T extends "string" | "number"> = T extends "string" ? string : number;
      export type TruthyConditionalTypeReference = ConditionalTypeAlias<"string">;
      export type FalsyConditionalTypeReference = ConditionalTypeAlias<"number">;
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const truthyConditionalTypeReferenceSymbol = exportedSymbols.find(s => s.name === "TruthyConditionalTypeReference")!;
    const truthyConditionalTypeReference = createTypeAliasEntity(ctx, truthyConditionalTypeReferenceSymbol);
    const falsyConditionalTypeReferenceSymbol = exportedSymbols.find(s => s.name === "FalsyConditionalTypeReference")!;
    const falsyConditionalTypeReference = createTypeAliasEntity(ctx, falsyConditionalTypeReferenceSymbol);

    it("should resolve the type of instantiated type references to a conditional type", () => {
      assert(truthyConditionalTypeReference.type.kind === TypeKind.TypeReference);
      expect(truthyConditionalTypeReference.type.type).toBeDefined();
      expect(truthyConditionalTypeReference.type.type?.kind).toBe(TypeKind.String);

      assert(falsyConditionalTypeReference.type.kind === TypeKind.TypeReference);
      expect(falsyConditionalTypeReference.type.type).toBeDefined();
      expect(falsyConditionalTypeReference.type.type?.kind).toBe(TypeKind.Number);
    });

  }

});
