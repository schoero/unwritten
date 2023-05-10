import { expect, it } from "vitest";

import { createAnchor, registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { createSpanNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:utils/template.js";

import { renderSpanNode } from "./span.js";


scope("HTMLRenderer", "SpanNode", () => {

  const ctx = createRenderContext();

  it("should render a span node correctly", () => {
    const spanNode = createSpanNode("text");
    expect(renderSpanNode(ctx, spanNode)).to.equal(html`
      <span>text</span>
    `);
  });

  it("should not render empty span nodes", () => {
    const spanNode = createSpanNode("");
    expect(renderSpanNode(ctx, spanNode)).to.equal("");
  });

  it("should render an id if available", () => {
    const anchor = createAnchor("test", 1);
    registerAnchor(ctx, anchor.name, anchor.id);
    const spanNode = createSpanNode(anchor, "text");
    expect(renderSpanNode(ctx, spanNode)).to.equal(html`
      <span id="test">text</span>
    `);
  });

});
