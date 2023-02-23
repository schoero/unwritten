import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import {
  convertModuleEntityForDocumentation,
  convertModuleEntityForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ModuleEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", EntityKind.Function, () => {

  {

    // #region Entity

    const testFunction: Testable<ModuleEntity> = {
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
      kind: EntityKind.Module,
      name: "Module"
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedFunctionForTableOfContents = convertModuleEntityForTableOfContents(ctx, testFunction as ModuleEntity);
    const renderedFunctionForDocumentation = convertModuleEntityForDocumentation(ctx, testFunction as ModuleEntity);

    it("should have a matching title", () => {
      expect(renderedFunctionForTableOfContents.children).to.equal("Module");
      expect(renderedFunctionForDocumentation.title).to.equal("Module");
    });

    it("should have matching children", () => {
      expect(renderedFunctionForTableOfContents.children).to.have.lengthOf(1);
      expect(renderedFunctionForDocumentation.children).to.have.lengthOf(1);
    });

  }

});
