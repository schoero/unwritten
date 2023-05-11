import { expect, it } from "vitest";

import { createTypeAliasEntity, createVariableEntity } from "unwritten:interpreter:ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isMapType, isTypeReferenceType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";


scope("Interpreter", TypeKind.Map, () => {

  {

    const testFileContent = ts`
      export type MapType = Map<string, number>;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "MapType")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse an Map type", () => {
      assert(isTypeReferenceType(exportedTypeAlias.type));
      expect(exportedTypeAlias.type.type?.kind).to.equal(TypeKind.Map);
    });

    it("should have a correct keyType", () => {
      assert(isTypeReferenceType(exportedTypeAlias.type));
      assert(isMapType(exportedTypeAlias.type.type!));
      expect(exportedTypeAlias.type.type.keyType.kind).to.equal(TypeKind.String);
    });

    it("should have a correct valueType", () => {
      assert(isTypeReferenceType(exportedTypeAlias.type));
      assert(isMapType(exportedTypeAlias.type.type!));
      expect(exportedTypeAlias.type.type.valueType.kind).to.equal(TypeKind.Number);
    });

  }

  {

    const testFileContent = ts`
      export const map = new Map([["a", 1], ["b", 2]])
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "map")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to infer the type of a Map", () => {
      expect(exportedVariable.kind).to.equal(EntityKind.Variable);
      expect(exportedVariable.type.kind).to.equal(TypeKind.Map);
    });

    it("should have a correct keyType", () => {
      assert(isMapType(exportedVariable.type));
      expect(exportedVariable.type.keyType.kind).to.equal(TypeKind.String);
    });

    it("should have a correct valueType", () => {
      assert(isMapType(exportedVariable.type));
      expect(exportedVariable.type.valueType.kind).to.equal(TypeKind.Number);
    });

  }

});
