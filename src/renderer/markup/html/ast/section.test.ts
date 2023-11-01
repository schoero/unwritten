import { expect, it } from "vitest";

import { EntityKind } from "unwritten:interpreter/enums/entity";
import { SECTION_TYPE } from "unwritten:renderer:markup/types-definitions/sections";
import { createParagraphNode, createSectionNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { html } from "unwritten:utils/template";

import { renderSectionNode } from "./section";


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
