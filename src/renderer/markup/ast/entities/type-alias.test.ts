import { expect, it } from "vitest";

import { EntityKind } from "quickdoks:compiler/enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderTypeAliasForDocumentation, renderTypeAliasForTableOfContents } from "./type-alias.js";

import type { TypeAliasEntity } from "quickdoks:compiler/type-definitions/entities.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


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


});
