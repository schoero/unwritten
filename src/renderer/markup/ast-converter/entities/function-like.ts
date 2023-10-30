import { filterOutImplicitSignatures } from "unwritten:renderer/utils/private-members";
import {
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents,
  convertSignatureEntityForType
} from "unwritten:renderer:markup/ast-converter/entities/index";

import type { FunctionLikeEntity } from "unwritten:interpreter/type-definitions/entities";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedFunctionEntityForDocumentation,
  ConvertedFunctionEntityForTableOfContents,
  ConvertedFunctionEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertFunctionLikeEntityForTableOfContents(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForTableOfContents {
  const explicitSignatures = filterOutImplicitSignatures(functionLikeEntity.signatures);
  return explicitSignatures.map(
    signature => convertSignatureEntityForTableOfContents(ctx, signature)
  );
}

export function convertFunctionLikeEntityForDocumentation(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForDocumentation {
  const explicitSignatures = filterOutImplicitSignatures(functionLikeEntity.signatures);
  return explicitSignatures.map(
    signature => convertSignatureEntityForDocumentation(ctx, signature)
  );
}

export function convertFunctionLikeEntityForType(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForType {
  return functionLikeEntity.signatures.map(
    signature => convertSignatureEntityForType(ctx, signature)
  );
}
