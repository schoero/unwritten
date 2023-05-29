import { isFunctionType, isObjectType, isTypeLiteralType } from "unwritten:typeguards/types.js";

import type { MultilineTypes, Types } from "unwritten:interpreter/type-definitions/types.js";


export function isMultilineType(type: Types): type is MultilineTypes {
  return isObjectType(type) ||
  isFunctionType(type) ||
  isTypeLiteralType(type);
}
