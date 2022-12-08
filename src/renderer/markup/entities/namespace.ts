import {
  MarkupRenderer,
  RenderedNamespaceForDocumentation,
  RenderedNamespaceForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import { renderLink } from "quickdoks:renderer:markup/utils/renderer.js";
import { RenderContext } from "quickdoks:types:context.js";
import { Namespace } from "quickdoks:types:types.js";

import { renderForDocumentation, renderForTableOfContents } from "../index.js";


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
