import { expect, it } from "vitest";

import { createListNode } from "unwritten:renderer:markup/utils/nodes";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";

import { renderListNode } from "./list";


scope("MarkdownRenderer", "ListNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render empty lines around a list", () => {
    const listNode = createListNode(
      "Item 1"
    );
    expect(renderListNode(ctx, listNode)).toBe(md`
        
      - Item 1
        
    `);
  });

  it("should not render empty lists", () => {
    const listNode = createListNode(
      ""
    );
    expect(renderListNode(ctx, listNode)).toBe("");
  });

  it("should not render empty list items", () => {
    const listNode = createListNode(
      "Item 1",
      "",
      "Item 3"
    );
    expect(renderListNode(ctx, listNode)).toBe(md`
        
      - Item 1
      - Item 3
        
    `);
  });

  it("should render directly nested lists on a new line", () => {
    const listNode = createListNode(
      "Item 1",
      createListNode(
        "Item 2"
      )
    );
    expect(renderListNode(ctx, listNode)).toBe(md`
        
      - Item 1
        - Item 2
        
    `);
  });

  it("should not render lists containing only empty elements", () => {
    const listNode = createListNode(
      "Item 1",
      createListNode(
        "",
        "",
        createListNode(
          "",
          ""
        )
      )
    );
    expect(renderListNode(ctx, listNode)).toBe(md`
        
      - Item 1
        
    `);
  });

  it("should render arrays in a single element", () => {
    const listNode = createListNode(
      [
        "Item",
        " ",
        "1"
      ]
    );
    expect(renderListNode(ctx, listNode)).toBe(md`
        
      - Item 1
        
    `);
  });

  it("should render lists in an array on a new line", () => {
    const listNode = createListNode(
      [
        "Item",
        " ",
        "1",
        createListNode(
          "Item 2"
        )
      ]
    );
    expect(renderListNode(ctx, listNode)).toBe(md`
        
      - Item 1
        
        - Item 2
        
    `);
  });

  it("should collapse nested lists without siblings", () => {
    const listNode = createListNode(
      "Item 1",
      createListNode(
        createListNode(
          createListNode(
            "Item 2"
          )
        )
      )
    );
    expect(renderListNode(ctx, listNode)).toBe(md`
        
      - Item 1
        - Item 2
        
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
    expect(renderListNode(ctx, listNode)).toBe(md`
        
      - Item 1
        - Item 2
        - Item 3
        
    `);
  });

  it("should render nested arrays correctly", () => {
    const listNode = createListNode([
      ["Item"],
      [[" "]],
      [[["1"]]]
    ]);
    expect(renderListNode(ctx, listNode)).toBe(md`
        
      - Item 1
        
    `);
  });

  it("should render nested arrays with lists correctly", () => {
    const listNode = createListNode([
      ["Item"],
      [[" "]],
      [[["1"]]],
      [[[[
        createListNode(
          "Item 2"
        )
      ]]]]
    ]);
    expect(renderListNode(ctx, listNode)).toBe(md`
        
      - Item 1
        
        - Item 2
        
    `);
  });

  it("should indent additional lines in a list", () => {

    const simpleListNode = createListNode([
      "Line 1\nLine 2"
    ]);
    expect(renderListNode(ctx, simpleListNode)).toBe(md`
        
      - Line 1
        Line 2
        
    `);

  });

  it("should collapse multiple empty lines to a single empty line", () => {

    const simpleListNode = createListNode([
      "Line 1\nLine 2\n\nLine 3\n\n\nLine 4\n\n\n\nLine 5"
    ]);
    expect(renderListNode(ctx, simpleListNode)).toBe(md`
        
      - Line 1
        Line 2
        
        Line 3
        
        Line 4
        
        Line 5
        
    `);
  });

});
