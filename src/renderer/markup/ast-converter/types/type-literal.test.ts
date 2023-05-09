import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertTypeLiteralType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { TypeLiteralType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.TypeLiteral, () => {

  {

    const testFileContent = ts`
      export type Type = {
        new (): {};
        (): boolean;
        prop: string;
        funcProp: () => void;
        method(): void;
        get getter(): string;
        set setter(value: string);
      };
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTypeLiteralType(ctx, type as TypeLiteralType);

    const [
      typeName,
      members
    ] = convertedType;

    const [
      constructSignature,
      callSignature,
      prop,
      funcProp,
      method,
      setters,
      getter
    ] = members.children;

    it("should have the right amount of members", () => {
      expect(members.children).toHaveLength(7);
    });

    it("should have a matching type name", () => {
      expect(typeName).toEqual("object");
    });

    it("should have a matching construct signature", () => {
      expect(renderNode(ctx, constructSignature[0])).toEqual("new ()");
    });

    it("should have a matching call signature", () => {
      expect(renderNode(ctx, callSignature[0])).toEqual("()");
    });

    it("should have a matching property", () => {
      expect(renderNode(ctx, prop[0])).toEqual("prop");
    });

    it("should have a matching function property", () => {
      expect(renderNode(ctx, funcProp[0])).toEqual("funcProp");
    });

    it("should have a matching method", () => {
      expect(renderNode(ctx, method[0])).toEqual("method()");
    });

    it("should have a matching setter", () => {
      expect(renderNode(ctx, setters[0])).toEqual("setter(value)");
    });

    it("should have a matching getter", () => {
      expect(renderNode(ctx, getter[0])).toEqual("getter()");
    });

  }

});
