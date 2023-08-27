import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { createSmallNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderSmallNode } from "./small.js";


scope("MarkdownRenderer", "SmallNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a small node correctly", () => {
    const smallNode = createSmallNode("Small text");
    expect(renderSmallNode(ctx, smallNode)).toBe(md`
      Small text  
    `);
  });

  it("should not render empty small nodes", () => {
    const smallNode = createSmallNode("");
    expect(renderSmallNode(ctx, smallNode)).toBe("");
  });

});
