import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import type { TypeReferenceType } from "unwritten:compiler/type-definitions/types.js";
import type { MarkupRenderer } from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


export function renderReference(ctx: RenderContext<MarkupRenderer>, reference: TypeReferenceType) {
  const renderedAnchorLink = renderLink(ctx, reference.name, reference.id);
  return renderedAnchorLink;
}
