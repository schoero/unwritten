import { RenderContext } from "../../../types/context.js";
import { PrimitiveType, PrimitiveTypeKinds } from "../../../types/types.js";
import { MarkupRenderer } from "../types/renderer.js";


export function renderPrimitiveType(ctx: RenderContext<MarkupRenderer>, type: PrimitiveType<PrimitiveTypeKinds>): string {
  const name = type.name ?? type.kind;
  if(type.kind in ctx.config.externalTypes){
    const link = ctx.config.externalTypes[type.kind]!;
    const renderedLink = ctx.renderer.renderHyperLink(name, link);
    return renderedLink;
  } else {
    return name;
  }
}
