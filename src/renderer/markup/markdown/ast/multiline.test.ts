import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { createMultilineNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderMultilineNode } from "./multiline.js";


scope("MarkdownRenderer", "MultilineNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a multiline node with only one entry on a single line", () => {
    const multilineNode = createMultilineNode("Multiline text");
    expect(renderMultilineNode(ctx, multilineNode)).toBe("Multiline text");
  });

  it("should not render empty multiline nodes", () => {
    const multilineNode = createMultilineNode("");
    expect(renderMultilineNode(ctx, multilineNode)).toBe("");
  });

  it("should render a multiline node with multiple entries on multiple lines", () => {
    const multilineNode = createMultilineNode("First line text", "Second line text");
    expect(renderMultilineNode(ctx, multilineNode)).toBe(md`
      First line text
      Second line text
    `);
  });

  it("should filter out empty lines", () => {
    const multilineNode = createMultilineNode("", "First line text", "", "Second line text", "");
    expect(renderMultilineNode(ctx, multilineNode)).toBe(md`
      First line text
      Second line text
    `);
  });

});
