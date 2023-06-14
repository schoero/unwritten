import { describe, expect, it } from "vitest";

import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:utils/template.js";

import { convertTextToAnchorId, createAnchor, getAnchorLink, registerAnchor } from "./linker.js";


scope("Renderer", "Render abstraction", () => {

  describe("convertTextToAnchorId", () => {

    {

      it("should convert complex text to markdown compatible anchor ids", () => {
        {
          const testFunctionSignature = ts`
            testFunction()
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).toBe("testfunction");
        }
        {
          const testFunctionSignature = ts`
            testFunction(param)
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).toBe("testfunctionparam");
        }
        {
          const testFunctionSignature = ts`
            testFunction(param, param2)
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).toBe("testfunctionparam-param2");
        }
        {
          const testFunctionSignature = ts`
            testFunction(param[, param2])
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).toBe("testfunctionparam-param2");
        }
        {
          const testFunctionSignature = ts`
            testFunction<T>(param[, param2])
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).toBe("testfunctiontparam-param2");
        }
        {
          const testFunctionSignature = ts`
            _privateFunction()
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).toBe("_privatefunction");
        }
        {
          const testFunctionSignature = ts`
            test&lt;T&gt;()
          `;
          const anchorId = convertTextToAnchorId(testFunctionSignature);
          expect(anchorId).toBe("testt");
        }
      });

    }

  });

  describe("linker", () => {

    {

      const ctx = createRenderContext();

      it("should create a simple anchor correctly", () => {
        const anchor = createAnchor(
          "test",
          1
        );
        registerAnchor(ctx, anchor.name, anchor.id);
        const anchorText = getAnchorLink(ctx, anchor);
        expect(anchorText).toBe("test");
      });

      it("should handle multiple anchors with different ids but the same name correctly", () => {
        const anchor = createAnchor(
          "test",
          2
        );
        registerAnchor(ctx, anchor.name, anchor.id);
        const anchorText = getAnchorLink(ctx, anchor);
        expect(anchorText).toBe("test-1");
      });

      it("should not register the same anchor twice", () => {
        const anchor = createAnchor(
          "test",
          2
        );
        registerAnchor(ctx, anchor.name, anchor.id);
        const anchorText = getAnchorLink(ctx, anchor);
        expect(anchorText).toBe("test-1");
      });

    }

  });

});
