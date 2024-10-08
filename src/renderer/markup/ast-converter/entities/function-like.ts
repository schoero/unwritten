import {
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents,
  convertSignatureEntityForType
} from "unwritten:renderer:markup/ast-converter/entities/index";
import { implicitSignatureFilter } from "unwritten:renderer/markup/utils/filter";

import type { FunctionLikeEntity } from "unwritten:interpreter:type-definitions/entities";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedFunctionEntityForDocumentation,
  ConvertedFunctionEntityForTableOfContents,
  ConvertedFunctionEntityForType
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertFunctionLikeEntityForTableOfContents(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForTableOfContents {
  const explicitSignatures = functionLikeEntity.signatures.filter(implicitSignatureFilter);
  return explicitSignatures.map(
    signature => convertSignatureEntityForTableOfContents(ctx, signature)
  );
}

export function convertFunctionLikeEntityForDocumentation(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForDocumentation {
  const explicitSignatures = functionLikeEntity.signatures.filter(implicitSignatureFilter);
  return explicitSignatures.map(
    signature => convertSignatureEntityForDocumentation(ctx, signature)
  );
}

export function convertFunctionLikeEntityForType(ctx: MarkupRenderContext, functionLikeEntity: FunctionLikeEntity): ConvertedFunctionEntityForType {
  return functionLikeEntity.signatures.map(
    signature => convertSignatureEntityForType(ctx, signature)
  );
}
