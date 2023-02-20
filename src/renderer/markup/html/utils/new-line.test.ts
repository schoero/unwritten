import { expect, it } from "vitest";

import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Renderer", "HTMLRenderer", () => {

  const ctx = createRenderContext();

  it("should render new lines correctly", () => {
    ctx.config.renderConfig.html.newLine = "\n";
    expect(ctx.config.renderConfig.html.newLine).to.equal("\n");
    ctx.config.renderConfig.html.newLine = "\r\n";
    expect(ctx.config.renderConfig.html.newLine).to.equal("\r\n");
  });

});
