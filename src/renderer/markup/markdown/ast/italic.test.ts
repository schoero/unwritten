import { createItalicNode } from "unwritten:renderer:markup/utils/nodes";
import { BuiltInRenderers } from "unwritten:renderer/enums/renderer";
import { createRenderContext } from "unwritten:tests:utils/context";
import { scope } from "unwritten:tests:utils/scope";
import { md } from "unwritten:utils/template";
import { expect, it } from "vitest";

import { renderItalicNode } from "./italic";


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
