import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { createItalicNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderItalicNode } from "./italic.js";


scope("MarkdownRenderer", "ItalicNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a italic node correctly", () => {
    const italicNode = createItalicNode("Italic text");
    expect(renderItalicNode(ctx, italicNode)).toBe(md`
      *Italic text*
    `);
  });

  it("should not render empty italic nodes", () => {
    const italicNode = createItalicNode("");
    expect(renderItalicNode(ctx, italicNode)).toBe("");
  });

});
