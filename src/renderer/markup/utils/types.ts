import {
  isArrayType,
  isClassType,
  isConditionalType,
  isFunctionType,
  isIndexedAccessType,
  isInterfaceType,
  isIntersectionType,
  isObjectLiteralType,
  isObjectType,
  isTupleType,
  isTypeLiteralType,
  isTypeReferenceType,
  isUnionType
} from "unwritten:typeguards/types";

import type { MultilineType, Type } from "unwritten:interpreter/type-definitions/types";


export function isMultilineType(type: Type): type is MultilineType {
  return isArrayType(type) ||
    isObjectType(type) ||
    isObjectLiteralType(type) ||
    isFunctionType(type) ||
    isTypeLiteralType(type) ||
    isClassType(type) ||
    isConditionalType(type) ||
    isInterfaceType(type) ||
    isTypeReferenceType(type) ||
    isMultilineUnionType(type) ||
    isIntersectionType(type) ||
    isIndexedAccessType(type) ||
    isTupleType(type);
}

export function isMultilineUnionType(type: Type) {
  return isUnionType(type) && type.types.some(type => isMultilineType(type));
}
