import { describe, expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler/enums/entities.js";
import { TypeKind } from "unwritten:compiler/enums/types.js";
import {
  extendInterfacePropertiesWithHeritage,
  extendInterfaceSignaturesWithHeritage
} from "unwritten:renderer/utils/heritage.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { InterfaceEntity } from "unwritten:compiler/type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", "utils", () => {

  describe("Interface heritage", () => {

    {

      // #region Entity with single heritage with own property and method

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
        const extendedInterfaceProperties = extendInterfacePropertiesWithHeritage(interfaceEntity as InterfaceEntity);
        expect(extendedInterfaceProperties).to.have.lengthOf(2);
        expect(extendedInterfaceProperties[0].name).to.equal("propA");
        expect(extendedInterfaceProperties[1].name).to.equal("propB");
      });

      it("should inherit signatures from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceSignaturesWithHeritage(interfaceEntity as InterfaceEntity, "methodSignatures");
        expect(extendedInterfaceProperties).to.have.lengthOf(2);
        expect(extendedInterfaceProperties[0].name).to.equal("methodA");
        expect(extendedInterfaceProperties[1].name).to.equal("methodB");
      });

    }

    {

      // #region Entity with single heritage with overriding property and method signature

      /*
      interface InterfaceA {
        prop: string | number;
        method(): string | number ;
      }
      export interface InterfaceB extends InterfaceA {
        prop: string;
        method(): string;
      }
      */

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
        const extendedInterfaceProperties = extendInterfacePropertiesWithHeritage(interfaceEntity as InterfaceEntity);
        expect(extendedInterfaceProperties).to.have.lengthOf(1);
        expect(extendedInterfaceProperties[0].name).to.equal("prop");
        expect(extendedInterfaceProperties[0].type.kind).to.equal(TypeKind.String);
      });

      it("should override signatures from parent interface", () => {
        const extendedInterfaceProperties = extendInterfaceSignaturesWithHeritage(interfaceEntity as InterfaceEntity, "methodSignatures");
        expect(extendedInterfaceProperties).to.have.lengthOf(1);
        expect(extendedInterfaceProperties[0].name).to.equal("method");
        expect(extendedInterfaceProperties[0].returnType.kind).to.equal(TypeKind.String);
      });

    }

  });

});
