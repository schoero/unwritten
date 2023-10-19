import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes.js";

import type { CircularEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";


export function convertCircularEntityToAnchor(ctx: MarkupRenderContexts, circularEntity: CircularEntity, displayName?: string): AnchorNode {

  const name = circularEntity.name;
  const id = circularEntity.symbolId;

  return createAnchorNode(
    name,
    id,
    displayName
  );

}


export function convertCircularEntityForDocumentation(ctx: MarkupRenderContexts, circularEntity: CircularEntity): AnchorNode {
  return convertCircularEntityToAnchor(ctx, circularEntity);
}
