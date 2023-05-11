import { expect, it } from "vitest";

import { createTypeAliasEntity, createVariableEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isSetType, isTypeReferenceType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.Set, () => {

  {

    const testFileContent = ts`
      export type SetType = Set<string>;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "SetType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an Set type", () => {
      assert(isTypeReferenceType(exportedTypeAlias.type));
      expect(exportedTypeAlias.type.type?.kind).to.equal(TypeKind.Set);
    });

    it("should have a correct type", () => {
      assert(isTypeReferenceType(exportedTypeAlias.type));
      assert(isSetType(exportedTypeAlias.type.type!));
      expect(exportedTypeAlias.type.type.type.kind).to.equal(TypeKind.String);
    });

  }

  {

    const testFileContent = ts`
      export const set = new Set(["a", "b"])
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "set")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to infer the type of a Set", () => {
      expect(exportedVariable.kind).to.equal(EntityKind.Variable);
      expect(exportedVariable.type.kind).to.equal(TypeKind.Set);
    });

    it("should have a correct type", () => {
      assert(isSetType(exportedVariable.type));
      expect(exportedVariable.type.type.kind).to.equal(TypeKind.String);
    });

  }

});
