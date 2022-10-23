import { expect } from "chai";
import { describe, it } from "vitest";

import { Interface, TypeKind } from "../../../types/types.js";
import { Real, Testable } from "../../../types/utils.js";
import { renderInterfaceForDocumentation, renderInterfaceForTableOfContents } from "../shared/interface.js";
import { createRenderContext } from "./utils/context.js";


describe("Renderer: Interfaces", function() {

  const simpleInterface: Testable<Interface> = {
    description: "Address of a person",
    kind: TypeKind.Interface,
    members: [
      {
        description: "Street name",
        kind: TypeKind.Member,
        name: "street",
        optional: false,
        type: {
          kind: TypeKind.String,
          name: "string"
        }
      },
      {
        description: "Building number",
        kind: TypeKind.Member,
        name: "building",
        optional: true,
        type: {
          kind: TypeKind.Number,
          name: "number"
        }
      }
    ],
    name: "Address"
  };

  const ctx = createRenderContext();

  const renderedInterfaceForTableOfContents = renderInterfaceForTableOfContents(ctx, <Real<Interface>>simpleInterface);
  const renderedInterfaceForDocumentation = renderInterfaceForDocumentation(ctx, <Real<Interface>>simpleInterface);

  const interfaceName = Object.keys(renderedInterfaceForDocumentation)[0]!;
  const interfaceContent = renderedInterfaceForDocumentation[interfaceName]!;

  it("should have matching interface name", function() {
    expect(renderedInterfaceForTableOfContents).to.equal("Address");
    expect(interfaceName).to.equal("Address");
  });

  it("should have a matching description", () => {
    expect(interfaceContent[0]).to.equal("Address of a person");
  });

  it("should have no example", () => {
    expect(interfaceContent[1]).to.equal(undefined);
  });

  it("should have matching members", function() {
    expect(interfaceContent.length).to.equal(3);
    expect(interfaceContent[2][0][0]).to.equal("street: string Street name");
    expect(interfaceContent[2][0][1]).to.equal("building: number Building number optional");
  });

});