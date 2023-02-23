import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import {
  convertNamespaceEntityForDocumentation,
  convertNamespaceEntityForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { NamespaceEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", EntityKind.Namespace, () => {

  {

    // #region Entity

    const testFunction: Testable<NamespaceEntity> = {
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

    const ctx = createRenderContext();

    const renderedFunctionForTableOfContents = convertNamespaceEntityForTableOfContents(ctx, testFunction as NamespaceEntity);
    const renderedFunctionForDocumentation = convertNamespaceEntityForDocumentation(ctx, testFunction as NamespaceEntity);

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
