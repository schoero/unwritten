import { describe, expect, it } from "vitest";

import { createRenderContext } from "../../../../tests/utils/context.js";
import { Function, Kind } from "../../../types/types.js";
import { Real, Testable } from "../../../types/utils.js";
import { renderFunctionForDocumentation, renderFunctionForTableOfContents } from "../entities/function.js";


describe("Renderer: Function", () => {

  {
    const testFunction: Testable<Function> = {
      kind: Kind.Function,
      name: "testFunction",
      signatures: [
        {
          kind: Kind.Signature,
          modifiers: [],
          parameters: [],
          returnType: {
            kind: Kind.Void,
            name: "void"
          }
        }
      ]
    };

    const ctx = createRenderContext();

    const renderedFunctionForTableOfContents = renderFunctionForTableOfContents(ctx, <Real<Function>>testFunction);
    const renderedFunctionForDocumentation = renderFunctionForDocumentation(ctx, <Real<Function>>testFunction);

    it("should have only one signature", () => {
      expect(renderedFunctionForTableOfContents).to.have.lengthOf(1);
      expect(Object.keys(renderedFunctionForDocumentation)).to.have.lengthOf(1);
    });

    const renderedFunctionSignature = Object.keys(renderedFunctionForDocumentation)[0]!;
    const renderedFunctionBody = renderedFunctionForDocumentation[renderedFunctionSignature]!;

    it("should have matching function signature", () => {
      expect(renderedFunctionForTableOfContents[0]).to.equal("testFunction()");
      expect(renderedFunctionSignature).to.equal("testFunction()");
    });

    it("should have a matching return type", () => {
      expect(renderedFunctionBody[0][0][0]).to.equal("Returns: void");
    });

  }
  {

    const testFunctionWithRest: Testable<Function> = {
      kind: Kind.Function,
      name: "testFunction",
      signatures: [
        {
          kind: Kind.Signature,
          parameters: [
            {
              kind: Kind.Parameter,
              name: "params",
              optional: false,
              rest: true,
              type: {
                kind: Kind.TypeReference,
                name: "Array",
                typeArguments: [
                  {
                    kind: Kind.String,
                    name: "string"
                  }
                ]
              }
            }
          ],
          returnType: {
            kind: Kind.Void,
            name: "void"
          }
        }
      ]
    };

    const ctx = createRenderContext();

    const renderedFunctionForTableOfContentsWithRest = renderFunctionForTableOfContents(ctx, <Real<Function>>testFunctionWithRest);
    const renderedFunctionForDocumentationWithRest = renderFunctionForDocumentation(ctx, <Real<Function>>testFunctionWithRest);

    const renderedFunctionForTableOfContentsSignature = renderedFunctionForTableOfContentsWithRest[0]!;
    const renderedFunctionForDocumentationSignature = Object.keys(renderedFunctionForDocumentationWithRest)[0]!;
    const renderedFunctionForDocumentationBody = renderedFunctionForDocumentationWithRest[renderedFunctionForDocumentationSignature]!;

    it("should handle rest parameters correctly", () => {
      expect(renderedFunctionForTableOfContentsSignature).to.equal("testFunction(...params)");
      expect(renderedFunctionForDocumentationSignature).to.equal("testFunction(...params)");
      expect(renderedFunctionForDocumentationBody[0][0][0]).to.equal("params: rest");
    });

  }
  {

    const testFunctionWithOptional: Testable<Function> = {
      kind: Kind.Function,
      name: "testFunction",
      signatures: [
        {
          kind: Kind.Signature,
          parameters: [
            {
              kind: Kind.Parameter,
              name: "params",
              optional: true,
              rest: false,
              type: {
                kind: Kind.String,
                name: "string"
              }
            }
          ],
          returnType: {
            kind: Kind.Void,
            name: "void"
          }
        }
      ]
    };

    const ctx = createRenderContext();

    const renderedFunctionForTableOfContentsWithOptional = renderFunctionForTableOfContents(ctx, <Real<Function>>testFunctionWithOptional);
    const renderedFunctionForDocumentationWithOptional = renderFunctionForDocumentation(ctx, <Real<Function>>testFunctionWithOptional);

    const renderedFunctionForTableOfContentsSignature = renderedFunctionForTableOfContentsWithOptional[0]!;
    const renderedFunctionForDocumentationSignature = Object.keys(renderedFunctionForDocumentationWithOptional)[0]!;
    const renderedFunctionForDocumentationBody = renderedFunctionForDocumentationWithOptional[renderedFunctionForDocumentationSignature]!;

    it("should handle optional parameters correctly", () => {
      expect(renderedFunctionForTableOfContentsSignature).to.equal("testFunction([params])");
      expect(renderedFunctionForDocumentationSignature).to.equal("testFunction([params])");
      expect(renderedFunctionForDocumentationBody[0][0][0]).to.equal("params: string optional");
    });

  }
  {

    const testFunctionWithOptionalRest: Testable<Function> = {
      kind: Kind.Function,
      name: "testFunction",
      signatures: [
        {
          kind: Kind.Signature,
          parameters: [
            {
              kind: Kind.Parameter,
              name: "params",
              optional: true,
              rest: true,
              type: {
                kind: Kind.TypeReference,
                name: "Array",
                typeArguments: [
                  {
                    kind: Kind.String,
                    name: "string"
                  }
                ]
              }
            }
          ],
          returnType: {
            kind: Kind.Void,
            name: "void"
          }
        }
      ]
    };

    const ctx = createRenderContext();

    const renderedFunctionForTableOfContentsWithOptionalRest = renderFunctionForTableOfContents(ctx, <Real<Function>>testFunctionWithOptionalRest);
    const renderedFunctionForDocumentationWithOptionalRest = renderFunctionForDocumentation(ctx, <Real<Function>>testFunctionWithOptionalRest);

    const renderedFunctionForTableOfContentsSignature = renderedFunctionForTableOfContentsWithOptionalRest[0]!;
    const renderedFunctionForDocumentationSignature = Object.keys(renderedFunctionForDocumentationWithOptionalRest)[0]!;
    const renderedFunctionForDocumentationBody = renderedFunctionForDocumentationWithOptionalRest[renderedFunctionForDocumentationSignature]!;

    it("should handle optional and rest parameters simultaneously", () => {
      expect(renderedFunctionForTableOfContentsSignature).to.equal("testFunction([...params])");
      expect(renderedFunctionForDocumentationSignature).to.equal("testFunction([...params])");
      expect(renderedFunctionForDocumentationBody[0][0][0]).to.equal("params: optional rest");
    });

  }
  {

    const testFunctionWithOverloads: Testable<Function> = {
      kind: Kind.Function,
      name: "add",
      signatures: [
        {
          kind: Kind.Signature,
          parameters: [
            {
              kind: Kind.Parameter,
              name: "a",
              optional: false,
              rest: false,
              type: {
                kind: Kind.Number,
                name: "number"
              }
            },
            {
              kind: Kind.Parameter,
              name: "b",
              optional: false,
              rest: false,
              type: {
                kind: Kind.Number,
                name: "number"
              }
            }
          ],
          returnType: {
            kind: Kind.Any,
            name: "any"
          }
        },
        {
          kind: Kind.Signature,
          parameters: [
            {
              kind: Kind.Parameter,
              name: "a",
              optional: false,
              rest: false,
              type: {
                kind: Kind.Number,
                name: "number"
              }
            },
            {
              kind: Kind.Parameter,
              name: "b",
              optional: false,
              rest: false,
              type: {
                kind: Kind.Number,
                name: "number"
              }
            },
            {
              kind: Kind.Parameter,
              name: "c",
              optional: false,
              rest: false,
              type: {
                kind: Kind.Number,
                name: "number"
              }
            }
          ],
          returnType: {
            kind: Kind.Any,
            name: "any"
          }
        }
      ]
    };

    const ctx = createRenderContext();

    const renderedFunctionForTableOfContentsWithOverloads = renderFunctionForTableOfContents(ctx, <Real<Function>>testFunctionWithOverloads);
    const renderedFunctionWithOverloads = renderFunctionForDocumentation(ctx, <Real<Function>>testFunctionWithOverloads);

    const renderedFunctionForTableOfContentsSignatures = renderedFunctionForTableOfContentsWithOverloads;
    const renderedFunctionForDocumentationSignatures = Object.keys(renderedFunctionWithOverloads);

    it("should have 2 signatures", () => {
      expect(renderedFunctionForTableOfContentsSignatures).to.have.lengthOf(2);
      expect(renderedFunctionForDocumentationSignatures).to.have.lengthOf(2);
    });

    it("should have matching signatures", () => {
      expect(renderedFunctionForTableOfContentsSignatures[0]).to.equal("add(a, b)");
      expect(renderedFunctionForDocumentationSignatures[0]).to.equal("add(a, b)");
      expect(renderedFunctionForTableOfContentsSignatures[1]).to.equal("add(a, b, c)");
      expect(renderedFunctionForDocumentationSignatures[1]).to.equal("add(a, b, c)");
    });

  }
  {

    const testFunctionWithDescriptionAndExamples: Testable<Function> = {
      kind: Kind.Function,
      name: "add",
      signatures: [
        {
          description: "Adds two numbers together.",
          example: "add(1, 2);\n// => 3",
          kind: Kind.Signature,
          parameters: [
            {
              description: "The first number.",
              kind: Kind.Parameter,
              name: "a",
              optional: false,
              rest: false,
              type: {
                kind: Kind.Number,
                name: "number"
              }
            },
            {
              description: "The second number.",
              kind: Kind.Parameter,
              name: "b",
              optional: false,
              rest: false,
              type: {
                kind: Kind.Number,
                name: "number"
              }
            }
          ],
          returnType: {
            description: "The sum of the two numbers.",
            kind: Kind.Number,
            name: "number"
          }
        }
      ]
    };

    const ctx = createRenderContext();
    const renderedFunctionForDocumentationWithDescriptionAndExamples = renderFunctionForDocumentation(ctx, <Real<Function>>testFunctionWithDescriptionAndExamples);

    const renderedFunctionForDocumentationSignature = Object.keys(renderedFunctionForDocumentationWithDescriptionAndExamples)[0]!;
    const renderedFunctionForDocumentationBody = renderedFunctionForDocumentationWithDescriptionAndExamples[renderedFunctionForDocumentationSignature]!;


    it("should document parameters", () => {
      expect(renderedFunctionForDocumentationBody[0][0]).to.have.lengthOf(3);
      expect(renderedFunctionForDocumentationBody[0][0][0]).to.equal("a: number The first number.");
      expect(renderedFunctionForDocumentationBody[0][0][1]).to.equal("b: number The second number.");
      expect(renderedFunctionForDocumentationBody[0][0][2]).to.equal("Returns: number The sum of the two numbers.");
    });

    it("should document the description", () => {
      expect(renderedFunctionForDocumentationBody[1]).to.equal("Adds two numbers together.");
    });

    it("should document examples", () => {
      expect(renderedFunctionForDocumentationBody[2]).to.equal("add(1, 2);\n// => 3");
    });

  }

});
