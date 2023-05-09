import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { convertInterfaceType } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isTypeReferenceType } from "unwritten:typeguards/types.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { InterfaceType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Interface, () => {

  {

    const testFileContent = ts`
      interface Interface {
        (): void;
        public static staticProp: string;
        protected protectedProp: string;
        new (): void;
        method(a: number): void;
        method(a: string): void;
        prop: string;
        funcProp: () => void;
        get getter(): string;
        set setter(value: string): void;
      }
      export type Type = Interface;
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);

    assert(isTypeReferenceType(typeAliasEntity.type));

    const type = typeAliasEntity.type.type;
    const ctx = createRenderContext();

    const convertedType = convertInterfaceType(ctx, type as InterfaceType);

    const [
      typeName,
      members
    ] = convertedType;

    const [
      constructSignature,
      callSignature,
      staticProp,
      protectedProp,
      prop,
      funcProp,
      method,
      methodOverload,
      setter,
      getter
    ] = members.children;

    it("should have the right amount of members", () => {
      expect(members.children.length).to.equal(10);
    });

    it("should have a matching type name", () => {
      expect(typeName).to.equal("object");
    });

    it("should have a matching construct signature", () => {
      expect(renderNode(ctx, constructSignature[0])).to.equal("new ()");
    });

    it("should have a matching call signature", () => {
      expect(renderNode(ctx, callSignature[0])).to.equal("()");
    });

    it("should have a matching static property", () => {
      expect(renderNode(ctx, staticProp[0])).to.equal("staticProp");
    });

    it("should have a matching protected property", () => {
      expect(renderNode(ctx, protectedProp[0])).to.equal("protectedProp");
    });

    it("should have a matching property", () => {
      expect(renderNode(ctx, prop[0])).to.equal("prop");
    });

    it("should have a matching function property", () => {
      expect(renderNode(ctx, funcProp[0])).to.equal("funcProp");
    });

    it("should have a matching method", () => {
      expect(renderNode(ctx, method[0])).to.equal("method(a)");
    });

    it("should have a matching method overload", () => {
      expect(renderNode(ctx, methodOverload[0])).to.equal("method(a)");
    });

    it("should have a matching setter", () => {
      expect(renderNode(ctx, setter[0])).to.equal("setter(value)");
    });

    it("should have a matching getter", () => {
      expect(renderNode(ctx, getter[0])).to.equal("getter()");
    });

  }

});
