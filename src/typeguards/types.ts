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
  Kind,
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
  UnionType,
  Unresolved,
  Variable
} from "../types/types.js";


export function isBigIntLiteralType(type: Type<Kind>): type is BigIntLiteralType {
  return type.kind === Kind.BigIntLiteral;
}

export function isBooleanLiteralType(type: Type<Kind>): type is BooleanLiteralType {
  return type.kind === Kind.BooleanLiteral;
}

export function isClassType(type: Type<Kind>): type is Class {
  return type.kind === Kind.Class;
}

export function isConstructorType(type: Type<Kind>): type is Constructor {
  return type.kind === Kind.Constructor;
}

export function isEnumType(type: Type<Kind>): type is Enum {
  return type.kind === Kind.Enum;
}

export function isExportableType(type: Type<Kind>): type is ExportableTypes {
  return isClassType(type) ||
    isEnumType(type) ||
    isFunctionType(type) ||
    isInterfaceType(type) ||
    isNamespaceType(type) ||
    isTypeAliasType(type) ||
    isVariableType(type) ||
    isUnresolvedType(type);
}

export function isFunctionType(type: Type<Kind>): type is Function {
  return type.kind === Kind.Function;
}

export function isGetterType(type: Type<Kind>): type is Getter {
  return type.kind === Kind.Getter;
}

export function isInstanceType(type: Type<Kind>): type is Instance {
  return type.kind === Kind.Instance;
}

export function isInterfaceType(type: Type<Kind>): type is Interface {
  return type.kind === Kind.Interface;
}

export function isIntersectionType(type: Type<Kind>): type is IntersectionType {
  return type.kind === Kind.IntersectionType;
}

export function isLiteralType(type: Type<Kind>): type is LiteralTypes {
  return type.kind === Kind.StringLiteral ||
    type.kind === Kind.NumberLiteral ||
    type.kind === Kind.BooleanLiteral ||
    type.kind === Kind.BigIntLiteral;
}

export function isMethodType(type: Type<Kind>): type is Method {
  return type.kind === Kind.Method;
}

export function isNamespaceType(type: Type<Kind>): type is Namespace {
  return type.kind === Kind.Namespace;
}

export function isNumberLiteralType(type: Type<Kind>): type is NumberLiteralType {
  return type.kind === Kind.NumberLiteral;
}

export function isObjectLiteralType(type: Type<Kind>): type is ObjectLiteral {
  return type.kind === Kind.ObjectLiteral;
}

export function isPrimitiveType(type: Type<Kind>): type is PrimitiveTypes {
  return type.kind === Kind.Any ||
    type.kind === Kind.BigInt ||
    type.kind === Kind.BigIntLiteral ||
    type.kind === Kind.Boolean ||
    type.kind === Kind.BooleanLiteral ||
    type.kind === Kind.Never ||
    type.kind === Kind.Null ||
    type.kind === Kind.Number ||
    type.kind === Kind.NumberLiteral ||
    type.kind === Kind.String ||
    type.kind === Kind.StringLiteral ||
    type.kind === Kind.Symbol ||
    type.kind === Kind.Undefined ||
    type.kind === Kind.Void;
}

export function isPropertyType(type: Type<Kind>): type is Property {
  return type.kind === Kind.Property;
}

export function isSetterType(type: Type<Kind>): type is Setter {
  return type.kind === Kind.Setter;
}

export function isStringLiteralType(type: Type<Kind>): type is StringLiteralType {
  return type.kind === Kind.StringLiteral;
}

export function isTypeAliasType(type: Type<Kind>): type is TypeAlias {
  return type.kind === Kind.TypeAlias;
}

export function isUnionType(type: Type<Kind>): type is UnionType {
  return type.kind === Kind.UnionType;
}

export function isUnresolvedType(type: Type<Kind>): type is Unresolved {
  return type.kind === Kind.Unresolved;
}

export function isVariableType(type: Type<Kind>): type is Variable {
  return type.kind === Kind.Variable;
}
