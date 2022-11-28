import { expect, it } from "vitest";

import { compile } from "../../../tests/utils/compile.js";
import { scope } from "../../../tests/utils/scope.js";
import { ts } from "../../../tests/utils/template.js";
import { Kind, ObjectLiteral } from "../../types/types.js";
import { createVariableBySymbol } from "./variable.js";


scope("Compiler", Kind.ObjectLiteral, () => {

  {

    const testFileContent = ts`
      export const objectLiteral = {
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "objectLiteral")!;
    const exportedVariable = createVariableBySymbol(ctx, symbol);

    it("should be able to parse object literals", () => {
      expect(exportedVariable.type.kind).to.equal(Kind.ObjectLiteral);
    });

  }

  {

    const testFileContent = ts`
      export const objectLiteral = {
        prop: "hello",
        funcProp: () => { },
        method() {},
        get getter() { return "hello"; },
        set setter(value: string) { }
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "objectLiteral")!;
    const exportedVariable = createVariableBySymbol(ctx, symbol);

    it("should be able to handle properties", () => {
      expect((exportedVariable.type as ObjectLiteral).properties.length).to.equal(2);
    });

    it("should be able to handle methods", () => {
      expect((exportedVariable.type as ObjectLiteral).methods.length).to.equal(1);
    });

    it("should differentiate between methods and function properties", () => {
      expect((exportedVariable.type as ObjectLiteral).methods.find(m => m.name === "method")).to.not.equal(undefined);
      expect((exportedVariable.type as ObjectLiteral).properties.find(p => p.name === "funcProp")).to.not.equal(undefined);
    });

    it("should be able to handle getters", () => {
      expect((exportedVariable.type as ObjectLiteral).getters.length).to.equal(1);
    });

    it("should be able to handle setters", () => {
      expect((exportedVariable.type as ObjectLiteral).setters.length).to.equal(1);
    });

  }

});
