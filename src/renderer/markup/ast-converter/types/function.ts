import { renderFunctionType } from "unwritten:renderer/typescript/ast/types/function.js";

import type { FunctionType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedFunctionType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertFunctionType(ctx: MarkupRenderContexts, functionType: FunctionType): ConvertedFunctionType {
  return [
    renderFunctionType(ctx.childRenderers.ts, functionType)
  ];
}
