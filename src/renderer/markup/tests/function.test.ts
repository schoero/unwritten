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

  });

});