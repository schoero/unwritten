import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind, TypeLiteral } from "../../types/types.js";
import { createTypeAliasBySymbol } from "./type-alias.js";


scope("Compiler", TypeKind.TypeLiteral, () => {

  {

    const testFileContent = ts`
      /** TypeLiteral description */
      export type TypeLiteral {
        /** Member description */
        a: string;
        /** @example 7 */
        b: number;
      }
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedVariable = createTypeAliasBySymbol(ctx, symbol);
    const typeLiteralType = exportedVariable.type as TypeLiteral;

    it("should have a matching kind", () => {
      expect(exportedVariable.kind).to.equal(TypeKind.TypeAlias);
    });

    it("should have a matching name", () => {
      expect(exportedVariable.name).to.equal("TypeLiteral");
    });

    it("should have a matching type", () => {
      expect(exportedVariable.type.kind).to.equal(TypeKind.TypeLiteral);
      expect(typeLiteralType.members.length).to.equal(2);
    });

    it("should have matching members", () => {
      expect(typeLiteralType.members[0]!.name).to.equal("a");
      expect(typeLiteralType.members[0]!.type.kind).to.equal(TypeKind.String);
      expect(typeLiteralType.members[0]!.position).to.deep.equal({ column: 8, file: "/file.ts", line: 4 });
      expect(typeLiteralType.members[0]!.description).to.equal("Member description");
      expect(typeLiteralType.members[1]!.name).to.equal("b");
      expect(typeLiteralType.members[1]!.example).to.equal("7");
      expect(typeLiteralType.members[1]!.type.kind).to.equal(TypeKind.Number);
      expect(typeLiteralType.members[1]!.position).to.deep.equal({ column: 8, file: "/file.ts", line: 6 });
    });

    it("should have a matching description", () => {
      expect(exportedVariable.description).to.equal("TypeLiteral description");
    });

    it("should have a matching position", () => {
      expect(exportedVariable.position).to.deep.equal({
        column: 6,
        file: "/file.ts",
        line: 2
      });
    });

  }

});
