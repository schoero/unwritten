import { assert, expect, it } from "vitest";

import { createTypeAliasEntity } from "quickdoks:compiler:entities";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { compile } from "quickdoks:tests:utils/compile.js";
import { scope } from "quickdoks:tests:utils/scope.js";
import { ts } from "quickdoks:tests:utils/template.js";

import type { TypeParameterType } from "quickdoks:compiler:type-definitions/types.d.js";


scope("Compiler", TypeKind.Conditional, () => {

  {

    const testFileContent = ts`
      export type ConditionalTypeAlias<T extends "string" | "number"> = T extends "string" ? string : number;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const conditionalTypeAliasSymbol = exportedSymbols.find(s => s.name === "ConditionalTypeAlias")!;
    const conditionalTypeAlias = createTypeAliasEntity(ctx, conditionalTypeAliasSymbol);

    it("should be able to parse conditional types", () => {
      expect(conditionalTypeAlias.type.kind).to.equal(TypeKind.Conditional);
    });

    it("should have a matching checkType", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.Conditional);
      assert(conditionalTypeAlias.type.checkType.kind === TypeKind.TypeReference);
      expect(conditionalTypeAlias.type.checkType.type).to.not.equal(undefined);
      assert(conditionalTypeAlias.type.checkType.type!.kind === TypeKind.TypeParameter);
      expect((conditionalTypeAlias.type.checkType.type! as TypeParameterType).constraint).to.not.equal(undefined);
      expect((conditionalTypeAlias.type.checkType.type! as TypeParameterType).constraint!.kind).to.equal(TypeKind.Union);
    });

    it("should have a matching extendsType", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.Conditional);
      expect(conditionalTypeAlias.type.extendsType.kind).to.equal(TypeKind.StringLiteral);
    });

    it("should have a matching trueType", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.Conditional);
      expect(conditionalTypeAlias.type.trueType.kind).to.equal(TypeKind.String);
    });

    it("should have a matching falseType", () => {
      assert(conditionalTypeAlias.type.kind === TypeKind.Conditional);
      expect(conditionalTypeAlias.type.falseType.kind).to.equal(TypeKind.Number);
    });

  }

});
