import { describe, expect, it } from "vitest";

import { TypeKind } from "quickdoks:compiler:enums/types.js";
import { createRenderContext } from "quickdoks:tests:utils/context.js";
import { scope } from "quickdoks:tests:utils/scope.js";

import { renderStringType } from "../ast/types/string.js";
import { renderStringLiteralType } from "../ast/types/string-literal.js";

import type { StringLiteralType, StringType } from "quickdoks:compiler/type-definitions/types.js";
import type { Testable } from "quickdoks:type-definitions/utils.js";


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

    {

      const renderedStringType = renderStringLiteralType(ctx, stringLiteralType as StringLiteralType);

      it("should use the default encapsulation", () => {
        expect(renderedStringType).to.equal("test");
      });

    }

    {

      ctx.config.renderConfig.markdown.typeEncapsulation = ["`", "`"];
      ctx.config.renderConfig.markdown.stringLiteralTypeEncapsulation = ["\"", "\""];

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
