import {
  convertObjectTypeInline,
  convertObjectTypeMultiline
} from "unwritten:renderer/markup/ast-converter/types/index.js";

import type { InterfaceType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type {
  ConvertedInterfaceType,
  ConvertedInterfaceTypeMultiline
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertInterfaceTypeInline(ctx: MarkupRenderContexts, interfaceType: InterfaceType): ConvertedInterfaceType {
  return convertObjectTypeInline(ctx, interfaceType);
}

export function convertInterfaceTypeMultiline(ctx: MarkupRenderContexts, interfaceType: InterfaceType): ConvertedInterfaceTypeMultiline {
  return convertObjectTypeMultiline(ctx, interfaceType);
}
