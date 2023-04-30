import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertMappedType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";

import type { MappedType } from "unwritten:interpreter:type-definitions/types.js";
import type { ASTNodes } from "unwritten:renderer/markup/types-definitions/nodes.js";


scope("MarkupRenderer", TypeKind.Mapped, () => {

  {

    const testFileContent = ts`
      export type Type = {
        readonly [K in "A" | "B"]?: K extends "A" ? "a" : "b";
      };
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const type = typeAliasEntity.type;
    const ctx = createRenderContext();

    const convertedType = convertMappedType(ctx, type as MappedType);
    const properties = convertedType.children[0].children;

    it("should have two properties", () => {
      expect(properties.length).to.equal(2);
    });

    it("should support the readonly modifier", () => {
      expect(properties[0]).to.include("readonly");
      expect(properties[1]).to.include("readonly");
    });

    it("should support the optional modifier", () => {
      expect(properties[0]).to.include("optional");
      expect(properties[1]).to.include("optional");
    });

    it("should render the resolved types", () => {
      expect((properties[0] as ASTNodes[])[2]).to.include("a");
      expect((properties[1] as ASTNodes[])[2]).to.include("b");
    });

  }

});