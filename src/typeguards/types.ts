import { TypeKind } from "unwritten:interpreter/enums/types.js";

import type {
  AnyType,
  ArrayType,
  BigIntLiteralType,
  BigIntType,
  BooleanLiteralType,
  BooleanType,
  ClassType,
  ExpressionType,
  FunctionType,
  InterfaceType,
  IntersectionType,
  LiteralTypes,
  NeverType,
  NullType,
  NumberLiteralType,
  NumberType,
  ObjectLiteralType,
  ObjectType,
  StringLiteralType,
  StringType,
  SymbolType,
  TemplateLiteralType,
  TupleType,
  TypeReferenceType,
  Types,
  UndefinedType,
  UnionType,
  UnknownType,
  UnresolvedType,
  VoidType
} from "unwritten:interpreter/type-definitions/types.js";


export function isAnyType(type: Types): type is AnyType {
  return type.kind === TypeKind.Any;
}

export function isArrayType(type: Types): type is ArrayType {
  return type.kind === TypeKind.Array;
}

export function isBigIntLiteralType(type: Types): type is BigIntLiteralType {
  return type.kind === TypeKind.BigIntLiteral;
}

export function isBigIntType(type: Types): type is BigIntType {
  return type.kind === TypeKind.BigInt;
}

export function isBooleanLiteralType(type: Types): type is BooleanLiteralType {
  return type.kind === TypeKind.BooleanLiteral;
}

export function isBooleanType(type: Types): type is BooleanType {
  return type.kind === TypeKind.Boolean;
}

export function isClassType(type: Types): type is ClassType {
  return type.kind === TypeKind.Class;
}

export function isExpressionType(type: Types): type is ExpressionType {
  return type.kind === TypeKind.Expression;
}

export function isFunctionType(type: Types): type is FunctionType {
  return type.kind === TypeKind.Function;
}

export function isInterfaceType(type: Types): type is InterfaceType {
  return type.kind === TypeKind.Interface;
}

export function isIntersectionType(type: Types): type is IntersectionType {
  return type.kind === TypeKind.Intersection;
}

export function isLiteralType(type: Types): type is LiteralTypes {
  return isStringLiteralType(type) ||
  isNumberLiteralType(type) ||
  isBooleanLiteralType(type) ||
  isBigIntLiteralType(type);
}

export function isNeverType(type: Types): type is NeverType {
  return type.kind === TypeKind.Never;
}

export function isNullType(type: Types): type is NullType {
  return type.kind === TypeKind.Null;
}

export function isNumberLiteralType(type: Types): type is NumberLiteralType {
  return type.kind === TypeKind.NumberLiteral;
}

export function isNumberType(type: Types): type is NumberType {
  return type.kind === TypeKind.Number;
}

export function isObjectLiteralType(type: Types): type is ObjectLiteralType {
  return type.kind === TypeKind.ObjectLiteral;
}

export function isObjectType(type: Types): type is ObjectType {
  return type.kind === TypeKind.Object;
}

export function isStringLiteralType(type: Types): type is StringLiteralType {
  return type.kind === TypeKind.StringLiteral;
}

export function isStringType(type: Types): type is StringType {
  return type.kind === TypeKind.String;
}

export function isSymbolType(type: Types): type is SymbolType {
  return type.kind === TypeKind.Symbol;
}

export function isTemplateLiteralType(type: Types): type is TemplateLiteralType {
  return type.kind === TypeKind.TemplateLiteral;
}

export function isTupleType(type: Types): type is TupleType {
  return type.kind === TypeKind.Tuple;
}

export function isTypeReferenceType(type: Types): type is TypeReferenceType {
  return type.kind === TypeKind.TypeReference;
}

export function isUndefinedType(type: Types): type is UndefinedType {
  return type.kind === TypeKind.Undefined;
}

export function isUnionType(type: Types): type is UnionType {
  return type.kind === TypeKind.Union;
}

export function isUnknownType(type: Types): type is UnknownType {
  return type.kind === TypeKind.Unknown;
}

export function isUnresolvedType(type: Types): type is UnresolvedType {
  return type.kind === TypeKind.Unresolved;
}

export function isVoidType(type: Types): type is VoidType {
  return type.kind === TypeKind.Void;
}
