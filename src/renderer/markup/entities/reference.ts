import { RenderContext } from "../../../types/context.js";
import { TypeReference } from "../../../types/types.js";
import { MarkupRenderer } from "../types/renderer.js";
import { renderLink } from "../utils/renderer.js";


export function renderReference(ctx: RenderContext<MarkupRenderer>, reference: TypeReference) {
  const renderedAnchorLink = renderLink(ctx, reference.name, reference.id);
  return renderedAnchorLink;
}
