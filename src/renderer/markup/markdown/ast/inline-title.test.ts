import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { createInlineTitleNode, createParagraphNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderInlineTitleNode } from "./inline-title.js";


scope("MarkdownRenderer", "InlineTitleNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should not render empty titles", () => {
    const titleNode = createInlineTitleNode("Title");
    expect(renderInlineTitleNode(ctx, titleNode)).toBe("");
  });

  it("should render a single title correctly", () => {

    const titleNode = createInlineTitleNode("Title", createParagraphNode("Paragraph"));

    expect(renderInlineTitleNode(ctx, titleNode)).toBe(md`
        
      *Title:*
        
      Paragraph  
    `);

  });

  it("should increase size for nested titles", () => {

    const titleNode = createInlineTitleNode(
      "Title",
      createInlineTitleNode("SubTitle", createParagraphNode("Paragraph"))
    );

    expect(renderInlineTitleNode(ctx, titleNode)).toBe(md`
        
      *Title:*
        
      *SubTitle:*
        
      Paragraph  
    `);

  });

  it("should not increase size for titles on the same level", () => {

    const titleNode = createInlineTitleNode(
      "Title",
      createInlineTitleNode("Subtitle", createParagraphNode("Paragraph")),
      createInlineTitleNode("Another Subtitle", createParagraphNode("Paragraph"))
    );

    const renderedTitle = renderInlineTitleNode(ctx, titleNode);

    expect(renderedTitle).toBe(md`
        
      *Title:*
        
      *Subtitle:*
        
      Paragraph  
        
      *Another Subtitle:*
        
      Paragraph  
    `);

  });

  it("should filter out empty strings", () => {

    const titleNode = createInlineTitleNode(
      "Title",
      createParagraphNode("Paragraph"),
      "",
      createParagraphNode("Paragraph2")
    );

    expect(renderInlineTitleNode(ctx, titleNode)).toBe(md`
        
      *Title:*
        
      Paragraph  
      Paragraph2  
    `);

  });

  it("should not render an id", () => {

    const anchor = registerAnchor(ctx, "title", 0);
    const titleNode = createInlineTitleNode("Title", anchor, createParagraphNode("Paragraph"));

    expect(renderInlineTitleNode(ctx, titleNode)).toBe(md`
        
      *Title:*
        
      Paragraph  
    `);

  });

});
