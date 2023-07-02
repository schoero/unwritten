import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { createParagraphNode, createSectionNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderSectionNode } from "./section.js";


scope("MarkdownRenderer", "SectionNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a section node correctly", () => {
    const sectionNode = createSectionNode(undefined, createParagraphNode("Section content"));
    expect(renderSectionNode(ctx, sectionNode)).toBe(md`
        
      Section content  
    `);
  });

  it("should not render empty sections", () => {
    const sectionNode = createSectionNode(undefined, "");
    expect(renderSectionNode(ctx, sectionNode)).toBe("");
  });

  it("should render the section separator if the nesting level is big enough", () => {
    const sectionNode = createSectionNode(undefined, createParagraphNode("Section content"));
    ctx.nesting = 3;
    const renderedSectionNode = renderSectionNode(ctx, sectionNode);
    expect(renderedSectionNode).toBe(md`
        
      ---
        
      Section content  
    `);
  });

  it("should be possible to disable the section separator", () => {
    const sectionNode = createSectionNode(undefined, createParagraphNode("Section content"));

    ctx.nesting = 3;
    ctx.config.renderConfig.md.sectionSeparator = false;

    const renderedSectionNode = renderSectionNode(ctx, sectionNode);
    expect(renderedSectionNode).toBe(md`
        
      Section content  
    `);
  });

  it("should be possible to change the section separator", () => {
    const sectionNode = createSectionNode(undefined, createParagraphNode("Section content"));

    ctx.nesting = 3;
    ctx.config.renderConfig.md.sectionSeparator = "___";

    const renderedSectionNode = renderSectionNode(ctx, sectionNode);
    expect(renderedSectionNode).toBe(md`
        
      ___
        
      Section content  
    `);
  });

});
