import { config } from "renderer/config/index.js";
import { RenderedPropertyForDocumentation, RenderedPropertyForTableOfContents } from "src/types/renderer.js";
import { encapsulate, renderLink, spaceBetween } from "src/utils/renderer.js";
import { PropertyEntity } from "types/entities.js";
import { renderType } from "./type.js";


export function renderPropertyEntityForTableOfContents(propertyEntity: PropertyEntity): RenderedPropertyForTableOfContents {
  const link = renderLink(propertyEntity.name, propertyEntity.id);
  return link;
}


export function renderPropertyEntityForDocumentation(propertyEntity: PropertyEntity): RenderedPropertyForDocumentation {

  const description = propertyEntity.description ? propertyEntity.description : "";
  const name = encapsulate(propertyEntity.name, config.renderConfig.propertyEncapsulation);
  const type = `${renderType(propertyEntity.type)}`;
  const optional = propertyEntity.optional === true ? encapsulate("optional", config.renderConfig.tagEncapsulation) : "";

  return `${name}: ${spaceBetween(type, description, optional)}`;

}