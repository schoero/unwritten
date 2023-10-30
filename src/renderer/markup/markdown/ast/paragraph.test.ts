import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { createParagraphNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";

import { renderParagraphNode } from "./paragraph";


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
