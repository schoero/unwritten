import { NamespaceEntity } from "../../types/entities.js";
import { renderLink } from "../../utils/renderer.js";
import { renderEntitiesForDocumentation, renderEntitiesForTableOfContents } from "../..renderer/index.js";
import { RenderedNamespaceForDocumentation, RenderedNamespaceForTableOfContents } from "../..src/types/renderer.js";


export function renderNamespaceEntityForTableOfContents(entity: NamespaceEntity): RenderedNamespaceForTableOfContents {

  const namespaceName = renderLink(entity.name, entity.id);
  const entities = renderEntitiesForTableOfContents(entity.entities);

  return [
    namespaceName,
    ...entities
  ];

}


export function renderNamespaceEntityForDocumentation(entity: NamespaceEntity): RenderedNamespaceForDocumentation {

  const title = entity.name;
  const entities = renderEntitiesForDocumentation(entity.entities);

  return {
    [title]: entities
  };

}
