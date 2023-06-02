import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


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

});
