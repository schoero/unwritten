import type { TypeParameterType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.js";
import type { ConvertedTypeParameterTypeInline } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeParameterTypeInline(ctx: MarkupRenderContexts, typeParameterType: TypeParameterType): ConvertedTypeParameterTypeInline {
  return typeParameterType.name;
}
