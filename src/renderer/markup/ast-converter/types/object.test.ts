import { expect, it } from "vitest";

import { createClassEntity, createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { renderNode } from "unwritten:renderer/index.js";
import {
  convertObjectTypeMultiline,
  convertTypeLiteralTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import type { ObjectType, TypeLiteralType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Object, () => {

  {

    const testFileContent = ts`
      class BaseClass {
        public instanceProperty: string | undefined;
        public static staticProperty: string | undefined;
        public method(): void {}
        public get getter(): string { return ""; }
        public set setter(value: string): void {}
      }
      export class Class extends BaseClass {
      }
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const typeAliasEntity = createClassEntity(compilerContext, symbol);
    const type = typeAliasEntity.heritage!.instanceType;
    const ctx = createRenderContext();

    const convertedType = convertObjectTypeMultiline(ctx, type as ObjectType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedType;

    it("should have one matching property", () => {
      expect(properties.children).toHaveLength(1);
      expect(renderNode(ctx, properties.children[0])).toContain("instanceProperty");
    });

    it("should have one matching method", () => {
      expect(renderNode(ctx, methods.children[0])).toContain("method()");
    });

    it("should have one matching setter", () => {
      expect(renderNode(ctx, setters.children[0])).toContain("setter(value)");
    });

    it("should have one matching getter", () => {
      expect(renderNode(ctx, getters.children[0])).toContain("getter()");
    });

  }

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

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertTypeLiteralTypeMultiline(ctx, type as TypeLiteralType);

    const [
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedType;

    it("should have one construct signature", () => {
      expect(constructSignatures.children).toHaveLength(1);
    });

    it("should have one call signature", () => {
      expect(callSignatures.children).toHaveLength(1);
    });

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
