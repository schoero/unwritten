import { filterImplicitSignatures } from "unwritten:renderer/utils/private-members.js";
import {
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents,
  convertSignatureEntityForType
} from "unwritten:renderer:markup/ast-converter/entities/index.js";

import type { FunctionLikeEntity } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type {
  ConvertedFunctionEntityForDocumentation,
  ConvertedFunctionEntityForTableOfContents,
  ConvertedFunctionEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertFunctionLikeEntityForTableOfContents(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForTableOfContents {
  const explicitSignatures = filterImplicitSignatures(functionLikeEntity.signatures);
  return explicitSignatures.map(
    signature => convertSignatureEntityForTableOfContents(ctx, signature)
  );
}

export function convertFunctionLikeEntityForDocumentation(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForDocumentation {
  const explicitSignatures = filterImplicitSignatures(functionLikeEntity.signatures);
  return explicitSignatures.map(
    signature => convertSignatureEntityForDocumentation(ctx, signature)
  );
}

export function convertFunctionLikeEntityForType(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForType {
  return functionLikeEntity.signatures.map(
    signature => convertSignatureEntityForType(ctx, signature)
  );
}
