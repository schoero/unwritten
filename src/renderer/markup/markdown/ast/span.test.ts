import { expect, it } from "vitest";

import { createSpanNode } from "unwritten:renderer:markup/utils/nodes";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry";
import { createRenderContext } from "unwritten:tests:utils/context";
import { attachTestRegistry } from "unwritten:tests:utils/registry";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";

import { renderSpanNode } from "./span";


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
