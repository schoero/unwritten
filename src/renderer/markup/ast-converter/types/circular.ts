import { createAnchorNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { CircularType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedCircularTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertCircularTypeInline(ctx: MarkupRenderContexts, circularType: CircularType): ConvertedCircularTypeInline {

  const name = circularType.name ?? "";

  if(circularType.symbolId){

    const anchor = circularType.symbolId
      ? createAnchorNode(name, circularType.symbolId)
      : undefined;

    return anchor ?? name;

  }

  return name;

}
