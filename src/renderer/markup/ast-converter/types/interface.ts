import {
  convertObjectTypeInline,
  convertObjectTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index";

import type { InterfaceType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedInterfaceTypeInline,
  ConvertedInterfaceTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertInterfaceTypeInline(ctx: MarkupRenderContext, interfaceType: InterfaceType): ConvertedInterfaceTypeInline {
  return convertObjectTypeInline(ctx, interfaceType);
}

export function convertInterfaceTypeMultiline(ctx: MarkupRenderContext, interfaceType: InterfaceType): ConvertedInterfaceTypeMultiline {
  return convertObjectTypeMultiline(ctx, interfaceType);
}
