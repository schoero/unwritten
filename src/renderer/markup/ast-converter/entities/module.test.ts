import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import {
  convertModuleEntityForDocumentation,
  convertModuleEntityForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ModuleEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", EntityKind.Module, () => {

  {

    // #region Entity

    const moduleEntity: Testable<ModuleEntity> = {
      beta: undefined,
      deprecated: undefined,
      description: "Module description",
      example: "Module example",
      exports: [],
      id: 4053,
      kind: EntityKind.Module,
      name: "Module",
      position: {
        column: 4,
        file: "/file.ts",
        line: 9
      },
      remarks: "Module remarks"
    };

    // #endregion

    // #region Source

    // /**
    //  * Module description
    //  *
    //  * @remarks Module remarks
    //  * @example Module example
    //  * @deprecated
    //  * @beta
    //  */
    // export module Module {

    // }

    // #endregion

    const ctx = createRenderContext();

    const renderedModuleForTableOfContents = convertModuleEntityForTableOfContents(ctx, moduleEntity as ModuleEntity);
    const renderedModuleForDocumentation = convertModuleEntityForDocumentation(ctx, moduleEntity as ModuleEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      childrenContainer
    ] = renderedModuleForDocumentation.children;

    it("should have a matching title", () => {
      expect(renderedModuleForTableOfContents.title).to.equal("Module");
      expect(renderedModuleForDocumentation.title).to.equal("Module");
    });

    it("should have a matching description", () => {
      expect(description.children[0]).to.equal("Module description");
    });

    it("should have a matching remarks", () => {
      expect(remarks.children[0]).to.equal("Module remarks");
    });

    it("should have a matching example", () => {
      expect(example.children[0]).to.equal("Module example");
    });

    it("should have a matching tags", () => {
      expect(tags.children[0]).to.include("deprecated");
      expect(tags.children[0]).to.include("beta");
    });

    it("should have a position", () => {
      expect(position).to.not.equal(undefined);
    });

    it("should have matching children", () => {
      expect(childrenContainer.children).to.have.lengthOf(0);
    });

  }

});
