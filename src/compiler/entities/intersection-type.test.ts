import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { IntersectionType, Kind } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", Kind.IntersectionType, () => {

  {

    const testFileContent = ts`
      export type IntersectionType = { a: string } & { b: number };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "IntersectionType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse an intersection type", () => {
      expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(Kind.IntersectionType);
    });

  }

  {

    const testFileContent = ts`
      export type IntersectionType = { a: string } & { b: number };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "IntersectionType")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).to.equal(Kind.TypeAlias);
      expect(exportedTypeAlias.type.kind).to.equal(Kind.IntersectionType);
    });

    it("should have the right amount of types", () => {
      expect((exportedTypeAlias.type as IntersectionType).types).to.have.lengthOf(2);
    });

  }

});
