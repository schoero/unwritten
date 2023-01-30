import { writeFileSync } from "node:fs";

import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler/enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { renderRenderObject } from "unwritten:renderer/markup/shared/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderInterfaceForDocumentation, renderInterfaceForTableOfContents } from "./interface.js";

import type { InterfaceEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Interface, () => {

  {

    const simpleInterface: Testable<InterfaceEntity> = {
      callSignatures: [
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 6,
            file: "/file.ts",
            line: 2
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
            column: 6,
            file: "/file.ts",
            line: 3
          },
          returnType: {
            description: undefined,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        }
      ],
      description: undefined,
      getterSignatures: [
        {
          description: undefined,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "getter",
          parameters: [],
          position: {
            column: 6,
            file: "/file.ts",
            line: 5
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
      methodSignatures: [],
      name: "Interface",
      position: {
        column: 0,
        file: "/file.ts",
        line: 1
      },
      properties: [
        {
          description: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "funcProp",
          optional: false,
          position: {
            column: 6,
            file: "/file.ts",
            line: 4
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
                  column: 16,
                  file: "/file.ts",
                  line: 4
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
        },
        {
          description: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "method",
          optional: false,
          position: {
            column: 6,
            file: "/file.ts",
            line: 6
          },
          type: {
            kind: TypeKind.Intersection,
            types: [
              {
                kind: TypeKind.Function,
                signatures: [
                  {
                    description: undefined,
                    kind: EntityKind.Signature,
                    modifiers: [],
                    name: undefined,
                    parameters: [
                      {
                        description: undefined,
                        initializer: undefined,
                        kind: EntityKind.Parameter,
                        name: "a",
                        optional: false,
                        position: {
                          column: 16,
                          file: "/file.ts",
                          line: 6
                        },
                        rest: false,
                        type: {
                          kind: TypeKind.Number,
                          name: "number"
                        }
                      }
                    ],
                    position: {
                      column: 15,
                      file: "/file.ts",
                      line: 6
                    },
                    returnType: {
                      description: undefined,
                      kind: TypeKind.Void,
                      name: "void"
                    },
                    typeParameters: undefined
                  }
                ]
              },
              {
                kind: TypeKind.Function,
                signatures: [
                  {
                    description: undefined,
                    kind: EntityKind.Signature,
                    modifiers: [],
                    name: undefined,
                    parameters: [
                      {
                        description: undefined,
                        initializer: undefined,
                        kind: EntityKind.Parameter,
                        name: "a",
                        optional: false,
                        position: {
                          column: 40,
                          file: "/file.ts",
                          line: 6
                        },
                        rest: false,
                        type: {
                          kind: TypeKind.String,
                          name: "string"
                        }
                      }
                    ],
                    position: {
                      column: 39,
                      file: "/file.ts",
                      line: 6
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
            ]
          }
        },
        {
          description: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "prop",
          optional: false,
          position: {
            column: 6,
            file: "/file.ts",
            line: 7
          },
          type: {
            kind: TypeKind.String,
            name: "string"
          }
        }
      ],
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
                column: 17,
                file: "/file.ts",
                line: 8
              },
              rest: false,
              type: {
                kind: TypeKind.String,
                name: "string"
              }
            }
          ],
          position: {
            column: 6,
            file: "/file.ts",
            line: 8
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

    const ctx = createRenderContext();

    const renderedInterfaceForTableOfContents = renderInterfaceForTableOfContents(ctx, simpleInterface as InterfaceEntity);
    const renderedInterfaceForDocumentation = renderInterfaceForDocumentation(ctx, simpleInterface as InterfaceEntity);

    const interfaceName = Object.keys(renderedInterfaceForDocumentation)[0]!;
    const interfaceContent = renderedInterfaceForDocumentation[interfaceName]!;

    const documentation = renderRenderObject(ctx, renderedInterfaceForDocumentation);

    writeFileSync("test.md", documentation);

    it("should have matching interface name", () => {
      expect(renderedInterfaceForTableOfContents).to.equal("Address");
      expect(interfaceName).to.equal("Address");
    });

    it("should have a matching description", () => {
      expect(interfaceContent[0]).to.equal("Address of a person");
    });

    it("should have no example", () => {
      expect(interfaceContent[1]).to.equal(undefined);
    });

  }

});
