import { describe, expect, it } from "vitest";

import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { ts } from "unwritten:tests:utils/template.js";

import { convertTextToAnchorId, createAnchor, getAnchorLink } from "./linker.js";


scope("Renderer", "Render abstraction", () => {

  describe("convertTextToAnchorId", () => {

    {

      it("should convert complex text to markdown compatible anchor ids", () => {

        const testFunctionSignature = ts`
          test()
        `;

        const anchorId = convertTextToAnchorId(testFunctionSignature);

        expect(anchorId).to.equal("test");

      });

    }

    {

      it("should convert complex text to markdown compatible anchor ids", () => {

        const testFunctionSignature = ts`
          test(param)
        `;

        const anchorId = convertTextToAnchorId(testFunctionSignature);

        expect(anchorId).to.equal("testparam");

      });

    }

    {

      it("should convert complex text to markdown compatible anchor ids", () => {

        const testFunctionSignature = ts`
          test(param, param2)
        `;

        const anchorId = convertTextToAnchorId(testFunctionSignature);

        expect(anchorId).to.equal("testparam-param2");

      });

    }

    {

      it("should convert complex text to markdown compatible anchor ids", () => {

        const testFunctionSignature = ts`
          test(param[, param2])
        `;

        const anchorId = convertTextToAnchorId(testFunctionSignature);

        expect(anchorId).to.equal("testparam-param2");

      });

    }

  });

  describe("Linker", () => {

    {

      const ctx = createRenderContext();

      it("should create a simple anchor correctly", () => {
        const anchorIdentifier = createAnchor(ctx, "test", 7);
        const anchorText = getAnchorLink(ctx, anchorIdentifier);
        expect(anchorIdentifier).to.equal(`test-7-0`);
        expect(anchorText).to.equal("test");
      });

      it("should handle multiple anchors with different ids but the same name correctly", () => {
        const anchor = createAnchor(ctx, "test", 8);
        expect(anchor).to.equal(`test-8-0`);
      });

      it("should handle multiple anchors with the same id and the same name correctly", () => {
        const anchor = createAnchor(ctx, "test", 8);
        expect(anchor).to.equal(`test-8-1`);
      });

    }

  });

});
