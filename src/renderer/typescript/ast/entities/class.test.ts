import { expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler/enums/types.js";
import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderClassEntity } from "unwritten:renderer/typescript/ast/entities/class.js";
import { renderNewLine } from "unwritten:renderer/utils/new-line.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { ClassEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("TypeScriptRenderer", EntityKind.Class, () => {

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

    const ctx = createRenderContext(BuiltInRenderers.TypeScript);

    const renderedClass = renderClassEntity(ctx, classEntity as ClassEntity);
    const renderedClassLines = renderedClass.split(renderNewLine(ctx));

    it("should have a matching header", () => {
      expect(renderedClassLines[0]).to.equal("class Class {");
    });

    it("should have the right amount of members", () => {
      expect(renderedClassLines.length).to.equal(5 + 2);
    });

    it("should have a matching footer", () => {
      expect(renderedClassLines[6]).to.equal("}");
    });

  }

  // {

  //   // #region Entity with single heritage

  //   /*
  //   class ClassA {
  //     propA: string;
  //   }
  //   export class ClassB extends ClassA {
  //     propB: string;
  //   }
  //   */

  //   const classEntity: Testable<ClassEntity> = {
  //     callSignatures: [],
  //     constructSignatures: [],
  //     description: undefined,
  //     getterSignatures: [],
  //     heritage: [
  //       {
  //         id: 4455,
  //         instanceType: {
  //           callSignatures: [],
  //           constructSignatures: [],
  //           getters: [],
  //           id: 2611,
  //           isThis: false,
  //           kind: TypeKind.Class,
  //           methods: [],
  //           name: "ClassA",
  //           position: {
  //             column: 0,
  //             file: "/file.ts",
  //             line: 1
  //           },
  //           properties: [
  //             {
  //               description: undefined,
  //               id: 4053,
  //               initializer: undefined,
  //               kind: EntityKind.Property,
  //               modifiers: [],
  //               name: "propA",
  //               optional: false,
  //               position: {
  //                 column: 2,
  //                 file: "/file.ts",
  //                 line: 2
  //               },
  //               type: {
  //                 id: 15,
  //                 kind: TypeKind.String,
  //                 name: "string"
  //               }
  //             }
  //           ],
  //           setters: [],
  //           typeParameters: undefined
  //         },
  //         kind: TypeKind.Expression,
  //         name: "ClassA",
  //         staticType: {
  //           callSignatures: [],
  //           constructSignatures: [],
  //           getters: [],
  //           id: 2611,
  //           isThis: false,
  //           kind: TypeKind.Class,
  //           methods: [],
  //           name: "ClassA",
  //           position: {
  //             column: 0,
  //             file: "/file.ts",
  //             line: 1
  //           },
  //           properties: [
  //             {
  //               description: undefined,
  //               id: 4053,
  //               initializer: undefined,
  //               kind: EntityKind.Property,
  //               modifiers: [],
  //               name: "propA",
  //               optional: false,
  //               position: {
  //                 column: 2,
  //                 file: "/file.ts",
  //                 line: 2
  //               },
  //               type: {
  //                 id: 15,
  //                 kind: TypeKind.String,
  //                 name: "string"
  //               }
  //             }
  //           ],
  //           setters: [],
  //           typeParameters: undefined
  //         },
  //         typeArguments: undefined
  //       }
  //     ],
  //     id: 4054,
  //     kind: EntityKind.Class,
  //     methodSignatures: [],
  //     name: "ClassB",
  //     position: {
  //       column: 0,
  //       file: "/file.ts",
  //       line: 4
  //     },
  //     properties: [
  //       {
  //         description: undefined,
  //         id: 4055,
  //         initializer: undefined,
  //         kind: EntityKind.Property,
  //         modifiers: [],
  //         name: "propB",
  //         optional: false,
  //         position: {
  //           column: 2,
  //           file: "/file.ts",
  //           line: 5
  //         },
  //         type: {
  //           id: 15,
  //           kind: TypeKind.String,
  //           name: "string"
  //         }
  //       }
  //     ],
  //     setterSignatures: [],
  //     typeParameters: undefined
  //   };

  //   // #endregion

  //   const ctx = createRenderContext(BuiltInRenderers.TypeScript);

  //   const renderedClass = renderClassEntity(ctx, classEntity as ClassEntity);
  //   const renderedClassLines = renderedClass.split(renderNewLine(ctx));

  //   it("should include the heritage in the header", () => {
  //     expect(renderedClassLines[0]).to.equal("class ClassB extends ClassA {");
  //   });

  //   it("should contain inherited properties", () => {
  //     expect(renderedClassLines).to.have.lengthOf(2 + 2);
  //     expect(renderedClassLines[1]).to.match(/^\s+propA: string;$/);
  //     expect(renderedClassLines[2]).to.match(/^\s+propB: string;$/);
  //   });

  // }

  // {

  //   // #region Entity with multiple heritages

  //   /*
  //   class ClassA {
  //     propA: string;
  //   }
  //   class ClassB {
  //     propB: string;
  //   }
  //   export class ClassC extends ClassA, ClassB {
  //     propC: string;
  //   }
  //   */

  //   const classEntity: Testable<ClassEntity> = {
  //     callSignatures: [],
  //     constructSignatures: [],
  //     description: undefined,
  //     getterSignatures: [],
  //     heritage: [
  //       {
  //         id: 4455,
  //         instanceType: {
  //           callSignatures: [],
  //           constructSignatures: [],
  //           getters: [],
  //           id: 2611,
  //           isThis: false,
  //           kind: TypeKind.Class,
  //           methods: [],
  //           name: "ClassA",
  //           position: {
  //             column: 0,
  //             file: "/file.ts",
  //             line: 1
  //           },
  //           properties: [
  //             {
  //               description: undefined,
  //               id: 4053,
  //               initializer: undefined,
  //               kind: EntityKind.Property,
  //               modifiers: [],
  //               name: "propA",
  //               optional: false,
  //               position: {
  //                 column: 2,
  //                 file: "/file.ts",
  //                 line: 2
  //               },
  //               type: {
  //                 id: 15,
  //                 kind: TypeKind.String,
  //                 name: "string"
  //               }
  //             }
  //           ],
  //           setters: [],
  //           typeParameters: undefined
  //         },
  //         kind: TypeKind.Expression,
  //         name: "ClassA",
  //         staticType: {
  //           callSignatures: [],
  //           constructSignatures: [],
  //           getters: [],
  //           id: 2611,
  //           isThis: false,
  //           kind: TypeKind.Class,
  //           methods: [],
  //           name: "ClassA",
  //           position: {
  //             column: 0,
  //             file: "/file.ts",
  //             line: 1
  //           },
  //           properties: [
  //             {
  //               description: undefined,
  //               id: 4053,
  //               initializer: undefined,
  //               kind: EntityKind.Property,
  //               modifiers: [],
  //               name: "propA",
  //               optional: false,
  //               position: {
  //                 column: 2,
  //                 file: "/file.ts",
  //                 line: 2
  //               },
  //               type: {
  //                 id: 15,
  //                 kind: TypeKind.String,
  //                 name: "string"
  //               }
  //             }
  //           ],
  //           setters: [],
  //           typeParameters: undefined
  //         },
  //         typeArguments: undefined
  //       },
  //       {
  //         id: 4456,
  //         instanceType: {
  //           callSignatures: [],
  //           constructSignatures: [],
  //           getters: [],
  //           id: 2612,
  //           isThis: false,
  //           kind: TypeKind.Class,
  //           methods: [],
  //           name: "ClassB",
  //           position: {
  //             column: 0,
  //             file: "/file.ts",
  //             line: 4
  //           },
  //           properties: [
  //             {
  //               description: undefined,
  //               id: 4055,
  //               initializer: undefined,
  //               kind: EntityKind.Property,
  //               modifiers: [],
  //               name: "propB",
  //               optional: false,
  //               position: {
  //                 column: 2,
  //                 file: "/file.ts",
  //                 line: 5
  //               },
  //               type: {
  //                 id: 15,
  //                 kind: TypeKind.String,
  //                 name: "string"
  //               }
  //             }
  //           ],
  //           setters: [],
  //           typeParameters: undefined
  //         },
  //         kind: TypeKind.Expression,
  //         name: "ClassB",
  //         staticType: {
  //           callSignatures: [],
  //           constructSignatures: [],
  //           getters: [],
  //           id: 2612,
  //           isThis: false,
  //           kind: TypeKind.Class,
  //           methods: [],
  //           name: "ClassB",
  //           position: {
  //             column: 0,
  //             file: "/file.ts",
  //             line: 4
  //           },
  //           properties: [
  //             {
  //               description: undefined,
  //               id: 4055,
  //               initializer: undefined,
  //               kind: EntityKind.Property,
  //               modifiers: [],
  //               name: "propB",
  //               optional: false,
  //               position: {
  //                 column: 2,
  //                 file: "/file.ts",
  //                 line: 5
  //               },
  //               type: {
  //                 id: 15,
  //                 kind: TypeKind.String,
  //                 name: "string"
  //               }
  //             }
  //           ],
  //           setters: [],
  //           typeParameters: undefined
  //         },
  //         typeArguments: undefined
  //       }
  //     ],
  //     id: 4056,
  //     kind: EntityKind.Class,
  //     methodSignatures: [],
  //     name: "ClassC",
  //     position: {
  //       column: 0,
  //       file: "/file.ts",
  //       line: 7
  //     },
  //     properties: [
  //       {
  //         description: undefined,
  //         id: 4057,
  //         initializer: undefined,
  //         kind: EntityKind.Property,
  //         modifiers: [],
  //         name: "propC",
  //         optional: false,
  //         position: {
  //           column: 2,
  //           file: "/file.ts",
  //           line: 8
  //         },
  //         type: {
  //           id: 15,
  //           kind: TypeKind.String,
  //           name: "string"
  //         }
  //       }
  //     ],
  //     setterSignatures: [],
  //     typeParameters: undefined
  //   };

  //   // #endregion

  //   const ctx = createRenderContext(BuiltInRenderers.TypeScript);

  //   const renderedClass = renderClassEntity(ctx, classEntity as ClassEntity);
  //   const renderedClassLines = renderedClass.split(renderNewLine(ctx));

  //   it("should include the heritages in the header", () => {
  //     expect(renderedClassLines[0]).to.equal("class ClassC extends ClassA, ClassB {");
  //   });

  // }

  // {

  //   // #region Entity with single heritage and overridden property

  //   /*
  //   class ClassA {
  //     prop: string | number;
  //     test(): string | number;
  //   }
  //   export class ClassB extends ClassA {
  //     prop: string;
  //     test(): string;
  //   }
  //   */

  //   const classEntity: Testable<ClassEntity> = {
  //     callSignatures: [],
  //     constructSignatures: [],
  //     description: undefined,
  //     getterSignatures: [],
  //     heritage: [
  //       {
  //         id: 4457,
  //         instanceType: {
  //           callSignatures: [],
  //           constructSignatures: [],
  //           getters: [],
  //           id: 2611,
  //           isThis: false,
  //           kind: TypeKind.Class,
  //           methods: [
  //             {
  //               id: 4056,
  //               kind: EntityKind.Method,
  //               name: "test",
  //               signatures: [
  //                 {
  //                   description: undefined,
  //                   id: 4458,
  //                   kind: EntityKind.Signature,
  //                   modifiers: [],
  //                   name: "test",
  //                   parameters: [],
  //                   position: {
  //                     column: 2,
  //                     file: "/file.ts",
  //                     line: 3
  //                   },
  //                   returnType: {
  //                     description: undefined,
  //                     id: 30,
  //                     kind: TypeKind.Union,
  //                     types: [
  //                       {
  //                         id: 15,
  //                         kind: TypeKind.String,
  //                         name: "string"
  //                       },
  //                       {
  //                         id: 16,
  //                         kind: TypeKind.Number,
  //                         name: "number"
  //                       }
  //                     ]
  //                   },
  //                   typeParameters: undefined
  //                 }
  //               ]
  //             }
  //           ],
  //           name: "ClassA",
  //           position: {
  //             column: 0,
  //             file: "/file.ts",
  //             line: 1
  //           },
  //           properties: [
  //             {
  //               description: undefined,
  //               id: 4053,
  //               initializer: undefined,
  //               kind: EntityKind.Property,
  //               modifiers: [],
  //               name: "prop",
  //               optional: false,
  //               position: {
  //                 column: 2,
  //                 file: "/file.ts",
  //                 line: 2
  //               },
  //               type: {
  //                 id: 30,
  //                 kind: TypeKind.Union,
  //                 types: [
  //                   {
  //                     id: 15,
  //                     kind: TypeKind.String,
  //                     name: "string"
  //                   },
  //                   {
  //                     id: 16,
  //                     kind: TypeKind.Number,
  //                     name: "number"
  //                   }
  //                 ]
  //               }
  //             }
  //           ],
  //           setters: [],
  //           typeParameters: undefined
  //         },
  //         kind: TypeKind.Expression,
  //         name: "ClassA",
  //         staticType: {
  //           callSignatures: [],
  //           constructSignatures: [],
  //           getters: [],
  //           id: 2611,
  //           isThis: false,
  //           kind: TypeKind.Class,
  //           methods: [
  //             {
  //               id: 4056,
  //               kind: EntityKind.Method,
  //               name: "test",
  //               signatures: [
  //                 {
  //                   description: undefined,
  //                   id: 4458,
  //                   kind: EntityKind.Signature,
  //                   modifiers: [],
  //                   name: "test",
  //                   parameters: [],
  //                   position: {
  //                     column: 2,
  //                     file: "/file.ts",
  //                     line: 3
  //                   },
  //                   returnType: {
  //                     description: undefined,
  //                     id: 30,
  //                     kind: TypeKind.Union,
  //                     types: [
  //                       {
  //                         id: 15,
  //                         kind: TypeKind.String,
  //                         name: "string"
  //                       },
  //                       {
  //                         id: 16,
  //                         kind: TypeKind.Number,
  //                         name: "number"
  //                       }
  //                     ]
  //                   },
  //                   typeParameters: undefined
  //                 }
  //               ]
  //             }
  //           ],
  //           name: "ClassA",
  //           position: {
  //             column: 0,
  //             file: "/file.ts",
  //             line: 1
  //           },
  //           properties: [
  //             {
  //               description: undefined,
  //               id: 4053,
  //               initializer: undefined,
  //               kind: EntityKind.Property,
  //               modifiers: [],
  //               name: "prop",
  //               optional: false,
  //               position: {
  //                 column: 2,
  //                 file: "/file.ts",
  //                 line: 2
  //               },
  //               type: {
  //                 id: 30,
  //                 kind: TypeKind.Union,
  //                 types: [
  //                   {
  //                     id: 15,
  //                     kind: TypeKind.String,
  //                     name: "string"
  //                   },
  //                   {
  //                     id: 16,
  //                     kind: TypeKind.Number,
  //                     name: "number"
  //                   }
  //                 ]
  //               }
  //             }
  //           ],
  //           setters: [],
  //           typeParameters: undefined
  //         },
  //         typeArguments: undefined
  //       }
  //     ],
  //     id: 4054,
  //     kind: EntityKind.Class,
  //     methodSignatures: [
  //       {
  //         description: undefined,
  //         id: 4459,
  //         kind: EntityKind.Signature,
  //         modifiers: [],
  //         name: "test",
  //         parameters: [],
  //         position: {
  //           column: 2,
  //           file: "/file.ts",
  //           line: 7
  //         },
  //         returnType: {
  //           description: undefined,
  //           id: 15,
  //           kind: TypeKind.String,
  //           name: "string"
  //         },
  //         typeParameters: undefined
  //       }
  //     ],
  //     name: "ClassB",
  //     position: {
  //       column: 0,
  //       file: "/file.ts",
  //       line: 5
  //     },
  //     properties: [
  //       {
  //         description: undefined,
  //         id: 4055,
  //         initializer: undefined,
  //         kind: EntityKind.Property,
  //         modifiers: [],
  //         name: "prop",
  //         optional: false,
  //         position: {
  //           column: 2,
  //           file: "/file.ts",
  //           line: 6
  //         },
  //         type: {
  //           id: 15,
  //           kind: TypeKind.String,
  //           name: "string"
  //         }
  //       }
  //     ],
  //     setterSignatures: [],
  //     typeParameters: undefined
  //   };

  //   // #endregion

  //   const ctx = createRenderContext(BuiltInRenderers.TypeScript);

  //   const renderedClass = renderClassEntity(ctx, classEntity as ClassEntity);
  //   const renderedClassLines = renderedClass.split(renderNewLine(ctx));

  //   it("should contain the right amount of lines", () => {
  //     expect(renderedClassLines).to.have.lengthOf(2 + 2);
  //   });

  //   it("should only contain the overwriting property", () => {
  //     expect(renderedClassLines[1].trim()).to.equal("prop: string;");
  //   });

  //   it("should only contain the overwriting method", () => {
  //     expect(renderedClassLines[2].trim()).to.equal("test(): string;");
  //   });

  // }

  // {

  //   // #region Entity with single heritage and overwritten method

  //   /*
  //   class ClassA {
  //     prop: string | number;
  //     test(): string | number;
  //   }
  //   export class ClassB extends ClassA {
  //   }
  //   */

  //   const classEntity: Testable<ClassEntity> = {
  //     callSignatures: [],
  //     constructSignatures: [],
  //     description: undefined,
  //     getterSignatures: [],
  //     heritage: [
  //       {
  //         id: 4457,
  //         instanceType: {
  //           callSignatures: [],
  //           constructSignatures: [],
  //           getters: [],
  //           id: 2611,
  //           isThis: false,
  //           kind: TypeKind.Class,
  //           methods: [
  //             {
  //               id: 4056,
  //               kind: EntityKind.Method,
  //               name: "test",
  //               signatures: [
  //                 {
  //                   description: undefined,
  //                   id: 4458,
  //                   kind: EntityKind.Signature,
  //                   modifiers: [],
  //                   name: "test",
  //                   parameters: [],
  //                   position: {
  //                     column: 2,
  //                     file: "/file.ts",
  //                     line: 3
  //                   },
  //                   returnType: {
  //                     description: undefined,
  //                     id: 30,
  //                     kind: TypeKind.Union,
  //                     types: [
  //                       {
  //                         id: 15,
  //                         kind: TypeKind.String,
  //                         name: "string"
  //                       },
  //                       {
  //                         id: 16,
  //                         kind: TypeKind.Number,
  //                         name: "number"
  //                       }
  //                     ]
  //                   },
  //                   typeParameters: undefined
  //                 }
  //               ]
  //             }
  //           ],
  //           name: "ClassA",
  //           position: {
  //             column: 0,
  //             file: "/file.ts",
  //             line: 1
  //           },
  //           properties: [
  //             {
  //               description: undefined,
  //               id: 4053,
  //               initializer: undefined,
  //               kind: EntityKind.Property,
  //               modifiers: [],
  //               name: "prop",
  //               optional: false,
  //               position: {
  //                 column: 2,
  //                 file: "/file.ts",
  //                 line: 2
  //               },
  //               type: {
  //                 id: 30,
  //                 kind: TypeKind.Union,
  //                 types: [
  //                   {
  //                     id: 15,
  //                     kind: TypeKind.String,
  //                     name: "string"
  //                   },
  //                   {
  //                     id: 16,
  //                     kind: TypeKind.Number,
  //                     name: "number"
  //                   }
  //                 ]
  //               }
  //             }
  //           ],
  //           setters: [],
  //           typeParameters: undefined
  //         },
  //         kind: TypeKind.Expression,
  //         name: "ClassA",
  //         staticType: {
  //           callSignatures: [],
  //           constructSignatures: [],
  //           getters: [],
  //           id: 2611,
  //           isThis: false,
  //           kind: TypeKind.Class,
  //           methods: [
  //             {
  //               id: 4056,
  //               kind: EntityKind.Method,
  //               name: "test",
  //               signatures: [
  //                 {
  //                   description: undefined,
  //                   id: 4458,
  //                   kind: EntityKind.Signature,
  //                   modifiers: [],
  //                   name: "test",
  //                   parameters: [],
  //                   position: {
  //                     column: 2,
  //                     file: "/file.ts",
  //                     line: 3
  //                   },
  //                   returnType: {
  //                     description: undefined,
  //                     id: 30,
  //                     kind: TypeKind.Union,
  //                     types: [
  //                       {
  //                         id: 15,
  //                         kind: TypeKind.String,
  //                         name: "string"
  //                       },
  //                       {
  //                         id: 16,
  //                         kind: TypeKind.Number,
  //                         name: "number"
  //                       }
  //                     ]
  //                   },
  //                   typeParameters: undefined
  //                 }
  //               ]
  //             }
  //           ],
  //           name: "ClassA",
  //           position: {
  //             column: 0,
  //             file: "/file.ts",
  //             line: 1
  //           },
  //           properties: [
  //             {
  //               description: undefined,
  //               id: 4053,
  //               initializer: undefined,
  //               kind: EntityKind.Property,
  //               modifiers: [],
  //               name: "prop",
  //               optional: false,
  //               position: {
  //                 column: 2,
  //                 file: "/file.ts",
  //                 line: 2
  //               },
  //               type: {
  //                 id: 30,
  //                 kind: TypeKind.Union,
  //                 types: [
  //                   {
  //                     id: 15,
  //                     kind: TypeKind.String,
  //                     name: "string"
  //                   },
  //                   {
  //                     id: 16,
  //                     kind: TypeKind.Number,
  //                     name: "number"
  //                   }
  //                 ]
  //               }
  //             }
  //           ],
  //           setters: [],
  //           typeParameters: undefined
  //         },
  //         typeArguments: undefined
  //       }
  //     ],
  //     id: 4054,
  //     kind: EntityKind.Class,
  //     methodSignatures: [],
  //     name: "ClassB",
  //     position: {
  //       column: 0,
  //       file: "/file.ts",
  //       line: 5
  //     },
  //     properties: [],
  //     setterSignatures: [],
  //     typeParameters: undefined
  //   };

  //   // #endregion

  //   const ctx = createRenderContext(BuiltInRenderers.TypeScript);

  //   const renderedClass = renderClassEntity(ctx, classEntity as ClassEntity);
  //   const renderedClassLines = renderedClass.split(renderNewLine(ctx));

  //   it("should contain inherited methods", () => {
  //     expect(renderedClassLines).to.have.lengthOf(2 + 2);
  //     expect(renderedClassLines[1].trim()).to.equal("prop: string | number;");
  //     expect(renderedClassLines[2].trim()).to.equal("test(): string | number;");
  //   });

  // }

});
