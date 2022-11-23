import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { MappedType, TypeKind, UnionType } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", TypeKind.MappedType, () => {

  {

    const testFileContent = ts`
      export type MappedTypeLiteral = {
        readonly [K in "A" | "B"]?: K[];
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "MappedTypeLiteral")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse mapped types", () => {
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.MappedType);
    });

    it("should be have matching modifiers", () => {
      expect((exportedTypeAlias.type as MappedType).readonly).to.equal(true);
      expect((exportedTypeAlias.type as MappedType).optional).to.equal(true);
    });

    it("should the correct amount of members", () => {
      expect((exportedTypeAlias.type as MappedType).members.length).to.equal(2);
    });

    it("should have matching members", () => {
      expect((exportedTypeAlias.type as MappedType).members[0]!.kind).to.equal(TypeKind.MappedTypeMember);
      expect((exportedTypeAlias.type as MappedType).members[1]!.kind).to.equal(TypeKind.MappedTypeMember);

      expect((exportedTypeAlias.type as MappedType).members[0]!.keyType.kind).to.equal(TypeKind.StringLiteral);
      expect((exportedTypeAlias.type as MappedType).members[1]!.keyType.kind).to.equal(TypeKind.StringLiteral);

      expect((exportedTypeAlias.type as MappedType).members[0]!.keyType.value).to.equal("A");
      expect((exportedTypeAlias.type as MappedType).members[1]!.keyType.value).to.equal("B");

      expect((exportedTypeAlias.type as MappedType).members[0]!.valueType.kind).to.equal(TypeKind.Array);
      expect((exportedTypeAlias.type as MappedType).members[1]!.valueType.kind).to.equal(TypeKind.Array);
    });

    it("should have a correct type parameter", () => {
      expect((exportedTypeAlias.type as MappedType).typeParameter.name).to.equal("K");
      expect((exportedTypeAlias.type as MappedType).typeParameter.constraint).to.not.equal(undefined);
      expect((exportedTypeAlias.type as MappedType).typeParameter.constraint!.kind).to.equal(TypeKind.UnionType);
      expect(((exportedTypeAlias.type as MappedType).typeParameter.constraint! as UnionType).types).to.have.lengthOf(2);
    });

  }

});
