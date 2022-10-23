
import { RenderContext } from "../../../types/context.js";
import { Property } from "../../../types/types.js";
import {
  MarkupRenderer,
  RenderedPropertyForDocumentation,
  RenderedPropertyForTableOfContents
} from "../types/renderer.js";
import { getRenderConfig } from "../utils/config.js";
import { encapsulate, renderLink, spaceBetween } from "../utils/renderer.js";
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