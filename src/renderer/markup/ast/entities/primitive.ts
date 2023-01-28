import type { PrimitiveType, PrimitiveTypeKinds } from "quickdoks:compiler:type-definitions/types.d.js";
import type { MarkupRenderer, RenderedPrimitiveType } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


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
