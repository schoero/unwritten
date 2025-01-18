import { createVariableEntity } from "unwritten:interpreter:ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { compile } from "unwritten:tests:utils/compile";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";
import { assert, expect, it } from "vitest";


scope("Interpreter", TypeKind.ObjectLiteral, () => {

  {

    const testFileContent = ts`
      export const objectLiteral = {
      };
    `;

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "objectLiteral")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to parse object literals", () => {
      expect(exportedVariable.type.kind).toBe(TypeKind.ObjectLiteral);
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

    const { ctx, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "objectLiteral")!;
    const exportedVariable = createVariableEntity(ctx, symbol);

    it("should be able to handle properties", () => {
      assert(exportedVariable.type.kind === TypeKind.ObjectLiteral);
      expect(exportedVariable.type.properties).toHaveLength(2);
    });

    it("should be able to handle methods", () => {
      assert(exportedVariable.type.kind === TypeKind.ObjectLiteral);
      expect(exportedVariable.type.methods).toHaveLength(1);
    });

    it("should differentiate between methods and function properties", () => {
      assert(exportedVariable.type.kind === TypeKind.ObjectLiteral);
      expect(exportedVariable.type.methods.find(m => m.name === "method")).toBeDefined();
      expect(exportedVariable.type.properties.find(p => p.name === "funcProp")).toBeDefined();
    });

    it("should be able to handle getters", () => {
      assert(exportedVariable.type.kind === TypeKind.ObjectLiteral);
      expect(exportedVariable.type.getters).toHaveLength(1);
    });

    it("should be able to handle setters", () => {
      assert(exportedVariable.type.kind === TypeKind.ObjectLiteral);
      expect(exportedVariable.type.setters).toHaveLength(1);
    });

  }

});
