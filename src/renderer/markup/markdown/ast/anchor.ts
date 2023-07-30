import { getAnchorLink } from "unwritten:renderer/markup/registry/registry.js";
import { renderLinkNode } from "unwritten:renderer:markdown/ast/link.js";
import { createLinkNode } from "unwritten:renderer:markup/utils/nodes.js";
import { assert } from "unwritten:utils/general.js";

import type { MarkdownRenderContext } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { AnchorNode } from "unwritten:renderer:markup/types-definitions/nodes.js";


export function renderAnchorNode(ctx: MarkdownRenderContext, anchorNode: AnchorNode): string {

  const anchorLink = getAnchorLink(ctx, anchorNode.name, anchorNode.id);
  assert(anchorLink !== undefined, `Anchor link for anchor node ${anchorNode.name} not found.`);

  return renderLinkNode(ctx, createLinkNode(anchorNode.name, anchorLink));

}
