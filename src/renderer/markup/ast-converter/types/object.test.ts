import { expect, it } from "vitest";

import { createClassEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertObjectType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";

import type { ObjectType } from "unwritten:interpreter:type-definitions/types.js";


scope("MarkupRenderer", TypeKind.Interface, () => {

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

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Class")!;
    const typeAliasEntity = createClassEntity(compilerContext, symbol);
    const type = typeAliasEntity.heritage!.instanceType;
    const ctx = createRenderContext();

    const convertedType = convertObjectType(ctx, type as ObjectType);

    const [
      instanceProperty,
      method,
      setter,
      getter
    ] = convertedType.children;

    it("should have the right amount of members", () => {
      expect(convertedType.children.length).to.equal(4);
    });

    it("should have one matching property", () => {
      expect(renderNode(ctx, instanceProperty[0])).to.equal("instanceProperty");
    });

    it("should have one matching method", () => {
      expect(renderNode(ctx, method[0])).to.equal("method()");
    });

    it("should have one matching setter", () => {
      expect(renderNode(ctx, setter[0])).to.equal("setter(value)");
    });

    it("should have one matching getter", () => {
      expect(renderNode(ctx, getter[0])).to.equal("getter()");
    });

  }

});
