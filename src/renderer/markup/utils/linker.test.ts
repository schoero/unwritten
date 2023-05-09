import { describe, expect, it } from "vitest";

import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import { convertTextToAnchorId, createAnchor, getAnchorLink, registerAnchorIdentifier } from "./linker.js";


scope("Renderer", "Render abstraction", () => {

  describe("convertTextToAnchorId", () => {

    {

      it("should convert complex text to markdown compatible anchor ids", () => {
        {
          const testFunctionSignature = ts`
            testFunction()
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).to.equal("testfunction");
        }
        {
          const testFunctionSignature = ts`
            testFunction(param)
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).to.equal("testfunctionparam");
        }
        {
          const testFunctionSignature = ts`
            testFunction(param, param2)
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).to.equal("testfunctionparam-param2");
        }
        {
          const testFunctionSignature = ts`
            testFunction(param[, param2])
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).to.equal("testfunctionparam-param2");
        }
        {
          const testFunctionSignature = ts`
            testFunction<T>(param[, param2])
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).to.equal("testfunctiontparam-param2");
        }
      });

    }

  });

  describe("Linker", () => {

    {

      const ctx = createRenderContext();

      it("should create a simple anchor correctly", () => {
        const anchor = createAnchor(
          "test",
          1
        );
        registerAnchorIdentifier(ctx, anchor);
        const anchorText = getAnchorLink(ctx, anchor);
        expect(anchorText).to.equal("test");
      });

      it("should handle multiple anchors with different ids but the same name correctly", () => {
        const anchor = createAnchor(
          "test",
          2
        );
        registerAnchorIdentifier(ctx, anchor);
        const anchorText = getAnchorLink(ctx, anchor);
        expect(anchorText).to.equal("test-1");
      });

      it("should not register the same anchor twice", () => {
        const anchor = createAnchor(
          "test",
          2
        );
        registerAnchorIdentifier(ctx, anchor);
        const anchorText = getAnchorLink(ctx, anchor);
        expect(anchorText).to.equal("test-1");
      });

    }

  });

});
