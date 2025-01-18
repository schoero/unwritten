import { createPaddedNode } from "unwritten:renderer:markup/utils/nodes";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { renderPaddedNode } from "unwritten:renderer/markup/markdown/ast/padded";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";
import { expect, it } from "vitest";


scope("MarkdownRenderer", "PaddedNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should not render empty nodes", () => {
    const paddedNode = createPaddedNode("");
    expect(renderPaddedNode(ctx, paddedNode)).toBe("");
  });

  it("should render an empty line above the children", () => {
    const paddedNode = createPaddedNode("Padded content");
    expect(renderPaddedNode(ctx, paddedNode)).toBe(md`
        
      Padded content
    `);

  });

});
