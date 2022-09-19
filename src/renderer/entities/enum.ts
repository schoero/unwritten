import { renderLink } from "src/utils/renderer.js";
import { EnumEntity } from "types/entities.js";

import { RenderedEnumForDocumentation, RenderedEnumForTableOfContents } from "../../types/renderer.js";


export function renderEnumEntityForTableOfContents(enumEntity: EnumEntity): RenderedEnumForTableOfContents {
  const link = renderLink(enumEntity.name, enumEntity.id);
  return link;
}


export function renderEnumEntityForDocumentation(enumEntity: EnumEntity): RenderedEnumForDocumentation {

  const enumName = enumEntity.name;
  const description = enumEntity.description;
  const members = enumEntity.members.map(member => member.name);

  return {
    [enumName]: [
      description,
      [members]
    ]
  };

}