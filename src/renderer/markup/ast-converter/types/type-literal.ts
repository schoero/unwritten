import { convertObjectType, convertObjectTypeMultiline } from "unwritten:renderer/markup/ast-converter/types/index.js";

import type { TypeLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type {
  ConvertedTypeLiteralType,
  ConvertedTypeLiteralTypeMultiline
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertTypeLiteralType(ctx: MarkupRenderContexts, typeLiteralType: TypeLiteralType): ConvertedTypeLiteralType {
  return convertObjectType(ctx, typeLiteralType);
}

export function convertTypeLiteralTypeMultiline(ctx: MarkupRenderContexts, typeLiteralType: TypeLiteralType): ConvertedTypeLiteralTypeMultiline {
  return convertObjectTypeMultiline(ctx, typeLiteralType);
}
