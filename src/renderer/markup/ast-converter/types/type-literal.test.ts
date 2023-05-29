import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { convertTypeLiteralTypeMultiline } from "unwritten:renderer/markup/ast-converter/types/index.js";
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
      };
    `;

    const { exportedSymbols, ctx: compilerContext } = compile(testFileContent);

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
    ] = convertedType.children;

    it("should have a matching construct signature", () => {
      expect(renderNode(ctx, constructSignatures.children[0])).to.include("new ()");
    });

    it("should have a matching call signature", () => {
      expect(renderNode(ctx, callSignatures.children[0])).to.include("()");
    });

  }

});
