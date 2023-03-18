import { expect, it } from "vitest";

import { createContainerNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import { renderContainerNode } from "./container.js";


scope("MarkupRenderer", "ContainerNode", () => {

  const ctx = createRenderContext();

  it("should render containers", () => {
    const containerNode = createContainerNode(
      "Node 1",
      "Node 2"
    );
    expect(renderContainerNode(ctx, containerNode)).to.equal(html`
      Node 1
      Node 2
    `);
  });

});
