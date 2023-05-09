import { expect, it } from "vitest";

import { createVariableEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertObjectLiteralType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
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

    const convertedType = convertObjectLiteralType(ctx, type as ObjectLiteralType);

    const [
      typeName,
      members
    ] = convertedType;

    const [
      prop,
      funcProp,
      method,
      setters,
      getter
    ] = members.children;

    it("should have a matching type name", () => {
      expect(typeName).to.equal("object");
    });

    it("should have the right amount of members", () => {
      expect(members.children).to.have.lengthOf(5);
    });

    it("should have a matching property", () => {
      expect(renderNode(ctx, prop[0])).to.equal("prop");
    });

    it("should have a matching function property", () => {
      expect(renderNode(ctx, funcProp[0])).to.equal("funcProp");
    });

    it("should have a matching method", () => {
      expect(renderNode(ctx, method[0])).to.equal("method()");
    });

    it("should have a matching setter", () => {
      expect(renderNode(ctx, setters[0])).to.equal("setter(value)");
    });

    it("should have a matching getter", () => {
      expect(renderNode(ctx, getter[0])).to.equal("getter()");
    });

  }

});
