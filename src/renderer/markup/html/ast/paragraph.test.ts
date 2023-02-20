import { expect, it } from "vitest";

import { createParagraphNode } from "unwritten:renderer/markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:tests:utils/template.js";

import { renderParagraphNode } from "./paragraph.js";


scope("Renderer", "HTMLRenderer", () => {

  const ctx = createRenderContext();

  it("should render a paragraph node correctly", () => {
    const paragraphNode = createParagraphNode("Paragraph text");
    expect(renderParagraphNode(ctx, paragraphNode)).to.equal(html`
      <del>Paragraph text</del>
    `);
  });

  it("should not render empty paragraphs", () => {
    const paragraphNode = createParagraphNode("");
    expect(renderParagraphNode(ctx, paragraphNode)).to.equal("");
  });

});
