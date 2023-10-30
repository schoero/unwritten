import { expect, it } from "vitest";

import { createLinkNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { html } from "unwritten:utils/template";

import { renderLinkNode } from "./link";


scope("HTMLRenderer", "LinkNode", () => {

  const ctx = createRenderContext();

  it("should render a simple link correctly", () => {
    const linkNode = createLinkNode("Link name", "#anchor");
    expect(renderLinkNode(ctx, linkNode)).toBe(html`
      <a href="#anchor">Link name</a>
    `);
  });

});
