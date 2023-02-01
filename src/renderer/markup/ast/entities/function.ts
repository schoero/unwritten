import { renderSignatureForTableOfContents, renderSignaturesForDocumentation } from "./signature.js";

import type { FunctionLikeEntities } from "unwritten:compiler:type-definitions/entities.js";
import type {
  MarkupRenderContext,
  RenderedFunctionForDocumentation,
  RenderedFunctionForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";


export function renderFunctionForTableOfContents(ctx: MarkupRenderContext, func: FunctionLikeEntities): RenderedFunctionForTableOfContents {
  return func.signatures.map(signature => renderSignatureForTableOfContents(ctx, signature));
}


export function renderFunctionForDocumentation(ctx: MarkupRenderContext, func: FunctionLikeEntities): RenderedFunctionForDocumentation {
  return renderSignaturesForDocumentation(ctx, func.signatures);
}
