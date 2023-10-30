import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";

import { renderLinkNode } from "./link";


scope("MarkdownRenderer", "LinkNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a simple link correctly", () => {
    const linkNode = createLinkNode("Link name", "#anchor");
    expect(renderLinkNode(ctx, linkNode)).toBe(md`
      [Link name](#anchor)
    `);
  });

  it("should escape nested square brackets", () => {
    const linkNode = createLinkNode("[Link name]", "#anchor");
    expect(renderLinkNode(ctx, linkNode)).toBe(md`
      [\\[Link name\\]](#anchor)
    `);
  });


});
