import {
  isClassType,
  isFunctionType,
  isInterfaceType,
  isIntersectionType,
  isObjectLiteralType,
  isObjectType,
  isTupleType,
  isTypeLiteralType,
  isTypeReferenceType,
  isUnionType
} from "unwritten:typeguards/types.js";

import type { MultilineType, Type } from "unwritten:interpreter/type-definitions/types.js";


export function isMultilineType(type: Type): type is MultilineType {
  return isObjectType(type) ||
  isObjectLiteralType(type) ||
  isFunctionType(type) ||
  isTypeLiteralType(type) ||
  isClassType(type) ||
  isInterfaceType(type) ||
  isTypeReferenceType(type) ||
  isMultilineUnionType(type) ||
  isIntersectionType(type) ||
  isTupleType(type);
}

export function isMultilineUnionType(type: Type) {
  return isUnionType(type) && type.types.some(type => isMultilineType(type));
}
