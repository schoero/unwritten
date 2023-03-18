import { expect, it } from "vitest";

import { createSmallNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import { renderSmallNode } from "./small.js";


scope("MarkupRenderer", "SmallNode", () => {

  const ctx = createRenderContext();

  it("should render a small node correctly", () => {
    const smallNode = createSmallNode("Small text");
    expect(renderSmallNode(ctx, smallNode)).to.equal(html`
      <small>Small text</small>
    `);
  });

  it("should not render empty small nodes", () => {
    const smallNode = createSmallNode("");
    expect(renderSmallNode(ctx, smallNode)).to.equal("");
  });

});
