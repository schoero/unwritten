import {
  convertObjectTypeInline,
  convertObjectTypeMultiline
} from "unwritten:renderer:markup/ast-converter/types/index";

import type { TypeLiteralType } from "unwritten:interpreter:type-definitions/types";
import type { MarkupRenderContext } from "unwritten:renderer:markup/types-definitions/markup";
import type {
  ConvertedTypeLiteralTypeInline,
  ConvertedTypeLiteralTypeMultiline
} from "unwritten:renderer:markup/types-definitions/renderer";


export function convertTypeLiteralTypeInline(ctx: MarkupRenderContext, typeLiteralType: TypeLiteralType): ConvertedTypeLiteralTypeInline {
  return convertObjectTypeInline(ctx, typeLiteralType);
}

export function convertTypeLiteralTypeMultiline(ctx: MarkupRenderContext, typeLiteralType: TypeLiteralType): ConvertedTypeLiteralTypeMultiline {
  return convertObjectTypeMultiline(ctx, typeLiteralType);
}
