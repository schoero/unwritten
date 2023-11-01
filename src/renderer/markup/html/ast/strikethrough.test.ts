import { expect, it } from "vitest";

import { createStrikethroughNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { html } from "unwritten:utils/template";

import { renderStrikethroughNode } from "./strikethrough";


scope("HTMLRenderer", "StrikethroughNode", () => {

  const ctx = createRenderContext();

  it("should render a strikethrough node correctly", () => {
    const strikethroughNode = createStrikethroughNode("Strikethrough text");
    expect(renderStrikethroughNode(ctx, strikethroughNode)).toBe(html`
      <del>Strikethrough text</del>
    `);
  });

  it("should not render empty strikethrough nodes", () => {
    const strikethroughNode = createStrikethroughNode("");
    expect(renderStrikethroughNode(ctx, strikethroughNode)).toBe("");
  });

});
