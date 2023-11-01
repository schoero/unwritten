import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { createSectionNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";

import { renderSectionNode } from "./section";


scope("MarkdownRenderer", "SectionNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should not render empty sections", () => {
    const sectionNode = createSectionNode(undefined, "");
    expect(renderSectionNode(ctx, sectionNode)).toBe("");
  });

  it("should render the section separator if the nesting level is big enough", () => {
    const sectionNode = createSectionNode(undefined, "Section content");
    ctx.nesting = 3;
    const renderedSectionNode = renderSectionNode(ctx, sectionNode);
    expect(renderedSectionNode).toBe(md`
        
      ---
        
      Section content
    `);
  });

  it("should be possible to disable the section separator", () => {
    const sectionNode = createSectionNode(undefined, "Section content");

    ctx.nesting = 3;
    ctx.config.renderConfig[BuiltInRenderers.Markdown].sectionSeparator = false;

    const renderedSectionNode = renderSectionNode(ctx, sectionNode);
    expect(renderedSectionNode).toBe(md`
      Section content
    `);
  });

  it("should be possible to change the section separator", () => {
    const sectionNode = createSectionNode(undefined, "Section content");

    ctx.nesting = 3;
    ctx.config.renderConfig[BuiltInRenderers.Markdown].sectionSeparator = "___";

    const renderedSectionNode = renderSectionNode(ctx, sectionNode);
    expect(renderedSectionNode).toBe(md`
        
      ___
        
      Section content
    `);
  });

});
