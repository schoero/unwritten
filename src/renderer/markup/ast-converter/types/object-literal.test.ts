import { expect, it } from "vitest";

import { createVariableEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertObjectLiteralTypeMultiline } from "unwritten:renderer:markup/ast-converter/types/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";

import type { ObjectLiteralType } from "unwritten:interpreter:type-definitions/types";


scope("MarkupRenderer", TypeKind.ObjectLiteral, () => {

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

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "objectLiteral")!;
    const variableEntity = createVariableEntity(compilerContext, symbol);
    const type = variableEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertObjectLiteralTypeMultiline(ctx, type as ObjectLiteralType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedType.children;

    it("should have two properties", () => {
      expect(properties.children).toHaveLength(2);
    });

    it("should have one method", () => {
      expect(methods.children).toHaveLength(1);
    });

    it("should have one getter", () => {
      expect(getters.children).toHaveLength(1);
    });

    it("should have one setter", () => {
      expect(setters.children).toHaveLength(1);
    });

  }

});
