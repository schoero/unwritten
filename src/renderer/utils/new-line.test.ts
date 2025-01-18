import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { expect, it } from "vitest";


scope("Renderer", "utils", () => {

  const ctx = createRenderContext();

  it("should render new lines correctly", () => {
    ctx.config.renderConfig.html.newLine = "\n";
    expect(ctx.config.renderConfig.html.newLine).toBe("\n");
    ctx.config.renderConfig.html.newLine = "\r\n";
    expect(ctx.config.renderConfig.html.newLine).toBe("\r\n");
  });

});
