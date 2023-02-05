import { renderSignatureForTableOfContents, renderSignaturesForDocumentation } from "./signature.js";

import type { FunctionLikeEntities } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkupRenderContext,
  RenderedFunctionForDocumentation,
  RenderedFunctionForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";


export function renderFunctionEntityForTableOfContents(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntities): RenderedFunctionForTableOfContents {
  return functionLikeEntity.signatures.map(signature => renderSignatureForTableOfContents(ctx, signature));
}


export function renderFunctionEntityForDocumentation(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntities): RenderedFunctionForDocumentation {
  return renderSignaturesForDocumentation(ctx, functionLikeEntity.signatures);
}
