import { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { Instance } from "quickdoks:types:types.js";


export function renderInstanceType(ctx: RenderContext<MarkupRenderer>, type: Instance) {
  const renderedAnchorLink = renderLink(ctx, type.name, type.id);
  return renderedAnchorLink;
}
