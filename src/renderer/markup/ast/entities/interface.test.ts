import { writeFileSync } from "node:fs";

import { expect, it } from "vitest";

import { EntityKind } from "unwritten:compiler:enums/entities.js";
import { TypeKind } from "unwritten:compiler:enums/types.js";
import { renderRenderObject } from "unwritten:renderer:markup/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderInterfaceForDocumentation, renderInterfaceForTableOfContents } from "./interface.js";

import type { InterfaceEntity } from "unwritten:compiler:type-definitions/entities.js";
import type { AnchorIdentifier } from "unwritten:renderer/markup/utils/linker.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", TypeKind.Interface, () => {

  {

    // #region Entity

    const simpleInterface: Testable<InterfaceEntity> = {
      callSignatures: [
        {
          description: "Call signature description",
          example: "Call signature example",
          id: 2,
          kind: EntityKind.Signature,
          modifiers: [],
          name: undefined,
          parameters: [],
          position: {
            column: 6,
            file: "/file.ts",
            line: 5
          },
          returnType: {
            description: undefined,
            kind: TypeKind.Void,
            name: "void"
          },
          typeParameters: undefined
        }
      ],
      constructSignatures: [],
      description: undefined,
      getterSignatures: [],
      heritage: undefined,
      id: 1,
      kind: EntityKind.Interface,
      methodSignatures: [],
      name: "Interface",
      position: {
        column: 0,
        file: "/file.ts",
        line: 1
      },
      properties: [],
      setterSignatures: [],
      typeParameters: undefined
    };

    // #endregion

    const ctx = createRenderContext();

    const renderedInterfaceForTableOfContents = renderInterfaceForTableOfContents(ctx, simpleInterface as InterfaceEntity);
    const renderedInterfaceForDocumentation = renderInterfaceForDocumentation(ctx, simpleInterface as InterfaceEntity);

    const interfaceName = Object.keys(renderedInterfaceForDocumentation)[0]! as AnchorIdentifier;
    const interfaceContent = renderedInterfaceForDocumentation[interfaceName]!;

    const documentation = renderRenderObject(ctx, renderedInterfaceForDocumentation);

    writeFileSync("interface.html", documentation);

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
