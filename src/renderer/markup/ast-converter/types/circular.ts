import { renderNode } from "unwritten:renderer/index.js";
import { createAnchorNode } from "unwritten:renderer/markup/utils/nodes.js";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer.js";
import { getRenderConfig } from "unwritten:renderer/utils/config.js";

import type { CircularType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedCircularTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertCircularTypeInline(ctx: MarkupRenderContexts, circularType: CircularType): ConvertedCircularTypeInline {

  const renderConfig = getRenderConfig(ctx);

  const name = circularType.name ?? "";
  const renderedName = encapsulate(name, renderConfig.typeEncapsulation);
  const renderedEncapsulatedName = renderNode(ctx, renderedName);

  if(circularType.symbolId){

    const anchor = circularType.symbolId && createAnchorNode(name, circularType.symbolId, renderedEncapsulatedName);

    if(anchor){
      return anchor;
    }

  }

  return renderedEncapsulatedName;

}
