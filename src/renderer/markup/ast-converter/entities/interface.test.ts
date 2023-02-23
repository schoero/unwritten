import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import {
  convertInterfaceEntityForDocumentation,
  convertInterfaceEntityForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { isParagraphNode, isSmallNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { InterfaceEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Interface, () => {

  {

    // #region Entity

    const simpleInterface: Testable<InterfaceEntity> = {
      callSignatures: [
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 7
          },
          returnType: {
            description: undefined,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        }
      ],
      constructSignatures: [
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 8
          },
          returnType: {
            description: undefined,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        }
      ],
      description: "Interface description",
      example: "Interface example",
      getterSignatures: [
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "getter",
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 13
          },
          returnType: {
            description: undefined,
            kind: TypeKind.String,
            name: "string"
          },
          typeParameters: undefined
        }
      ],
      heritage: undefined,
      kind: EntityKind.Interface,
      methodSignatures: [
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "method",
          parameters: [
            {
              description: undefined,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 9,
                file: "/file.ts",
                line: 9
              },
              rest: false,
              type: {
                kind: TypeKind.Number,
                name: "number"
              }
            }
          ],
          position: {
            column: 2,
            file: "/file.ts",
            line: 9
          },
          returnType: {
            description: undefined,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        },
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "method",
          parameters: [
            {
              description: undefined,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 9,
                file: "/file.ts",
                line: 10
              },
              rest: false,
              type: {
                kind: TypeKind.String,
                name: "string"
              }
            }
          ],
          position: {
            column: 2,
            file: "/file.ts",
            line: 10
          },
          returnType: {
            description: undefined,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        }
      ],
      name: "Interface",
      position: {
        column: 0,
        file: "/file.ts",
        line: 6
      },
      properties: [
        {
          description: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "prop",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 11
          },
          type: {
            kind: TypeKind.String,
            name: "string"
          }
        },
        {
          description: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "funcProp",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 12
          },
          type: {
            kind: TypeKind.Function,
            signatures: [
              {
                description: undefined,
                kind: EntityKind.Signature,
                modifiers: [],
                name: undefined,
                parameters: [],
                position: {
                  column: 12,
                  file: "/file.ts",
                  line: 12
                },
                returnType: {
                  description: undefined,
                  kind: TypeKind.Void,
                  name: "void"
                },
                typeParameters: undefined
              }
            ]
          }
        }
      ],
      remarks: "Interface remarks",
      setterSignatures: [
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "setter",
          parameters: [
            {
              description: undefined,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "value",
              optional: false,
              position: {
                column: 13,
                file: "/file.ts",
                line: 14
              },
              rest: false,
              type: {
                kind: TypeKind.String,
                name: "string"
              }
            }
          ],
          position: {
            column: 2,
            file: "/file.ts",
            line: 14
          },
          returnType: {
            description: undefined,
            kind: TypeKind.Any,
            name: "any"
          },
          typeParameters: undefined
        }
      ],
      typeParameters: undefined
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedInterfaceForTableOfContents = convertInterfaceEntityForTableOfContents(ctx, simpleInterface as InterfaceEntity);
    const convertedInterfaceForDocumentation = convertInterfaceEntityForDocumentation(ctx, simpleInterface as InterfaceEntity);

    const renderedInterfaceForTableOfContents = renderNode(ctx, convertedInterfaceForTableOfContents);
    const renderedInterfaceForDocumentation = renderNode(ctx, convertedInterfaceForDocumentation);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedInterfaceForDocumentation.children;

    it("should have matching interface name", () => {
      expect(convertedInterfaceForTableOfContents.children).to.equal("Interface");
      expect(convertedInterfaceForDocumentation.title).to.equal("Interface");
    });

    it("should have a matching description", () => {
      expect(isParagraphNode(description)).to.equal(true);
      const renderedDescription = renderNode(ctx, description.children);
      expect(renderedDescription).to.equal("Interface description");
    });

    it("should have no remarks", () => {
      expect(isParagraphNode(remarks)).to.equal(true);
      const renderedRemarks = renderNode(ctx, remarks.children);
      expect(renderedRemarks).to.equal("Interface remarks");
    });

    it("should have no example", () => {
      expect(isParagraphNode(example)).to.equal(true);
      const renderedExample = renderNode(ctx, example.children);
      expect(renderedExample).to.equal("Interface example");
    });

    it("should have a position", () => {
      expect(isSmallNode(position)).to.equal(true);
      expect(position.children).to.not.equal("");
    });

    it("should have no tags", () => {
      expect(isParagraphNode(tags)).to.equal(true);
      const renderedTags = renderNode(ctx, tags);
      expect(renderedTags).to.equal("");
    });

    it("should have one construct signature", () => {
      expect(constructSignatures).to.have.lengthOf(1);
    });

    it("should have one call signature", () => {
      expect(callSignatures).to.have.lengthOf(1);
    });

    it("should have two properties", () => {
      expect(properties).to.have.lengthOf(2);
    });

    it("should have one method signature", () => {
      expect(methods).to.have.lengthOf(2);
    });

    it("should have one setter signature", () => {
      expect(setters).to.have.lengthOf(1);
    });

    it("should have one getter signature", () => {
      expect(getters).to.have.lengthOf(1);
    });


  }

});
