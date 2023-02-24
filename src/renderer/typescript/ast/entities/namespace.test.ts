import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderNamespaceEntity } from "unwritten:renderer/typescript/ast/entities/namespace.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { NamespaceEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.Namespace, () => {

  {

    // #region Entity

    const namespaceEntity: Testable<NamespaceEntity> = {
      exports: [
        {
          description: undefined,
          kind: EntityKind.TypeAlias,
          name: "Test",
          position: {
            column: 2,
            file: "/file.ts",
            line: 2
          },
          type: {
            kind: TypeKind.String,
            name: "string"
          },
          typeParameters: undefined
        }
      ],
      kind: EntityKind.Namespace,
      name: "Namespace"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedNamespace = renderNamespaceEntity(ctx, namespaceEntity as NamespaceEntity);
    const renderedNamespaceLines = renderedNamespace.split(renderNewLine(ctx));


    it("should have a matching title", () => {
      expect(renderedFunctionForTableOfContents.children).to.equal("Namespace");
      expect(renderedFunctionForDocumentation.title).to.equal("Namespace");
    });

    it("should have matching children", () => {
      expect(renderedFunctionForTableOfContents.children).to.have.lengthOf(1);
      expect(renderedFunctionForDocumentation.children).to.have.lengthOf(1);
    });

  }

});
