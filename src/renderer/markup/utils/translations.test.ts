import { expect, it } from "vitest";

import { getTranslator } from "unwritten:renderer:markup/utils/translations.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Renderer", "translations", () => {

  const ctx = createRenderContext();
  const translate = getTranslator(ctx);

  it("should singularize properly", () => {
    expect(translate("function", { count: 1 })).to.equal("function");
  });

  it("should pluralize properly", () => {
    expect(translate("function", { count: 2 })).to.equal("functions");
  });

  it("should not pluralize if not specified", () => {
    expect(translate("beta")).to.equal("beta");
  });

  it("should fallback to the translation key if not found", () => {
    // @ts-expect-error - Purposefully testing an invalid key
    expect(translate("not-found")).to.equal("not-found");
  });

});
