import { expect, it } from "vitest";

import { createItalicNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { html } from "unwritten:utils/template.js";

import { renderItalicNode } from "./italic.js";


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
