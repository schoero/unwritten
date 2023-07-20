import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { registerAnchor } from "unwritten:renderer/markup/source-registry/link-registry.js";
import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderAnchorNode } from "./anchor.js";


scope("MarkdownRenderer", "AnchorNode", () => {

  const ctx = createRenderContext(BuiltInRenderers.Markdown);

  it("should render a anchor node correctly", () => {
    const anchor = registerAnchor(ctx, "AnchorText", [1]);
    const anchorNode = createAnchorNode(anchor.name, anchor.ids[0]);
    expect(renderAnchorNode(ctx, anchorNode)).toBe(md`
      [AnchorText](#anchortext)
    `);
  });

  it("should render multiple anchor nodes with the same name correctly", () => {
    const anchor = registerAnchor(ctx, "AnchorText", [2]);
    const anchorNode = createAnchorNode(anchor.name, anchor.ids[0]);
    expect(renderAnchorNode(ctx, anchorNode)).toBe(md`
      [AnchorText](#anchortext-1)
    `);
  });

});
