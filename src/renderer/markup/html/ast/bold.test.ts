import { expect, it } from "vitest";

import { createBoldNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import { renderBoldNode } from "./bold.js";


scope("MarkupRenderer", "BoldNode", () => {

  const ctx = createRenderContext();

  it("should render a bold node correctly", () => {
    const boldNode = createBoldNode("Bold text");
    expect(renderBoldNode(ctx, boldNode)).to.equal(html`
      <b>Bold text</b>
    `);
  });

  it("should not render empty bold nodes", () => {
    const boldNode = createBoldNode("");
    expect(renderBoldNode(ctx, boldNode)).to.equal("");
  });

});
