import { expect, it } from "vitest";

import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { createSpanNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { createTestRegistry } from "unwritten:tests:utils/registry.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:utils/template.js";

import { renderSpanNode } from "./span.js";


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

    ctx.sourceRegistry = createTestRegistry(ctx, {
      exports: new Set([1])
    });

    const anchor = registerAnchor(ctx, "test", 1);
    const spanNode = createSpanNode(anchor, "text");
    expect(renderSpanNode(ctx, spanNode)).toBe(html`
      <span id="test">text</span>
    `);
  });

});
