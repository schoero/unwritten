import { convertSignatureEntityForDocumentation } from "unwritten:renderer/markup/ast-converter/entities/index.js";
import { createListNode } from "unwritten:renderer/markup/utils/nodes.js";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedFunctionType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertFunctionType(ctx: MarkupRenderContexts, functionType: FunctionType): ConvertedFunctionType {

  const convertedSignatures = functionType.signatures.map(signature => convertSignatureEntityForDocumentation(ctx, signature, false));

  return convertedSignatures.length === 1
    ? convertedSignatures[0]
    : createListNode(...convertedSignatures);

}
