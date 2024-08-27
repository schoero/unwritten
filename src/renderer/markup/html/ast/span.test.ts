import { expect, it } from "vitest";

import { createSpanNode } from "unwritten:renderer:markup/utils/nodes";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { html } from "unwritten:utils/template";

import { renderSpanNode } from "./span";


scope("HTMLRenderer", "SpanNode", () => {

  const ctx = createRenderContext();

  it("should render a span node correctly", () => {
    const spanNode = createSpanNode("text");
    expect(renderSpanNode(ctx, spanNode)).toBe(html`
      <span>text</span>
    `);
  });

  it("should not render empty span nodes", () => {
    const spanNode = createSpanNode("");
    expect(renderSpanNode(ctx, spanNode)).toBe("");
  });

  it("should render an id if available", () => {
    const anchor = registerAnchor(ctx, "test", 1);
    const spanNode = createSpanNode(anchor, "text");
    expect(renderSpanNode(ctx, spanNode)).toBe(html`
      <span id="test">text</span>
    `);
  });

});
