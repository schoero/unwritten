import { renderSignatureForDocumentation, renderSignatureForTableOfContents } from "./signature.js";

import type { FunctionLikeEntities } from "quickdoks:compiler/type-definitions/entities.js";
import type {
  MarkupRenderer,
  RenderedFunctionForDocumentation,
  RenderedFunctionForTableOfContents
} from "quickdoks:renderer:markup/types/renderer.js";
import type { RenderContext } from "quickdoks:type-definitions/context.d.js";


export function renderFunctionForTableOfContents(ctx: RenderContext<MarkupRenderer>, func: FunctionLikeEntities): RenderedFunctionForTableOfContents {
  return func.signatures.map(signature => renderSignatureForTableOfContents(ctx, signature));
}


export function renderFunctionForDocumentation(ctx: RenderContext<MarkupRenderer>, func: FunctionLikeEntities): RenderedFunctionForDocumentation {
  return func.signatures.reduce<RenderedFunctionForDocumentation>((signatures, signature) => {
    const renderedSignature = renderSignatureForDocumentation(ctx, signature);
    return { ...signatures, ...renderedSignature };
  }, {});
}
