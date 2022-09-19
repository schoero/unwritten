import { RenderedInterfaceForDocumentation, RenderedInterfaceForTableOfContents } from "src/types/renderer.js";
import { renderLink } from "src/utils/renderer.js";
import { InterfaceEntity } from "types/entities.js";

import { renderPropertyEntityForDocumentation } from "./property.js";


export function renderInterfaceEntityForTableOfContents(interfaceEntity: InterfaceEntity): RenderedInterfaceForTableOfContents {
  const link = renderLink(interfaceEntity.name, interfaceEntity.id);
  return link;
}


export function renderInterfaceEntityForDocumentation(interfaceEntity: InterfaceEntity): RenderedInterfaceForDocumentation {

  const interfaceName = interfaceEntity.name;
  const description = interfaceEntity.description;
  const members = interfaceEntity.members?.map(member => renderPropertyEntityForDocumentation(member));


  return {
    [interfaceName]: [
      description,
      [members]
    ]
  };

}