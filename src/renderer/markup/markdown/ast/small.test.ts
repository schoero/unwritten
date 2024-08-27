import { expect, it } from "vitest";

import { createSmallNode } from "unwritten:renderer:markup/utils/nodes";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";

import { renderSmallNode } from "./small";


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
