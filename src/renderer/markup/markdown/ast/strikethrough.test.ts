import { createStrikethroughNode } from "unwritten:renderer:markup/utils/nodes";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";
import { expect, it } from "vitest";

import { renderStrikethroughNode } from "./strikethrough";


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
