import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entities.js";
import { createSectionNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:utils/template.js";

import { renderSectionNode } from "./section.js";


scope("HTMLRenderer", "SectionNode", () => {

  const ctx = createRenderContext();

  it("should render a section node correctly", () => {
    const sectionNode = createSectionNode("Section content");
    expect(renderSectionNode(ctx, sectionNode)).to.equal(html`
      <section>Section content</section>
    `);
  });

  it("should not render empty sections", () => {
    const sectionNode = createSectionNode("");
    expect(renderSectionNode(ctx, sectionNode)).to.equal("");
  });

  it("should add the type as a class name", () => {
    const sectionNode = createSectionNode(EntityKind.Function, "Section content");
    expect(renderSectionNode(ctx, sectionNode)).to.equal(html`
      <section class="${EntityKind.Function}">Section content</section>
    `);
  });

});
