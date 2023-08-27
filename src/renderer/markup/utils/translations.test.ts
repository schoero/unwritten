/* eslint-disable @typescript-eslint/naming-convention */
import { expect, it } from "vitest";

import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Renderer", "translations", () => {

  const ctx = createRenderContext();
  const translate = getTranslator(ctx);

  ctx.config.renderConfig.html.translations = {
    function_many: "functions",
    function_one: "function",
    mappedType: "mapped type",
    typeLiteral: "type literal"
  } as typeof ctx.config.renderConfig.html.translations;

  it("should singularize properly", () => {
    expect(translate("function", { count: 1 })).toBe("function");
  });

  it("should singularize when no count is provided", () => {
    expect(translate("function")).toBe("function");
    expect(translate("function", { capitalize: false })).toBe("function");
  });

  it("should remove the _one suffix in the key when a count of 1 is provided but the translation is not found", () => {
    expect(translate("mappedType", { count: 1 })).toBe("mapped type");
  });

  it("should pluralize properly", () => {
    expect(translate("function", { count: 2 })).toBe("functions");
  });

  it("should capitalize properly", () => {
    expect(translate("function", { capitalize: true })).toBe("Function");
    expect(translate("typeLiteral", { capitalizeEach: true })).toBe("Type Literal");
  });

  it("should fallback to the translation key if not found", () => {
    // @ts-expect-error - Purposefully testing an invalid key
    expect(translate("not-found")).toBe("not-found");
  });

});
