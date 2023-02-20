import { expect, it } from "vitest";

import { createListNode } from "unwritten:renderer/markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import { renderListNode } from "./list.js";


scope("Renderer", "HTMLRenderer", () => {

  const ctx = createRenderContext();

  it("should render a simple list correctly", () => {
    const listNode = createListNode(
      "Item 1",
      "Item 2"
    );
    expect(renderListNode(ctx, listNode)).to.equal(html`
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    `);
  });

  it("should render nested lists correctly", () => {
    const listNode = createListNode(
      "Item 1",
      createListNode(
        "Item 2",
        "Item 3"
      )
    );
    expect(renderListNode(ctx, listNode)).to.equal(html`
      <ul>
        <li>Item 1
          <ul>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </li>
      </ul>
    `);
  });

});
