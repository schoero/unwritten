import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import {
  convertPropertyEntityForDocumentation,
  convertPropertyEntityForSignature
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { isParagraphNode, isSmallNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { PropertyEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", EntityKind.Property, () => {

  {

    // #region Normal property

    const propertyEntity: Testable<PropertyEntity> = {
      description: "Property description",
      example: "Property example",
      kind: EntityKind.Property,
      modifiers: [],
      name: "Property",
      optional: true,
      position: {
        column: 2,
        file: "/file.ts",
        line: 7
      },
      remarks: "Property remarks",
      type: {
        kind: TypeKind.String,
        name: "string"
      }
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedPropertyForSignature = convertPropertyEntityForSignature(ctx, propertyEntity as PropertyEntity);
    const convertedPropertyForDocumentation = convertPropertyEntityForDocumentation(ctx, propertyEntity as PropertyEntity);

    const [
      position,
      tags,
      type,
      description,
      remarks,
      example
    ] = convertedPropertyForDocumentation.children;

    it("should have a matching name", () => {
      expect(convertedPropertyForSignature.children).to.equal("Property");
      expect(convertedPropertyForDocumentation.title).to.equal("Property");
    });

    it("should have a matching type", () => {
      expect(isParagraphNode(type)).to.equal(true);
      const renderedType = renderNode(ctx, type.children);
      expect(renderedType).to.equal("string");
    });

    it("should have a position", () => {
      expect(isSmallNode(position)).to.equal(true);
      expect(position.children).to.not.equal(undefined);
    });

    it("should have an optional tag", () => {
      expect(isParagraphNode(tags)).to.equal(true);
      const renderedTags = renderNode(ctx, tags.children);
      expect(renderedTags).to.equal("optional");
    });

    it("should have a matching description", () => {
      expect(isParagraphNode(description)).to.equal(true);
      const renderedDescription = renderNode(ctx, description.children);
      expect(renderedDescription).to.equal("Property description");
    });

    it("should have a matching remarks", () => {
      expect(isParagraphNode(remarks)).to.equal(true);
      const renderedRemarks = renderNode(ctx, remarks.children);
      expect(renderedRemarks).to.equal("Property remarks");
    });

    it("should have a matching example", () => {
      expect(isParagraphNode(example)).to.equal(true);
      const renderedExample = renderNode(ctx, example.children);
      expect(renderedExample).to.equal("Property example");
    });

  }

  {

    // #region Property with all possible modifiers

    // #region Source

    // export class Class {
    //   public publicProperty: undefined;
    //   private privateProperty: undefined;
    //   static staticProperty: undefined;
    //   readonly readonlyProperty: undefined;
    //   accessor accessorProperty: undefined;
    //   #nativePrivateProperty: undefined;
    // }

    // #endregion

    const propertyEntities: Testable<PropertyEntity>[] = [
      {
        description: undefined,
        id: 4459,
        initializer: undefined,
        kind: EntityKind.Property,
        modifiers: [
          "public"
        ],
        name: "publicProperty",
        optional: false,
        position: {
          column: 2,
          file: "/file.ts",
          line: 2
        },
        type: {
          id: 10,
          kind: TypeKind.Undefined,
          name: "undefined"
        }
      },
      {
        description: undefined,
        id: 4460,
        initializer: undefined,
        kind: EntityKind.Property,
        modifiers: [
          "private"
        ],
        name: "privateProperty",
        optional: false,
        position: {
          column: 2,
          file: "/file.ts",
          line: 3
        },
        type: {
          id: 10,
          kind: TypeKind.Undefined,
          name: "undefined"
        }
      },
      {
        description: undefined,
        id: 4461,
        initializer: undefined,
        kind: EntityKind.Property,
        modifiers: [
          "static"
        ],
        name: "staticProperty",
        optional: false,
        position: {
          column: 2,
          file: "/file.ts",
          line: 4
        },
        type: {
          id: 10,
          kind: TypeKind.Undefined,
          name: "undefined"
        }
      },
      {
        description: undefined,
        id: 4462,
        initializer: undefined,
        kind: EntityKind.Property,
        modifiers: [
          "readonly"
        ],
        name: "readonlyProperty",
        optional: false,
        position: {
          column: 2,
          file: "/file.ts",
          line: 5
        },
        type: {
          id: 10,
          kind: TypeKind.Undefined,
          name: "undefined"
        }
      },
      {
        description: undefined,
        id: 4463,
        initializer: undefined,
        kind: EntityKind.Property,
        modifiers: [
          "accessor"
        ],
        name: "accessorProperty",
        optional: false,
        position: {
          column: 2,
          file: "/file.ts",
          line: 6
        },
        type: {
          id: 10,
          kind: TypeKind.Undefined,
          name: "undefined"
        }
      },
      {
        description: undefined,
        id: 4464,
        initializer: undefined,
        kind: EntityKind.Property,
        modifiers: [
          "nativePrivate"
        ],
        name: "#nativePrivateProperty",
        optional: false,
        position: {
          column: 2,
          file: "/file.ts",
          line: 7
        },
        type: {
          id: 10,
          kind: TypeKind.Undefined,
          name: "undefined"
        }
      }
    ];

    // #endregion

    const ctx = createRenderContext();

    const convertedPropertiesForDocumentation = propertyEntities.map(propertyEntity => convertPropertyEntityForDocumentation(ctx, propertyEntity as PropertyEntity));

    const modifiers = convertedPropertiesForDocumentation.map(convertedPropertyForDocumentation => convertedPropertyForDocumentation.children[1].children[1]);

    it("should render the public modifier", () => {
      expect(modifiers[0]).to.include("public");
    });

    it("should render the private modifier", () => {
      expect(modifiers[1]).to.include("private");
    });

    it("should render the static modifier", () => {
      expect(modifiers[2]).to.include("static");
    });

    it("should render the readonly modifier", () => {
      expect(modifiers[3]).to.include("readonly");
    });

    it("should render the accessor as get and set modifiers", () => {
      expect(modifiers[4]).to.include("get");
      expect(modifiers[4]).to.include("set");
    });

    it("should render the native private modifier", () => {
      expect(modifiers[5]).to.include("private");
    });

  }

});
