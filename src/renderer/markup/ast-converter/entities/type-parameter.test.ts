import { expect, it } from "vitest";

import { createTypeAliasEntity } from "unwritten:interpreter/ast/entities/index.js";
import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import {
  convertTypeParameterEntitiesForSignature,
  convertTypeParameterEntityForDocumentation
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";


scope("MarkupRenderer", EntityKind.TypeParameter, () => {

  {

    const testFileContent = ts`
      /**
       * @template TypeParameter - Type parameter description
       */
      export type TypeAlias<TypeParameter extends number = 7> = TypeParameter;
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
      expect(renderedParametersForSignature).toBe("TypeParameter");
      expect(renderedParameterForDocumentation).toMatch(/.*<TypeParameter>.*$/);
    });

    it("should have a matching description", () => {
      expect(renderedParameterForDocumentation).toMatch(/.* Type parameter description .*/);
    });

    it("should have a matching type", () => {
      expect(renderedParameterForDocumentation).toMatch(/^.* number .*/);
    });

    it("should have a matching initializer", () => {
      expect(renderedParameterForDocumentation).toMatch(/.* Default: 7$/);
    });

  }

});
