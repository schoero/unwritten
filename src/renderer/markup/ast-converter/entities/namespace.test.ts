import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import {
  convertNamespaceEntityForDocumentation,
  convertNamespaceEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { NamespaceEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", EntityKind.Namespace, () => {

  {

    // #region Entity

    const namespaceEntity: Testable<NamespaceEntity> = {
      beta: undefined,
      deprecated: undefined,
      description: "Namespace description",
      example: "Namespace example",
      exports: [],
      id: 4053,
      kind: EntityKind.Namespace,
      name: "Namespace",
      position: {
        column: 4,
        file: "/file.ts",
        line: 9
      },
      remarks: "Namespace remarks"
    };

    // #endregion

    // #region Source

    // /**
    //  * Namespace description
    //  *
    //  * @remarks Namespace remarks
    //  * @example Namespace example
    //  * @deprecated
    //  * @beta
    //  */
    // export namespace Namespace {

    // }

    // #endregion

    const ctx = createRenderContext();

    const renderedNamespaceForTableOfContents = convertNamespaceEntityForTableOfContents(ctx, namespaceEntity as NamespaceEntity);
    const renderedNamespaceForDocumentation = convertNamespaceEntityForDocumentation(ctx, namespaceEntity as NamespaceEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      childrenContainer
    ] = renderedNamespaceForDocumentation.children;

    it("should have a matching title", () => {
      expect(renderedNamespaceForTableOfContents.title).to.equal("Namespace");
      expect(renderedNamespaceForDocumentation.title).to.equal("Namespace");
    });

    it("should have a matching description", () => {
      expect(description.children[0]).to.equal("Namespace description");
    });

    it("should have a matching remarks", () => {
      expect(remarks.children[0]).to.equal("Namespace remarks");
    });

    it("should have a matching example", () => {
      expect(example.children[0]).to.equal("Namespace example");
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
