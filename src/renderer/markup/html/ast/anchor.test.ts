import { expect, it } from "vitest";

import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import { renderAnchorNode } from "./anchor.js";


scope("MarkupRenderer", "AnchorNode", () => {

  const ctx = createRenderContext();

  it("should render a anchor node correctly", () => {
    const anchorNode = createAnchorNode("Anchor text", "anchor");
    expect(renderAnchorNode(ctx, anchorNode)).to.equal(html`
      <a href="#anchor">Anchor text</a>
    `);
  });

});
