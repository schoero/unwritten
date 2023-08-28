import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { renderPaddedNode } from "unwritten:renderer/markup/markdown/ast/padded.js";
import { createPaddedNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";


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
