import { afterEach, expect, it } from "vitest";

import { registerAnchor } from "unwritten:renderer:markup/utils/linker.js";
import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:utils/template.js";

import { renderAnchorNode } from "./anchor.js";


scope("HTMLRenderer", "AnchorNode", () => {

  const ctx = createRenderContext();

  afterEach(() => {
    ctx.renderer.linkRegistry.clear();
  });

  it("should render a anchor node correctly", () => {
    const anchor = registerAnchor(ctx, "AnchorText", [1]);
    const anchorNode = createAnchorNode(anchor.name, anchor.ids[0]);
    expect(renderAnchorNode(ctx, anchorNode)).toBe(html`
      <a href="#anchortext">AnchorText</a>
    `);
  });

  it("should render multiple anchor nodes with the same name correctly", () => {
    const anchor1 = registerAnchor(ctx, "AnchorText", [1]);
    const anchor2 = registerAnchor(ctx, "AnchorText", [2]);
    const anchorNode = createAnchorNode(anchor2.name, anchor2.ids[0]);
    expect(renderAnchorNode(ctx, anchorNode)).toBe(html`
      <a href="#anchortext-1">AnchorText</a>
    `);
  });

  it("should return the same link for all different registered ids", () => {
    const anchor = registerAnchor(ctx, "AnchorText", [1, 2, 3]);
    const anchorNode1 = createAnchorNode(anchor.name, anchor.ids[0]);
    const renderedAnchorNode1 = renderAnchorNode(ctx, anchorNode1);
    const anchorNode2 = createAnchorNode(anchor.name, anchor.ids[1]);
    const renderedAnchorNode2 = renderAnchorNode(ctx, anchorNode2);
    const anchorNode3 = createAnchorNode(anchor.name, anchor.ids[2]);
    const renderedAnchorNode3 = renderAnchorNode(ctx, anchorNode3);
    expect(renderedAnchorNode1).toBe(renderedAnchorNode2);
    expect(renderedAnchorNode2).toBe(renderedAnchorNode3);
  });

});
