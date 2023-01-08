import { expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderInterfaceForDocumentation, renderInterfaceForTableOfContents } from "./interface.js";

import type { Interface } from "quickdoks:compiler:type-definitions/types.d.js";
import type { Real, Testable } from "quickdoks:compiler:type-definitions/utils.d.js";


scope("Renderer", TypeKind.Interface, () => {

  {

    const simpleInterface: Testable<Interface> = {
      callSignatures: [],
      constructSignatures: [],
      getterSignatures: [],
      kind: TypeKind.Interface,
      methodSignatures: [],
      name: "Interface",
      properties: [],
      setterSignatures: []
    };

    const ctx = createRenderContext();

    const renderedInterfaceForTableOfContents = renderInterfaceForTableOfContents(ctx, <Real<Interface>>simpleInterface);
    const renderedInterfaceForDocumentation = renderInterfaceForDocumentation(ctx, <Real<Interface>>simpleInterface);

    const interfaceName = Object.keys(renderedInterfaceForDocumentation)[0]!;
    const interfaceContent = renderedInterfaceForDocumentation[interfaceName]!;

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

    it("should have matching members", () => {
      expect(interfaceContent.length).to.equal(3);
      expect(interfaceContent[2][0][0]).to.equal("street: string Street name");
      expect(interfaceContent[2][0][1]).to.equal("building: number Building number optional");
    });

  }

  {

    const simpleInterface: Testable<Interface> = {
      callSignatures: [],
      constructSignatures: [],
      getterSignatures: [],
      kind: TypeKind.Interface,
      methodSignatures: [],
      name: "Interface",
      properties: [],
      setterSignatures: []
    };

    const ctx = createRenderContext();

    const renderedInterfaceForTableOfContents = renderInterfaceForTableOfContents(ctx, <Real<Interface>>simpleInterface);
    const renderedInterfaceForDocumentation = renderInterfaceForDocumentation(ctx, <Real<Interface>>simpleInterface);

    const interfaceName = Object.keys(renderedInterfaceForDocumentation)[0]!;
    const interfaceContent = renderedInterfaceForDocumentation[interfaceName]!;

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

    it("should have matching members", () => {
      expect(interfaceContent.length).to.equal(3);
      expect(interfaceContent[2][0][0]).to.equal("street: string Street name");
      expect(interfaceContent[2][0][1]).to.equal("building: number Building number optional");
    });

  }

});
