import { RenderContext } from "../../../types/context.js";
import { Instance } from "../../../types/types.js";
import { MarkupRenderer } from "../types/renderer.js";
import { renderLink } from "../utils/renderer.js";


export function renderInstanceType(ctx: RenderContext<MarkupRenderer>, type: Instance) {
  const renderedAnchorLink = renderLink(ctx, type.name, type.id);
  return renderedAnchorLink;
}
