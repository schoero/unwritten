import { describe, expect, it } from "vitest";

import { createNamespaceEntity, createVariableEntity } from "unwritten:interpreter/ast/entities/index";
import { compile } from "unwritten:tests:utils/compile";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { isVariableEntity } from "unwritten:typeguards/entities";
import { assert } from "unwritten:utils/general";
import { ts } from "unwritten:utils/template";

import { convertTextToAnchorId, getAnchorLink, registerAnchor } from "./registry";


scope("Renderer", "Source registry", () => {

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

      const testFileContent = ts`
        export const test = "test";
      `;

      const { ctx: compilerContext, exportedSymbols, fileSymbols } = compile(testFileContent);
      const symbol = exportedSymbols.find(symbol => symbol.name === "test");

      const variableEntity = createVariableEntity(compilerContext, symbol!);

      const ctx = createRenderContext();

      it("should create a simple anchor correctly", () => {

        const anchor = registerAnchor(
          ctx,
          "test",
          1
        );

        const anchorText = getAnchorLink(ctx, anchor.ids);
        expect(anchorText).toBe("#test");

      });

      it("should not register the same anchor twice", () => {

        const anchor = registerAnchor(
          ctx,
          "test",
          1
        );

        const anchorText = getAnchorLink(ctx, anchor.ids);
        expect(anchorText).toBe("#test");

      });

      it("should be possible to register the same anchor with multiple ids", () => {

        const anchor = registerAnchor(
          ctx,
          "test",
          [2, 3]
        );

        const anchorText = getAnchorLink(ctx, 2);
        const anchorText2 = getAnchorLink(ctx, 3);
        const anchorText3 = getAnchorLink(ctx, anchor.ids);

        expect(anchorText).toStrictEqual(anchorText2);
        expect(anchorText2).toStrictEqual(anchorText3);

      });

    }

    it("should handle multiple anchors with different ids but the same name correctly", () => {

      const testFileContent = ts`
        export const test = "normal variable";
        export namespace ns {
          export const test = "inside namespace";
        }
      `;

      const { ctx: compilerContext, exportedSymbols, fileSymbols } = compile(testFileContent);

      const variableSymbol = exportedSymbols.find(symbol => symbol.name === "test");
      const namespaceSymbol = exportedSymbols.find(symbol => symbol.name === "ns");

      const variableEntity = createVariableEntity(compilerContext, variableSymbol!);
      const namespaceEntity = createNamespaceEntity(compilerContext, namespaceSymbol!);

      const namespaceVariableEntity = namespaceEntity.exports[0];

      assert(isVariableEntity(namespaceVariableEntity));

      const ctx = createRenderContext();

      const variableAnchor = registerAnchor(
        ctx,
        variableEntity.name,
        variableEntity.symbolId
      );
      const namespaceAnchor = registerAnchor(
        ctx,
        namespaceVariableEntity.name,
        namespaceVariableEntity.symbolId
      );

      const variableAnchorText = getAnchorLink(ctx, variableAnchor.ids);
      const namespaceAnchorText = getAnchorLink(ctx, namespaceAnchor.ids);

      expect(variableAnchorText).toBe("#test");
      expect(namespaceAnchorText).toBe("#test-1");

    });

  });

});
