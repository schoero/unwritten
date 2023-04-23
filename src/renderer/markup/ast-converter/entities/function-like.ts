import {
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents,
  convertSignatureEntityForType
} from "unwritten:renderer:markup/ast-converter/entities/index.js";

import type { FunctionLikeEntities } from "unwritten:interpreter:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type {
  ConvertedFunctionEntityForDocumentation,
  ConvertedFunctionEntityForTableOfContents,
  ConvertedFunctionEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertFunctionLikeEntityForTableOfContents(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntities): ConvertedFunctionEntityForTableOfContents {
  return functionLikeEntity.signatures.map(signature => convertSignatureEntityForTableOfContents(ctx, signature));
}

export function convertFunctionLikeEntityForDocumentation(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntities): ConvertedFunctionEntityForDocumentation {
  return functionLikeEntity.signatures.map(
    signature =>
      convertSignatureEntityForDocumentation(ctx, signature)
  );
}

export function convertFunctionLikeEntityForType(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntities): ConvertedFunctionEntityForType {
  return functionLikeEntity.signatures.map(
    signature =>
      convertSignatureEntityForType(ctx, signature)
  );
}
