import { expect, it } from "vitest";

import { createVariableEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertObjectLiteralTypeMultiline } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { ObjectLiteralType } from "unwritten:interpreter/type-definitions/types.js";


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

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

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
      expect(properties.children.length).to.equal(2);
    });

    it("should have one method", () => {
      expect(methods.children.length).to.equal(1);
    });

    it("should have one getter", () => {
      expect(getters.children.length).to.equal(1);
    });

    it("should have one setter", () => {
      expect(setters.children.length).to.equal(1);
    });

  }

});
