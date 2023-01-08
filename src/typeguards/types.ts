import { TypeKind } from "quickdoks:compiler:enums/types.js";

import type {
  BigIntLiteralType,
  BooleanLiteralType,
  IntersectionType,
  LiteralTypes,
  NumberLiteralType,
  ObjectLiteralType,
  PrimitiveTypes,
  StringLiteralType,
  Types,
  UnionType,
  UnresolvedType
} from "quickdoks:compiler:type-definitions/types.d.js";


export function isBigIntLiteralType(type: Types): type is BigIntLiteralType {
  return type.kind === TypeKind.BigIntLiteral;
}

export function isBooleanLiteralType(type: Types): type is BooleanLiteralType {
  return type.kind === TypeKind.BooleanLiteral;
}

export function isIntersectionType(type: Types): type is IntersectionType {
  return type.kind === TypeKind.IntersectionType;
}

export function isLiteralType(type: Types): type is LiteralTypes {
  return type.kind === TypeKind.StringLiteral ||
    type.kind === TypeKind.NumberLiteral ||
    type.kind === TypeKind.BooleanLiteral ||
    type.kind === TypeKind.BigIntLiteral;
}

export function isNumberLiteralType(type: Types): type is NumberLiteralType {
  return type.kind === TypeKind.NumberLiteral;
}

export function isObjectLiteralType(type: Types): type is ObjectLiteralType {
  return type.kind === TypeKind.ObjectLiteral;
}

export function isPrimitiveType(type: Types): type is PrimitiveTypes {
  return type.kind === TypeKind.Any ||
    type.kind === TypeKind.BigInt ||
    type.kind === TypeKind.BigIntLiteral ||
    type.kind === TypeKind.Boolean ||
    type.kind === TypeKind.BooleanLiteral ||
    type.kind === TypeKind.Never ||
    type.kind === TypeKind.Null ||
    type.kind === TypeKind.Number ||
    type.kind === TypeKind.NumberLiteral ||
    type.kind === TypeKind.String ||
    type.kind === TypeKind.StringLiteral ||
    type.kind === TypeKind.Symbol ||
    type.kind === TypeKind.Undefined ||
    type.kind === TypeKind.Void;
}

export function isStringLiteralType(type: Types): type is StringLiteralType {
  return type.kind === TypeKind.StringLiteral;
}

export function isUnionType(type: Types): type is UnionType {
  return type.kind === TypeKind.UnionType;
}

export function isUnresolvedType(type: Types): type is UnresolvedType {
  return type.kind === TypeKind.Unresolved;
}
