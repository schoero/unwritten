import {
  convertSignatureEntityForDocumentation,
  convertSignatureEntityForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createContainerNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { FunctionLikeEntities } from "unwritten:interpreter/type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedFunctionEntityForDocumentation,
  ConvertedFunctionEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertFunctionLikeEntityForTableOfContents(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntities): ConvertedFunctionEntityForTableOfContents {
  return createContainerNode(
    ...functionLikeEntity.signatures.map(signature => convertSignatureEntityForTableOfContents(ctx, signature))
  );
}


export function convertFunctionLikeEntityForDocumentation(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntities): ConvertedFunctionEntityForDocumentation {
  return createContainerNode(
    ...functionLikeEntity.signatures.map(signature => convertSignatureEntityForDocumentation(ctx, signature))
  );
}
