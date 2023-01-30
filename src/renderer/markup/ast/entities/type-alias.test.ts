import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler/enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderTypeAliasForDocumentation, renderTypeAliasForTableOfContents } from "./type-alias.js";

import type { TypeAliasEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", EntityKind.TypeAlias, () => {

  {

    // #region Type alias with all JSDoc tags

    const typeAliasEntity: Testable<TypeAliasEntity> = {
      beta: undefined,
      description: "TypeAlias description",
      example: "TypeAlias example",
      kind: EntityKind.TypeAlias,
      name: "TypeAlias",
      position: {
        column: 4,
        file: "/file.ts",
        line: 9
      },
      remarks: "TypeAlias remarks",
      type: {
        kind: TypeKind.Number,
        name: "number"
      },
      typeParameters: undefined
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedTypeAliasForTableOfContents = renderTypeAliasForTableOfContents(ctx, typeAliasEntity as TypeAliasEntity);
    const renderedTypeAliasForDocumentation = renderTypeAliasForDocumentation(ctx, typeAliasEntity as TypeAliasEntity);

    const renderedTypeAliasTitle = Object.keys(renderedTypeAliasForDocumentation)[0]!;
    const renderedTypeAliasContent = renderedTypeAliasForDocumentation[renderedTypeAliasTitle]!;

    const [
      tags,
      position,
      typeParameters,
      type,
      description,
      remarks,
      example
    ] = renderedTypeAliasContent;

    it("should have matching table of contents entry", () => {
      expect(renderedTypeAliasForTableOfContents).to.equal("TypeAlias");
    });

    it("should have a matching documentation title", () => {
      expect(renderedTypeAliasTitle).to.equal("TypeAlias");
    });

    it("should have a position", () => {
      expect(position).to.not.equal(undefined);
    });

    it("should have a jsdoc tag", () => {
      expect(tags).to.not.equal(undefined);
    });

    it("should not have a type parameter", () => {
      expect(typeParameters).to.equal(undefined);
    });

    it("should have a matching type", () => {
      expect(type).to.match(/number$/);
    });

    it("should have a matching description", () => {
      expect(description).to.equal("TypeAlias description");
    });

    it("should have matching remarks", () => {
      expect(remarks).to.equal("TypeAlias remarks");
    });

    it("should have a matching example", () => {
      expect(example).to.equal("TypeAlias example");
    });

  }

  {

    // #region Type alias with type parameters

    const typeAliasEntity: Testable<TypeAliasEntity> = {
      description: undefined,
      kind: EntityKind.TypeAlias,
      name: "TypeAlias",
      position: {
        column: 4,
        file: "/file.ts",
        line: 4
      },
      type: {
        kind: TypeKind.TypeReference,
        name: "T",
        type: {
          constraint: {
            kind: TypeKind.String,
            name: "string"
          },
          kind: TypeKind.TypeParameter,
          name: "T"
        },
        typeArguments: undefined
      },
      typeParameters: [
        {
          constraint: {
            kind: TypeKind.String,
            name: "string"
          },
          description: "Type parameter description",
          initializer: undefined,
          kind: EntityKind.TypeParameter,
          name: "T",
          position: {
            column: 26,
            file: "/file.ts",
            line: 4
          }
        }
      ]
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedTypeAliasForTableOfContents = renderTypeAliasForTableOfContents(ctx, typeAliasEntity as TypeAliasEntity);
    const renderedTypeAliasForDocumentation = renderTypeAliasForDocumentation(ctx, typeAliasEntity as TypeAliasEntity);

    const renderedTypeAliasTitle = Object.keys(renderedTypeAliasForDocumentation)[0]!;
    const renderedTypeAliasContent = renderedTypeAliasForDocumentation[renderedTypeAliasTitle]!;

    const [
      tags,
      position,
      typeParameters,
      type,
      description,
      remarks,
      example
    ] = renderedTypeAliasContent;

    it("should have matching table of contents entry", () => {
      expect(renderedTypeAliasForTableOfContents).to.equal("TypeAlias&lt;T&gt;");
    });

    it("should have a matching documentation title", () => {
      expect(renderedTypeAliasTitle).to.equal("TypeAlias&lt;T&gt;");
    });

    it("should have matching type parameters", () => {
      expect(typeParameters).to.not.equal(undefined);
      expect(typeParameters).to.have.lengthOf(1);
      expect(typeParameters[0]).to.equal("&lt;T&gt;: string Type parameter description");
    });

  }


});
