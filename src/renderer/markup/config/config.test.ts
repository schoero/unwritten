import { describe, expect, it } from "vitest";

import { TypeKind } from "unwritten:compiler:enums/types.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderStringType } from "../ast/types/string.js";
import { renderStringLiteralType } from "../ast/types/string-literal.js";

import type { StringLiteralType, StringType } from "unwritten:compiler/type-definitions/types.js";
import type { Testable } from "unwritten:type-definitions/utils.js";


scope("Renderer", "Config", () => {

  describe("typeEncapsulation", async () => {

    const stringType: Testable<StringType> = {
      kind: TypeKind.String,
      name: "string"
    };

    const ctx = createRenderContext();

    {

      const renderedStringType = renderStringType(ctx, stringType as StringType);

      it("should use the default encapsulation", () => {
        expect(renderedStringType).to.equal("string");
      });

    }

    {

      ctx.config.renderConfig.markdown.typeEncapsulation = ["`", "`"];

      const renderedStringType = renderStringType(ctx, stringType as StringType);

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

    ctx.config.renderConfig.markdown.stringLiteralEncapsulation = false;

    {

      const renderedStringType = renderStringLiteralType(ctx, stringLiteralType as StringLiteralType);

      it("should use the default encapsulation", () => {
        expect(renderedStringType).to.equal("test");
      });

    }

    {

      ctx.config.renderConfig.markdown.typeEncapsulation = ["`", "`"];
      ctx.config.renderConfig.markdown.stringLiteralEncapsulation = ["\"", "\""];

      const renderedStringType = renderStringLiteralType(ctx, stringLiteralType as StringLiteralType);

      it("should be possible to change the encapsulation", () => {
        expect(renderedStringType).to.equal("`\"test\"`");
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

      const renderedStringType = renderStringType(ctx, stringType as StringType);

      it("should use the default encapsulation", () => {
        expect(renderedStringType).to.equal(`[string](${ctx.config.externalTypes[TypeKind.String]})`);
      });

    }

  });

});
