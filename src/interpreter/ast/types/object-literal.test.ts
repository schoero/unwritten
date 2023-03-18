import { assert, expect, it } from "vitest";

import { createVariableEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";


scope("Interpreter", TypeKind.ObjectLiteral, () => {

  {

    const testFileContent = ts`
      export const objectLiteral = {
      };
    `;

    const { exportedSymbols, ctx } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "objectLiteral")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to parse object literals", () => {
      expect(exportedVariable.type.kind).to.equal(TypeKind.ObjectLiteral);
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
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to handle properties", () => {
      assert(exportedVariable.type.kind === TypeKind.ObjectLiteral);
      expect(exportedVariable.type.properties.length).to.equal(2);
    });

    it("should be able to handle methods", () => {
      assert(exportedVariable.type.kind === TypeKind.ObjectLiteral);
      expect(exportedVariable.type.methods.length).to.equal(1);
    });

    it("should differentiate between methods and function properties", () => {
      assert(exportedVariable.type.kind === TypeKind.ObjectLiteral);
      expect(exportedVariable.type.methods.find(m => m.name === "method")).to.not.equal(undefined);
      expect(exportedVariable.type.properties.find(p => p.name === "funcProp")).to.not.equal(undefined);
    });

    it("should be able to handle getters", () => {
      assert(exportedVariable.type.kind === TypeKind.ObjectLiteral);
      expect(exportedVariable.type.getters.length).to.equal(1);
    });

    it("should be able to handle setters", () => {
      assert(exportedVariable.type.kind === TypeKind.ObjectLiteral);
      expect(exportedVariable.type.setters.length).to.equal(1);
    });

  }

});
