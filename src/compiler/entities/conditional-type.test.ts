import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { ConditionalType, TypeKind, TypeParameter, TypeReference } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", TypeKind.ConditionalType, () => {

  {

    const testFileContent = ts`
      export type ConditionalTypeAlias<T extends "string" | "number"> = T extends "string" ? string : number;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const conditionalTypeAliasSymbol = exportedSymbols.find(s => s.name === "ConditionalTypeAlias")!;
    const conditionalTypeAlias = createTypeAliasBySymbol(ctx, conditionalTypeAliasSymbol);

    it("should be able to parse conditional types", () => {
      expect(conditionalTypeAlias.type.kind).to.equal(TypeKind.ConditionalType);
      expect((conditionalTypeAlias.type as ConditionalType).kind).to.equal(TypeKind.ConditionalType);
    });

    it("should have a matching checkType", () => {
      expect((conditionalTypeAlias.type as ConditionalType).checkType.kind).to.equal(TypeKind.TypeReference);
      expect(((conditionalTypeAlias.type as ConditionalType).checkType as TypeReference).type).to.not.equal(undefined);
      expect(((conditionalTypeAlias.type as ConditionalType).checkType as TypeReference).type!.kind).to.equal(TypeKind.TypeParameter);
      expect((((conditionalTypeAlias.type as ConditionalType).checkType as TypeReference).type as TypeParameter).constraint).to.not.equal(undefined);
      expect((((conditionalTypeAlias.type as ConditionalType).checkType as TypeReference).type as TypeParameter).constraint!.kind).to.equal(TypeKind.UnionType);
    });

    it("should have a matching extendsType", () => {
      expect((conditionalTypeAlias.type as ConditionalType).extendsType.kind).to.equal(TypeKind.StringLiteral);
    });

    it("should have a matching trueType", () => {
      expect((conditionalTypeAlias.type as ConditionalType).trueType.kind).to.equal(TypeKind.String);
    });

    it("should have a matching falseType", () => {
      expect((conditionalTypeAlias.type as ConditionalType).falseType.kind).to.equal(TypeKind.Number);
    });

  }

});
