import {
  BigIntLiteralType,
  BooleanLiteralType,
  Class,
  Constructor,
  Enum,
  ExportableTypes,
  Function,
  Getter,
  Instance,
  Interface,
  IntersectionType,
  LiteralTypes,
  Method,
  Namespace,
  NumberLiteralType,
  ObjectLiteral,
  PrimitiveTypes,
  Property,
  Setter,
  StringLiteralType,
  Type,
  TypeAlias,
  TypeKind,
  UnionType,
  Unresolved,
  Variable
} from "../types/types.js";


export function isBigIntLiteralType(type: Type<TypeKind>): type is BigIntLiteralType {
  return type.kind === TypeKind.BigIntLiteral;
}

export function isBooleanLiteralType(type: Type<TypeKind>): type is BooleanLiteralType {
  return type.kind === TypeKind.BooleanLiteral;
}

export function isClassType(type: Type<TypeKind>): type is Class {
  return type.kind === TypeKind.Class;
}

export function isConstructorType(type: Type<TypeKind>): type is Constructor {
  return type.kind === TypeKind.Constructor;
}

export function isEnumType(type: Type<TypeKind>): type is Enum {
  return type.kind === TypeKind.Enum;
}

export function isExportableType(type: Type<TypeKind>): type is ExportableTypes {
  return isClassType(type) ||
    isEnumType(type) ||
    isFunctionType(type) ||
    isInterfaceType(type) ||
    isNamespaceType(type) ||
    isTypeAliasType(type) ||
    isVariableType(type) ||
    isUnresolvedType(type);
}

export function isFunctionType(type: Type<TypeKind>): type is Function {
  return type.kind === TypeKind.Function;
}

export function isGetterType(type: Type<TypeKind>): type is Getter {
  return type.kind === TypeKind.Getter;
}

export function isInstanceType(type: Type<TypeKind>): type is Instance {
  return type.kind === TypeKind.Instance;
}

export function isInterfaceType(type: Type<TypeKind>): type is Interface {
  return type.kind === TypeKind.Interface;
}

export function isIntersectionType(type: Type<TypeKind>): type is IntersectionType {
  return type.kind === TypeKind.IntersectionType;
}

export function isLiteralType(type: Type<TypeKind>): type is LiteralTypes {
  return type.kind === TypeKind.StringLiteral ||
    type.kind === TypeKind.NumberLiteral ||
    type.kind === TypeKind.BooleanLiteral ||
    type.kind === TypeKind.BigIntLiteral;
}

export function isMethodType(type: Type<TypeKind>): type is Method {
  return type.kind === TypeKind.Method;
}

export function isNamespaceType(type: Type<TypeKind>): type is Namespace {
  return type.kind === TypeKind.Namespace;
}

export function isNumberLiteralType(type: Type<TypeKind>): type is NumberLiteralType {
  return type.kind === TypeKind.NumberLiteral;
}

export function isObjectLiteralType(type: Type<TypeKind>): type is ObjectLiteral {
  return type.kind === TypeKind.ObjectLiteral;
}

export function isPrimitiveType(type: Type<TypeKind>): type is PrimitiveTypes {
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

export function isPropertyType(type: Type<TypeKind>): type is Property {
  return type.kind === TypeKind.Property;
}

export function isSetterType(type: Type<TypeKind>): type is Setter {
  return type.kind === TypeKind.Setter;
}

export function isStringLiteralType(type: Type<TypeKind>): type is StringLiteralType {
  return type.kind === TypeKind.StringLiteral;
}

export function isTypeAliasType(type: Type<TypeKind>): type is TypeAlias {
  return type.kind === TypeKind.TypeAlias;
}

export function isUnionType(type: Type<TypeKind>): type is UnionType {
  return type.kind === TypeKind.UnionType;
}

export function isUnresolvedType(type: Type<TypeKind>): type is Unresolved {
  return type.kind === TypeKind.Unresolved;
}

export function isVariableType(type: Type<TypeKind>): type is Variable {
  return type.kind === TypeKind.Variable;
}
