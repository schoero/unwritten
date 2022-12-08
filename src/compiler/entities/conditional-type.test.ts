import { expect, it } from "vitest";

import { compile } from "quickdoks:tests:/utils/compile.js";
import { scope } from "quickdoks:tests:/utils/scope.js";
import { ts } from "quickdoks:tests:/utils/template.js";
import { ConditionalType, Kind, TypeParameter, TypeReference } from "quickdoks:types:types.js";

import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.ConditionalType, () => {

  {

    const testFileContent = ts`
      export type ConditionalTypeAlias<T extends "string" | "number"> = T extends "string" ? string : number;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const conditionalTypeAliasSymbol = exportedSymbols.find(s => s.name === "ConditionalTypeAlias")!;
    const conditionalTypeAlias = createTypeAliasBySymbol(ctx, conditionalTypeAliasSymbol);

    it("should be able to parse conditional types", () => {
      expect(conditionalTypeAlias.type.kind).to.equal(Kind.ConditionalType);
    });

    it("should have a matching checkType", () => {
      expect((conditionalTypeAlias.type as ConditionalType).checkType.kind).to.equal(Kind.TypeReference);
      expect(((conditionalTypeAlias.type as ConditionalType).checkType as TypeReference).type).to.not.equal(undefined);
      expect(((conditionalTypeAlias.type as ConditionalType).checkType as TypeReference).type!.kind).to.equal(Kind.TypeParameter);
      expect((((conditionalTypeAlias.type as ConditionalType).checkType as TypeReference).type as TypeParameter).constraint).to.not.equal(undefined);
      expect((((conditionalTypeAlias.type as ConditionalType).checkType as TypeReference).type as TypeParameter).constraint!.kind).to.equal(Kind.UnionType);
    });

    it("should have a matching extendsType", () => {
      expect((conditionalTypeAlias.type as ConditionalType).extendsType.kind).to.equal(Kind.StringLiteral);
    });

    it("should have a matching trueType", () => {
      expect((conditionalTypeAlias.type as ConditionalType).trueType.kind).to.equal(Kind.String);
    });

    it("should have a matching falseType", () => {
      expect((conditionalTypeAlias.type as ConditionalType).falseType.kind).to.equal(Kind.Number);
    });

  }

});
