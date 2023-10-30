import type { TypeParameterType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type { ConvertedTypeParameterTypeInline } from "unwritten:renderer:markup/types-definitions/renderer";


export function convertTypeParameterTypeInline(ctx: MarkupRenderContexts, typeParameterType: TypeParameterType): ConvertedTypeParameterTypeInline {
  return typeParameterType.name;
}
