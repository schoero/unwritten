import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import { renderForDocumentation, renderForTableOfContents } from "../../index.js";

import type { NamespaceEntity } from "unwritten:compiler/type-definitions/entities.js";
import type {
  MarkupRenderContext,
  RenderedNamespaceForDocumentation,
  RenderedNamespaceForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";


export function renderNamespaceForTableOfContents(ctx: MarkupRenderContext, namespaceEntity: NamespaceEntity): RenderedNamespaceForTableOfContents {

  const namespaceName = renderLink(ctx, namespaceEntity.name, namespaceEntity.id);
  const entities = renderForTableOfContents(ctx, namespaceEntity.exports);

  return [
    namespaceName,
    ...entities
  ];

}


export function renderNamespaceForDocumentation(ctx: MarkupRenderContext, namespaceType: Namespace): RenderedNamespaceForDocumentation {

  const title = namespaceType.name;
  const entities = renderForDocumentation(ctx, namespaceType.exports);

  return {
    [title]: entities
  };

}
