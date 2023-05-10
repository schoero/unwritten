import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { createListNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderListNode } from "./list.js";


scope("MarkdownRenderer", "ListNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a simple list correctly", () => {
    const listNode = createListNode(
      "Item 1",
      "Item 2"
    );
    expect(renderListNode(ctx, listNode)).to.equal(md`
      - Item 1
      - Item 2
    `);
  });

  it("should not render empty list items", () => {
    const listNode = createListNode(
      "Item 1",
      "",
      "Item 3"
    );
    expect(renderListNode(ctx, listNode)).to.equal(md`
      - Item 1
      - Item 3
    `);
  });

  it("should not render empty lists", () => {
    const listNode = createListNode(
      ""
    );
    expect(renderListNode(ctx, listNode)).to.equal("");
  });

  it("should render nested lists correctly", () => {
    const listNode = createListNode(
      "Item 1",
      createListNode(
        "Item 2",
        "Item 3"
      )
    );
    expect(renderListNode(ctx, listNode)).to.equal(md`
      - Item 1
        - Item 2
        - Item 3
    `);
  });

  it("should render deeply nested lists correctly", () => {
    const listNode = createListNode([
      "Item",
      " ",
      "1",
      [
        createListNode(
          "Item 2",
          "Item 3"
        )
      ]
    ]);
    expect(renderListNode(ctx, listNode)).to.equal(md`
      - Item 1
        - Item 2
        - Item 3
    `);
  });

});
