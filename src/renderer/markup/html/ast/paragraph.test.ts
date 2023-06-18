import { expect, it } from "vitest";

import { renderNode } from "unwritten:renderer/index.js";
import { createParagraphNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:utils/template.js";

import { renderParagraphNode } from "./paragraph.js";


scope("HTMLRenderer", "ParagraphNode", () => {

  const ctx = createRenderContext();

  it("should render a paragraph node correctly", () => {
    const paragraphNode = createParagraphNode("Paragraph text");
    expect(renderParagraphNode(ctx, paragraphNode)).toBe(html`
      <p>Paragraph text</p>
    `);
  });

  it("should not render empty paragraphs", () => {
    const paragraphNode = createParagraphNode("");
    expect(renderParagraphNode(ctx, paragraphNode)).toBe("");
  });

  it("should render paragraph nodes in an array on new lines", () => {
    const paragraphNodeArray = [
      createParagraphNode(
        "Paragraph 1"
      ),
      createParagraphNode(
        "Paragraph 2"
      )
    ];
    expect(renderNode(ctx, paragraphNodeArray)).toBe(html`
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
    `);
  });

});
