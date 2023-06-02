import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { createStrikethroughNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderStrikethroughNode } from "./strikethrough.js";


scope("MarkdownRenderer", "StrikethroughNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a strikethrough node correctly", () => {
    const strikethroughNode = createStrikethroughNode("Strikethrough text");
    expect(renderStrikethroughNode(ctx, strikethroughNode)).toBe(md`
      ~~Strikethrough text~~
    `);
  });

  it("should not render empty strikethrough nodes", () => {
    const strikethroughNode = createStrikethroughNode("");
    expect(renderStrikethroughNode(ctx, strikethroughNode)).toBe("");
  });

});
