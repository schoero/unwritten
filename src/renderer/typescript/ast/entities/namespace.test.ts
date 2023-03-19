import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderNamespaceEntity } from "unwritten:renderer:typescript/ast/entities/namespace.js";
import { renderNewLine } from "unwritten:renderer:utils/new-line.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { splitJSDocAndDeclaration } from "unwritten:tests:utils/jsdoc.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { NamespaceEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.Namespace, () => {

  {

    // #region Entity

    // #region Source

    // /**
    //  * Namespace description
    //  */
    // export namespace Namespace {

    // }

    // #endregion

    const namespaceEntity: Testable<NamespaceEntity> = {
      description: "Namespace description",
      exports: [],
      kind: EntityKind.Namespace,
      name: "Namespace"
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedNamespace = renderNamespaceEntity(ctx, namespaceEntity as NamespaceEntity);
    const renderedLines = renderedNamespace.split(renderNewLine(ctx));

    const [[renderedJSDocLines], [renderedNamespaceLines]] = splitJSDocAndDeclaration(renderedLines);

    it("should have a matching JSDoc lines", () => {
      expect(renderedJSDocLines).to.have.lengthOf(3);
    });

    it("should have a matching header", () => {
      expect(renderedNamespaceLines[0]).to.equal("namespace Namespace {");
    });

    it("should have a matching footer", () => {
      expect(renderedNamespaceLines[1]).to.equal("}");
    });

  }

});
