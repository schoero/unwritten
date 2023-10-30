import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { createBoldNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";

import { renderBoldNode } from "./bold";


scope("MarkdownRenderer", "BoldNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a bold node correctly", () => {
    const boldNode = createBoldNode("Bold text");
    expect(renderBoldNode(ctx, boldNode)).toBe(md`
      **Bold text**
    `);
  });

  it("should not render empty bold nodes", () => {
    const boldNode = createBoldNode("");
    expect(renderBoldNode(ctx, boldNode)).toBe("");
  });

});
