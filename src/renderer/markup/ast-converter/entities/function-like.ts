import { filterOutImplicitSignatures } from "unwritten:renderer/utils/private-members";
import {
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents,
  convertSignatureEntityForType
} from "unwritten:renderer:markup/ast-converter/entities/index";

import type { FunctionLikeEntity } from "unwritten:interpreter:type-definitions/entities";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedFunctionEntityForDocumentation,
  ConvertedFunctionEntityForTableOfContents,
  ConvertedFunctionEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertFunctionLikeEntityForTableOfContents(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForTableOfContents {
  const explicitSignatures = filterOutImplicitSignatures(functionLikeEntity.signatures);
  return explicitSignatures.map(
    signature => convertSignatureEntityForTableOfContents(ctx, signature)
  );
}

export function convertFunctionLikeEntityForDocumentation(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForDocumentation {
  const explicitSignatures = filterOutImplicitSignatures(functionLikeEntity.signatures);
  return explicitSignatures.map(
    signature => convertSignatureEntityForDocumentation(ctx, signature)
  );
}

export function convertFunctionLikeEntityForType(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForType {
  return functionLikeEntity.signatures.map(
    signature => convertSignatureEntityForType(ctx, signature)
  );
}
