import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import { BuiltInRenderers } from "unwritten:renderer:enums/renderer.js";
import { renderInterfaceEntity } from "unwritten:renderer:typescript/ast/entities/interface.js";
import { renderNewLine } from "unwritten:renderer:utils/new-line.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { InterfaceEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.Interface, () => {

  {

    // #region Entity with all possible members

    // #region Source

    // export interface Interface {
    //   (): void;
    //   new (): void;
    //   method(a: number): void;
    //   method(a: string): void;
    //   prop: string;
    //   funcProp: () => void;
    //   get getter(): string;
    //   set setter(value: string);
    // }

    // #endregion

    const interfaceEntity: Testable<InterfaceEntity> = {
      callSignatures: [
        {
          description: undefined,
          id: 4455,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 2
          },
          returnType: {
            description: undefined,
            id: 24,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        }
      ],
      constructSignatures: [
        {
          description: undefined,
          id: 4456,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 3
          },
          returnType: {
            description: undefined,
            id: 24,
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
          id: 4460,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "getter",
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 8
          },
          returnType: {
            description: undefined,
            id: 15,
            kind: TypeKind.String,
            name: "string"
          },
          typeParameters: undefined
        }
      ],
      heritage: undefined,
      id: 4052,
      kind: EntityKind.Interface,
      methodSignatures: [
        {
          description: undefined,
          id: 4458,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "method",
          parameters: [
            {
              description: undefined,
              id: 4053,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 9,
                file: "/file.ts",
                line: 4
              },
              rest: false,
              type: {
                id: 16,
                kind: TypeKind.Number,
                name: "number"
              }
            }
          ],
          position: {
            column: 2,
            file: "/file.ts",
            line: 4
          },
          returnType: {
            description: undefined,
            id: 24,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        },
        {
          description: undefined,
          id: 4459,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "method",
          parameters: [
            {
              description: undefined,
              id: 4054,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 9,
                file: "/file.ts",
                line: 5
              },
              rest: false,
              type: {
                id: 15,
                kind: TypeKind.String,
                name: "string"
              }
            }
          ],
          position: {
            column: 2,
            file: "/file.ts",
            line: 5
          },
          returnType: {
            description: undefined,
            id: 24,
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
        line: 1
      },
      properties: [
        {
          description: undefined,
          id: 4055,
          kind: EntityKind.Property,
          modifiers: [],
          name: "prop",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 6
          },
          type: {
            id: 15,
            kind: TypeKind.String,
            name: "string"
          }
        },
        {
          description: undefined,
          id: 4056,
          kind: EntityKind.Property,
          modifiers: [],
          name: "funcProp",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 7
          },
          type: {
            id: 2612,
            kind: TypeKind.Function,
            signatures: [
              {
                description: undefined,
                id: 4457,
                kind: EntityKind.Signature,
                modifiers: [],
                name: undefined,
                parameters: [],
                position: {
                  column: 12,
                  file: "/file.ts",
                  line: 7
                },
                returnType: {
                  description: undefined,
                  id: 24,
                  kind: TypeKind.Void,
                  name: "void"
                },
                typeParameters: undefined
              }
            ]
          }
        }
      ],
      setterSignatures: [
        {
          description: undefined,
          id: 4461,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "setter",
          parameters: [
            {
              description: undefined,
              id: 4059,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "value",
              optional: false,
              position: {
                column: 13,
                file: "/file.ts",
                line: 9
              },
              rest: false,
              type: {
                id: 15,
                kind: TypeKind.String,
                name: "string"
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
            id: 1,
            kind: TypeKind.Any,
            name: "any"
          },
          typeParameters: undefined
        }
      ],
      typeParameters: undefined
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedInterface = renderInterfaceEntity(ctx, interfaceEntity as InterfaceEntity);
    const renderedInterfaceLines = renderedInterface.split(renderNewLine(ctx));

    it("should have a matching header", () => {
      expect(renderedInterfaceLines[0]).to.equal("interface Interface {");
    });

    it("should have the right amount of members", () => {
      expect(renderedInterfaceLines.length).to.equal(8 + 2);
    });

    it("should have a matching footer", () => {
      expect(renderedInterfaceLines[9]).to.equal("}");
    });

  }

  {

    // #region Entity with single heritage

    // #region Source

    // interface InterfaceA {
    //   propA: string;
    // }
    // export interface InterfaceB extends InterfaceA {
    //   propB: string;
    // }

    // #endregion

    const interfaceEntity: Testable<InterfaceEntity> = {
      callSignatures: [],
      constructSignatures: [],
      description: undefined,
      getterSignatures: [],
      heritage: [
        {
          id: 4455,
          instanceType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2611,
            isThis: false,
            kind: TypeKind.Interface,
            methods: [],
            name: "InterfaceA",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [
              {
                description: undefined,
                id: 4053,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [],
                name: "propA",
                optional: false,
                position: {
                  column: 2,
                  file: "/file.ts",
                  line: 2
                },
                type: {
                  id: 15,
                  kind: TypeKind.String,
                  name: "string"
                }
              }
            ],
            setters: [],
            typeParameters: undefined
          },
          kind: TypeKind.Expression,
          name: "InterfaceA",
          staticType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2611,
            isThis: false,
            kind: TypeKind.Interface,
            methods: [],
            name: "InterfaceA",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [
              {
                description: undefined,
                id: 4053,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [],
                name: "propA",
                optional: false,
                position: {
                  column: 2,
                  file: "/file.ts",
                  line: 2
                },
                type: {
                  id: 15,
                  kind: TypeKind.String,
                  name: "string"
                }
              }
            ],
            setters: [],
            typeParameters: undefined
          },
          typeArguments: undefined
        }
      ],
      id: 4054,
      kind: EntityKind.Interface,
      methodSignatures: [],
      name: "InterfaceB",
      position: {
        column: 0,
        file: "/file.ts",
        line: 4
      },
      properties: [
        {
          description: undefined,
          id: 4055,
          initializer: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "propB",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 5
          },
          type: {
            id: 15,
            kind: TypeKind.String,
            name: "string"
          }
        }
      ],
      setterSignatures: [],
      typeParameters: undefined
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedInterface = renderInterfaceEntity(ctx, interfaceEntity as InterfaceEntity);
    const renderedInterfaceLines = renderedInterface.split(renderNewLine(ctx));

    it("should include the heritage in the header", () => {
      expect(renderedInterfaceLines[0]).to.equal("interface InterfaceB extends InterfaceA {");
    });

    it("should contain inherited properties", () => {
      expect(renderedInterfaceLines).to.have.lengthOf(2 + 2);
      expect(renderedInterfaceLines[1]).to.match(/^\s+propA: string;$/);
      expect(renderedInterfaceLines[2]).to.match(/^\s+propB: string;$/);
    });

  }

  {

    // #region Entity with multiple heritages

    // #region Source

    // interface InterfaceA {
    //   propA: string;
    // }
    // interface InterfaceB {
    //   propB: string;
    // }
    // export interface InterfaceC extends InterfaceA, InterfaceB {
    //   propC: string;
    // }

    // #endregion

    const interfaceEntity: Testable<InterfaceEntity> = {
      callSignatures: [],
      constructSignatures: [],
      description: undefined,
      getterSignatures: [],
      heritage: [
        {
          id: 4455,
          instanceType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2611,
            isThis: false,
            kind: TypeKind.Interface,
            methods: [],
            name: "InterfaceA",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [
              {
                description: undefined,
                id: 4053,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [],
                name: "propA",
                optional: false,
                position: {
                  column: 2,
                  file: "/file.ts",
                  line: 2
                },
                type: {
                  id: 15,
                  kind: TypeKind.String,
                  name: "string"
                }
              }
            ],
            setters: [],
            typeParameters: undefined
          },
          kind: TypeKind.Expression,
          name: "InterfaceA",
          staticType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2611,
            isThis: false,
            kind: TypeKind.Interface,
            methods: [],
            name: "InterfaceA",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [
              {
                description: undefined,
                id: 4053,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [],
                name: "propA",
                optional: false,
                position: {
                  column: 2,
                  file: "/file.ts",
                  line: 2
                },
                type: {
                  id: 15,
                  kind: TypeKind.String,
                  name: "string"
                }
              }
            ],
            setters: [],
            typeParameters: undefined
          },
          typeArguments: undefined
        },
        {
          id: 4456,
          instanceType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2612,
            isThis: false,
            kind: TypeKind.Interface,
            methods: [],
            name: "InterfaceB",
            position: {
              column: 0,
              file: "/file.ts",
              line: 4
            },
            properties: [
              {
                description: undefined,
                id: 4055,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [],
                name: "propB",
                optional: false,
                position: {
                  column: 2,
                  file: "/file.ts",
                  line: 5
                },
                type: {
                  id: 15,
                  kind: TypeKind.String,
                  name: "string"
                }
              }
            ],
            setters: [],
            typeParameters: undefined
          },
          kind: TypeKind.Expression,
          name: "InterfaceB",
          staticType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2612,
            isThis: false,
            kind: TypeKind.Interface,
            methods: [],
            name: "InterfaceB",
            position: {
              column: 0,
              file: "/file.ts",
              line: 4
            },
            properties: [
              {
                description: undefined,
                id: 4055,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [],
                name: "propB",
                optional: false,
                position: {
                  column: 2,
                  file: "/file.ts",
                  line: 5
                },
                type: {
                  id: 15,
                  kind: TypeKind.String,
                  name: "string"
                }
              }
            ],
            setters: [],
            typeParameters: undefined
          },
          typeArguments: undefined
        }
      ],
      id: 4056,
      kind: EntityKind.Interface,
      methodSignatures: [],
      name: "InterfaceC",
      position: {
        column: 0,
        file: "/file.ts",
        line: 7
      },
      properties: [
        {
          description: undefined,
          id: 4057,
          initializer: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "propC",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 8
          },
          type: {
            id: 15,
            kind: TypeKind.String,
            name: "string"
          }
        }
      ],
      setterSignatures: [],
      typeParameters: undefined
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedInterface = renderInterfaceEntity(ctx, interfaceEntity as InterfaceEntity);
    const renderedInterfaceLines = renderedInterface.split(renderNewLine(ctx));

    it("should include the heritages in the header", () => {
      expect(renderedInterfaceLines[0]).to.equal("interface InterfaceC extends InterfaceA, InterfaceB {");
    });

  }

  {

    // #region Entity with single heritage and overridden property

    // #region Source

    // interface InterfaceA {
    //   prop: string | number;
    //   test(): string | number;
    // }
    // export interface InterfaceB extends InterfaceA {
    //   prop: string;
    //   test(): string;
    // }

    // #endregion

    const interfaceEntity: Testable<InterfaceEntity> = {
      callSignatures: [],
      constructSignatures: [],
      description: undefined,
      getterSignatures: [],
      heritage: [
        {
          id: 4457,
          instanceType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2611,
            isThis: false,
            kind: TypeKind.Interface,
            methods: [
              {
                id: 4056,
                kind: EntityKind.Method,
                name: "test",
                signatures: [
                  {
                    description: undefined,
                    id: 4458,
                    kind: EntityKind.Signature,
                    modifiers: [],
                    name: "test",
                    parameters: [],
                    position: {
                      column: 2,
                      file: "/file.ts",
                      line: 3
                    },
                    returnType: {
                      description: undefined,
                      id: 30,
                      kind: TypeKind.Union,
                      types: [
                        {
                          id: 15,
                          kind: TypeKind.String,
                          name: "string"
                        },
                        {
                          id: 16,
                          kind: TypeKind.Number,
                          name: "number"
                        }
                      ]
                    },
                    typeParameters: undefined
                  }
                ]
              }
            ],
            name: "InterfaceA",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [
              {
                description: undefined,
                id: 4053,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [],
                name: "prop",
                optional: false,
                position: {
                  column: 2,
                  file: "/file.ts",
                  line: 2
                },
                type: {
                  id: 30,
                  kind: TypeKind.Union,
                  types: [
                    {
                      id: 15,
                      kind: TypeKind.String,
                      name: "string"
                    },
                    {
                      id: 16,
                      kind: TypeKind.Number,
                      name: "number"
                    }
                  ]
                }
              }
            ],
            setters: [],
            typeParameters: undefined
          },
          kind: TypeKind.Expression,
          name: "InterfaceA",
          staticType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2611,
            isThis: false,
            kind: TypeKind.Interface,
            methods: [
              {
                id: 4056,
                kind: EntityKind.Method,
                name: "test",
                signatures: [
                  {
                    description: undefined,
                    id: 4458,
                    kind: EntityKind.Signature,
                    modifiers: [],
                    name: "test",
                    parameters: [],
                    position: {
                      column: 2,
                      file: "/file.ts",
                      line: 3
                    },
                    returnType: {
                      description: undefined,
                      id: 30,
                      kind: TypeKind.Union,
                      types: [
                        {
                          id: 15,
                          kind: TypeKind.String,
                          name: "string"
                        },
                        {
                          id: 16,
                          kind: TypeKind.Number,
                          name: "number"
                        }
                      ]
                    },
                    typeParameters: undefined
                  }
                ]
              }
            ],
            name: "InterfaceA",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [
              {
                description: undefined,
                id: 4053,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [],
                name: "prop",
                optional: false,
                position: {
                  column: 2,
                  file: "/file.ts",
                  line: 2
                },
                type: {
                  id: 30,
                  kind: TypeKind.Union,
                  types: [
                    {
                      id: 15,
                      kind: TypeKind.String,
                      name: "string"
                    },
                    {
                      id: 16,
                      kind: TypeKind.Number,
                      name: "number"
                    }
                  ]
                }
              }
            ],
            setters: [],
            typeParameters: undefined
          },
          typeArguments: undefined
        }
      ],
      id: 4054,
      kind: EntityKind.Interface,
      methodSignatures: [
        {
          description: undefined,
          id: 4459,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "test",
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 7
          },
          returnType: {
            description: undefined,
            id: 15,
            kind: TypeKind.String,
            name: "string"
          },
          typeParameters: undefined
        }
      ],
      name: "InterfaceB",
      position: {
        column: 0,
        file: "/file.ts",
        line: 5
      },
      properties: [
        {
          description: undefined,
          id: 4055,
          initializer: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "prop",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 6
          },
          type: {
            id: 15,
            kind: TypeKind.String,
            name: "string"
          }
        }
      ],
      setterSignatures: [],
      typeParameters: undefined
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedInterface = renderInterfaceEntity(ctx, interfaceEntity as InterfaceEntity);
    const renderedInterfaceLines = renderedInterface.split(renderNewLine(ctx));

    it("should contain the right amount of lines", () => {
      expect(renderedInterfaceLines).to.have.lengthOf(2 + 2);
    });

    it("should only contain the overwriting property", () => {
      expect(renderedInterfaceLines[1].trim()).to.equal("prop: string;");
    });

    it("should only contain the overwriting method", () => {
      expect(renderedInterfaceLines[2].trim()).to.equal("test(): string;");
    });

  }

  {

    // #region Entity with single heritage and overwritten method

    // #region Source

    // interface InterfaceA {
    //   prop: string | number;
    //   test(): string | number;
    // }
    // export interface InterfaceB extends InterfaceA {
    // }

    // #endregion

    const interfaceEntity: Testable<InterfaceEntity> = {
      callSignatures: [],
      constructSignatures: [],
      description: undefined,
      getterSignatures: [],
      heritage: [
        {
          id: 4457,
          instanceType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2611,
            isThis: false,
            kind: TypeKind.Interface,
            methods: [
              {
                id: 4056,
                kind: EntityKind.Method,
                name: "test",
                signatures: [
                  {
                    description: undefined,
                    id: 4458,
                    kind: EntityKind.Signature,
                    modifiers: [],
                    name: "test",
                    parameters: [],
                    position: {
                      column: 2,
                      file: "/file.ts",
                      line: 3
                    },
                    returnType: {
                      description: undefined,
                      id: 30,
                      kind: TypeKind.Union,
                      types: [
                        {
                          id: 15,
                          kind: TypeKind.String,
                          name: "string"
                        },
                        {
                          id: 16,
                          kind: TypeKind.Number,
                          name: "number"
                        }
                      ]
                    },
                    typeParameters: undefined
                  }
                ]
              }
            ],
            name: "InterfaceA",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [
              {
                description: undefined,
                id: 4053,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [],
                name: "prop",
                optional: false,
                position: {
                  column: 2,
                  file: "/file.ts",
                  line: 2
                },
                type: {
                  id: 30,
                  kind: TypeKind.Union,
                  types: [
                    {
                      id: 15,
                      kind: TypeKind.String,
                      name: "string"
                    },
                    {
                      id: 16,
                      kind: TypeKind.Number,
                      name: "number"
                    }
                  ]
                }
              }
            ],
            setters: [],
            typeParameters: undefined
          },
          kind: TypeKind.Expression,
          name: "InterfaceA",
          staticType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2611,
            isThis: false,
            kind: TypeKind.Interface,
            methods: [
              {
                id: 4056,
                kind: EntityKind.Method,
                name: "test",
                signatures: [
                  {
                    description: undefined,
                    id: 4458,
                    kind: EntityKind.Signature,
                    modifiers: [],
                    name: "test",
                    parameters: [],
                    position: {
                      column: 2,
                      file: "/file.ts",
                      line: 3
                    },
                    returnType: {
                      description: undefined,
                      id: 30,
                      kind: TypeKind.Union,
                      types: [
                        {
                          id: 15,
                          kind: TypeKind.String,
                          name: "string"
                        },
                        {
                          id: 16,
                          kind: TypeKind.Number,
                          name: "number"
                        }
                      ]
                    },
                    typeParameters: undefined
                  }
                ]
              }
            ],
            name: "InterfaceA",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [
              {
                description: undefined,
                id: 4053,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [],
                name: "prop",
                optional: false,
                position: {
                  column: 2,
                  file: "/file.ts",
                  line: 2
                },
                type: {
                  id: 30,
                  kind: TypeKind.Union,
                  types: [
                    {
                      id: 15,
                      kind: TypeKind.String,
                      name: "string"
                    },
                    {
                      id: 16,
                      kind: TypeKind.Number,
                      name: "number"
                    }
                  ]
                }
              }
            ],
            setters: [],
            typeParameters: undefined
          },
          typeArguments: undefined
        }
      ],
      id: 4054,
      kind: EntityKind.Interface,
      methodSignatures: [],
      name: "InterfaceB",
      position: {
        column: 0,
        file: "/file.ts",
        line: 5
      },
      properties: [],
      setterSignatures: [],
      typeParameters: undefined
    };

    // #endregion

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedInterface = renderInterfaceEntity(ctx, interfaceEntity as InterfaceEntity);
    const renderedInterfaceLines = renderedInterface.split(renderNewLine(ctx));

    it("should contain inherited methods", () => {
      expect(renderedInterfaceLines).to.have.lengthOf(2 + 2);
      expect(renderedInterfaceLines[1].trim()).to.equal("prop: string | number;");
      expect(renderedInterfaceLines[2].trim()).to.equal("test(): string | number;");
    });

  }

});
