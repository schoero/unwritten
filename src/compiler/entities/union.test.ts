import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind, Union } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createTypeAliasBySymbol } from "./alias.js";


scope("Compiler", TypeKind.Union, () => {

  {

    const testFileContent = ts`
      export type UnionType = string | number;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "UnionType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse an union type", () => {
      expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Union);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Union type description
       * @example Union type example
       */
      export type UnionType = string | number;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "UnionType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Union);
    });

    it("should have a matching name", () => {
      expect(exportedTypeAlias.name).to.equal("UnionType");
    });

    it("should have a matching id", () => {
      expect(exportedTypeAlias.id).to.equal(getIdBySymbol(ctx, symbol));
    });

    it("should have a matching description", () => {
      expect(exportedTypeAlias.description).to.equal("Union type description");
    });

    it("should have a matching example", () => {
      expect(exportedTypeAlias.example).to.equal("Union type example");
    });

    it("should have a matching position", () => {
      expect(exportedTypeAlias.position).to.deep.equal({
        column: 6,
        file: "/file.ts",
        line: 5
      });
    });

    it("should have the right amount of types", () => {
      expect((exportedTypeAlias.type as Union).types).to.have.lengthOf(2);
    });

    it("should have the right types", () => {
      expect((exportedTypeAlias.type as Union).types[0]!.kind).to.equal(TypeKind.String);
      expect((exportedTypeAlias.type as Union).types[1]!.kind).to.equal(TypeKind.Number);
    });

  }

});
