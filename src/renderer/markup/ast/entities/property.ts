import { renderType } from "unwritten:renderer:markup/entry-points/types.js";
import { getRenderConfig } from "unwritten:renderer:markup/utils/config.js";
import { encapsulate, renderLink, spaceBetween } from "unwritten:renderer:markup/utils/renderer.js";

import type { Property } from "unwritten:compiler:type-definitions/types.d.js";
import type {
  RenderedPropertyForDocumentation,
  RenderedPropertyForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";


export function renderPropertyForTableOfContents(ctx: MarkupRenderContext, property: Property): RenderedPropertyForTableOfContents {
  const link = renderLink(ctx, property.name, property.id);
  return link;
}


export function renderPropertyForDocumentation(ctx: MarkupRenderContext, property: Property): RenderedPropertyForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = property.description ? property.description : "";
  const name = encapsulate(property.name, renderConfig.propertyEncapsulation);
  const type = `${renderType(ctx, property.type)}`;
  const optional = property.optional === true ? encapsulate("optional", renderConfig.tagEncapsulation) : "";

  return `${name}: ${spaceBetween(type, description, optional)}`;

}
