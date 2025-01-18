import { createBoldNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { html } from "unwritten:utils/template";
import { expect, it } from "vitest";

import { renderBoldNode } from "./bold";


scope("HTMLRenderer", "BoldNode", () => {

  const ctx = createRenderContext();

  it("should render a bold node correctly", () => {
    const boldNode = createBoldNode("Bold text");
    expect(renderBoldNode(ctx, boldNode)).toBe(html`
      <b>Bold text</b>
    `);
  });

  it("should not render empty bold nodes", () => {
    const boldNode = createBoldNode("");
    expect(renderBoldNode(ctx, boldNode)).toBe("");
  });

});
