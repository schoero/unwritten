import {
  convertObjectTypeInline,
  convertObjectTypeMultiline
} from "unwritten:renderer/markup/ast-converter/types/index.js";

import type { ObjectLiteralType } from "unwritten:interpreter:type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";
import type {
  ConvertedObjectLiteralType,
  ConvertedObjectLiteralTypeMultiline
} from "unwritten:renderer/markup/types-definitions/renderer.js";


export function convertObjectLiteralTypeInline(ctx: MarkupRenderContexts, objectLiteralType: ObjectLiteralType): ConvertedObjectLiteralType {
  return convertObjectTypeInline(ctx, objectLiteralType);
}

export function convertObjectLiteralTypeMultiline(ctx: MarkupRenderContexts, objectLiteralType: ObjectLiteralType): ConvertedObjectLiteralTypeMultiline {
  return convertObjectTypeMultiline(ctx, objectLiteralType);
}
