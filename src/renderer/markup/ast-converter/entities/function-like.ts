import {
  convertSignatureForDocumentation,
  convertSignatureForTableOfContents
} from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createContainerNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { FunctionLikeEntities } from "unwritten:compiler:type-definitions/entities.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.d.js";
import type {
  ConvertedFunctionEntityForDocumentation,
  ConvertedFunctionEntityForTableOfContents
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertFunctionEntityForTableOfContents(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntities): ConvertedFunctionEntityForTableOfContents {
  return createContainerNode(
    ...functionLikeEntity.signatures.map(signature => convertSignatureForTableOfContents(ctx, signature))
  );
}


export function convertFunctionEntityForDocumentation(ctx: MarkupRenderContexts, functionLikeEntity: FunctionLikeEntities): ConvertedFunctionEntityForDocumentation {
  return createContainerNode(
    ...functionLikeEntity.signatures.map(signature => convertSignatureForDocumentation(ctx, signature))
  );
}
