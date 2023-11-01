import { expect, it } from "vitest";

import { createSmallNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { html } from "unwritten:utils/template";

import { renderSmallNode } from "./small";


scope("HTMLRenderer", "SmallNode", () => {

  const ctx = createRenderContext();

  it("should render a small node correctly", () => {
    const smallNode = createSmallNode("Small text");
    expect(renderSmallNode(ctx, smallNode)).toBe(html`
      <small>Small text</small>
    `);
  });

  it("should not render empty small nodes", () => {
    const smallNode = createSmallNode("");
    expect(renderSmallNode(ctx, smallNode)).toBe("");
  });

});
