import { describe, expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { convertStringLiteralType, convertStringType } from "unwritten:renderer/markup/ast-converter/types/index.js";
import { renderNode } from "unwritten:renderer/markup/html/index.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import type { StringLiteralType, StringType } from "unwritten:compiler:type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", "Config", () => {

  describe("typeEncapsulation", async () => {

    const stringType: Testable<StringType> = {
      kind: TypeKind.String,
      name: "string"
    };

    const ctx = createRenderContext();

    {

      const convertedStringType = convertStringType(ctx, stringType as StringType);
      const renderedStringType = renderNode(ctx, convertedStringType);

      it("should use the default encapsulation", () => {
        expect(renderedStringType).to.equal("string");
      });

    }

    {

      ctx.config.renderConfig.html.typeEncapsulation = ["`", "`"];

      const convertedStringType = convertStringType(ctx, stringType as StringType);
      const renderedStringType = renderNode(ctx, convertedStringType);

      it("should be possible to change the encapsulation", () => {
        expect(renderedStringType).to.equal("`string`");
      });

    }

  });


  describe("stringLiteralTypeEncapsulation", async () => {

    const stringLiteralType: Testable<StringLiteralType> = {
      kind: TypeKind.StringLiteral,
      name: "string",
      value: "test"
    };

    const ctx = createRenderContext();

    ctx.config.renderConfig.html.stringLiteralEncapsulation = false;

    {

      const convertedStringType = convertStringLiteralType(ctx, stringLiteralType as StringLiteralType);
      const renderedStringType = renderNode(ctx, convertedStringType);

      it("should use the default encapsulation", () => {
        expect(renderedStringType).to.equal("test");
      });

    }

    {

      ctx.config.renderConfig.html.typeEncapsulation = ["`", "`"];
      ctx.config.renderConfig.html.stringLiteralEncapsulation = ['"', '"'];

      const convertedStringType = convertStringLiteralType(ctx, stringLiteralType as StringLiteralType);
      const renderedStringType = renderNode(ctx, convertedStringType);

      it("should be possible to change the encapsulation", () => {
        expect(renderedStringType).to.equal('`"test"`');
      });

    }

  });

  describe("externalTypes", async () => {

    const stringType: Testable<StringType> = {
      kind: TypeKind.String,
      name: "string"
    };

    const ctx = createRenderContext();

    ctx.config.externalTypes = {
      [TypeKind.String]: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#the-primitives-string-number-and-boolean"
    };

    {

      const convertedStringType = convertStringType(ctx, stringType as StringType);
      const renderedStringType = renderNode(ctx, convertedStringType);

      it("should use the default encapsulation", () => {
        expect(renderedStringType).to.equal(`<a href="${ctx.config.externalTypes[TypeKind.String]}">string</a>`);
      });

    }

  });

});
