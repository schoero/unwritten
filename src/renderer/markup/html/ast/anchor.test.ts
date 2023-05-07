import { expect, it } from "vitest";

import { registerAnchorIdentifier } from "unwritten:renderer/markup/utils/linker.js";
import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import { renderAnchorNode } from "./anchor.js";


scope("MarkupRenderer", "AnchorNode", () => {

  const ctx = createRenderContext();

  it("should render a anchor node correctly", () => {
    const anchorId = registerAnchorIdentifier(ctx, "AnchorText", 7);
    const anchorNode = createAnchorNode(anchorId, "AnchorText");
    expect(renderAnchorNode(ctx, anchorNode)).to.equal(html`
      <a href="#anchortext">AnchorText</a>
    `);
  });

  it("should render multiple anchor nodes with the same name correctly", () => {
    const anchorId = registerAnchorIdentifier(ctx, "AnchorText", 8);
    const anchorNode = createAnchorNode(anchorId, "AnchorText 2");
    expect(renderAnchorNode(ctx, anchorNode)).to.equal(html`
      <a href="#anchortext-1">AnchorText 2</a>
    `);
  });

});
