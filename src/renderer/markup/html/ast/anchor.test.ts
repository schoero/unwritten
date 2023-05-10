import { expect, it } from "vitest";

import { createAnchor, registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:utils/template.js";

import { renderAnchorNode } from "./anchor.js";


scope("MarkupRenderer", "AnchorNode", () => {

  const ctx = createRenderContext();

  it("should render a anchor node correctly", () => {
    const anchor = createAnchor("AnchorText", 1);
    registerAnchor(ctx, anchor.name, anchor.id);
    const anchorNode = createAnchorNode(anchor.name, anchor.id);
    expect(renderAnchorNode(ctx, anchorNode)).to.equal(html`
      <a href="#anchortext">AnchorText</a>
    `);
  });

  it("should render multiple anchor nodes with the same name correctly", () => {
    const anchor = createAnchor("AnchorText", 2);
    registerAnchor(ctx, anchor.name, anchor.id);
    const anchorNode = createAnchorNode(anchor.name, anchor.id);
    expect(renderAnchorNode(ctx, anchorNode)).to.equal(html`
      <a href="#anchortext-1">AnchorText</a>
    `);
  });

});
