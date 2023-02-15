import { createContainerNode } from "unwritten:renderer/markup/utils/nodes.js";

import { renderSignatureForDocumentation, renderSignatureForTableOfContents } from "./signature.js";

import type { FunctionLikeEntities } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  RenderedFunctionEntityForDocumentation,
  RenderedFunctionEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function renderFunctionEntityForTableOfContents(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntities): RenderedFunctionEntityForTableOfContents {
  return createContainerNode(
    ...functionLikeEntity.signatures.map(signature => renderSignatureForTableOfContents(ctx, signature))
  );
}


export function renderFunctionEntityForDocumentation(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntities): RenderedFunctionEntityForDocumentation {
  return createContainerNode(
    ...functionLikeEntity.signatures.map(signature => renderSignatureForDocumentation(ctx, signature))
  );
}
