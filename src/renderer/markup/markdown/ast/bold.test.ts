import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { createBoldNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderBoldNode } from "./bold.js";


scope("MarkdownRenderer", "BoldNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a bold node correctly", () => {
    const boldNode = createBoldNode("Bold text");
    expect(renderBoldNode(ctx, boldNode)).to.equal(md`
      **Bold text**
    `);
  });

  it("should not render empty bold nodes", () => {
    const boldNode = createBoldNode("");
    expect(renderBoldNode(ctx, boldNode)).to.equal("");
  });

});
