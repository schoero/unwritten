import { describe, expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler/enums/entities.js";
import { TypeKind } from "unwritten:compiler/enums/types.js";
import {
  extendClassEntityConstructorsWithHeritage,
  extendClassEntityEntitiesWithHeritage,
  extendInterfaceEntityPropertiesWithHeritage,
  extendInterfaceEntitySignaturesWithHeritage
} from "unwritten:renderer/utils/heritage.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { assert } from "unwritten:utils/general.js";

import type { ClassEntity, InterfaceEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", "utils", () => {

  describe("Interface heritage", () => {

    {

      // #region Interface Entity with single heritage with own property and method

      /*
      interface InterfaceA {
        propA: string;
        methodA(): void;
      }
      export interface InterfaceB extends InterfaceA {
        propB: string;
        methodB(): void;
      }
      */

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
              methods: [
                {
                  id: 4057,
                  kind: EntityKind.Method,
                  name: "methodA",
                  signatures: [
                    {
                      description: undefined,
                      id: 4457,
                      kind: EntityKind.Signature,
                      modifiers: [],
                      name: "methodA",
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
              methods: [
                {
                  id: 4057,
                  kind: EntityKind.Method,
                  name: "methodA",
                  signatures: [
                    {
                      description: undefined,
                      id: 4457,
                      kind: EntityKind.Signature,
                      modifiers: [],
                      name: "methodA",
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
        methodSignatures: [
          {
            description: undefined,
            id: 4456,
            kind: EntityKind.Signature,
            modifiers: [],
            name: "methodB",
            parameters: [],
            position: {
              column: 2,
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
            name: "propB",
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

      it("should inherit properties from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity as InterfaceEntity);
        expect(extendedInterfaceProperties).to.have.lengthOf(2);
        expect(extendedInterfaceProperties[0].name).to.equal("propA");
        expect(extendedInterfaceProperties[1].name).to.equal("propB");
      });

      it("should inherit signatures from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity as InterfaceEntity, "methodSignatures");
        expect(extendedInterfaceProperties).to.have.lengthOf(2);
        expect(extendedInterfaceProperties[0].name).to.equal("methodA");
        expect(extendedInterfaceProperties[1].name).to.equal("methodB");
      });

    }

    {

      // #region Interface Entity with single heritage with overriding property and method signature

      // #region Source

      // interface InterfaceA {
      //   prop: string | number;
      //   method(): string | number ;
      // }
      // export interface InterfaceB extends InterfaceA {
      //   prop: string;
      //   method(): string;
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
                  name: "method",
                  signatures: [
                    {
                      description: undefined,
                      id: 4458,
                      kind: EntityKind.Signature,
                      modifiers: [],
                      name: "method",
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
                  name: "method",
                  signatures: [
                    {
                      description: undefined,
                      id: 4458,
                      kind: EntityKind.Signature,
                      modifiers: [],
                      name: "method",
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
            name: "method",
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

      it("should override properties from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceEntityPropertiesWithHeritage(interfaceEntity as InterfaceEntity);
        expect(extendedInterfaceProperties).to.have.lengthOf(1);
        expect(extendedInterfaceProperties[0].name).to.equal("prop");
        expect(extendedInterfaceProperties[0].type.kind).to.equal(TypeKind.String);
      });

      it("should override signatures from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceEntitySignaturesWithHeritage(interfaceEntity as InterfaceEntity, "methodSignatures");
        expect(extendedInterfaceProperties).to.have.lengthOf(1);
        expect(extendedInterfaceProperties[0].name).to.equal("method");
        expect(extendedInterfaceProperties[0].returnType.kind).to.equal(TypeKind.String);
      });

    }

  });

  describe("Class heritage", () => {

    {

      // #region Class heritage with overriding properties

      // #region Source

      // class BaseClass {
      //   public instanceProperty: string | undefined;
      //   public static staticProperty: string | undefined;
      // }

      // export class Class extends BaseClass {
      //   public override instanceProperty: undefined;
      //   public static override staticProperty: undefined;
      // }

      // #endregion

      const classEntity: Testable<ClassEntity> = {
        ctor: undefined,
        description: undefined,
        getters: [],
        heritage: {
          id: 4744,
          instanceType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2869,
            isThis: false,
            kind: TypeKind.Object,
            methods: [],
            name: "BaseClass",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [
              {
                description: undefined,
                id: 4459,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [
                  "public"
                ],
                name: "instanceProperty",
                optional: false,
                position: {
                  column: 6,
                  file: "/file.ts",
                  line: 2
                },
                type: {
                  id: 16,
                  kind: TypeKind.String,
                  name: "string"
                }
              }
            ],
            setters: []
          },
          kind: TypeKind.Expression,
          name: "BaseClass",
          staticType: {
            callSignatures: [],
            constructSignatures: [
              {
                kind: EntityKind.Signature,
                returnType: {
                  callSignatures: [],
                  constructSignatures: [],
                  description: undefined,
                  getters: [],
                  id: 2861,
                  isThis: false,
                  kind: TypeKind.Class,
                  methods: [],
                  name: "BaseClass",
                  position: {
                    column: 0,
                    file: "/file.ts",
                    line: 1
                  },
                  properties: [
                    {
                      description: undefined,
                      id: 4465,
                      initializer: undefined,
                      kind: EntityKind.Property,
                      modifiers: [
                        "public"
                      ],
                      name: "instanceProperty",
                      optional: false,
                      position: {
                        column: 6,
                        file: "/file.ts",
                        line: 2
                      },
                      type: {
                        id: 16,
                        kind: TypeKind.String,
                        name: "string"
                      }
                    }
                  ],
                  setters: []
                }
              }
            ],
            getters: [],
            id: 2864,
            isThis: false,
            kind: TypeKind.Object,
            methods: [],
            name: "BaseClass",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [
              {
                description: undefined,
                id: 4460,
                initializer: undefined,
                kind: EntityKind.Property,
                modifiers: [
                  "public",
                  "static"
                ],
                name: "staticProperty",
                optional: false,
                position: {
                  column: 6,
                  file: "/file.ts",
                  line: 3
                },
                type: {
                  id: 16,
                  kind: TypeKind.String,
                  name: "string"
                }
              }
            ],
            setters: []
          },
          typeArguments: undefined
        },
        id: 4461,
        kind: EntityKind.Class,
        methods: [],
        modifiers: [],
        name: "Class",
        position: {
          column: 4,
          file: "/file.ts",
          line: 6
        },
        properties: [
          {
            description: undefined,
            id: 4462,
            initializer: undefined,
            kind: EntityKind.Property,
            modifiers: [
              "public",
              "override"
            ],
            name: "instanceProperty",
            optional: false,
            position: {
              column: 6,
              file: "/file.ts",
              line: 7
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
              "public",
              "static",
              "override"
            ],
            name: "staticProperty",
            optional: false,
            position: {
              column: 6,
              file: "/file.ts",
              line: 8
            },
            type: {
              id: 10,
              kind: TypeKind.Undefined,
              name: "undefined"
            }
          }
        ],
        setters: [],
        typeParameters: undefined
      };

      const extendedClassProperties = extendClassEntityEntitiesWithHeritage(classEntity as ClassEntity, "properties");

      it("should inherit properties from parent interface", () => {

        expect(extendedClassProperties).to.have.lengthOf(2);

        expect(extendedClassProperties[0].name).to.equal("instanceProperty");
        expect(extendedClassProperties[0].type.kind).to.equal(TypeKind.Undefined);
        expect(extendedClassProperties[0].modifiers).to.not.include("static");

        expect(extendedClassProperties[1].name).to.equal("staticProperty");
        expect(extendedClassProperties[1].type.kind).to.equal(TypeKind.Undefined);
        expect(extendedClassProperties[1].modifiers).to.include("static");

      });


    }

    {

      // #region Class heritage inherited constructor

      // #region Source

      // class BaseClass {
      //   constructor(param: string) {}
      // }
      // export class Class extends BaseClass {
      // }

      // #endregion

      const classEntity: Testable<ClassEntity> = {
        ctor: undefined,
        description: undefined,
        getters: [],
        heritage: {
          id: 4743,
          instanceType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2869,
            isThis: false,
            kind: TypeKind.Object,
            methods: [],
            name: "BaseClass",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [],
            setters: []
          },
          kind: TypeKind.Expression,
          name: "BaseClass",
          staticType: {
            callSignatures: [],
            constructSignatures: [
              {
                description: undefined,
                id: 4741,
                kind: EntityKind.Signature,
                modifiers: [],
                name: "constructor",
                parameters: [
                  {
                    description: undefined,
                    id: 4459,
                    initializer: undefined,
                    kind: EntityKind.Parameter,
                    name: "param",
                    optional: false,
                    position: {
                      column: 14,
                      file: "/file.ts",
                      line: 2
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
                  line: 2
                },
                returnType: {
                  callSignatures: [],
                  constructSignatures: [],
                  description: undefined,
                  getters: [],
                  id: 2861,
                  isThis: false,
                  kind: TypeKind.Class,
                  methods: [],
                  name: "BaseClass",
                  position: {
                    column: 0,
                    file: "/file.ts",
                    line: 1
                  },
                  properties: [],
                  setters: []
                },
                typeParameters: undefined
              }
            ],
            getters: [],
            id: 2864,
            isThis: false,
            kind: TypeKind.Object,
            methods: [],
            name: "BaseClass",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [],
            setters: []
          },
          typeArguments: undefined
        },
        id: 4460,
        kind: EntityKind.Class,
        methods: [],
        modifiers: [],
        name: "Class",
        position: {
          column: 0,
          file: "/file.ts",
          line: 4
        },
        properties: [],
        setters: [],
        typeParameters: undefined
      };

      const extendedClassConstructor = extendClassEntityConstructorsWithHeritage(classEntity as ClassEntity);

      it("should inherit the constructor from parent class", () => {
        assert(extendedClassConstructor);
        expect(extendedClassConstructor.signatures).to.have.lengthOf(1);
        expect(extendedClassConstructor.signatures[0].parameters).to.have.lengthOf(1);
      });

    }

    {

      // #region Class heritage no constructor

      // #region Source

      // class BaseClass {
      // }
      // export class Class extends BaseClass {
      // }

      // #endregion

      const classEntity: Testable<ClassEntity> = {
        ctor: undefined,
        description: undefined,
        getters: [],
        heritage: {
          id: 4742,
          instanceType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2869,
            isThis: false,
            kind: TypeKind.Object,
            methods: [],
            name: "BaseClass",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [],
            setters: []
          },
          kind: TypeKind.Expression,
          name: "BaseClass",
          staticType: {
            callSignatures: [],
            constructSignatures: [
              {
                kind: EntityKind.Signature,
                returnType: {
                  callSignatures: [],
                  constructSignatures: [],
                  description: undefined,
                  getters: [],
                  id: 2861,
                  isThis: false,
                  kind: TypeKind.Class,
                  methods: [],
                  name: "BaseClass",
                  position: {
                    column: 0,
                    file: "/file.ts",
                    line: 1
                  },
                  properties: [],
                  setters: []
                }
              }
            ],
            getters: [],
            id: 2864,
            isThis: false,
            kind: TypeKind.Object,
            methods: [],
            name: "BaseClass",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [],
            setters: []
          },
          typeArguments: undefined
        },
        id: 4459,
        kind: EntityKind.Class,
        methods: [],
        modifiers: [],
        name: "Class",
        position: {
          column: 0,
          file: "/file.ts",
          line: 3
        },
        properties: [],
        setters: [],
        typeParameters: undefined
      };

      const extendedClassConstructor = extendClassEntityConstructorsWithHeritage(classEntity as ClassEntity);

      it("should not extend automatically generated empty constructor", () => {
        expect(extendedClassConstructor).to.equal(undefined);
      });

    }

    {

      // #region Class heritage with overriding constructor

      // #region Source

      // class BaseClass {
      //   constructor(param: string | number) {
      //   }
      // }
      // export class Class extends BaseClass {
      //   constructor(param: string) {
      //   }
      // }

      // #endregion

      const classEntity: Testable<ClassEntity> = {
        ctor: {
          id: 4463,
          kind: EntityKind.Constructor,
          name: "__constructor",
          signatures: [
            {
              description: undefined,
              id: 4744,
              kind: EntityKind.Signature,
              modifiers: [],
              name: "constructor",
              parameters: [
                {
                  description: undefined,
                  id: 4461,
                  initializer: undefined,
                  kind: EntityKind.Parameter,
                  name: "param",
                  optional: false,
                  position: {
                    column: 14,
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
                callSignatures: [],
                constructSignatures: [],
                description: undefined,
                getters: [],
                id: 2865,
                isThis: false,
                kind: TypeKind.Class,
                methods: [],
                name: "Class",
                position: {
                  column: 0,
                  file: "/file.ts",
                  line: 5
                },
                properties: [],
                setters: []
              },
              typeParameters: undefined
            }
          ]
        },
        description: undefined,
        getters: [],
        heritage: {
          id: 4746,
          instanceType: {
            callSignatures: [],
            constructSignatures: [],
            getters: [],
            id: 2869,
            isThis: false,
            kind: TypeKind.Object,
            methods: [],
            name: "BaseClass",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [],
            setters: []
          },
          kind: TypeKind.Expression,
          name: "BaseClass",
          staticType: {
            callSignatures: [],
            constructSignatures: [
              {
                description: undefined,
                id: 4741,
                kind: EntityKind.Signature,
                modifiers: [],
                name: "constructor",
                parameters: [
                  {
                    description: undefined,
                    id: 4459,
                    initializer: undefined,
                    kind: EntityKind.Parameter,
                    name: "param",
                    optional: false,
                    position: {
                      column: 14,
                      file: "/file.ts",
                      line: 2
                    },
                    rest: false,
                    type: {
                      id: 31,
                      kind: TypeKind.Union,
                      types: [
                        {
                          id: 16,
                          kind: TypeKind.String,
                          name: "string"
                        },
                        {
                          id: 17,
                          kind: TypeKind.Number,
                          name: "number"
                        }
                      ]
                    }
                  }
                ],
                position: {
                  column: 2,
                  file: "/file.ts",
                  line: 2
                },
                returnType: {
                  callSignatures: [],
                  constructSignatures: [],
                  description: undefined,
                  getters: [],
                  id: 2861,
                  isThis: false,
                  kind: TypeKind.Class,
                  methods: [],
                  name: "BaseClass",
                  position: {
                    column: 0,
                    file: "/file.ts",
                    line: 1
                  },
                  properties: [],
                  setters: []
                },
                typeParameters: undefined
              }
            ],
            getters: [],
            id: 2864,
            isThis: false,
            kind: TypeKind.Object,
            methods: [],
            name: "BaseClass",
            position: {
              column: 0,
              file: "/file.ts",
              line: 1
            },
            properties: [],
            setters: []
          },
          typeArguments: undefined
        },
        id: 4460,
        kind: EntityKind.Class,
        methods: [],
        modifiers: [],
        name: "Class",
        position: {
          column: 0,
          file: "/file.ts",
          line: 5
        },
        properties: [],
        setters: [],
        typeParameters: undefined
      };

      const extendedClassConstructor = extendClassEntityConstructorsWithHeritage(classEntity as ClassEntity);

      it("should be able to override the parent constructor", () => {

        assert(extendedClassConstructor);
        expect(extendedClassConstructor.signatures).to.have.lengthOf(1);

        assert(extendedClassConstructor.signatures[0].parameters);

        expect(extendedClassConstructor.signatures[0].parameters).to.have.lengthOf(1);
        expect(extendedClassConstructor.signatures[0].parameters[0].type?.kind).to.equal(TypeKind.String);

      });

    }

  });

});
