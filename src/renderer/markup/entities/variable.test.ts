import { describe, expect, it } from "vitest";

import { EntityKind } from "quickdoks:compiler/enums/entities.js";
import { TypeKind } from "quickdoks:compiler:enums/types.js";
import {
  renderVariableForDocumentation,
  renderVariableForTableOfContents
} from "quickdoks:renderer:markup/entities/variable.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";

import type { VariableEntity } from "quickdoks:compiler/type-definitions/entities.js";
import type { NumberLiteralType } from "quickdoks:compiler/type-definitions/types.js";
import type { Real, Testable } from "quickdoks:type-definitions/utils.js";


describe("Renderer: Variable", () => {

  const testVariable: Testable<VariableEntity> = {
    description: "Default TCP Port.",
    kind: EntityKind.Variable,
    name: "TCP_PORT",
    type: <NumberLiteralType>{
      kind: TypeKind.NumberLiteral,
      value: 80
    }
  };

  const ctx = createRenderContext();

  const renderedVariableForTableOfContents = renderVariableForTableOfContents(ctx, <Real<VariableEntity>>testVariable);
  const renderedVariableForDocumentation = renderVariableForDocumentation(ctx, <Real<VariableEntity>>testVariable);

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
