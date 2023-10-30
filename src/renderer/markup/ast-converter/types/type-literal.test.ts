import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertTypeLiteralTypeMultiline } from "unwritten:renderer:markup/ast-converter/types/index";
import { renderNode } from "unwritten:renderer:markup/html/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";

import type { TypeLiteralType } from "unwritten:interpreter:type-definitions/types";


scope("MarkupRenderer", TypeKind.TypeLiteral, () => {

  {

    const testFileContent = ts`
      export type Type = {
        new (): {};
        (): boolean;
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
    ] = convertedType.children;

    it("should have a matching construct signature", () => {
      expect(renderNode(ctx, constructSignatures.children[0])).toContain("new ()");
    });

    it("should have a matching call signature", () => {
      expect(renderNode(ctx, callSignatures.children[0])).toContain("()");
    });

  }

});
