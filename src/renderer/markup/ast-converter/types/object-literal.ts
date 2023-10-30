import {
  convertObjectTypeInline,
  convertObjectTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index";

import type { ObjectLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContexts } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedObjectLiteralTypeInline,
  ConvertedObjectLiteralTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertObjectLiteralTypeInline(ctx: MarkupRenderContexts, objectLiteralType: ObjectLiteralType): ConvertedObjectLiteralTypeInline {
  return convertObjectTypeInline(ctx, objectLiteralType);
}

export function convertObjectLiteralTypeMultiline(ctx: MarkupRenderContexts, objectLiteralType: ObjectLiteralType): ConvertedObjectLiteralTypeMultiline {
  return convertObjectTypeMultiline(ctx, objectLiteralType);
}
