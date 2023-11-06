import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { createSectionNode, createTitleNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";

import { renderSectionNode } from "./section";


scope("MarkdownRenderer", "SectionNode", () => {

  it("should not render empty sections", () => {
    const ctx = createRenderContext(BuiltInRenderers.Markdown);
    const sectionNode = createSectionNode(undefined, "");
    expect(renderSectionNode(ctx, sectionNode)).toBe("");
  });

  it("should render the separator before the section", () => {

    const sectionNode = createSectionNode(undefined, "Section content");

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const renderedSectionNode = renderSectionNode(ctx, sectionNode);
    expect(renderedSectionNode).toBe(md`
        
      ---
        
      Section content
    `);

  });

  it("should be possible to disable the section separator", () => {

    const sectionNode = createSectionNode(undefined, "Section content");

    const ctx = createRenderContext(BuiltInRenderers.Markdown);
    ctx.config.renderConfig[BuiltInRenderers.Markdown].sectionSeparator = false;

    const renderedSectionNode = renderSectionNode(ctx, sectionNode);
    expect(renderedSectionNode).toBe(md`
      Section content
    `);

  });

  it("should be possible to change the section separator", () => {

    const sectionNode = createSectionNode(undefined, "Section content");

    const ctx = createRenderContext(BuiltInRenderers.Markdown);
    ctx.nesting = 3;
    ctx.config.renderConfig[BuiltInRenderers.Markdown].sectionSeparator = "===";

    const renderedSectionNode = renderSectionNode(ctx, sectionNode);
    expect(renderedSectionNode).toBe(md`
        
      ===
        
      Section content
    `);

  });

  it("should not render the separator for directly nested sections", () => {

    const sectionNode = createSectionNode(
      undefined,
      createSectionNode(undefined, "Nested content"),
      createSectionNode(undefined, "Second Nested content")
    );

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const renderedSectionNode = renderSectionNode(ctx, sectionNode);
    expect(renderedSectionNode).toBe(md`
        
      ---
        
      Nested content
        
      ---
        
      Second Nested content
    `);

  });

  it("should remove the separator of the first directly nested section in a title", () => {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const sectionNode = createSectionNode(
      undefined,
      createTitleNode(
        "title",
        registerAnchor(ctx, "title", 1),
        createSectionNode(
          undefined,
          "Nested content"
        ),
        createSectionNode(
          undefined,
          "Second Nested content"
        )
      )

    );

    const renderedSectionNode = renderSectionNode(ctx, sectionNode);
    expect(renderedSectionNode).toBe(md`
        
      ---
        
      # title
        
      Nested content
        
      ---
        
      Second Nested content
    `);

  });

});
