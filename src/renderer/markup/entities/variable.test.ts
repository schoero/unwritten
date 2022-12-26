import { expect } from "chai";
import { describe, it } from "vitest";

import {
  renderVariableForDocumentation,
  renderVariableForTableOfContents
} from "quickdoks:renderer:markup/entities/variable.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";

import { Kind, NumberLiteralType, Variable } from "quickdoks:type-definitions/types.d.js";
import { Real, Testable } from "quickdoks:type-definitions/utils.d.js";


describe("Renderer: Variable", () => {

  const testVariable: Testable<Variable> = {
    description: "Default TCP Port.",
    kind: Kind.Variable,
    name: "TCP_PORT",
    type: <NumberLiteralType>{
      kind: Kind.NumberLiteral,
      value: 80
    }
  };

  const ctx = createRenderContext();

  const renderedVariableForTableOfContents = renderVariableForTableOfContents(ctx, <Real<Variable>>testVariable);
  const renderedVariableForDocumentation = renderVariableForDocumentation(ctx, <Real<Variable>>testVariable);

  const variableName = Object.keys(renderedVariableForDocumentation)[0]!;
  const variableContent = renderedVariableForDocumentation[variableName]!;

  it("should have a matching table of contents entry", () => {
    expect(renderedVariableForTableOfContents).to.equal("TCP_PORT");
  });

  it("should have a matching variable title", () => {
    expect(variableName).to.equal("TCP_PORT");
  });

  it("should have matching variable description", () => {
    expect(variableContent[0]).to.equal("Default TCP Port.");
  });

  it("should have matching variable type", () => {
    expect(variableContent[1]).to.equal("Type: 80");
  });

  // {
  //   const testVariable: Testable<Variable> = {
  //     kind: TypeKind.Variable,
  //     name: "objectVariable",
  //     type: {
  //       kind: TypeKind.ObjectLiteral,
  //       properties: [
  //         {
  //           kind: TypeKind.Property,
  //           name: "a",
  //           optional: false,
  //           type: {
  //             kind: TypeKind.String
  //           }
  //         }
  //       ]
  //     }
  //   };

  //   const ctx = createRenderContext();
  //   const renderedVariable = renderVariableForDocumentation(ctx, <Complete<Variable>>testVariable);
  //   const variableName = Object.keys(renderedVariable)[0]!;
  //   const variableContent = renderedVariable[variableName]!;

  //   it("should be able to render objects", function() {
  //     expect(variableName).to.equal("objectVariable");
  //   });

  //   it("should not have a description", function() {
  //     expect(variableContent[0]).to.be.undefined;
  //   });

  // }

});
