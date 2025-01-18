import { createInlineTitleNode, createParagraphNode } from "unwritten:renderer:markup/utils/nodes";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { registerAnchor, registerAnonymousAnchor } from "unwritten:renderer/markup/registry/registry";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";
import { expect, it } from "vitest";

import { renderInlineTitleNode } from "./inline-title";


scope("MarkdownRenderer", "InlineTitleNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should not render empty titles", () => {

    const title = "Title";
    const anchor = registerAnonymousAnchor(ctx, title);

    const titleNode = createInlineTitleNode(title, anchor);
    expect(renderInlineTitleNode(ctx, titleNode)).toBe("");

  });

  it("should render a single title correctly", () => {

    const title = "Title";
    const anchor = registerAnonymousAnchor(ctx, title);

    const titleNode = createInlineTitleNode(title, anchor, createParagraphNode("Paragraph"));

    expect(renderInlineTitleNode(ctx, titleNode)).toBe(md`
        
      *Title:*
        
      Paragraph  
    `);

  });

  it("should increase size for nested titles", () => {

    const title = "Title";
    const anchor = registerAnonymousAnchor(ctx, title);

    const subtitle = "Subtitle";
    const subtitleAnchor = registerAnonymousAnchor(ctx, subtitle);

    const titleNode = createInlineTitleNode(
      title,
      anchor,
      createInlineTitleNode(subtitle, subtitleAnchor, createParagraphNode("Paragraph"))
    );

    expect(renderInlineTitleNode(ctx, titleNode)).toBe(md`
        
      *Title:*
        
      *Subtitle:*
        
      Paragraph  
    `);

  });

  it("should not increase size for titles on the same level", () => {

    const title = "Title";
    const anchor = registerAnonymousAnchor(ctx, title);

    const subtitle = "Subtitle";
    const subtitleAnchor = registerAnonymousAnchor(ctx, subtitle);

    const anotherSubtitle = "Another Subtitle";
    const anotherSubtitleAnchor = registerAnonymousAnchor(ctx, anotherSubtitle);

    const titleNode = createInlineTitleNode(
      title,
      anchor,
      createInlineTitleNode(subtitle, subtitleAnchor, createParagraphNode("Paragraph")),
      createInlineTitleNode(anotherSubtitle, anotherSubtitleAnchor, createParagraphNode("Paragraph"))
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

    const title = "Title";
    const anchor = registerAnonymousAnchor(ctx, title);

    const titleNode = createInlineTitleNode(
      title,
      anchor,
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
