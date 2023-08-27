import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { createParagraphNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderParagraphNode } from "./paragraph.js";


scope("MarkdownRenderer", "ParagraphNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a paragraph node correctly", () => {
    const paragraphNode = createParagraphNode("Paragraph text");
    expect(renderParagraphNode(ctx, paragraphNode)).toBe(md`
      Paragraph text  
    `);
  });

  it("should not render empty paragraphs", () => {
    const paragraphNode = createParagraphNode("");
    expect(renderParagraphNode(ctx, paragraphNode)).toBe("");
  });

});
