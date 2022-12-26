import { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";

import { RenderContext } from "quickdoks:type-definitions/context.d.js";
import { TypeReference } from "quickdoks:type-definitions/types.d.js";


export function renderReference(ctx: RenderContext<MarkupRenderer>, reference: TypeReference) {
  const renderedAnchorLink = renderLink(ctx, reference.name, reference.id);
  return renderedAnchorLink;
}
