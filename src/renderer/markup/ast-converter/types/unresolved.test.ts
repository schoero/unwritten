import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { TypeKind } from "unwritten:interpreter/enums/type";
import { convertTypeReferenceTypeInline } from "unwritten:renderer:markup/ast-converter/types/index";
import { renderNode } from "unwritten:renderer/index";
import { isLinkNode } from "unwritten:renderer/markup/typeguards/renderer";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";

import type { TypeReferenceType } from "unwritten:interpreter:type-definitions/types";


scope("MarkupRenderer", TypeKind.Unresolved, () => {

  {

    const testFileContent = ts`
      export type Type = Promise<string>;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);

    const ctx = createRenderContext();
    const convertedTypeReferenceType = convertTypeReferenceTypeInline(ctx, typeAliasEntity.type as TypeReferenceType);

    const renderedTypeReferenceType = renderNode(ctx, convertedTypeReferenceType);

    it("should have the correct name", () => {
      expect(renderedTypeReferenceType).toContain("Promise");
    });

    it("should have one type argument", () => {
      expect(renderedTypeReferenceType).toContain("<string>");
    });

  }

  {

    const testFileContent = ts`
      export type Type = Set<string>;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "Type")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);

    const ctx = createRenderContext();

    ctx.config.externalTypes = {
      Set: "set-link"
    };

    const convertedTypeReferenceType = convertTypeReferenceTypeInline(ctx, typeAliasEntity.type as TypeReferenceType);

    it("should render a link if the referenced type is in the external types list", () => {
      assert(Array.isArray(convertedTypeReferenceType));
      assert(isLinkNode(convertedTypeReferenceType[0]));
      expect(convertedTypeReferenceType[0].children[0]).toBe("Set");
      expect(convertedTypeReferenceType[0].link).toBe("set-link");
    });

  }

});
