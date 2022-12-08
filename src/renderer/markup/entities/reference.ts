import { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { TypeReference } from "quickdoks:types:types.js";


export function renderReference(ctx: RenderContext<MarkupRenderer>, reference: TypeReference) {
  const renderedAnchorLink = renderLink(ctx, reference.name, reference.id);
  return renderedAnchorLink;
}
