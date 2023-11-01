import {
  convertObjectTypeInline,
  convertObjectTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index";

import type { ClassType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedClassTypeInline,
  ConvertedClassTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertClassTypeInline(ctx: MarkupRenderContexts, classType: ClassType): ConvertedClassTypeInline {
  return convertObjectTypeInline(ctx, classType);
}

export function convertClassTypeMultiline(ctx: MarkupRenderContexts, classType: ClassType): ConvertedClassTypeMultiline {
  return convertObjectTypeMultiline(ctx, classType);
}
