import { expect, it } from "vitest";

import { createLinkNode } from "unwritten:renderer/markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import { renderLinkNode } from "./link.js";


scope("Renderer", "HTMLRenderer", () => {

  const ctx = createRenderContext();

  it("should render a simple link correctly", () => {
    const linkNode = createLinkNode("Link name", "#anchor");
    expect(renderLinkNode(ctx, linkNode)).to.equal(html`
      <a href="#anchor">Link name</a>
    `);
  });

});
