import { renderLink } from "unwritten:renderer:markup/utils/renderer.js";

import { renderForDocumentation, renderForTableOfContents } from "../../shared/index.js";

import type { Namespace } from "unwritten:compiler:type-definitions/types.d.js";
import type {
  MarkupRenderer,
  RenderedNamespaceForDocumentation,
  RenderedNamespaceForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


export function renderNamespaceForTableOfContents(ctx: RenderContext<MarkupRenderer>, namespaceType: Namespace): RenderedNamespaceForTableOfContents {

  const namespaceName = renderLink(ctx, namespaceType.name, namespaceType.id);
  const entities = renderForTableOfContents(ctx, namespaceType.exports);

  return [
    namespaceName,
    ...entities
  ];

}


export function renderNamespaceForDocumentation(ctx: RenderContext<MarkupRenderer>, namespaceType: Namespace): RenderedNamespaceForDocumentation {

  const title = namespaceType.name;
  const entities = renderForDocumentation(ctx, namespaceType.exports);

  return {
    [title]: entities
  };

}
