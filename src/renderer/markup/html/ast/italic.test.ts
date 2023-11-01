import { expect, it } from "vitest";

import { createItalicNode } from "unwritten:renderer:markup/utils/nodes";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { html } from "unwritten:utils/template";

import { renderItalicNode } from "./italic";


scope("HTMLRenderer", "ItalicNode", () => {

  const ctx = createRenderContext();

  it("should render a italic node correctly", () => {
    const italicNode = createItalicNode("Italic text");
    expect(renderItalicNode(ctx, italicNode)).toBe(html`
      <i>Italic text</i>
    `);
  });

  it("should not render empty italic nodes", () => {
    const italicNode = createItalicNode("");
    expect(renderItalicNode(ctx, italicNode)).toBe("");
  });

});
