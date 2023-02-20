import { expect, it } from "vitest";

import { renderWrapperNode } from "unwritten:renderer/markup/html/ast/wrapper.js";
import { createWrapperNode } from "unwritten:renderer/markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";


scope("Renderer", "HTMLRenderer", () => {

  const ctx = createRenderContext();

  it("should render a single wrapped node correctly", () => {
    const wrapperNode = createWrapperNode("element");
    expect(renderWrapperNode(ctx, wrapperNode)).to.equal("element");
  });

  it("should render multiple wrapped nodes correctly", () => {
    const wrapperNode = createWrapperNode("prefix-", "element", "-suffix");
    expect(renderWrapperNode(ctx, wrapperNode)).to.equal("prefix-element-suffix");
  });

});
