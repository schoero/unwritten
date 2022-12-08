import {
  MarkupRenderer,
  RenderedPropertyForDocumentation,
  RenderedPropertyForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import { getRenderConfig } from "quickdoks:renderer:markup/utils/config.js";
import { encapsulate, renderLink, spaceBetween } from "quickdoks:renderer:markup/utils/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { Property } from "quickdoks:types:types.js";

import { renderType } from "./type.js";


export function renderPropertyForTableOfContents(ctx: RenderContext<MarkupRenderer>, property: Property): RenderedPropertyForTableOfContents {
  const link = renderLink(ctx, property.name, property.id);
  return link;
}


export function renderPropertyForDocumentation(ctx: RenderContext<MarkupRenderer>, property: Property): RenderedPropertyForDocumentation {

  const renderConfig = getRenderConfig(ctx);

  const description = property.description ? property.description : "";
  const name = encapsulate(property.name, renderConfig.propertyEncapsulation);
  const type = `${renderType(ctx, property.type)}`;
  const optional = property.optional === true ? encapsulate("optional", renderConfig.tagEncapsulation) : "";

  return `${name}: ${spaceBetween(type, description, optional)}`;

}
