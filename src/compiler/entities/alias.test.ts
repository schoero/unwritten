import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { TypeKind } from "../../types/types.js";
import { getIdBySymbol } from "../compositions/id.js";
import { createTypeAliasBySymbol } from "./alias.js";


scope("Compiler", TypeKind.TypeAlias, () => {

  {

    const testFileContent = ts`
      export type TypeAlias = string;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should be able to parse a type alias", () => {
      expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
    });

  }

  {

    const testFileContent = ts`
      /**
       * Type alias description 
       * @example "hello"
       */
      export type TypeAlias = string;
    `;

    const { exportedSymbols, ctx } = compile(testFileContent.trim());

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const exportedTypeAlias = createTypeAliasBySymbol(ctx, symbol);

    it("should have a matching kind", () => {
      expect(exportedTypeAlias.kind).to.equal(TypeKind.TypeAlias);
    });

    it("should have a matching name", () => {
      expect(exportedTypeAlias.name).to.equal("TypeAlias");
    });

    it("should have a matching id", () => {
      expect(exportedTypeAlias.id).to.equal(getIdBySymbol(ctx, symbol));
    });

    it("should have a matching description", () => {
      expect(exportedTypeAlias.description).to.equal("Type alias description");
    });

    it("should have a matching example", () => {
      expect(exportedTypeAlias.example).to.equal("\"hello\"");
    });

    it("should have a matching position", () => {
      expect(exportedTypeAlias.position).to.deep.equal({
        column: 6,
        file: "/file.ts",
        line: 5
      });
    });

  }

});
