import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { convertInterfaceTypeMultiline } from "unwritten:renderer:markup/ast-converter/types/index.js";
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

    const convertedType = convertInterfaceTypeMultiline(ctx, type as InterfaceType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedType.children;

    it("should have a matching construct signature", () => {
      expect(constructSignatures.children.length).to.equal(1);
      expect(renderNode(ctx, constructSignatures.children[0])).to.include("new ()");
    });

    it("should have a matching call signature", () => {
      expect(callSignatures.children.length).to.equal(1);
      expect(renderNode(ctx, callSignatures.children[0])).to.include("()");
    });

    it("should have a matching properties with matching modifiers", () => {
      expect(properties.children.length).to.equal(4);
      expect(renderNode(ctx, properties.children[0])).to.include("staticProp");
      expect(renderNode(ctx, properties.children[0])).to.include("public");
      expect(renderNode(ctx, properties.children[0])).to.include("static");
      expect(renderNode(ctx, properties.children[1])).to.include("protectedProp");
      expect(renderNode(ctx, properties.children[1])).to.include("protected");
      expect(renderNode(ctx, properties.children[2])).to.include("prop");
      expect(renderNode(ctx, properties.children[3])).to.include("funcProp");
      expect(renderNode(ctx, properties.children[3])).to.include("function");
    });

    it("should have a matching method with an overload", () => {
      expect(methods.children.length).to.equal(2);
      expect(renderNode(ctx, methods.children[0])).to.include("method(a)");
      expect(renderNode(ctx, methods.children[0])).to.include("number");
      expect(renderNode(ctx, methods.children[1])).to.include("method(a)");
      expect(renderNode(ctx, methods.children[1])).to.include("string");
    });

    it("should have a matching setter", () => {
      expect(setters.children.length).to.equal(1);
      expect(renderNode(ctx, setters.children[0])).to.include("setter(value)");
    });

    it("should have a matching getter", () => {
      expect(getters.children.length).to.equal(1);
      expect(renderNode(ctx, getters.children[0])).to.include("getter");
    });

  }

});
