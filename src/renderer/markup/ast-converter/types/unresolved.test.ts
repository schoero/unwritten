import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { TypeKind } from "unwritten:interpreter/enums/type.js";
import { convertTypeReferenceTypeInline } from "unwritten:renderer:markup/ast-converter/types/index.js";
import { isConditionalNode, isLinkNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import type { TypeReferenceType } from "unwritten:interpreter/type-definitions/types.js";


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

    it("should have the correct name", () => {
      assert(isConditionalNode(convertedTypeReferenceType));
      assert(Array.isArray(convertedTypeReferenceType.falseChildren));
      expect(convertedTypeReferenceType.falseChildren).toHaveLength(3);
      expect(convertedTypeReferenceType.falseChildren[0]).toBe("Promise");
    });

    it("should have one type argument", () => {
      assert(isConditionalNode(convertedTypeReferenceType));
      assert(Array.isArray(convertedTypeReferenceType.falseChildren));
      expect(convertedTypeReferenceType.falseChildren).toHaveLength(3);
      expect(convertedTypeReferenceType.falseChildren[2]).toHaveLength(1 + 2);
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
      assert(isConditionalNode(convertedTypeReferenceType));
      assert(Array.isArray(convertedTypeReferenceType.falseChildren));
      assert(isLinkNode(convertedTypeReferenceType.falseChildren[0]));
      expect(convertedTypeReferenceType.falseChildren[0].children[0]).toBe("Set");
      expect(convertedTypeReferenceType.falseChildren[0].link).toBe("set-link");
    });

  }

});
