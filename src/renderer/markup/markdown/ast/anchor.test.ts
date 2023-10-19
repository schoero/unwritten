import { expect, it } from "vitest";

import { BuiltInRenderers } from "unwritten:renderer/enums/renderer.js";
import { registerAnchor } from "unwritten:renderer/markup/registry/registry.js";
import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";
import { createRenderContext } from "unwritten:tests:utils/context.js";
import { scope } from "unwritten:tests:utils/scope.js";
import { md } from "unwritten:utils/template.js";

import { renderAnchorNode } from "./anchor.js";


scope("MarkdownRenderer", "AnchorNode", () => {

  it("should render a anchor node correctly", () => {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const anchor = registerAnchor(ctx, "AnchorText", 1);
    const anchorNode = createAnchorNode(anchor.name, anchor.ids);

    expect(renderAnchorNode(ctx, anchorNode)).toBe(md`
      [AnchorText](#anchortext)
    `);

  });

  it("should render multiple anchor nodes with the same name correctly", () => {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const anchor1 = registerAnchor(ctx, "AnchorText", 1);
    const anchor2 = registerAnchor(ctx, "AnchorText", 2);
    const anchorNode = createAnchorNode(anchor2.name, anchor2.ids);

    expect(renderAnchorNode(ctx, anchorNode)).toBe(md`
      [AnchorText](#anchortext-1)
    `);

  });

  it("should render the displayName if available", () => {

    const ctx = createRenderContext(BuiltInRenderers.Markdown);

    const anchor = registerAnchor(ctx, "AnchorText", 1);
    const anchorNode = createAnchorNode(anchor.name, anchor.ids, "AnchorDisplayName");

    expect(renderAnchorNode(ctx, anchorNode)).toBe(md`
      [AnchorDisplayName](#anchortext)
    `);

  });

});
