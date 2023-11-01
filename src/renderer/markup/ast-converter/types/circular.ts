import { renderNode } from "unwritten:renderer/index";
import { createAnchorNode } from "unwritten:renderer/markup/utils/nodes";
import { encapsulate } from "unwritten:renderer/markup/utils/renderer";
import { getRenderConfig } from "unwritten:renderer/utils/config";

import type { CircularType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedCircularTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


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
