import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Intersection, TypeKind } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./alias.js";


scope("Compiler", TypeKind.Intersection, () => {

  const testFileContent = ts`
    type A = {
      a: string;
    };
    type B = {
      b: string;
    };
    export type IntersectionType = A & B;
  `;

  const { exportedSymbols, ctx } = compile(testFileContent.trim());

  const symbol = exportedSymbols.find(s => s.name === "IntersectionType")!;
  const exportedVariable = createTypeAliasBySymbol(ctx, symbol);

  it("should have a matching kind", () => {
    expect(exportedVariable.kind).to.equal(TypeKind.TypeAlias);
    expect(exportedVariable.type.kind).to.equal(TypeKind.Intersection);
  });

  it("should have the right amount of types", () => {
    expect((exportedVariable.type as Intersection).types).to.have.lengthOf(2);
  });

});
