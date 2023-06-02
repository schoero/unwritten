import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { registerAnchor } from "unwritten:renderer/markup/utils/linker.js";
import { createParagraphNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderTitleNode } from "./title.js";


scope("MarkdownRenderer", "TitleNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should not render empty titles", () => {
    const titleNode = createTitleNode("Title");
    expect(renderTitleNode(ctx, titleNode)).toBe("");
  });

  it("should render a single title correctly", () => {

    const titleNode = createTitleNode("Title", createParagraphNode("Paragraph"));

    expect(renderTitleNode(ctx, titleNode)).toBe(md`
        
      # Title
        
      Paragraph
    `);

  });

  it("should increase size for nested titles", () => {

    const titleNode = createTitleNode(
      "Title",
      createTitleNode("SubTitle", createParagraphNode("Paragraph"))
    );

    expect(renderTitleNode(ctx, titleNode)).toBe(md`
        
      # Title
        
      ## SubTitle
        
      Paragraph
    `);

  });

  it("should not increase size for titles on the same level", () => {

    const titleNode = createTitleNode(
      "Title",
      createTitleNode("Subtitle", createParagraphNode("Paragraph")),
      createTitleNode("Another Subtitle", createParagraphNode("Paragraph"))
    );

    const renderedTitle = renderTitleNode(ctx, titleNode);

    expect(renderedTitle).toBe(md`
        
      # Title
        
      ## Subtitle
        
      Paragraph
        
      ## Another Subtitle
        
      Paragraph
    `);

  });

  it("should filter out empty strings", () => {

    const titleNode = createTitleNode(
      "Title",
      createParagraphNode("Paragraph"),
      "",
      createParagraphNode("Paragraph2")
    );

    expect(renderTitleNode(ctx, titleNode)).toBe(md`
        
      # Title
        
      Paragraph
      Paragraph2
    `);

  });

  it("should not render an id", () => {

    const anchor = registerAnchor(ctx, "title", 0);
    const titleNode = createTitleNode("Title", anchor, createParagraphNode("Paragraph"));

    expect(renderTitleNode(ctx, titleNode)).toBe(md`
        
      # Title
        
      Paragraph
    `);

  });

});
