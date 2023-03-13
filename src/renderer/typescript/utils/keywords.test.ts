import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderQuote, renderSemicolon } from "unwritten:renderer/typescript/utils/keywords.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("TypeScriptRenderer", "utils", () => {

  const ctx = createRenderContext(BuiltInRenderers.TypeScript);

  it("should the semicolon only of specified", () => {
    ctx.config.renderConfig.ts.renderSemicolon = true;
    expect(renderSemicolon(ctx)).to.equal(";");
    ctx.config.renderConfig.ts.renderSemicolon = false;
    expect(renderSemicolon(ctx)).to.equal("");
  });

  it("should render the proper quote", () => {
    ctx.config.renderConfig.ts.quote = "\"";
    expect(renderQuote(ctx)).to.equal("\"");
    ctx.config.renderConfig.ts.quote = "'";
    expect(renderQuote(ctx)).to.equal("'");
  });

});
