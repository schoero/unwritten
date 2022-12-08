import { MarkupRenderer, RenderedPrimitiveType } from "quickdoks:renderer:markup/types/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { PrimitiveType, PrimitiveTypeKinds } from "quickdoks:types:types.js";


export function renderPrimitiveType(ctx: RenderContext<MarkupRenderer>, type: PrimitiveType<PrimitiveTypeKinds>): RenderedPrimitiveType {
  const name = type.name ?? type.kind;
  if(type.kind in ctx.config.externalTypes){
    const link = ctx.config.externalTypes[type.kind]!;
    const renderedLink = ctx.renderer.renderHyperLink(name, link);
    return renderedLink;
  } else {
    return name;
  }
}
