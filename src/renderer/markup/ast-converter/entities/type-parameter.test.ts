import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index";
import { EntityKind } from "unwritten:interpreter/enums/entity";
import {
  convertTypeParameterEntitiesForSignature,
  convertTypeParameterEntityForDocumentation
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { renderNode } from "unwritten:renderer:markup/html/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { ts } from "unwritten:utils/template";


scope("MarkupRenderer", EntityKind.TypeParameter, () => {

  {

    const testFileContent = ts`
      /**
       * @template TypeParam Type parameter description
       */
      export type TypeAlias<TypeParam extends number = 7> = TypeParam;
    `;

    const { ctx: compilerContext, exportedSymbols } = compile(testFileContent);

    const symbol = exportedSymbols.find(s => s.name === "TypeAlias")!;
    const typeAliasEntity = createTypeAliasEntity(compilerContext, symbol);
    const typeParameterEntity = typeAliasEntity.typeParameters![0];
    const ctx = createRenderContext();

    const convertedParametersForSignature = convertTypeParameterEntitiesForSignature(ctx, [typeParameterEntity]);
    const convertedParameterForDocumentation = convertTypeParameterEntityForDocumentation(ctx, typeParameterEntity);

    const renderedParametersForSignature = renderNode(ctx, convertedParametersForSignature);
    const renderedParameterForDocumentation = renderNode(ctx, convertedParameterForDocumentation);

    it("should have a matching name", () => {
      expect(renderedParametersForSignature).toBe("TypeParam");
      expect(renderedParameterForDocumentation).toContain("<TypeParam>");
    });

    it("should have a matching description", () => {
      expect(renderedParameterForDocumentation).toContain("Type parameter description");
    });

    it("should have a matching type", () => {
      expect(renderedParameterForDocumentation).toContain("number");
    });

    it("should have a matching initializer", () => {
      expect(renderedParameterForDocumentation).toContain("Default: 7");
    });

  }

});
