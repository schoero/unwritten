import { describe, expect, it } from "vitest";

import { createNamespaceEntity, createVariableEntity } from "unwritten:interpreter/ast/entities/index.js";
import { compile } from "unwritten:tests:utils/compile.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { isVariableEntity } from "unwritten:typeguards/entities.js";
import { assert } from "unwritten:utils/general.js";
import { ts } from "unwritten:utils/template.js";

import { convertTextToAnchorId, getAnchorLink, registerAnchor } from "./registry.js";


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
          variableEntity.name,
          variableEntity.symbolId
        );

        const anchorText = getAnchorLink(ctx, anchor.name, anchor.id);
        expect(anchorText).toBe("#test");

      });

      it("should not register the same anchor twice", () => {

        const anchor = registerAnchor(
          ctx,
          variableEntity.name,
          variableEntity.symbolId
        );

        const anchorText = getAnchorLink(ctx, anchor.name, anchor.id);
        expect(anchorText).toBe("#test");

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

      const variableAnchorText = getAnchorLink(ctx, variableAnchor.name, variableAnchor.id);
      const namespaceAnchorText = getAnchorLink(ctx, namespaceAnchor.name, namespaceAnchor.id);

      expect(variableAnchorText).toBe("#test");
      expect(namespaceAnchorText).toBe("#test-1");

    });

  });

});
