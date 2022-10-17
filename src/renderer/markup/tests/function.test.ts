import { expect } from "chai";
import { describe, it } from "vitest";

import { Function, TypeKind } from "../../../types/types.js";
import { Complete, Testable } from "../../../types/utils.js";
import { renderFunctionForDocumentation, renderFunctionForTableOfContents } from "../shared/function.js";
import { createRenderContext } from "./utils/context.js";


describe("Renderer: Function", () => {

  describe("Table of Contents", () => {

    const testFunction: Testable<Function> = {
      kind: TypeKind.Function,
      name: "testFunction",
      signatures: [
        {
          kind: TypeKind.Signature,
          modifiers: [],
          parameters: [],
          returnType: {
            kind: TypeKind.Void
          }
        }
      ]
    };

    const ctx = createRenderContext();
    const renderedFunction = renderFunctionForTableOfContents(ctx, <Complete<Function>>testFunction);

    it("should have only one signature", () => {
      expect(renderedFunction).to.have.lengthOf(1);
    });

    it("should have matching function signature", () => {
      expect(renderedFunction[0]).to.equal("testFunction()");
    });

  });

  describe("Documentation", () => {
    {
      const testFunction: Testable<Function> = {
        kind: TypeKind.Function,
        name: "testFunction",
        signatures: [
          {
            kind: TypeKind.Signature,
            modifiers: [],
            parameters: [],
            returnType: {
              kind: TypeKind.Void,
              name: "void"
            }
          }
        ]
      };

      const ctx = createRenderContext();
      const renderedFunction = renderFunctionForDocumentation(ctx, <Complete<Function>>testFunction);

      it("should have only one signature", () => {
        expect(Object.keys(renderedFunction)).to.have.lengthOf(1);
      });

      const renderedFunctionSignature = Object.keys(renderedFunction)[0]!;
      const renderedFunctionBody = renderedFunction[renderedFunctionSignature]!;

      it("should have matching function signature", () => {
        expect(renderedFunctionSignature).to.equal("testFunction()");
      });

      it("should have a matching return type", () => {
        expect(renderedFunctionBody[0][0][0]).to.equal("Returns: void");
      });

    }
    {

      const testFunctionWithRest: Testable<Function> = {
        kind: TypeKind.Function,
        name: "testFunction",
        signatures: [
          {
            kind: TypeKind.Signature,
            parameters: [
              {
                kind: TypeKind.Parameter,
                name: "params",
                optional: false,
                rest: true,
                type: {
                  kind: TypeKind.Reference,
                  name: "Array",
                  typeArguments: [
                    {
                      kind: TypeKind.String,
                      name: "string"
                    }
                  ]
                }
              }
            ],
            returnType: {
              kind: TypeKind.Void,
              name: "void"
            }
          }
        ]
      };

      const ctx = createRenderContext();
      const renderedFunctionWithRest = renderFunctionForDocumentation(ctx, <Complete<Function>>testFunctionWithRest);

      const renderedFunctionSignature = Object.keys(renderedFunctionWithRest)[0]!;
      const renderedFunctionBody = renderedFunctionWithRest[renderedFunctionSignature]!;

      it("should handle rest parameters correctly", () => {
        expect(renderedFunctionSignature).to.equal("testFunction(...params)");
        expect(renderedFunctionBody[0][0][0]).to.equal("params: rest");
      });

    }
    {

      const testFunctionWithOptional: Testable<Function> = {
        kind: TypeKind.Function,
        name: "testFunction",
        signatures: [
          {
            kind: TypeKind.Signature,
            parameters: [
              {
                kind: TypeKind.Parameter,
                name: "params",
                optional: true,
                rest: false,
                type: {
                  kind: TypeKind.String,
                  name: "string"
                }
              }
            ],
            returnType: {
              kind: TypeKind.Void,
              name: "void"
            }
          }
        ]
      };

      const ctx = createRenderContext();
      const renderedFunctionWithOptional = renderFunctionForDocumentation(ctx, <Complete<Function>>testFunctionWithOptional);

      const renderedFunctionSignature = Object.keys(renderedFunctionWithOptional)[0]!;
      const renderedFunctionBody = renderedFunctionWithOptional[renderedFunctionSignature]!;

      it("should handle optional parameters correctly", () => {
        expect(renderedFunctionSignature).to.equal("testFunction([params])");
        expect(renderedFunctionBody[0][0][0]).to.equal("params: string optional");
      });

    }
    {

      const testFunctionWithOptionalRest: Testable<Function> = {
        kind: TypeKind.Function,
        name: "testFunction",
        signatures: [
          {
            kind: TypeKind.Signature,
            parameters: [
              {
                kind: TypeKind.Parameter,
                name: "params",
                optional: true,
                rest: true,
                type: {
                  kind: TypeKind.Reference,
                  name: "Array",
                  typeArguments: [
                    {
                      kind: TypeKind.String,
                      name: "string"
                    }
                  ]
                }
              }
            ],
            returnType: {
              kind: TypeKind.Void,
              name: "void"
            }
          }
        ]
      };

      const ctx = createRenderContext();
      const renderedFunctionWithOptionalRest = renderFunctionForDocumentation(ctx, <Complete<Function>>testFunctionWithOptionalRest);

      const renderedFunctionSignature = Object.keys(renderedFunctionWithOptionalRest)[0]!;
      const renderedFunctionBody = renderedFunctionWithOptionalRest[renderedFunctionSignature]!;

      it("should handle optional and rest parameters simultaneously", () => {
        expect(renderedFunctionSignature).to.equal("testFunction([...params])");
        expect(renderedFunctionBody[0][0][0]).to.equal("params: optional rest");
      });

    }
    {

      const testFunctionWithOverloads: Testable<Function> = {
        kind: TypeKind.Function,
        name: "add",
        signatures: [
          {
            kind: TypeKind.Signature,
            parameters: [
              {
                kind: TypeKind.Parameter,
                name: "a",
                optional: false,
                rest: false,
                type: {
                  kind: TypeKind.Number,
                  name: "number"
                }
              },
              {
                kind: TypeKind.Parameter,
                name: "b",
                optional: false,
                rest: false,
                type: {
                  kind: TypeKind.Number,
                  name: "number"
                }
              }
            ],
            returnType: {
              kind: TypeKind.Any,
              name: "any"
            }
          },
          {
            kind: TypeKind.Signature,
            parameters: [
              {
                kind: TypeKind.Parameter,
                name: "a",
                optional: false,
                rest: false,
                type: {
                  kind: TypeKind.Number,
                  name: "number"
                }
              },
              {
                kind: TypeKind.Parameter,
                name: "b",
                optional: false,
                rest: false,
                type: {
                  kind: TypeKind.Number,
                  name: "number"
                }
              },
              {
                kind: TypeKind.Parameter,
                name: "c",
                optional: false,
                rest: false,
                type: {
                  kind: TypeKind.Number,
                  name: "number"
                }
              }
            ],
            returnType: {
              kind: TypeKind.Any,
              name: "any"
            }
          }
        ]
      };

      const ctx = createRenderContext();
      const renderedFunctionWithOverloads = renderFunctionForDocumentation(ctx, <Complete<Function>>testFunctionWithOverloads);
      const renderedFunctionSignatures = Object.keys(renderedFunctionWithOverloads);

      it("should have 2 signatures", () => {
        expect(renderedFunctionSignatures).to.have.lengthOf(2);
      });

      it("should handle rest parameters correctly", () => {
        expect(renderedFunctionSignatures[0]).to.equal("add(a, b)");
      });

      it("should handle rest parameters correctly", () => {
        expect(renderedFunctionSignatures[1]).to.equal("add(a, b, c)");
      });

    }
    {

      const testFunctionWithDescriptionAndExamples: Testable<Function> = {
        kind: TypeKind.Function,
        name: "add",
        signatures: [
          {
            description: "Adds two numbers together.",
            example: "add(1, 2);\n// => 3",
            kind: TypeKind.Signature,
            parameters: [
              {
                description: "The first number.",
                kind: TypeKind.Parameter,
                name: "a",
                optional: false,
                rest: false,
                type: {
                  kind: TypeKind.Number,
                  name: "number"
                }
              },
              {
                description: "The second number.",
                kind: TypeKind.Parameter,
                name: "b",
                optional: false,
                rest: false,
                type: {
                  kind: TypeKind.Number,
                  name: "number"
                }
              }
            ],
            returnType: {
              description: "The sum of the two numbers.",
              kind: TypeKind.Number,
              name: "number"
            }
          }
        ]
      };

      const ctx = createRenderContext();
      const renderedFunctionWithDescriptionAndExamples = renderFunctionForDocumentation(ctx, <Complete<Function>>testFunctionWithDescriptionAndExamples);

      const renderedFunctionSignature = Object.keys(renderedFunctionWithDescriptionAndExamples)[0]!;
      const renderedFunctionBody = renderedFunctionWithDescriptionAndExamples[renderedFunctionSignature]!;


      it("should document parameters", () => {
        expect(renderedFunctionBody[0][0]).to.have.lengthOf(3);
        expect(renderedFunctionBody[0][0][0]).to.equal("a: number The first number.");
        expect(renderedFunctionBody[0][0][1]).to.equal("b: number The second number.");
        expect(renderedFunctionBody[0][0][2]).to.equal("Returns: number The sum of the two numbers.");
      });

      it("should document the description", () => {
        expect(renderedFunctionBody[1]).to.equal("Adds two numbers together.");
      });

      it("should document examples", () => {
        expect(renderedFunctionBody[2]).to.equal("add(1, 2);\n// => 3");
      });

    }
  });

});