import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";

import type { TypeReference } from "quickdoks:compiler:type-definitions/types.d.js";
import type { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderReference(ctx: RenderContext<MarkupRenderer>, reference: TypeReference) {
  const renderedAnchorLink = renderLink(ctx, reference.name, reference.id);
  return renderedAnchorLink;
}
