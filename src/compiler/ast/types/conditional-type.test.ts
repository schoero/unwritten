import { expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { EntityKind } from "quickdoks:compiler:type-definitions/entities.d.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { TypeParameterEntity, TypeReferenceEntity } from "quickdoks:compiler:type-definitions/entities.d.js";
import type { ConditionalType } from "quickdoks:compiler:type-definitions/types.d.js";


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

    it("should have a matching checkType", () => {
      expect((conditionalTypeAlias.type as ConditionalType).checkType.kind).to.equal(EntityKind.TypeReference);
      expect(((conditionalTypeAlias.type as ConditionalType).checkType as TypeReferenceEntity).type).to.not.equal(undefined);
      expect(((conditionalTypeAlias.type as ConditionalType).checkType as TypeReferenceEntity).type.kind).to.equal(TypeKind.TypeParameter);
      expect((((conditionalTypeAlias.type as ConditionalType).checkType as TypeReferenceEntity).type as TypeParameterEntity).constraint).to.not.equal(undefined);
      expect((((conditionalTypeAlias.type as ConditionalType).checkType as TypeReferenceEntity).type as TypeParameterEntity).constraint.kind).to.equal(TypeKind.UnionType);
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
