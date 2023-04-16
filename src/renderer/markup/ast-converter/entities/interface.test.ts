import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter:enums/entities.js";
import { TypeKind } from "unwritten:interpreter:enums/types.js";
import {
  convertInterfaceEntityForDocumentation,
  convertInterfaceEntityForTableOfContents
} from "unwritten:renderer:markup/ast-converter/entities/index.js";
import { renderNode } from "unwritten:renderer:markup/html/index.js";
import { isParagraphNode, isSmallNode } from "unwritten:renderer:markup/typeguards/renderer.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { InterfaceEntity } from "unwritten:interpreter:type-definitions/entities.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("MarkupRenderer", TypeKind.Interface, () => {

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

    const simpleInterface: Testable<InterfaceEntity> = {
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
        },
        {
          description: undefined,
          id: 4056,
          initializer: undefined,
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

    const ctx = createRenderContext();

    const convertedInterfaceForTableOfContents = convertInterfaceEntityForTableOfContents(ctx, simpleInterface as InterfaceEntity);
    const convertedInterfaceForDocumentation = convertInterfaceEntityForDocumentation(ctx, simpleInterface as InterfaceEntity);

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

    it("should have one call signature", () => {
      expect(callSignatures.children).to.have.lengthOf(1);
    });

    it("should have two properties", () => {
      expect(properties.children).to.have.lengthOf(2);
    });

    it("should have one method signature", () => {
      expect(methods.children).to.have.lengthOf(2);
    });

    it("should have one setter signature", () => {
      expect(setters.children).to.have.lengthOf(1);
    });

    it("should have one getter signature", () => {
      expect(getters.children).to.have.lengthOf(1);
    });

  }

  {

    // #region Entity with JSDoc tags

    // #region Source

    // /**
    //  * Interface description
    //  *
    //  * @example Interface example
    //  * @remarks Interface remarks
    //  * @beta
    //  * @deprecated Interface Deprecation message
    //  */
    // export interface Interface {
    //   /**
    //    * Call signature description
    //    *
    //    * @example Call signature example
    //    * @remarks Call signature remarks
    //    * @beta
    //    * @deprecated Call signature deprecation message
    //    */
    //   (): void;
    //   new (): void;
    //   funcProp(): void;
    //   get getter(): string;
    //   method(a: number): void;
    //   method(a: string): void;
    //   /**
    //    * Property description
    //    *
    //    * @example Property example
    //    * @remarks Property remarks
    //    * @beta
    //    * @deprecated Property deprecation message
    //    */
    //   prop: string;
    //   set setter(value: string);
    // }

    // #endregion

    const simpleInterface: Testable<InterfaceEntity> = {
      beta: undefined,
      callSignatures: [
        {
          beta: undefined,
          deprecated: "Call signature deprecation message",
          description: "Call signature description",
          example: "Call signature example",
          id: 4741,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 18
          },
          remarks: "Call signature remarks",
          returnType: {
            description: undefined,
            id: 25,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        }
      ],
      constructSignatures: [
        {
          description: undefined,
          id: 4742,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 19
          },
          returnType: {
            description: undefined,
            id: 25,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        }
      ],
      deprecated: "Interface Deprecation message",
      description: "Interface description",
      example: "Interface example",
      getterSignatures: [
        {
          description: undefined,
          id: 4746,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "getter",
          parameters: [],
          position: {
            column: 2,
            file: "/file.ts",
            line: 21
          },
          returnType: {
            description: undefined,
            id: 16,
            kind: TypeKind.String,
            name: "string"
          },
          typeParameters: undefined
        }
      ],
      heritage: undefined,
      id: 4458,
      kind: EntityKind.Interface,
      methodSignatures: [
        {
          description: undefined,
          id: 4744,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "method",
          parameters: [
            {
              description: undefined,
              id: 4462,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 9,
                file: "/file.ts",
                line: 22
              },
              rest: false,
              type: {
                id: 17,
                kind: TypeKind.Number,
                name: "number"
              }
            }
          ],
          position: {
            column: 2,
            file: "/file.ts",
            line: 22
          },
          returnType: {
            description: undefined,
            id: 25,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        },
        {
          description: undefined,
          id: 4745,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "method",
          parameters: [
            {
              description: undefined,
              id: 4463,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "a",
              optional: false,
              position: {
                column: 9,
                file: "/file.ts",
                line: 23
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
            line: 23
          },
          returnType: {
            description: undefined,
            id: 25,
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
        line: 9
      },
      properties: [
        {
          description: undefined,
          id: 4459,
          initializer: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "funcProp",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 20
          },
          type: {
            id: 2862,
            kind: TypeKind.Function,
            signatures: [
              {
                description: undefined,
                id: 4743,
                kind: EntityKind.Signature,
                modifiers: [],
                name: undefined,
                parameters: [],
                position: {
                  column: 12,
                  file: "/file.ts",
                  line: 20
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
        },
        {
          beta: undefined,
          deprecated: "Property deprecation message",
          description: "Property description",
          example: "Property example",
          id: 4464,
          initializer: undefined,
          kind: EntityKind.Property,
          modifiers: [],
          name: "prop",
          optional: false,
          position: {
            column: 2,
            file: "/file.ts",
            line: 32
          },
          remarks: "Property remarks",
          type: {
            id: 16,
            kind: TypeKind.String,
            name: "string"
          }
        }
      ],
      remarks: "Interface remarks",
      setterSignatures: [
        {
          description: undefined,
          id: 4747,
          kind: EntityKind.Signature,
          modifiers: [],
          name: "setter",
          parameters: [
            {
              description: undefined,
              id: 4465,
              initializer: undefined,
              kind: EntityKind.Parameter,
              name: "value",
              optional: false,
              position: {
                column: 13,
                file: "/file.ts",
                line: 33
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
            line: 33
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

    const ctx = createRenderContext();

    const convertedInterfaceForDocumentation = convertInterfaceEntityForDocumentation(ctx, simpleInterface as InterfaceEntity);

    const [
      interfacePosition,
      interfaceTags,
      interfaceDescription,
      interfaceRemarks,
      interfaceExample,
      constructSignatures,
      callSignatures,
      properties,
      methods,
      setters,
      getters
    ] = convertedInterfaceForDocumentation.children;

    const [
      callSignaturePosition,
      callSignatureTags,
      callSignatureParameters,
      callSignatureDescription,
      callSignatureRemarks,
      callSignatureExample
    ] = callSignatures.children[0].children;

    const [
      propertyTags,
      propertyType,
      propertyDescription,
      propertyRemarks,
      propertyExample
    ] = properties.children[1].children;

    it("should have a matching interface description", () => {
      expect(interfaceDescription.children[0]).to.equal("Interface description");
    });

    it("should have a matching interface remarks", () => {
      expect(interfaceRemarks.children[0]).to.equal("Interface remarks");
    });

    it("should have a matching interface example", () => {
      expect(interfaceExample.children[0]).to.equal("Interface example");
    });

    it("should have a interface position", () => {
      expect(interfacePosition).to.not.equal(undefined);
    });

    it("should have a interface tags", () => {
      expect(interfaceTags.children[0]).to.include("beta");
      expect(interfaceTags.children[0]).to.include("deprecated");
    });

    it("should have a matching call signature description", () => {
      expect(callSignatureDescription.children[0]).to.equal("Call signature description");
    });

    it("should have a matching call signature remarks", () => {
      expect(callSignatureRemarks.children[0]).to.equal("Call signature remarks");
    });

    it("should have a matching call signature example", () => {
      expect(callSignatureExample.children[0]).to.equal("Call signature example");
    });

    it("should have a call signature position", () => {
      expect(callSignaturePosition).to.not.equal(undefined);
    });

    it("should have a call signature tags", () => {
      expect(callSignatureTags.children[0]).to.include("beta");
      expect(callSignatureTags.children[0]).to.include("deprecated");
    });

    it("should have a matching property description", () => {
      expect(propertyDescription.children[0]).to.equal("Property description");
    });

    it("should have a matching property remarks", () => {
      expect(propertyRemarks.children[0]).to.equal("Property remarks");
    });

    it("should have a matching property example", () => {
      expect(propertyExample.children[0]).to.equal("Property example");
    });

    it("should have a property tags", () => {
      expect(propertyTags.children[0]).to.include("beta");
      expect(propertyTags.children[0]).to.include("deprecated");
    });

  }

});
