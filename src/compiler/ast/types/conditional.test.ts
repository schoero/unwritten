import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type {
  ConditionalType,
  TypeParameterType,
  TypeReferenceType
} from "quickdoks:compiler:type-definitions/types.d.js";


scope("Compiler", TypeKind.ConditionalType, () => {

  {

    const testFileContent = ts`
      export type ConditionalTypeAlias<T extends "string" | "number"> = T extends "string" ? string : number;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const conditionalTypeAliasSymbol = exportedSymbols.find(s => s.name === "ConditionalTypeAlias")!;
    const conditionalTypeAlias = createTypeAliasEntity(ctx, conditionalTypeAliasSymbol);

    it("should be able to parse conditional types", () => {
      expect(conditionalTypeAlias.type.kind).to.equal(TypeKind.ConditionalType);
    });

    const conditionalType = conditionalTypeAlias.type as ConditionalType;

    it("should have a matching checkType", () => {
      expect(conditionalType.checkType.kind).to.equal(TypeKind.TypeReference);
      expect((conditionalType.checkType as TypeReferenceType).type).to.not.equal(undefined);
      expect((conditionalType.checkType as TypeReferenceType).type!.kind).to.equal(TypeKind.TypeParameter);
      expect(((conditionalType.checkType as TypeReferenceType).type! as TypeParameterType).constraint).to.not.equal(undefined);
      expect(((conditionalType.checkType as TypeReferenceType).type! as TypeParameterType).constraint!.kind).to.equal(TypeKind.UnionType);
    });

    it("should have a matching extendsType", () => {
      expect(conditionalType.extendsType.kind).to.equal(TypeKind.StringLiteral);
    });

    it("should have a matching trueType", () => {
      expect(conditionalType.trueType.kind).to.equal(TypeKind.String);
    });

    it("should have a matching falseType", () => {
      expect(conditionalType.falseType.kind).to.equal(TypeKind.Number);
    });

  }

});
