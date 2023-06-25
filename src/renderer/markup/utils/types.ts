import {
  isClassType,
  isFunctionType,
  isInterfaceType,
  isObjectLiteralType,
  isObjectType,
  isTypeLiteralType,
  isTypeReferenceType
} from "unwritten:typeguards/types.js";

import type { MultilineTypes, Types } from "unwritten:interpreter/type-definitions/types.js";
import type { MarkupRenderContexts } from "unwritten:renderer/markup/types-definitions/markup.js";


export function isMultilineType(ctx: MarkupRenderContexts, type: Types): type is MultilineTypes {
  return isObjectType(type) ||
  isObjectLiteralType(type) ||
  isFunctionType(type) ||
  isTypeLiteralType(type) ||
  isClassType(type) ||
  isInterfaceType(type) ||
  isTypeReferenceType(type);
}
