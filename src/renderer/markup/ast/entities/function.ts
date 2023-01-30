import { renderSignatureForTableOfContents, renderSignaturesForDocumentation } from "./signature.js";

import type { FunctionLikeEntities } from "unwritten:compiler/type-definitions/entities.js";
import type {
  MarkupRenderer,
  RenderedFunctionForDocumentation,
  RenderedFunctionForTableOfContents
} from "unwritten:renderer:markup/types/renderer.js";
import type { RenderContext } from "unwritten:type-definitions/context.d.js";


export function renderFunctionForTableOfContents(ctx: RenderContext<MarkupRenderer>, func: FunctionLikeEntities): RenderedFunctionForTableOfContents {
  return func.signatures.map(signature => renderSignatureForTableOfContents(ctx, signature));
}


export function renderFunctionForDocumentation(ctx: RenderContext<MarkupRenderer>, func: FunctionLikeEntities): RenderedFunctionForDocumentation {
  return renderSignaturesForDocumentation(ctx, func.signatures);
}
