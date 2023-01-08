import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";

import type { Instance } from "quickdoks:compiler:type-definitions/types.d.js";
import type { MarkupRenderer } from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderInstanceType(ctx: RenderContext<MarkupRenderer>, type: Instance) {
  const renderedAnchorLink = renderLink(ctx, type.name, type.id);
  return renderedAnchorLink;
}
