import { RenderContext } from "../../../types/context.js";
import { Namespace } from "../../../types/types.js";
import { renderForDocumentation, renderForTableOfContents } from "../index.js";
import {
  MarkupRenderer,
  RenderedNamespaceForDocumentation,
  RenderedNamespaceForTableOfContents
} from "../types/renderer.js";
import { renderLink } from "../utils/renderer.js";


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
