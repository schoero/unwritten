import { expect, it } from "vitest";

import { createParagraphNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { html } from "unwritten:utils/template";

import { renderParagraphNode } from "./paragraph";


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

});
