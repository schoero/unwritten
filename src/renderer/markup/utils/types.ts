import {
  isClassType,
  isFunctionType,
  isInterfaceType,
  isObjectLiteralType,
  isObjectType,
  isTypeLiteralType
} from "unwritten:typeguards/types.js";

import type { MultilineTypes, Types } from "unwritten:interpreter/type-definitions/types.js";


export function isMultilineType(type: Types): type is MultilineTypes {
  return isObjectType(type) ||
  isObjectLiteralType(type) ||
  isFunctionType(type) ||
  isTypeLiteralType(type) ||
  isClassType(type) ||
  isInterfaceType(type);
}
