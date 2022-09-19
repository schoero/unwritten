import { RenderedTypeAliasForDocumentation, RenderedTypeAliasForTableOfContents } from "src/types/renderer.js";
import { renderLink } from "src/utils/renderer.js";
import { TypeAliasEntity } from "types/entities.js";

import { renderType } from "./type.js";


export function renderTypeAliasEntityForTableOfContents(typeAliasEntity: TypeAliasEntity): RenderedTypeAliasForTableOfContents {
  const link = renderLink(typeAliasEntity.name, typeAliasEntity.id);
  return link;
}


export function renderTypeAliasEntityForDocumentation(typeAliasEntity: TypeAliasEntity): RenderedTypeAliasForDocumentation {

  const typeAliasName = typeAliasEntity.name;
  const type = renderType(typeAliasEntity.type);
  const description = typeAliasEntity.description;

  return {
    [typeAliasName]: [
      description,
      type
    ]
  };

}