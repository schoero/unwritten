import { TypeKind } from "unwritten:interpreter/enums/type";

import type {
  AnyType,
  ArrayType,
  BigIntLiteralType,
  BigIntType,
  BooleanLiteralType,
  BooleanType,
  CircularType,
  ClassType,
  ConditionalType,
  ExpressionType,
  FunctionType,
  IndexedAccessType,
  InterfaceType,
  IntersectionType,
  LiteralType,
  MappedType,
  NeverType,
  NullType,
  NumberLiteralType,
  NumberType,
  ObjectLikeTypes,
  ObjectLiteralType,
  ObjectType,
  StringLiteralType,
  StringType,
  SymbolType,
  TemplateLiteralType,
  TupleType,
  Type,
  TypeLiteralType,
  TypeParameterType,
  TypeQueryType,
  TypeReferenceType,
  UndefinedType,
  UnionType,
  UnknownType,
  UnresolvedType,
  VoidType
} from "unwritten:interpreter:type-definitions/types";


export function isAnyType(type: Type): type is AnyType {
  return type.kind === TypeKind.Any;
}

export function isArrayType(type: Type): type is ArrayType {
  return type.kind === TypeKind.Array;
}

export function isBigIntLiteralType(type: Type): type is BigIntLiteralType {
  return type.kind === TypeKind.BigIntLiteral;
}

export function isBigIntType(type: Type): type is BigIntType {
  return type.kind === TypeKind.BigInt;
}

export function isBooleanLiteralType(type: Type): type is BooleanLiteralType {
  return type.kind === TypeKind.BooleanLiteral;
}

export function isBooleanType(type: Type): type is BooleanType {
  return type.kind === TypeKind.Boolean;
}

export function isCircularType(type: Type): type is CircularType {
  return type.kind === TypeKind.Circular;
}

export function isClassType(type: Type): type is ClassType {
  return type.kind === TypeKind.Class;
}

export function isConditionalType(type: Type): type is ConditionalType {
  return type.kind === TypeKind.Conditional;
}

export function isExpressionType(type: Type): type is ExpressionType {
  return type.kind === TypeKind.Expression;
}

export function isFunctionType(type: Type): type is FunctionType {
  return type.kind === TypeKind.Function;
}

export function isIndexedAccessType(type: Type): type is IndexedAccessType {
  return type.kind === TypeKind.IndexedAccess;
}

export function isInterfaceType(type: Type): type is InterfaceType {
  return type.kind === TypeKind.Interface;
}

export function isIntersectionType(type: Type): type is IntersectionType {
  return type.kind === TypeKind.Intersection;
}

export function isLiteralType(type: Type): type is LiteralType {
  return isStringLiteralType(type) ||
    isNumberLiteralType(type) ||
    isBooleanLiteralType(type) ||
    isBigIntLiteralType(type);
}

export function isMappedType(type: Type): type is MappedType {
  return type.kind === TypeKind.Mapped;
}

export function isNeverType(type: Type): type is NeverType {
  return type.kind === TypeKind.Never;
}

export function isNullType(type: Type): type is NullType {
  return type.kind === TypeKind.Null;
}

export function isNumberLiteralType(type: Type): type is NumberLiteralType {
  return type.kind === TypeKind.NumberLiteral;
}

export function isNumberType(type: Type): type is NumberType {
  return type.kind === TypeKind.Number;
}

export function isObjectLikeType(type: Type): type is ObjectLikeTypes {
  return isObjectType(type) ||
    isInterfaceType(type) ||
    isClassType(type) ||
    isObjectLiteralType(type) ||
    isTypeLiteralType(type);
}

export function isObjectLiteralType(type: Type): type is ObjectLiteralType {
  return type.kind === TypeKind.ObjectLiteral;
}

export function isObjectType(type: Type): type is ObjectType {
  return type.kind === TypeKind.Object;
}

export function isStringLiteralType(type: Type): type is StringLiteralType {
  return type.kind === TypeKind.StringLiteral;
}

export function isStringType(type: Type): type is StringType {
  return type.kind === TypeKind.String;
}

export function isSymbolType(type: Type): type is SymbolType {
  return type.kind === TypeKind.Symbol;
}

export function isTemplateLiteralType(type: Type): type is TemplateLiteralType {
  return type.kind === TypeKind.TemplateLiteral;
}

export function isTupleType(type: Type): type is TupleType {
  return type.kind === TypeKind.Tuple;
}

export function isTypeLiteralType(type: Type): type is TypeLiteralType {
  return type.kind === TypeKind.TypeLiteral;
}

export function isTypeParameterType(type: Type): type is TypeParameterType {
  return type.kind === TypeKind.TypeParameter;
}

export function isTypeQueryType(type: Type): type is TypeQueryType {
  return type.kind === TypeKind.TypeQuery;
}

export function isTypeReferenceType(type: Type): type is TypeReferenceType {
  return type.kind === TypeKind.TypeReference;
}

export function isUndefinedType(type: Type): type is UndefinedType {
  return type.kind === TypeKind.Undefined;
}

export function isUnionType(type: Type): type is UnionType {
  return type.kind === TypeKind.Union;
}

export function isUnknownType(type: Type): type is UnknownType {
  return type.kind === TypeKind.Unknown;
}

export function isUnresolvedType(type: Type): type is UnresolvedType {
  return type.kind === TypeKind.Unresolved;
}

export function isVoidType(type: Type): type is VoidType {
  return type.kind === TypeKind.Void;
}
