import { expect } from "chai";
import { describe, it } from "vitest";

import { NumberLiteralType, PrimitiveType, TypeKind, Variable } from "../../../types/types.js";
import { Complete, Testable } from "../../../types/utils.js";
import { renderVariableForDocumentation, renderVariableForTableOfContents } from "../shared/variable.js";
import { createRenderContext } from "./utils/context.js";


describe("Renderer: Variable", function() {

  describe("Table of Contents", function() {

    const testVariable: Testable<Variable> = {
      kind: TypeKind.Variable,
      name: "TCP_PORT",
      type: <PrimitiveType<TypeKind.Number>>{
        kind: TypeKind.Number
      }
    };

    const ctx = createRenderContext();
    const renderedVariableName = renderVariableForTableOfContents(ctx, <Complete<Variable>>testVariable);

    it("should have matching variable title", function() {
      expect(renderedVariableName).to.equal("TCP_PORT");
    });

  });


  describe("Documentation", function() {

    {

      const testVariable: Testable<Variable> = {
        description: "Default TCP Port.",
        kind: TypeKind.Variable,
        name: "TCP_PORT",
        type: <NumberLiteralType>{
          kind: TypeKind.NumberLiteral,
          value: 80
        }
      };

      const ctx = createRenderContext();
      const renderedVariable = renderVariableForDocumentation(ctx, <Complete<Variable>>testVariable);
      const variableName = Object.keys(renderedVariable)[0]!;
      const variableContent = renderedVariable[variableName]!;

      it("should have matching variable title", function() {
        expect(variableName).to.equal("TCP_PORT");
      });

      it("should have matching variable description", function() {
        expect(variableContent[0]).to.equal("Default TCP Port.");
      });

      it("should have matching variable type", function() {
        expect(variableContent[1]).to.equal("Type: 80");
      });

    }

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

});