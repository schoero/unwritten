import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import type { TypeReferenceType } from "unwritten:compiler:type-definitions/types.js";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types/renderer.js";


export function renderReference(ctx: MarkupRenderContext, reference: TypeReferenceType) {
  const renderedAnchorLink = renderLink(ctx, reference.name, reference.id);
  return renderedAnchorLink;
}
