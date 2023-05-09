import type { TypeParameterType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup.d.js";
import type { ConvertedTypeParameterType } from "unwritten:renderer:markup/types-definitions/renderer.js";


export function convertTypeParameterType(ctx: MarkupRenderContexts, typeParameterType: TypeParameterType): ConvertedTypeParameterType {
  return typeParameterType.name;
}
