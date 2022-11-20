import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Intersection, TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createTypeAliasBySymbol } from "./alias.js";


scope("Compiler", TypeKind.Intersection, () => {

  {

    const testFileContent = ts`
      export type IntersectionType = { a: string } & { b: number };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "IntersectionType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse an intersection type", () => {
      expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Intersection);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Intersection type description
       * @example { a: string } & { b: number }
       */
      export type IntersectionType = { a: string } & { b: number };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "IntersectionType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(TypeKind.Intersection);
    });

    it("should have a matching name", () => {
      expect(exportedTypeAlias.name).to.equal("IntersectionType");
    });

    it("should have a matching id", () => {
      expect(exportedTypeAlias.id).to.equal(getIdBySymbol(ctx, symbol));
    });

    it("should have a matching description", () => {
      expect(exportedTypeAlias.description).to.equal("Intersection type description");
    });

    it("should have a matching example", () => {
      expect(exportedTypeAlias.example).to.equal("{ a: string } & { b: number }");
    });

    it("should have a matching position", () => {
      expect(exportedTypeAlias.position).to.deep.equal({
        column: 6,
        file: "/file.ts",
        line: 5
      });
    });

    it("should have the right amount of types", () => {
      expect((exportedTypeAlias.type as Intersection).types).to.have.lengthOf(2);
    });

  }

});
