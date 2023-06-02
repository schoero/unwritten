import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { SECTION_TYPE } from "unwritten:renderer/markup/enums/sections.js";
import { createParagraphNode, createSectionNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:utils/template.js";

import { renderSectionNode } from "./section.js";


scope("HTMLRenderer", "SectionNode", () => {

  const ctx = createRenderContext();

  it("should render a section node correctly", () => {
    const sectionNode = createSectionNode(undefined, createParagraphNode("Section content"));
    expect(renderSectionNode(ctx, sectionNode)).toBe(html`
      <section>
        <p>Section content</p>
      </section>
    `);
  });

  it("should not render empty sections", () => {
    const sectionNode = createSectionNode(undefined, "");
    expect(renderSectionNode(ctx, sectionNode)).toBe("");
  });

  it("should add the type as a class name", () => {
    const sectionNode = createSectionNode(SECTION_TYPE[EntityKind.Function], createParagraphNode("Section content"));
    expect(renderSectionNode(ctx, sectionNode)).toBe(html`
      <section class="${SECTION_TYPE[EntityKind.Function]}">
        <p>Section content</p>
      </section>
    `);
  });

});
