import { renderLinkNode } from "unwritten:renderer/markup/html/ast/link";
import { getAnchorLink } from "unwritten:renderer/markup/registry/registry";
import { createLinkNode } from "unwritten:renderer/markup/utils/nodes";

import type { HTMLRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type { AnchorNode } from "unwritten:renderer:markup/types-definitions/nodes";


export function renderAnchorNode(ctx: HTMLRenderContext, anchorNode: AnchorNode): string {

  const anchorLink = getAnchorLink(ctx, anchorNode.id);

  if(!anchorLink){
    throw new Error(`No anchor link and no fallback found for anchor node ${anchorNode.name} with id ${anchorNode.id}`);
  }

  return renderLinkNode(ctx, createLinkNode(anchorNode.displayName, anchorLink));

}
