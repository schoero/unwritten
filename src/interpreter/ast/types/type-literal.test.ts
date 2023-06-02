import { assert } from "node:console";

import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter:ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { TypeLiteralType } from "unwritten:interpreter:type-definitions/types.js";


scope("Interpreter", TypeKind.TypeLiteral, () => {

  {

    const testFileContent = ts`
      export type TypeLiteral = {
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    it("should be able to parse type literals", () => {
      expect(exportedTypeAlias.type.kind).toBe(TypeKind.TypeLiteral);
    });

  }

  {

    const testFileContent = ts`
      export type TypeLiteral = {
        new (): {};
        (): boolean;
        prop: string;
        funcProp: () => void;
        method(): void;  
        get getter(): string;
        set setter(value: string);
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeLiteral")!;
    const exportedTypeAlias = createTypeAliasEntity(ctx, symbol);

    assert(exportedTypeAlias.type.kind === TypeKind.TypeLiteral);

    const typeLiteral = exportedTypeAlias.type as TypeLiteralType;


    it("should be able to handle construct signatures", () => {
      expect(typeLiteral.constructSignatures).toHaveLength(1);
    });

    it("should be able to handle call signatures", () => {
      expect(typeLiteral.callSignatures).toHaveLength(1);
    });

    it("should be able to handle properties", () => {
      expect(typeLiteral.properties).toHaveLength(2);
    });

    it("should be able to handle methods", () => {
      expect(typeLiteral.methods).toHaveLength(1);
    });

    it("should differentiate between methods and function properties", () => {
      expect(typeLiteral.methods.find(m => m.name === "method")).toBeDefined();
      expect(typeLiteral.properties.find(p => p.name === "funcProp")).toBeDefined();
    });

    it("should be able to handle getters", () => {
      expect(typeLiteral.getters).toHaveLength(1);
    });

    it("should be able to handle setters", () => {
      expect(typeLiteral.setters).toHaveLength(1);
    });

  }

});
