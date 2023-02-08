import { renderSignatureForTableOfContents, renderSignaturesForDocumentation } from "./signature.js";

import type { FunctionLikeEntities } from "unwritten:compiler:type-definitions/entities.js";
import type { RenderedFunctionForDocumentation } from "unwritten:renderer/markup/types-definitions/ast.js";
import type { MarkupRenderContext } from "unwritten:renderer/markup/types-definitions/renderer.js";


export function renderFunctionEntityForTableOfContents(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntities): RenderedFunctionForTableOfContents {
  return functionLikeEntity.signatures.map(signature => renderSignatureForTableOfContents(ctx, signature));
}


export function renderFunctionEntityForDocumentation(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntities): RenderedFunctionForDocumentation {
  return renderSignaturesForDocumentation(ctx, functionLikeEntity.signatures);
}
