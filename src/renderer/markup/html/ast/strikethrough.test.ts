import { expect, it } from "vitest";

import { createStrikethroughNode } from "unwritten:renderer/markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import { renderStrikethroughNode } from "./strikethrough.js";


scope("MarkupRenderer", "StrikethroughNode", () => {

  const ctx = createRenderContext();

  it("should render a strikethrough node correctly", () => {
    const strikethroughNode = createStrikethroughNode("Strikethrough text");
    expect(renderStrikethroughNode(ctx, strikethroughNode)).to.equal(html`
      <del>Strikethrough text</del>
    `);
  });

  it("should not render empty strikethrough nodes", () => {
    const strikethroughNode = createStrikethroughNode("");
    expect(renderStrikethroughNode(ctx, strikethroughNode)).to.equal("");
  });

});
