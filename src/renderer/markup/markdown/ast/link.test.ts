import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderLinkNode } from "./link.js";


scope("MarkdownRenderer", "LinkNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a simple link correctly", () => {
    const linkNode = createLinkNode("Link name", "#anchor");
    expect(renderLinkNode(ctx, linkNode)).to.equal(md`
      [Link name](#anchor)
    `);
  });

});
