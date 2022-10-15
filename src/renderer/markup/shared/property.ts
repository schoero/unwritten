
import { RenderContext } from "../../../types/context.js";
import { Property } from "../../../types/types.js";
import {
  MarkupRenderer,
  RenderedPropertyForDocumentation,
  RenderedPropertyForTableOfContents
} from "../types/renderer.js";
import { encapsulate, renderLink } from "../utils/renderer.js";
import { renderType } from "./type.js";


export function renderPropertyEntityForTableOfContents(ctx: RenderContext<MarkupRenderer>, propertyEntity: Property): RenderedPropertyForTableOfContents {
  const link = renderLink(propertyEntity.name, propertyEntity.id);
  return link;
}


export function renderPropertyEntityForDocumentation(ctx: RenderContext<MarkupRenderer>, propertyEntity: Property): RenderedPropertyForDocumentation {

  const description = propertyEntity.description ? propertyEntity.description : "";
  const name = encapsulate(propertyEntity.name, config.renderConfig.propertyEncapsulation);
  const type = `${renderType(propertyEntity.type)}`;
  const optional = propertyEntity.optional === true ? encapsulate("optional", config.renderConfig.tagEncapsulation) : "";

  return `${name}: ${spaceBetween(type, description, optional)}`;

}