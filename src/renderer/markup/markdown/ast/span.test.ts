import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { createSpanNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { attachTestRegistry } from "unwritten:tests:utils/registry.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderSpanNode } from "./span.js";


scope("MarkdownRenderer", "SpanNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);
  ctx.config.renderConfig[BuiltInRenderers.Markdown].allowedHTMLTags = ["span"];

  it("should render a span node correctly", () => {
    const spanNode = createSpanNode("text");
    expect(renderSpanNode(ctx, spanNode)).toBe(md`
      <span>text</span>
    `);
  });

  it("should not render empty span nodes", () => {
    const spanNode = createSpanNode("");
    expect(renderSpanNode(ctx, spanNode)).toBe("");
  });

  it("should render an id if available", () => {

    void attachTestRegistry(ctx);

    const anchor = registerAnchor(ctx, "test", 1);
    const spanNode = createSpanNode(anchor, "text");
    expect(renderSpanNode(ctx, spanNode)).toBe(md`
      <span id="test">text</span>
    `);
  });

  it("should be possible to disable the rendering of span nodes", () => {

    ctx.config.renderConfig[BuiltInRenderers.Markdown].allowedHTMLTags = false;

    const spanNode = createSpanNode("text");
    expect(renderSpanNode(ctx, spanNode)).toBe("text");
  });

});
