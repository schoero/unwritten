import { expect, it } from "vitest";

import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:utils/template.js";

import { renderAnchorNode } from "./anchor.js";


scope("HTMLRenderer", "AnchorNode", () => {

  it("should render a anchor node correctly", () => {

    const ctx = createRenderContext();

    const anchor = registerAnchor(ctx, "AnchorText", 1);
    const anchorNode = createAnchorNode(anchor.name, anchor.ids);
    expect(renderAnchorNode(ctx, anchorNode)).toBe(html`
      <a href="#anchortext">AnchorText</a>
    `);

  });

  it("should render multiple anchor nodes with the same name correctly", () => {

    const ctx = createRenderContext();

    const anchor1 = registerAnchor(ctx, "AnchorText", 1);
    const anchor2 = registerAnchor(ctx, "AnchorText", 2);
    const anchorNode = createAnchorNode(anchor2.name, anchor2.ids);
    expect(renderAnchorNode(ctx, anchorNode)).toBe(html`
      <a href="#anchortext-1">AnchorText</a>
    `);

  });

  it("should render the displayName if available", () => {

    const ctx = createRenderContext();

    const anchor = registerAnchor(ctx, "AnchorText", 1);
    const anchorNode = createAnchorNode(anchor.name, anchor.ids, "AnchorDisplayName");
    expect(renderAnchorNode(ctx, anchorNode)).toBe(html`
      <a href="#anchortext">AnchorDisplayName</a>
    `);

  });

});
