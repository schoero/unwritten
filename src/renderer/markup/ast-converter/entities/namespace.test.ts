import { expect, it } from "vitest";

import { TypeKind } from "unwritten:interpreter/enums/types.js";
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

    // #region Empty namespace with all JSDoc tags

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

    const ctx = createRenderContext();

    const renderedNamespaceForTableOfContents = convertNamespaceEntityForTableOfContents(ctx, namespaceEntity as NamespaceEntity);
    const renderedNamespaceForDocumentation = convertNamespaceEntityForDocumentation(ctx, namespaceEntity as NamespaceEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      ...children
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

    it("should have no children", () => {
      expect(children.length).to.equal(0);
    });

  }

  {

    // #region namespace with a function

    // #region Source

    // export namespace Namespace {
    //   export function test(){}
    // }

    // #endregion

    const namespaceEntity: Testable<NamespaceEntity> = {
      description: undefined,
      exports: [
        {
          id: 4460,
          kind: EntityKind.Function,
          name: "test",
          signatures: [
            {
              description: undefined,
              id: 62,
              kind: EntityKind.Signature,
              modifiers: [],
              name: "test",
              parameters: [],
              position: {
                column: 2,
                file: "/file.ts",
                line: 2
              },
              returnType: {
                description: undefined,
                id: 25,
                kind: TypeKind.Void,
                name: "void"
              },
              typeParameters: undefined
            }
          ]
        }
      ],
      id: 4459,
      kind: EntityKind.Namespace,
      name: "Namespace",
      position: {
        column: 0,
        file: "/file.ts",
        line: 1
      }
    };

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
      ...children
    ] = renderedNamespaceForDocumentation.children;

    it("should have a matching title", () => {
      expect(renderedNamespaceForTableOfContents.title).to.equal("Namespace");
      expect(renderedNamespaceForDocumentation.title).to.equal("Namespace");
    });

    it("should have on child", () => {
      expect(children.length).to.equal(1);
    });

  }

});
