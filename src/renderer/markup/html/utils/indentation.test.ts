import { expect, it } from "vitest";

import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";

import { renderIndentation } from "./indentation.js";


scope("Renderer", "HTMLRenderer", () => {

  const ctx = createRenderContext();

  ctx.config.renderConfig.html.indentation = "--";

  it("should render indentations correctly", () => {
    expect(renderIndentation({ ...ctx, indentation: 0 })).to.equal("");
    expect(renderIndentation({ ...ctx, indentation: 1 })).to.equal("--");
    expect(renderIndentation({ ...ctx, indentation: 2 })).to.equal("----");
  });

});
