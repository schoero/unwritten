import { createAnchorNode } from "unwritten:renderer:markup/utils/nodes";

import type { CircularEntity } from "unwritten:interpreter:type-definitions/entities";
import type { AnchorNode } from "unwritten:renderer/markup/types-definitions/nodes";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";


export function convertCircularEntityToAnchor(ctx: MarkupRenderContext, circularEntity: CircularEntity, displayName?: string): AnchorNode {

  const name = circularEntity.name;
  const id = circularEntity.symbolId;

  return createAnchorNode(
    name,
    id,
    displayName
  );

}


export function convertCircularEntityForDocumentation(ctx: MarkupRenderContext, circularEntity: CircularEntity): AnchorNode {
  return convertCircularEntityToAnchor(ctx, circularEntity);
}
