import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderPropertyEntity } from "unwritten:renderer:typescript/ast/entities/property.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { splitJSDocAndDeclaration } from "unwritten:tests:utils/jsdoc.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { PropertyEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.Property, () => {

  {

    // #region Property

    const propertyEntity: Testable<PropertyEntity> = {
      description: "Property description",
      example: "Property example",
      id: 4056,
      initializer: {
        id: 2620,
        kind: TypeKind.StringLiteral,
        name: "string",
        value: "test"
      },
      kind: EntityKind.Property,
      modifiers: [],
      name: "property",
      optional: false,
      position: {
        column: 2,
        file: "/file.ts",
        line: 20
      },
      type: {
        id: 15,
        kind: TypeKind.String,
        name: "string"
      }
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);
    const renderedProperty = renderPropertyEntity(ctx, propertyEntity as PropertyEntity);

    const renderedLines = renderedProperty.split(renderNewLine(ctx));

    const [[renderedJSDocLines], [renderedPropertyLines]] = splitJSDocAndDeclaration(renderedLines);

    it("should have matching JSDoc lines", () => {
      expect(renderedJSDocLines).to.have.lengthOf(6);
    });

    it("should render properties correctly", () => {
      expect(renderedPropertyLines[0]).to.equal("property: string = \"test\"");
    });

  }

});
