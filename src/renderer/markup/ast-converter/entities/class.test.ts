import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { TypeKind } from "unwritten:interpreter/enums/types.js";
import {
  convertClassEntityForDocumentation,
  convertClassEntityForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { isParagraphNode, isSmallNode } from "unwritten:renderer/markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ClassEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Class, () => {

  {

    // #region Entity with all possible members

    // #region Source

    // export class Class {
    //   constructor() {}
    //   public property: number = 1;
    //   public method() {}
    //   public get getter(): string { return ""; }
    //   public set setter(value: string) {}
    // }

    // #endregion

    const classEntity: Testable<ClassEntity> = {
      ctor: {
        id: 4467,
        kind: EntityKind.Constructor,
        name: "__constructor",
        signatures: [
          {
            description: undefined,
            id: 4741,
            kind: EntityKind.Signature,
            modifiers: [],
            name: "constructor",
            parameters: [],
            position: {
              column: 2,
              file: "/file.ts",
              line: 2
            },
            returnType: {
              callSignatures: [],
              constructSignatures: [],
              description: undefined,
              getters: [
                {
                  id: 4462,
                  kind: EntityKind.Getter,
                  name: "getter",
                  signatures: [
                    {
                      description: undefined,
                      id: 4743,
                      kind: EntityKind.Signature,
                      modifiers: [
                        "public"
                      ],
                      name: "getter",
                      parameters: [],
                      position: {
                        column: 2,
                        file: "/file.ts",
                        line: 5
                      },
                      returnType: {
                        description: undefined,
                        id: 16,
                        kind: TypeKind.String,
                        name: "string"
                      },
                      typeParameters: undefined
                    }
                  ]
                }
              ],
              id: 2861,
              isThis: false,
              kind: TypeKind.Class,
              methods: [
                {
                  id: 4465,
                  kind: EntityKind.Method,
                  name: "method",
                  signatures: [
                    {
                      description: undefined,
                      id: 4745,
                      kind: EntityKind.Signature,
                      modifiers: [
                        "public"
                      ],
                      name: "method",
                      parameters: [],
                      position: {
                        column: 2,
                        file: "/file.ts",
                        line: 4
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
              name: "Class",
              position: {
                column: 0,
                file: "/file.ts",
                line: 1
              },
              properties: [
                {
                  description: undefined,
                  id: 4461,
                  initializer: {
                    id: 1706,
                    kind: TypeKind.NumberLiteral,
                    name: "number",
                    value: 1
                  },
                  kind: EntityKind.Property,
                  modifiers: [
                    "public"
                  ],
                  name: "property",
                  optional: false,
                  position: {
                    column: 2,
                    file: "/file.ts",
                    line: 3
                  },
                  type: {
                    id: 17,
                    kind: TypeKind.Number,
                    name: "number"
                  }
                }
              ],
              setters: [
                {
                  id: 4466,
                  kind: EntityKind.Setter,
                  name: "setter",
                  signatures: [
                    {
                      description: undefined,
                      id: 4746,
                      kind: EntityKind.Signature,
                      modifiers: [
                        "public"
                      ],
                      name: "setter",
                      parameters: [
                        {
                          description: undefined,
                          id: 4463,
                          initializer: undefined,
                          kind: EntityKind.Parameter,
                          name: "value",
                          optional: false,
                          position: {
                            column: 20,
                            file: "/file.ts",
                            line: 6
                          },
                          rest: false,
                          type: {
                            id: 16,
                            kind: TypeKind.String,
                            name: "string"
                          }
                        }
                      ],
                      position: {
                        column: 2,
                        file: "/file.ts",
                        line: 6
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
              ]
            },
            typeParameters: undefined
          }
        ]
      },
      description: undefined,
      getters: [
        {
          id: 4462,
          kind: EntityKind.Getter,
          name: "getter",
          signatures: [
            {
              description: undefined,
              id: 4743,
              kind: EntityKind.Signature,
              modifiers: [
                "public"
              ],
              name: "getter",
              parameters: [],
              position: {
                column: 2,
                file: "/file.ts",
                line: 5
              },
              returnType: {
                description: undefined,
                id: 16,
                kind: TypeKind.String,
                name: "string"
              },
              typeParameters: undefined
            }
          ]
        }
      ],
      heritage: undefined,
      id: 4458,
      kind: EntityKind.Class,
      methods: [
        {
          id: 4459,
          kind: EntityKind.Method,
          name: "method",
          signatures: [
            {
              description: undefined,
              id: 4745,
              kind: EntityKind.Signature,
              modifiers: [
                "public"
              ],
              name: "method",
              parameters: [],
              position: {
                column: 2,
                file: "/file.ts",
                line: 4
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
      modifiers: [],
      name: "Class",
      position: {
        column: 0,
        file: "/file.ts",
        line: 1
      },
      properties: [
        {
          description: undefined,
          id: 4461,
          initializer: {
            id: 1706,
            kind: TypeKind.NumberLiteral,
            name: "number",
            value: 1
          },
          kind: EntityKind.Property,
          modifiers: [
            "public"
          ],
          name: "property",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 3
          },
          type: {
            id: 17,
            kind: TypeKind.Number,
            name: "number"
          }
        }
      ],
      setters: [
        {
          id: 4460,
          kind: EntityKind.Setter,
          name: "setter",
          signatures: [
            {
              description: undefined,
              id: 4746,
              kind: EntityKind.Signature,
              modifiers: [
                "public"
              ],
              name: "setter",
              parameters: [
                {
                  description: undefined,
                  id: 4463,
                  initializer: undefined,
                  kind: EntityKind.Parameter,
                  name: "value",
                  optional: false,
                  position: {
                    column: 20,
                    file: "/file.ts",
                    line: 6
                  },
                  rest: false,
                  type: {
                    id: 16,
                    kind: TypeKind.String,
                    name: "string"
                  }
                }
              ],
              position: {
                column: 2,
                file: "/file.ts",
                line: 6
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
      typeParameters: undefined
    };

    // #endregion

    const ctx = createRenderContext();

    const convertedClassForTableOfContents = convertClassEntityForTableOfContents(ctx, classEntity as ClassEntity);
    const convertedClassForDocumentation = convertClassEntityForDocumentation(ctx, classEntity as ClassEntity);

    const [
      position,
      tags,
      description,
      remarks,
      example,
      constructSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedClassForDocumentation.children;

    it("should have matching class name", () => {
      expect(convertedClassForTableOfContents.children).to.equal("Class");
      expect(convertedClassForDocumentation.title).to.equal("Class");
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
      expect(constructSignatures.children).to.have.lengthOf(1);
    });

    it("should have two properties", () => {
      expect(properties.children).to.have.lengthOf(1);
    });

    it("should have one method signature", () => {
      expect(methods.children).to.have.lengthOf(1);
    });

    it("should have one setter signature", () => {
      expect(setters.children).to.have.lengthOf(1);
    });

    it("should have one getter signature", () => {
      expect(getters.children).to.have.lengthOf(1);
    });

  }

});
